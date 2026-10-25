/**
 * api/tutor.js: CrestPrep's AI tutor, a Vercel server function (POST /api/tutor).
 *
 * The website never sees the Gemini key. Every request goes through here:
 *  1. Check the student is signed in with Google (their Supabase token).
 *  2. Build the prompt for one of three jobs:
 *       'hint'     → coach one practice question without giving the answer
 *       'analysis' → read a Bluebook upload (scores, misses, error log) and explain what happened
 *       'followup' → answer a follow-up question about that analysis, hints only
 *  3. Ask Gemini, using the key saved in Vercel as GEMINI_API_KEY.
 *  4. For hints, double-check the reply didn't slip the answer before sending it back.
 *
 * Settings (Vercel → Settings → Environment Variables):
 *   GEMINI_API_KEY  required, from Google AI Studio
 *   GEMINI_MODEL    optional, defaults to gemini-3.5-flash-lite (largest free daily allowance)
 */

// The same public values as js/config.js. The anon key is designed to be public.
const SUPABASE_URL = 'https://qpoewxlzozvzmuoiezct.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb2V3eGx6b3p2em11b2llemN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3ODc0MjcsImV4cCI6MjEwODM2MzQyN30.fE1t0NqCx9q1WZiAhqPvsayhWglYU5WG9-lv73fuqzI';
const DEFAULT_MODEL = 'gemini-3.5-flash-lite';

/* ------------------------------ The rules ------------------------------ */
// These are the tutor's instructions. Edit the wording here to change how it coaches.
const HINT_RULES = `You are CrestPrep's AI tutor for the Digital SAT. A high school student is working on one practice question.
Rules you always follow:
- Coach, don't solve. Never say which answer choice is correct, never give the final value, and never confirm or reject a guess before the student submits.
- If the student asks for the answer, begs, or says it's urgent, say kindly that you can't give it, then give the next small hint.
- Give one hint or one guiding question per reply, then ask what they get.
- Use the creator's strategy notes and hints below. The solution outline is only for you; never repeat it step for step.
- Keep replies under 90 words, in plain, friendly language. Write math between \\( and \\). No headings.
- Stay on this SAT question. If the student asks about something else, steer back.`;

const COACH_RULES = `You are CrestPrep's AI coach for the Digital SAT. You read a student's Bluebook practice test data and explain what actually happened.
Rules you always follow:
- Use only the numbers and notes you are given. Never invent scores, counts, or question details.
- Talk to the student directly, warmly and specifically. No generic study advice.
- Never write out a full solution to a question from the error log. Name the idea or rule to review instead, and offer a hint if they want one.
- If the student asks for an answer, give a hint or a guiding question instead.`;

const ANALYSIS_FORMAT = `Write your analysis in exactly this shape (under 250 words):
**What happened**
Two or three sentences about this test.
**Patterns I noticed**
Two to four bullet points starting with "- ". Use the error log's reasons and notes when they exist (careless vs. didn't know it, which section, which module).
**Your next 3 moves**
Three numbered steps ("1. "). Each names a skill and one concrete action, using the Question Bank filters given.
**One thing to remember**
One encouraging sentence.`;

/* ------------------------------ Helpers ------------------------------ */
const clip = (value, max) => String(value ?? '').slice(0, max);
const LETTERS = ['A', 'B', 'C', 'D'];

/** Tokens already checked recently (so a chat doesn't re-check sign-in on every message). */
const verified = new Map();   // token → { userId, until }
const recent = new Map();     // userId → timestamps of recent requests

async function signedInUser(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return null;
  const cached = verified.get(token);
  if (cached && cached.until > Date.now()) return cached.userId;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const user = await res.json();
  if (!user?.id) return null;
  verified.set(token, { userId: user.id, until: Date.now() + 5 * 60 * 1000 });
  return user.id;
}

/** At most 20 AI requests per student every 10 minutes (protects the free daily quota). */
function tooManyRequests(userId) {
  const now = Date.now();
  const times = (recent.get(userId) || []).filter((t) => now - t < 10 * 60 * 1000);
  times.push(now);
  recent.set(userId, times);
  return times.length > 20;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw || '{}');
}

