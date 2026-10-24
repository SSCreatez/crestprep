/**
 * tests.js: Bluebook-style adaptive practice.
 *   #/tests             → choose the diagnostic or a one-section practice set
 *   #/tests/diagnostic  → Reading and Writing, then Math (Module 1 → Module 2 each)
 *   #/tests/math, /rw   → one section
 *
 * Like Bluebook: a countdown at the real test's pace, answer cross-out,
 * mark for review, a question navigator, and Desmos in Math.
 * Module 1 results decide whether Module 2 is harder or easier (lib/adaptive.js).
 */
import { createRun, routeFor, estimateSection, pickModule, TEST_KINDS, ROUTE_THRESHOLD } from '../lib/adaptive.js';
import { PACE_SECONDS } from '../lib/scoring.js';
import { getQuestion } from '../data/questions.js';
import { SECTION_LABEL } from '../data/skills.js';
import { QUESTION_TO_SKILL } from '../data/cbSkills.js';
import { addResult, recordAnswer, getState } from '../store.js';
import { navigate } from '../router.js';
import { onAction, renderMath, toast, esc } from '../lib/dom.js';
import { LETTERS, explanationHTML } from '../components/questionCard.js';
import { createToolsDrawer } from '../components/toolsDrawer.js';
import { ICONS } from '../components/icons.js';

let run = null;          // the test in progress (kept if the page re-draws)
let ticker = null;       // the countdown interval
let calculator = null;   // a Desmos-only tools drawer, reused across modules

const section = () => run.sections[run.si];
const moduleIds = () => (run.stage === 'm1' ? section().m1 : section().m2);
const currentQuestion = () => getQuestion(moduleIds()[run.qi]);
const secondsLeft = () => Math.max(0, Math.round((run.deadline - Date.now()) / 1000));
const unanswered = () => moduleIds().filter((id) => section().answers[id] === undefined).length;
const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/* ------------------------------ Test logic ----------------------------- */
function startModule() {
  run.qi = 0;
  run.navOpen = false;
  run.confirmSubmit = false;
  run.deadline = Date.now() + moduleIds().length * PACE_SECONDS[section().section] * 1000;
}

function submitModule() {
  const sec = section();
  const correct = moduleIds().filter((id) => sec.answers[id] === getQuestion(id).answer).length;
  if (run.stage === 'm1') {
    sec.m1Correct = correct;
    sec.route = routeFor(correct);                                       // the adaptive step
    sec.m2 = pickModule(sec.section, sec.route === 'harder' ? 3 : 1, sec.m1);
    run.stage = 'routing';
  } else {
    sec.m2Correct = correct;
    sec.score = estimateSection(sec.route, sec.m1Correct, correct);
    if (run.si < run.sections.length - 1) run.stage = 'break';
    else finish();
  }
}

/** Grade everything, award XP, and (for the diagnostic) save a result that builds the plan. */
function finish() {
  const all = run.sections.flatMap((sec) => [...sec.m1, ...sec.m2].map((id) => ({ sec, id })));
  const misses = {};
  let xp = 0;
  all.forEach(({ sec, id }, i) => {
    const isLast = i === all.length - 1;
    const result = recordAnswer(getQuestion(id), sec.answers[id] ?? -1, run.label, { silent: !isLast });
    xp += result.xp;
    if (!result.correct) misses[QUESTION_TO_SKILL[id]] = (misses[QUESTION_TO_SKILL[id]] || 0) + 1;
  });
  if (run.kind === 'diagnostic') {
    const [rw, math] = run.sections.map((sec) => sec.score);
    run.resultId = addResult({ source: 'diagnostic', label: run.label, scores: { rw, math, total: rw + math }, misses }).id;
  }
  run.stage = 'done';
  toast(`+${xp} XP for finishing`, 'good');
}

