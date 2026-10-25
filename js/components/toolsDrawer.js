/**
 * toolsDrawer.js: the panel that slides in beside a lesson.
 *   Desmos   → real graphing calculator; can load the current question's equations
 *   Tutor    → typed questions go to the Gemini AI tutor (lib/ai.js), quick buttons
 *              and any AI hiccup use the written hints (lib/tutor.js)
 *   Language → plain-English version + translated key words (data/glossary.js)
 *
 * The drawer is created ONCE and re-attached on every lesson, so the Desmos
 * calculator and tutor chats survive moving between lessons.
 */
import { CONFIG } from '../config.js';
import { getState, setPref } from '../store.js';
import { t, LANGUAGES } from '../i18n.js';
import { esc, loadScript, renderMath } from '../lib/dom.js';
import { createTutor } from '../lib/tutor.js';
import { askAI, formatAI, AI_LABEL } from '../lib/ai.js';
import { SKILLS } from '../data/skills.js';
import { findTerms } from '../data/glossary.js';
import { guideText } from './noteGuide.js';

const PANES = ['desmos', 'tutor', 'esl'];
const TAB_LABEL = { desmos: 'tool.desmos', tutor: 'tool.tutor', esl: 'tool.esl' };
const QUICK = [
  ['hint', 'Give me a hint'],
  ['pattern', 'What kind of question is this?'],
  ['words', 'What do these words mean?'],
  ['desmos', 'Can Desmos help?'],
];

/** Text without HTML tags (questions use a little HTML, like <br> and <strong>). */
function plainText(html) {
  const div = document.createElement('div');
  div.innerHTML = String(html ?? '').replace(/<br\s*\/?>/gi, '\n');
  return div.textContent.trim();
}

/** What the AI tutor gets to see: the question, the creator's hints and notes, and the answer (for the server's leak check only). */
function questionForAI(q, hintsUsed) {
  return {
    section: q.section,
    skill: SKILLS[q.skill]?.label,
    pattern: q.pattern,
    passage: plainText(q.passage),
    stem: plainText(q.stem),
    choices: q.choices.map(plainText),
    hints: q.hints.map(plainText),
    trap: plainText(q.trap),
    steps: q.steps.map(plainText),
    answer: q.answer,
    hintsUsed,
  };
}