/** Earlier chat turns in Gemini's format: starts with the student, and turns alternate. */
function historyTurns(history) {
  const turns = [];
  for (const m of (Array.isArray(history) ? history : []).slice(-10)) {
    const role = m.from === 'you' ? 'user' : 'model';
    const text = clip(m.text, 1500);
    if (!text) continue;
    if (!turns.length && role === 'model') continue;               // skip the tutor's greeting
    const last = turns[turns.length - 1];
    if (last && last.role === role) last.parts[0].text += `\n${text}`;
    else turns.push({ role, parts: [{ text }] });
  }
  if (turns.length && turns[turns.length - 1].role === 'user') turns.pop();   // the new message goes last
  return turns;
}

/* ------------------------------ Prompts ------------------------------ */
function questionContext(q) {
  const steps = (q.steps || []).filter((s) => !/answer is/i.test(s));
  return [
    `Section: ${q.section === 'math' ? 'Math' : 'Reading and Writing'}. Skill: ${clip(q.skill, 80)}. Pattern: ${clip(q.pattern, 120)}.`,
    q.passage ? `Passage:\n${clip(q.passage, 3000)}` : '',
    `Question:\n${clip(q.stem, 1500)}`,
    `Choices:\n${(q.choices || []).slice(0, 4).map((c, i) => `${LETTERS[i]}) ${clip(c, 400)}`).join('\n')}`,
    `Creator's hints, in order:\n${(q.hints || []).map((h, i) => `${i + 1}. ${clip(h, 400)}`).join('\n')}`,
    q.trap ? `Common trap: ${clip(q.trap, 400)}` : '',
    steps.length ? `Solution outline (for you only):\n${steps.map((s) => `- ${clip(s, 400)}`).join('\n')}` : '',
    `Hints the student has already seen: ${Number(q.hintsUsed) || 0}.`,
  ].filter(Boolean).join('\n\n');
}