/* ------------------------------- Screens ------------------------------- */
function routeMapSVG(route) {
  const state = (name) => (route === name ? 'is-chosen' : route ? 'is-faded' : '');
  return `<svg class="route-map" viewBox="0 0 600 220" role="img" aria-label="Module 1 routes to a harder or easier Module 2">
    <path class="rm-path ${route === 'harder' ? 'is-chosen' : ''}" d="M190,110 C290,110 300,50 400,50"/>
    <path class="rm-path ${route === 'easier' ? 'is-chosen' : ''}" d="M190,110 C290,110 300,170 400,170"/>
    <g><rect class="rm-box rm-m1" x="20" y="80" width="170" height="60" rx="8"/>
      <text class="rm-title" x="105" y="106" text-anchor="middle">Module 1</text>
      <text class="rm-sub" x="105" y="126" text-anchor="middle">Medium questions</text></g>
    <g class="${state('harder')}"><rect class="rm-box" x="400" y="20" width="180" height="60" rx="8"/>
      <text class="rm-title" x="490" y="46" text-anchor="middle">Harder Module 2</text>
      <text class="rm-sub" x="490" y="66" text-anchor="middle">Score range up to 800</text></g>
    <g class="${state('easier')}"><rect class="rm-box" x="400" y="140" width="180" height="60" rx="8"/>
      <text class="rm-title" x="490" y="166" text-anchor="middle">Easier Module 2</text>
      <text class="rm-sub" x="490" y="186" text-anchor="middle">Score range tops out lower</text></g>
    <text class="rm-sub" x="292" y="70" text-anchor="middle">${ROUTE_THRESHOLD}+ right</text>
    <text class="rm-sub" x="292" y="162" text-anchor="middle">fewer</text>
  </svg>`;
}

function menuHTML() {
  const options = [
    ['diagnostic', 'CrestPrep diagnostic', 'Both sections, 12 questions, about 17 minutes. Builds your weak spots and your calendar.', 'btn-primary'],
    ['math', 'Math practice set', '6 questions, about 10 minutes, with Desmos.', 'btn-outline'],
    ['rw', 'Reading and Writing practice set', '6 questions, about 7 minutes.', 'btn-outline'],
  ];
  return `<div class="page"><div class="wrap-narrow">
    <header class="page-head">
      <h1>Bluebook-style practice</h1>
      <p>Short adaptive sets that work like the real test: your Module 1 results decide whether Module 2 is easier or harder. Each module is timed at the real test's pace.</p>
    </header>
    <div class="test-options">
      ${options.map(([kind, title, text, style]) => `<article class="panel test-option"><h3>${title}</h3><p>${text}</p><a class="btn ${style} btn-sm" href="#/tests/${kind}">Start</a></article>`).join('')}
    </div>
    <section class="panel">
      ${routeMapSVG(null)}
      <p class="small muted center">These sets are shorter than a full Bluebook test (98 questions). Full-length CrestPrep tests come as the question bank grows.</p>
    </section>
  </div></div>`;
}

function moduleHTML() {
  const sec = section();
  const ids = moduleIds();
  const q = currentQuestion();
  const chosen = sec.answers[q.id];
  const crossed = run.crossed[q.id] || [];
  const isMath = sec.section === 'math';
  return `
  <div class="bb ${run.calcOpen && isMath ? 'has-calc' : ''}">
    <div class="bb-top">
      <div class="bb-title"><b>${SECTION_LABEL[sec.section]}</b><span>Module ${run.stage === 'm1' ? 1 : 2}</span></div>
      <div class="bb-timer mono ${run.timerHidden ? 'is-hidden' : ''}" data-timer aria-label="Time left">${clock(secondsLeft())}</div>
      <div class="bb-tools">
        <button type="button" class="tool-btn" data-action="toggle-timer">${run.timerHidden ? 'Show timer' : 'Hide timer'}</button>
        ${isMath ? `<button type="button" class="tool-btn" data-action="toggle-calc" aria-pressed="${Boolean(run.calcOpen)}">${ICONS.calculator}<span>Calculator</span></button>` : ''}
      </div>
    </div>
    <div class="bb-body">
      <div class="bb-main">
        <div class="bb-q">
          <div class="bb-qhead">
            <span class="bb-num">${run.qi + 1}</span>
            <button type="button" class="bb-flag" data-action="mark" aria-pressed="${Boolean(run.marked[q.id])}">${run.marked[q.id] ? 'Marked for review' : 'Mark for review'}</button>
            <button type="button" class="bb-cross-toggle" data-action="toggle-cross" aria-pressed="${Boolean(run.crossMode)}" title="Cross out answer choices"><s>ABC</s></button>
          </div>
          ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
          <div class="q-stem">${q.stem}</div>
          <ol class="q-choices bb-choices">
            ${q.choices.map((choice, i) => `
              <li class="${crossed.includes(i) ? 'is-crossed' : ''}">
                <button type="button" class="choice" data-action="pick" data-choice="${i}" aria-pressed="${chosen === i}">
                  <span class="choice-letter">${LETTERS[i]}</span><span class="choice-text">${choice}</span>
                </button>
                ${run.crossMode ? `<button type="button" class="cross-btn" data-action="cross" data-choice="${i}" aria-label="${crossed.includes(i) ? 'Undo cross-out for' : 'Cross out'} ${LETTERS[i]}">${crossed.includes(i) ? 'Undo' : LETTERS[i]}</button>` : ''}
              </li>`).join('')}
          </ol>
        </div>
      </div>
      <div class="bb-calc-slot"></div>
    </div>
    <div class="bb-bottom">
      <span class="bb-name">${esc(getState().user.name)}</span>
      <div class="bb-nav-wrap">
        <button type="button" class="bb-nav-btn" data-action="nav-toggle" aria-expanded="${Boolean(run.navOpen)}">Question ${run.qi + 1} of ${ids.length}</button>
        ${run.navOpen ? `<div class="bb-nav" role="dialog" aria-label="Question navigator">
          ${ids.map((id, i) => `<button type="button" data-action="goto" data-index="${i}" class="${sec.answers[id] !== undefined ? 'is-answered' : ''} ${run.marked[id] ? 'is-marked' : ''} ${i === run.qi ? 'is-current' : ''}">${i + 1}</button>`).join('')}
          <p class="small muted">Filled: answered. Gold line: marked for review.</p>
        </div>` : ''}
      </div>
      <div class="bb-buttons">
        <button type="button" class="btn btn-outline btn-sm" data-action="back" ${run.qi === 0 ? 'disabled' : ''}>Back</button>
        ${run.qi < ids.length - 1
          ? '<button type="button" class="btn btn-primary btn-sm" data-action="next">Next</button>'
          : `<button type="button" class="btn btn-primary btn-sm" data-action="submit-module">${run.confirmSubmit ? `${unanswered()} unanswered. Submit anyway?` : 'Submit module'}</button>`}
      </div>
    </div>
  </div>`;
}