export function createToolsDrawer() {
  const el = document.createElement('aside');
  el.className = 'drawer';
  el.hidden = true;
  el.setAttribute('aria-label', 'Lesson tools');
  el.innerHTML = `
    <div class="drawer-head">
      <div class="drawer-tabs" role="tablist">
        ${PANES.map((p) => `<button type="button" role="tab" data-pane-tab="${p}"></button>`).join('')}
      </div>
      <button type="button" class="drawer-close" data-drawer-close aria-label="Close tools">✕</button>
    </div>
    <p class="drawer-context"></p>
    <section class="pane" data-pane="desmos" hidden>
      <div class="desmos-host"><p class="muted">Loading Desmos…</p></div>
      <div class="desmos-bar"></div>
    </section>
    <section class="pane" data-pane="tutor" hidden>
      <div class="chat" role="log" aria-live="polite"></div>
      <div class="chat-quick"></div>
      <form class="chat-form">
        <label class="sr-only" for="chat-input">Message the tutor</label>
        <input id="chat-input" class="input" autocomplete="off" placeholder="Ask about this question…">
        <button class="btn btn-primary btn-sm">Send</button>
      </form>
      <p class="chat-note small muted">${AI_LABEL}. It coaches with hints and won’t give you the answer. The buttons use CrestPrep’s written hints.</p>
    </section>
    <section class="pane" data-pane="esl" hidden></section>`;

  const tutor = createTutor();
  const chats = new Map();            // question id → [{ from, html, text }]
  let lastProblem = null;             // why the AI couldn't answer last time (said once, not every message)
  let pane = null;                    // which tab is open (null = closed)
  let ctx = { kind: 'none' };         // { kind: 'question', q, number } or { kind: 'lesson', lesson }
  let calculator = null;              // Desmos instance once loaded

  const $ = (selector) => el.querySelector(selector);
  const api = { el, open, close, toggle, setContext, refresh, isOpen: () => Boolean(pane), onChange: () => {} };

  /* ---------- Open / close ---------- */
  function open(name) {
    pane = name;
    el.hidden = false;
    el.querySelectorAll('[data-pane]').forEach((section) => { section.hidden = section.dataset.pane !== name; });
    el.querySelectorAll('[data-pane-tab]').forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.paneTab === name)));
    if (name === 'desmos') mountDesmos();
    if (name === 'tutor') { renderChat(); $('#chat-input').focus({ preventScroll: true }); }
    if (name === 'esl') renderEsl();
    api.onChange(pane);
  }
  function close() { pane = null; el.hidden = true; api.onChange(null); }
  function toggle(name) { if (pane === name) close(); else open(name); }

  /* ---------- Context: which question or lesson the tools are helping with ---------- */
  function setContext(next) {
    ctx = next;
    renderContextLine();
    renderDesmosBar();
    if (pane === 'tutor') renderChat();
    if (pane === 'esl') renderEsl();
  }

  function renderContextLine() {
    const line = $('.drawer-context');
    if (ctx.kind === 'question') line.textContent = `Helping with Question ${ctx.number}: ${ctx.q.pattern}`;
    else if (ctx.kind === 'lesson') line.textContent = `Helping with: ${ctx.lesson.title}`;
    else line.textContent = 'Open a lesson to get help with it.';
  }

  /* ---------- Desmos ---------- */
  async function mountDesmos() {
    const host = $('.desmos-host');
    if (calculator || host.dataset.state) return;
    if (CONFIG.previewMode) {
      host.dataset.state = 'preview';
      host.innerHTML = '<p class="muted">The live Desmos calculator runs on the full site (crestprep.com). This preview link can’t load outside tools.</p>';
      renderDesmosBar();
      return;
    }
    host.dataset.state = 'loading';
    try {
      await loadScript(`https://www.desmos.com/api/v1.9/calculator.js?apiKey=${CONFIG.desmosApiKey}`);
      host.innerHTML = '';
      calculator = window.Desmos.GraphingCalculator(host, { settingsMenu: false, border: false, expressionsCollapsed: false });
      host.dataset.state = 'ready';
    } catch {
      // If the API is blocked (school network, offline), fall back to the public Desmos page.
      host.dataset.state = 'iframe';
      host.innerHTML = `<iframe title="Desmos graphing calculator" src="https://www.desmos.com/calculator" loading="lazy"></iframe>`;
    }
    renderDesmosBar();
  }

  function renderDesmosBar() {
    const bar = $('.desmos-bar');
    const q = ctx.kind === 'question' ? ctx.q : null;
    if (!q) { bar.innerHTML = '<p class="muted small">Graph anything here. On a question, this panel can load its equations for you.</p>'; return; }
    if (q.section !== 'math') { bar.innerHTML = '<p class="muted small">Desmos is for the Math section. This is a Reading & Writing question.</p>'; return; }
    if (!q.desmos) { bar.innerHTML = `<p class="small"><strong>Tip:</strong> ${q.desmosTip}</p>`; renderMath(bar); return; }
    const host = $('.desmos-host');
    bar.innerHTML = ['iframe', 'preview'].includes(host.dataset.state)
      ? `<p class="small"><strong>Type these into Desmos:</strong> ${q.desmos.map((e) => `<code>${esc(e)}</code>`).join(' ')}</p><p class="small">${q.desmosTip}</p>`
      : `<button type="button" class="btn btn-primary btn-sm" data-load-graph>Load this question's graph</button><p class="small" style="margin:.5rem 0 0">${q.desmosTip}</p>`;
    renderMath(bar);
  }

  function loadGraph() {
    if (!calculator || ctx.kind !== 'question' || !ctx.q.desmos) return;
    calculator.setBlank();
    ctx.q.desmos.forEach((latex, i) => calculator.setExpression({ id: `q${i}`, latex }));
  }

  /* ---------- Tutor chat ---------- */
  function chatFor(q) {
    if (!chats.has(q.id)) {
      const html = tutor.greet(q, ctx.number);
      chats.set(q.id, [{ from: 'tutor', html, text: plainText(html) }]);
    }
    return chats.get(q.id);
  }

  function renderChat() {
    const log = $('.chat');
    const quick = $('.chat-quick');
    const form = $('.chat-form');
    if (ctx.kind !== 'question') {
      log.innerHTML = `<div class="msg msg-tutor">${ctx.kind === 'lesson'
        ? 'This lesson is a note guide. Read it through, then open the practice set that follows; I can coach you through each question there.'
        : 'Open a practice question and I’ll coach you through it.'}</div>`;
      quick.innerHTML = '';
      form.hidden = true;
      return;
    }
    form.hidden = false;
    log.innerHTML = chatFor(ctx.q).map((m) => `<div class="msg msg-${m.from}${m.pending ? ' msg-pending' : ''}">${m.html}</div>`).join('');
    quick.innerHTML = QUICK.filter(([intent]) => intent !== 'desmos' || ctx.q.section === 'math')
      .map(([intent, label]) => `<button type="button" class="btn btn-outline btn-sm" data-quick="${intent}">${label}</button>`).join('');
    renderMath(log);
    log.lastElementChild?.scrollIntoView({ block: 'nearest' });
  }

  /**
   * Quick buttons get a written hint right away. Typed questions go to the
   * Gemini AI tutor; if it can't answer, the written hints step in.
   */
  async function send(text, intent) {
    if (ctx.kind !== 'question' || !text.trim()) return;
    const q = ctx.q;
    const chat = chatFor(q);
    const earlier = chat.slice(-8).map((m) => ({ from: m.from, text: m.text }));
    chat.push({ from: 'you', html: esc(text), text });
    if (intent) {
      const html = tutor.respond(q, text, intent);
      chat.push({ from: 'tutor', html, text: plainText(html) });
      renderChat();
      return;
    }
    const reply = { from: 'tutor', html: '<span class="msg-label">AI tutor</span>Thinking…', text: '', pending: true };
    chat.push(reply);
    renderChat();
    try {
      const answer = await askAI('hint', { question: questionForAI(q, tutor.hintsUsed(q.id)), message: text, history: earlier });
      Object.assign(reply, { html: `<span class="msg-label">AI tutor</span>${formatAI(answer)}`, text: answer, pending: false });
      lastProblem = null;
    } catch (error) {
      const html = tutor.respond(q, text);
      const note = error.reason !== lastProblem ? `<span class="msg-note">${esc(error.message)}</span>` : '';
      lastProblem = error.reason;
      Object.assign(reply, { html: `${html}${note}`, text: plainText(html), pending: false });
    }
    if (pane === 'tutor' && ctx.kind === 'question' && ctx.q.id === q.id) renderChat();
  }

  /* ---------- Language helper ---------- */
  function renderEsl() {
    const lang = getState().prefs.lang;
    const q = ctx.kind === 'question' ? ctx.q : null;
    const text = q ? [q.passage, q.stem, ...q.choices].join(' ') : ctx.kind === 'lesson' ? guideText(ctx.lesson) : '';
    const terms = findTerms(text);
    $('[data-pane="esl"]').innerHTML = `
      <label class="field">Your language
        <select class="input" data-esl-lang>
          ${LANGUAGES.map((l) => `<option value="${l.code}" ${l.code === lang ? 'selected' : ''}>${l.label}</option>`).join('')}
        </select>
      </label>
      <p class="esl-note">${t('esl.hint')}</p>
      ${q ? `<h4>${t('esl.plain')}</h4><p class="esl-plain">${q.plain}</p>` : ''}
      <h4>${t('esl.words')}</h4>
      ${terms.length
        ? `<dl class="gloss">${terms.map((term) => `<div class="gloss-row"><dt>${term.word}</dt><dd>${term.def}${lang !== 'en' ? `<span class="gloss-tr" lang="${lang}">${term[lang]}</span>` : ''}</dd></div>`).join('')}</dl>`
        : `<p class="muted small">${ctx.kind === 'none' ? 'Open a lesson or question to see its key words.' : 'No tricky words found here.'}</p>`}`;
  }

  /* ---------- Re-translate labels after a language change ---------- */
  function refresh() {
    el.querySelectorAll('[data-pane-tab]').forEach((tab) => { tab.textContent = t(TAB_LABEL[tab.dataset.paneTab]); });
    renderContextLine();
    if (pane === 'esl') renderEsl();
  }

  /* ---------- One set of listeners for the whole drawer ---------- */
  el.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-pane-tab]');
    if (tab) return open(tab.dataset.paneTab);
    if (event.target.closest('[data-drawer-close]')) return close();
    if (event.target.closest('[data-load-graph]')) return loadGraph();
    const quick = event.target.closest('[data-quick]');
    if (quick) send(quick.textContent, quick.dataset.quick);
  });
  el.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('#chat-input');
    send(input.value);
    input.value = '';
  });
  el.addEventListener('change', (event) => {
    if (event.target.matches('[data-esl-lang]')) setPref('lang', event.target.value);
  });

  Object.defineProperty(api, 'pane', { get: () => pane });
  Object.defineProperty(api, 'questionId', { get: () => (ctx.kind === 'question' ? ctx.q.id : null) });
  refresh();
  return api;
}