function testContext(t) {
  const lines = [
    `Test: ${clip(t.label, 80)} (${clip(t.date, 20)}).`,
    t.scores ? `Scores: total ${t.scores.total}, Reading and Writing ${t.scores.rw}, Math ${t.scores.math}.` : 'Scores: not given.',
    t.report?.correct ? `Score report: ${t.report.correct.rw ?? '?'} of ${t.report.questions?.rw ?? 54} right in Reading and Writing, ${t.report.correct.math ?? '?'} of ${t.report.questions?.math ?? 44} right in Math.` : '',
    t.report?.bands?.length ? `College Board's Knowledge and Skills bars (filled boxes out of 7, where 7 is the top band):\n${t.report.bands.slice(0, 8).map((b) => `- ${clip(b.domain, 60)}: ${Number(b.filled) || 0} of ${Number(b.of) || 7}`).join('\n')}` : '',
    t.goal ? `Goal: ${t.goal.target} by ${t.goal.date}.` : '',
    `Missed questions by official skill (most first):\n${(t.misses || []).slice(0, 29).map((m) => `- ${clip(m.skill, 90)} (${clip(m.domain, 60)}, ${m.section === 'math' ? 'Math' : 'Reading and Writing'}): ${Number(m.count) || 0}. Question Bank filter: ${clip(m.filter, 200)}`).join('\n') || '- none recorded'}`,
  ];
  const log = (t.errorLog || []).slice(0, 40);
  if (log.length) {
    lines.push(`Error log (${log.length} entries):\n${log.map((e, i) => [
      `#${i + 1}: ${e.section === 'math' ? 'Math' : 'Reading and Writing'}${e.module ? ` Module ${clip(e.module, 2)}` : ''}${e.number ? ` Q${clip(e.number, 4)}` : ''}${e.skill ? `, skill: ${clip(e.skill, 90)}` : ''}`,
      e.mine || e.correct ? `   picked ${clip(e.mine, 20) || '?'}, correct ${clip(e.correct, 20) || '?'}` : '',
      e.reason ? `   why missed: ${clip(e.reason, 60)}` : '',
      e.note ? `   student's note: ${clip(e.note, 300)}` : '',
      e.text ? `   pasted question: ${clip(e.text, 700)}` : '',
    ].filter(Boolean).join('\n')).join('\n')}`);
  }
  if (t.errorLogText) lines.push(`Error log PDF the student uploaded (text):\n${clip(t.errorLogText, 6000)}`);
  return lines.filter(Boolean).join('\n\n');
}

/* ------------------------------ Gemini ------------------------------ */
async function askGemini({ system, turns, maxTokens }) {
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const body = {
    system_instruction: { parts: [{ text: system }] },
    contents: turns,
    generationConfig: { temperature: 0.6, maxOutputTokens: maxTokens, thinkingConfig: { thinkingLevel: 'low' } },
  };
  const call = (payload) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify(payload),
  });

  let res = await call(body);
  if (res.status === 400) {
    // Some models don't take a thinking setting; try once more without it.
    delete body.generationConfig.thinkingConfig;
    res = await call(body);
  }
  if (res.status === 429) return { error: 'quota', status: 429 };
  if (!res.ok) {
    console.error('Gemini error', res.status, (await res.text()).slice(0, 500));
    return { error: 'gemini', status: 502 };
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const text = parts.filter((p) => p.text && !p.thought).map((p) => p.text).join('').trim();
  if (!text) return { error: 'empty', status: 502 };
  return { text };
}

/* ------------------------------ The answer guard ------------------------------ */
/** True if a hint names the right letter as the answer, or (in Math) states the right choice's value. */
function leaksAnswer(text, q) {
  const letter = LETTERS[q.answer];
  if (!letter) return false;
  const L = `\\(?\\b${letter}\\b\\)?(?![a-z'])`;
  const tells = [
    new RegExp(`\\b(?:[Aa]nswer|[Cc]orrect (?:choice|answer|option)|[Rr]ight (?:choice|answer|option)|[Bb]est (?:choice|answer|option))\\b[^.!?\\n]{0,20}?${L}`),
    new RegExp(`${L}[^.!?\\n]{0,25}\\b(?:is|would be|should be)\\s+(?:the\\s+)?(?:correct|right|best|answer)`),
    new RegExp(`\\b(?:[Gg]o with|[Pp]ick|[Cc]hoose|[Ss]elect)\\s+(?:choice\\s+|option\\s+)?${L}`),
  ];
  if (tells.some((pattern) => pattern.test(text))) return true;
  if (q.section !== 'math') return false;
  // In Math, also catch the right choice's value written out (e.g. "so 6x - 4 = 32").
  const plain = (s) => String(s).replace(/\\[()]/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, '').toLowerCase();
  const value = plain(q.choices?.[q.answer] ?? '');
  if (value.length < 2 || value.length > 24) return false;
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^0-9a-z.])${escaped}($|[^0-9a-z])`).test(plain(text));
}

function nextWrittenHint(q) {
  const hints = q.hints || [];
  const next = hints[Math.min(Number(q.hintsUsed) || 0, hints.length - 1)];
  return `I can't give you the answer, but here's a nudge: ${next || 'reread the last line of the question and say what it asks for.'}`;
}

/* ------------------------------ Handler ------------------------------ */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'post-only' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'no-key' });

  let userId;
  try { userId = await signedInUser(req); } catch { userId = null; }
  if (!userId) return res.status(401).json({ error: 'signin' });
  if (tooManyRequests(userId)) return res.status(429).json({ error: 'slow-down' });

  let input;
  try { input = await readBody(req); } catch { return res.status(400).json({ error: 'bad-json' }); }
  const message = clip(input.message, 1200).trim();

  let job;
  if (input.mode === 'hint' && input.question) {
    if (!message) return res.status(400).json({ error: 'empty-message' });
    job = {
      system: `${HINT_RULES}\n\n${questionContext(input.question)}`,
      turns: [...historyTurns(input.history), { role: 'user', parts: [{ text: message }] }],
      maxTokens: 600,
    };
  } else if (input.mode === 'analysis' && input.test) {
    job = {
      system: COACH_RULES,
      turns: [{ role: 'user', parts: [{ text: `${testContext(input.test)}\n\n${ANALYSIS_FORMAT}` }] }],
      maxTokens: 1200,
    };
  } else if (input.mode === 'followup' && input.test) {
    if (!message) return res.status(400).json({ error: 'empty-message' });
    job = {
      system: `${COACH_RULES}\nKeep follow-up replies under 120 words.\n\n${testContext(input.test)}\n\nYour earlier analysis:\n${clip(input.analysis, 3000)}`,
      turns: [...historyTurns(input.history), { role: 'user', parts: [{ text: message }] }],
      maxTokens: 700,
    };
  } else {
    return res.status(400).json({ error: 'unknown-mode' });
  }

  try {
    const reply = await askGemini(job);
    if (reply.error) return res.status(reply.status).json({ error: reply.error });
    let text = reply.text;
    if (input.mode === 'hint' && leaksAnswer(text, input.question)) text = nextWrittenHint(input.question);
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Tutor failed', error);
    return res.status(500).json({ error: 'server' });
  }
};