function routingHTML() {
  const sec = section();
  return `<div class="page"><div class="wrap-narrow routing center">
    <p class="lesson-kind">${SECTION_LABEL[sec.section]}: Module 1 finished</p>
    <h1>You got ${sec.m1Correct} of ${sec.m1.length} right</h1>
    ${routeMapSVG(sec.route)}
    <p>${sec.route === 'harder'
      ? 'That routes you to the harder Module 2, the only path that reaches the top of the score range.'
      : 'That routes you to the easier Module 2. On the real test, strong Module 1 accuracy is what unlocks the harder module and the higher scores.'}</p>
    <button type="button" class="btn btn-primary" data-action="start-m2">Start Module 2</button>
  </div></div>`;
}

function breakHTML() {
  const next = SECTION_LABEL[run.sections[run.si + 1].section];
  return `<div class="page"><div class="wrap-narrow routing center">
    <p class="lesson-kind">Section finished</p>
    <h1>${SECTION_LABEL[section().section]} is done</h1>
    <p>On the real test you'd get a 10-minute break here. Next up: ${next}, Module 1.</p>
    <button type="button" class="btn btn-primary" data-action="next-section">Start ${next}</button>
  </div></div>`;
}

function doneHTML() {
  const all = run.sections.flatMap((sec) => [...sec.m1, ...sec.m2].map((id) => ({ sec, id })));
  const total = run.sections.reduce((sum, sec) => sum + sec.score, 0);
  return `<div class="page"><div class="wrap-narrow test-done">
    <p class="lesson-kind">${run.label}</p>
    <h1>Finished</h1>
    ${run.sections.map((sec) => `
      <div class="score-line">
        <span><b>${SECTION_LABEL[sec.section]}</b><br><span class="small muted">${sec.route === 'harder' ? 'Harder' : 'Easier'} Module 2, ${sec.m1Correct + sec.m2Correct} of ${sec.m1.length + sec.m2.length} right</span></span>
        <span class="score-mid">${sec.score}</span>
      </div>`).join('')}
    ${run.sections.length === 2 ? `<div class="score-line"><span><b>Estimated total</b></span><span class="score-big">${total}</span></div>` : ''}
    <p class="small muted">A rough estimate from a short test. The real SAT scores 98 questions with a statistical model.</p>
    <p class="test-actions">
      ${run.resultId ? `<a class="btn btn-primary" href="#/results/${run.resultId}">See my breakdown and calendar</a>` : ''}
      <a class="btn btn-outline" href="#/tests">Back to practice</a>
    </p>
    <h2 class="h-sm">Review every question</h2>
    ${all.map(({ sec, id }, i) => {
      const q = getQuestion(id);
      const choice = sec.answers[id] ?? -1;
      return `<details class="review-item">
        <summary><span class="${choice === q.answer ? 'mark-good' : 'mark-bad'}">${choice === q.answer ? 'Correct' : 'Missed'}</span>, question ${i + 1}: ${q.pattern}</summary>
        ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
        <div class="q-stem">${q.stem}</div>
        <div class="q-result">${explanationHTML(q, choice)}</div>
      </details>`;
    }).join('')}
  </div></div>`;
}

