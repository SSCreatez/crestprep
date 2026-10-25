/**
 * aiCoach.js: "Gemini's take on this test" on a breakdown page.
 *
 *  1. The student presses "Analyze this test with Gemini".
 *  2. testPayload() packs up everything CrestPrep knows about the test: scores,
 *     the score report's bars, misses by skill with their Question Bank filters,
 *     and the error log. The server (api/tutor.js) adds the coaching rules.
 *  3. The analysis is saved with the test in the Crest Cache, so it's there next time.
 *  4. Follow-up questions get hint-style answers, saved the same way.
 */
import { getState, updateResult, getResult } from '../store.js';
import { analyzeResult } from '../lib/bluebookAnalyzer.js';
import { getDomain, getSkill } from '../data/cbSkills.js';
import { askAI, formatAI, AI_LABEL } from '../lib/ai.js';
import { rowHasContent, reasonLabel } from './errorLog.js';
import { esc, renderMath } from '../lib/dom.js';

/** Everything Gemini needs to know about one test. */
export function testPayload(result) {
  const { weakSpots } = analyzeResult(result);
  const goal = getState().goal;
  return {
    label: result.label,
    date: result.date,
    scores: result.scores || null,
    report: result.report ? {
      correct: result.report.correct || null,
      missed: result.report.missed || null,
      questions: { rw: 54, math: 44 },
      bands: Object.entries(result.report.bands || {}).map(([key, band]) => ({ domain: getDomain(key)?.label || key, filled: band.filled, of: band.of })),
    } : null,
    goal: goal ? { target: goal.target, date: goal.date } : null,
    misses: weakSpots.map((spot) => ({
      skill: spot.skill.name,
      domain: getDomain(spot.skill.domain).label,
      section: spot.skill.section,
      count: spot.misses,
      filter: spot.recs.questionBank.join(' → '),
    })),
    errorLog: (result.errorLog || []).filter(rowHasContent).map((row) => ({
      section: row.section, module: row.module, number: row.number,
      skill: getSkill(row.skill)?.name || '', mine: row.mine, correct: row.correct,
      reason: reasonLabel(row.reason), note: row.note, text: row.text,
    })),
    errorLogText: result.errorLogPdf?.text || '',
  };
}

function chatHTML(result) {
  const chat = result.aiChat || [];
  return chat.map((m) => `<div class="msg msg-${m.from === 'you' ? 'you' : 'tutor'}">${m.from === 'you' ? esc(m.text) : `<span class="msg-label">Gemini</span>${formatAI(m.text)}`}</div>`).join('');
}

function bodyHTML(result) {
  return result.ai?.analysis
    ? `<div class="ai-text">${formatAI(result.ai.analysis)}</div>`
    : `<p class="muted">Gemini reads your scores, the bars from your score report, your misses by skill, and your error log, then tells you what actually happened on this test and what to do next.</p>`;
}

export function aiCoachHTML(result) {
  const has = Boolean(result.ai?.analysis);
  return `
  <section class="panel ai-coach" data-ai-coach data-result="${result.id}" aria-labelledby="ai-title">
    <div class="panel-title">
      <h2 class="h-sm" id="ai-title">Gemini’s take on this test</h2>
      <span class="ai-chip">AI tutor</span>
    </div>
    <div data-ai-body>${bodyHTML(result)}</div>
    <div class="ai-actions">
      <button type="button" class="btn ${has ? 'btn-outline' : 'btn-primary'} btn-sm" data-action="ai-analyze">${has ? 'Analyze again' : 'Analyze this test with Gemini'}</button>
      <p class="ai-status small" role="status" aria-live="polite" data-ai-status></p>
    </div>
    <div class="ai-chat">
      <h3 class="h-xs">Ask a follow-up</h3>
      <div class="chat" data-ai-log>${chatHTML(result)}</div>
      <form class="chat-form" data-ai-form>
        <label class="sr-only" for="ai-input">Ask Gemini about this test</label>
        <input id="ai-input" class="input" name="question" autocomplete="off" maxlength="600" placeholder="e.g. Why do I keep missing transitions?">
        <button class="btn btn-primary btn-sm">Ask</button>
      </form>
    </div>
    <p class="small muted ai-note">${AI_LABEL}. It coaches with hints instead of answers and can make mistakes, so check it against the explanations.</p>
  </section>`;
}

/** One listener set for the panel. `root` is the page; the panel can be re-drawn inside it. */
export function wireAiCoach(root) {
  const panel = () => root.querySelector('[data-ai-coach]');
  const current = () => getResult(panel()?.dataset.result);
  const status = (text, kind = '') => {
    const el = panel()?.querySelector('[data-ai-status]');
    if (el) { el.textContent = text; el.dataset.kind = kind; }
  };
  const busy = (on) => panel()?.querySelectorAll('button').forEach((b) => { b.disabled = on; });

  async function analyze() {
    const result = current();
    if (!result) return;
    busy(true);
    status('Gemini is reading your test…', 'busy');
    try {
      const text = await askAI('analysis', { test: testPayload(result) });
      updateResult(result.id, { ai: { analysis: text, at: Date.now() } });
      const body = panel().querySelector('[data-ai-body]');
      body.innerHTML = bodyHTML(current());
      renderMath(body);
      const button = panel().querySelector('[data-action="ai-analyze"]');
      button.textContent = 'Analyze again';
      button.classList.replace('btn-primary', 'btn-outline');
      status('');
    } catch (error) {
      status(error.message, 'error');
    } finally {
      busy(false);
    }
  }

  async function followUp(question) {
    const result = current();
    if (!result || !question.trim()) return;
    const chat = [...(result.aiChat || []), { from: 'you', text: question.trim() }];
    const log = panel().querySelector('[data-ai-log]');
    log.innerHTML = `${chatHTML({ aiChat: chat })}<div class="msg msg-tutor msg-pending">Gemini is thinking…</div>`;
    busy(true);
    status('');
    try {
      const text = await askAI('followup', {
        test: testPayload(result),
        analysis: result.ai?.analysis || '',
        message: question.trim(),
        history: (result.aiChat || []).slice(-8),
      });
      chat.push({ from: 'gemini', text });
      updateResult(result.id, { aiChat: chat.slice(-30) });
      log.innerHTML = chatHTML(current());
      renderMath(log);
    } catch (error) {
      log.innerHTML = chatHTML(result);
      status(error.message, 'error');
      panel().querySelector('#ai-input').value = question;
    } finally {
      busy(false);
      log.lastElementChild?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  root.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="ai-analyze"]')) analyze();
    const ask = event.target.closest('[data-action="ai-ask"]');
    if (ask) {
      const input = panel()?.querySelector('#ai-input');
      if (!input) return;
      input.value = ask.dataset.question;
      panel().scrollIntoView({ behavior: 'smooth', block: 'start' });
      input.focus({ preventScroll: true });
    }
  });
  root.addEventListener('submit', (event) => {
    if (!event.target.matches('[data-ai-form]')) return;
    event.preventDefault();
    const input = event.target.querySelector('input');
    const question = input.value;
    input.value = '';
    followUp(question);
  });
}
