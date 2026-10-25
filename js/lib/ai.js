/**
 * ai.js: how the website talks to the Gemini tutor (api/tutor.js on Vercel).
 *
 *   askAI('hint', { question, message, history })   → coach one practice question
 *   askAI('analysis', { test })                      → explain a Bluebook upload
 *   askAI('followup', { test, analysis, message, history })
 *
 * The browser sends the student's sign-in token, never a Gemini key. If the AI
 * can't answer (signed out, offline, out of free requests), askAI throws an
 * AiError whose message is written for students, and every caller falls back
 * to CrestPrep's written hints, so nothing breaks without AI.
 */
import { CONFIG } from '../config.js';
import { getAccessToken } from '../auth.js';
import { esc } from './dom.js';

export const AI_LABEL = 'AI tutor, powered by Google Gemini';

const REASONS = {
  signin: 'Sign in with Google to use the AI tutor.',
  local: 'The AI tutor runs on the live site (crestprep.com), so here you get the written hints.',
  quota: 'The AI tutor is out of free requests for today. The written hints still work.',
  'slow-down': 'That’s a lot of questions in a few minutes! Give the AI tutor a minute, then try again.',
  'no-key': 'The AI tutor isn’t switched on yet (the Gemini key is missing on the server).',
  offline: 'Couldn’t reach the AI tutor. Check your connection and try again.',
  other: 'The AI tutor couldn’t answer just now. Try again in a moment.',
};

export class AiError extends Error {
  constructor(reason) {
    super(REASONS[reason] || REASONS.other);
    this.reason = reason;
  }
}

export async function askAI(mode, payload, { timeoutMs = 30000 } = {}) {
  if (CONFIG.previewMode) throw new AiError('local');   // the hosted preview has no server
  const token = await getAccessToken();
  if (!token) throw new AiError('signin');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mode, ...payload }),
      signal: controller.signal,
    });
  } catch {
    throw new AiError('offline');
  } finally {
    clearTimeout(timer);
  }

  // A local test server (python -m http.server) has no /api folder to run.
  if ([404, 405, 501].includes(res.status)) throw new AiError('local');
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.text) throw new AiError(data.error === 'gemini' ? 'other' : data.error || 'other');
  return data.text;
}

/**
 * Turn the AI's plain-text reply into safe HTML: everything is escaped first,
 * then **bold**, *italics*, "- " bullets, "1. " steps, and paragraphs.
 * Math written as \( ... \) is left alone for KaTeX.
 */
export function formatAI(text) {
  const inline = (line) => esc(line)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>');
  const blocks = [];
  let list = null;
  for (const raw of String(text).split('\n')) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)/);
    const step = line.match(/^\d+[.)]\s+(.*)/);
    if (bullet || step) {
      const tag = bullet ? 'ul' : 'ol';
      if (!list || list.tag !== tag) { list = { tag, items: [] }; blocks.push(list); }
      list.items.push(inline((bullet || step)[1]));
      continue;
    }
    list = null;
    if (!line) continue;
    const heading = line.match(/^#{1,4}\s+(.*)/);
    blocks.push(heading ? `<p><strong>${inline(heading[1])}</strong></p>` : `<p>${inline(line)}</p>`);
  }
  return blocks.map((b) => (typeof b === 'string' ? b : `<${b.tag}>${b.items.map((i) => `<li>${i}</li>`).join('')}</${b.tag}>`)).join('');
}