/* ------------------------- Timer and calculator ------------------------ */
function stopTicker() { clearInterval(ticker); ticker = null; }

function startTicker(view, draw) {
  ticker = setInterval(() => {
    const el = view.querySelector('[data-timer]');
    if (!el || !document.body.contains(el)) return stopTicker();      // student left the page
    const left = secondsLeft();
    el.textContent = clock(left);
    el.classList.toggle('is-low', left <= 30);
    if (left === 0) {
      stopTicker();
      toast('Time’s up for this module', 'gold');
      submitModule();
      draw();
    }
  }, 1000);
}

function attachCalculator(view) {
  const slot = view.querySelector('.bb-calc-slot');
  if (!slot || !run.calcOpen || section().section !== 'math') return;
  if (!calculator) {
    calculator = createToolsDrawer();
    calculator.el.classList.add('calc-only');
  }
  calculator.onChange = (pane) => {
    if (pane) return;
    run.calcOpen = false;                                             // closed with the ✕ button
    view.querySelector('.bb')?.classList.remove('has-calc');
    view.querySelector('[data-action="toggle-calc"]')?.setAttribute('aria-pressed', 'false');
  };
  slot.append(calculator.el);
  calculator.setContext({ kind: 'none' });                            // no question hints during a test
  calculator.open('desmos');
}

/* ------------------------------- Render -------------------------------- */
export function render(view, { params, rerender }) {
  stopTicker();
  const kind = params[0];
  if (!kind) { view.innerHTML = menuHTML(); return; }
  if (!TEST_KINDS[kind]) { navigate('tests'); return; }
  if (!run || run.kind !== kind || (run.stage === 'done' && !rerender)) {
    run = { ...createRun(kind), crossed: {}, marked: {} };
    startModule();
  }

  const draw = () => {
    stopTicker();
    if (run.stage === 'routing') view.innerHTML = routingHTML();
    else if (run.stage === 'break') view.innerHTML = breakHTML();
    else if (run.stage === 'done') view.innerHTML = doneHTML();
    else {
      view.innerHTML = moduleHTML();
      attachCalculator(view);
      startTicker(view, draw);
    }
    renderMath(view);
  };

  onAction(view, {
    pick: (el) => {
      const q = currentQuestion();
      const choice = Number(el.dataset.choice);
      section().answers[q.id] = choice;
      run.crossed[q.id] = (run.crossed[q.id] || []).filter((c) => c !== choice);
      run.confirmSubmit = false;
      draw();
    },
    cross: (el) => {
      const q = currentQuestion();
      const choice = Number(el.dataset.choice);
      const list = run.crossed[q.id] || [];
      const crossing = !list.includes(choice);
      run.crossed[q.id] = crossing ? [...list, choice] : list.filter((c) => c !== choice);
      if (crossing && section().answers[q.id] === choice) delete section().answers[q.id];
      draw();
    },
    'toggle-cross': () => { run.crossMode = !run.crossMode; draw(); },
    mark: () => { const q = currentQuestion(); run.marked[q.id] = !run.marked[q.id]; draw(); },
    back: () => { run.qi = Math.max(0, run.qi - 1); run.navOpen = false; draw(); },
    next: () => { run.qi = Math.min(moduleIds().length - 1, run.qi + 1); run.navOpen = false; draw(); },
    goto: (el) => { run.qi = Number(el.dataset.index); run.navOpen = false; draw(); },
    'nav-toggle': () => { run.navOpen = !run.navOpen; draw(); },
    'toggle-timer': () => { run.timerHidden = !run.timerHidden; draw(); },
    'toggle-calc': () => { run.calcOpen = !run.calcOpen; draw(); },
    'submit-module': () => {
      if (unanswered() && !run.confirmSubmit) { run.confirmSubmit = true; draw(); return; }
      submitModule();
      draw();
    },
    'start-m2': () => { run.stage = 'm2'; startModule(); draw(); },
    'next-section': () => { run.si += 1; run.stage = 'm1'; startModule(); draw(); },
  });

  draw();
}
