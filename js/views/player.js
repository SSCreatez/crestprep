/**
 * player.js: the PrepPros-style split-screen course player.
 *
 *   ┌ curriculum ┬──────── stage bar: Home · tools · Previous / Complete ───────┐
 *   │ chapters   │  lesson: note guide or practice questions   │ tools drawer   │
 *   └────────────┴─────────────────────────────────────────────┴────────────────┘
 *
 * Routes:
 *   #/practice/<lessonId>  → a lesson from the course
 *   #/session/path         → a practice set built from "Your study path today"
 *   #/session/today        → today's question (bonus XP and coins)
 */
import { CONFIG } from '../config.js';
import { COURSE, LESSONS, getLesson, getChapter, lessonIndex, percentComplete, nextUnfinished } from '../data/course.js';
import { getQuestion } from '../data/questions.js';
import { SKILLS } from '../data/skills.js';
import { getState, completeLesson, setLastLesson, setToday, claimTodayBonus, recordAnswer } from '../store.js';
import { buildPracticeSet, pickTodaysQuestion } from '../lib/session.js';
import { todayISO } from '../lib/dates.js';
import { t } from '../i18n.js';
import { onAction, renderMath, toast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { questionCardHTML, wireQuestionCards, gradeCard, announce } from '../components/questionCard.js';
import { noteGuideHTML } from '../components/noteGuide.js';
import { createToolsDrawer } from '../components/toolsDrawer.js';
import { CREST, ICONS } from '../components/icons.js';

let drawer = null;        // created once, so Desmos and tutor chats survive lesson changes
let currentSet = null;    // the last practice set, kept if the page re-draws for a language change
const graded = new Map(); // question id → chosen answer on this page, restored after a re-draw

const TOOL_ICON = { desmos: ICONS.calculator, tutor: ICONS.tutor, esl: ICONS.globe };

/* ------------------------------ Sidebar ------------------------------ */
function curriculumHTML(activeId) {
  const done = getState().lessonsDone;
  const pct = percentComplete(done);
  return `
  <div class="cur-head">
    <h2>${COURSE.title}</h2>
    <div class="bar" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
    <p class="cur-pct">${pct}% complete</p>
  </div>
  ${COURSE.chapters.map((chapter) => `
    <details class="cur-chapter" open>
      <summary>${chapter.title}</summary>
      <ul class="cur-lessons">
        ${chapter.lessons.map((lesson) => `
          <li><a href="#/practice/${lesson.id}" ${lesson.id === activeId ? 'aria-current="page"' : ''}>
            <span class="status-dot ${done.includes(lesson.id) ? 'is-done' : ''}" aria-label="${done.includes(lesson.id) ? 'Completed' : 'Not completed'}"></span>
            <span class="kind-icon">${lesson.kind === 'guide' ? ICONS.guide : ICONS.practice}</span>
            <span>${lesson.title}<span class="lesson-meta">${lesson.kind === 'guide' ? `Note guide, ${lesson.minutes} min` : `${lesson.questions.length} questions`}</span></span>
          </a></li>`).join('')}
      </ul>
    </details>`).join('')}`;
}

/* ------------------------------ Stage bar ---------------------------- */
function stageBarHTML(navHTML) {
  return `
  <div class="stage-bar">
    <div class="stage-group">
      <a class="btn btn-ghost btn-sm" href="#/home">${ICONS.home}<span>${t('app.home')}</span></a>
      <button type="button" class="btn btn-ghost btn-sm only-mobile" data-action="toggle-curriculum">${ICONS.list}<span>Lessons</span></button>
    </div>
    <div class="stage-group" role="toolbar" aria-label="Lesson tools">
      ${['desmos', 'tutor', 'esl'].map((tool) => `
        <button type="button" class="tool-btn" data-action="tool" data-tool="${tool}" aria-pressed="${drawer?.isOpen() && drawer.pane === tool}">
          ${TOOL_ICON[tool]}<span>${t(`tool.${tool}`)}</span>
        </button>`).join('')}
    </div>
    <div class="stage-group">${navHTML}</div>
  </div>`;
}

/* ------------------------------ Lessons ------------------------------ */
function lessonHeader(chapter) {
  return `<header class="lesson-head">
    <p class="lesson-wordmark">${CREST}CrestPrep</p>
    <p class="lesson-course">${chapter.header}</p>
    <p class="lesson-sub">${chapter.subhead}</p>
  </header>`;
}

function lessonHTML(lesson) {
  const chapter = getChapter(lesson.chapterId);
  const s = getState();
  const body = lesson.kind === 'guide'
    ? noteGuideHTML(lesson, chapter)
    : `${s.session.style === 'rule' ? `<div class="rule-card"><strong>Rule for this set:</strong> ${lesson.rule}</div>` : ''}
       ${lesson.questions.map((id, i) => questionCardHTML(getQuestion(id), { number: i + 1, tools: true })).join('')}
       <div class="set-summary" hidden></div>`;
  return `<div class="lesson-inner">
    ${lessonHeader(chapter)}
    <p class="lesson-kind">${lesson.kind === 'guide' ? 'Written note guide' : 'Practice set'}</p>
    <h1 class="lesson-title">${lesson.title}</h1>
    ${body}
    <div class="lesson-foot">
      <span class="done-tag">${s.lessonsDone.includes(lesson.id) ? 'Completed' : ''}</span>
      <button type="button" class="btn btn-primary" data-action="complete">${t('player.next')} ›</button>
    </div>
  </div>`;
}

/* --------------------------- Custom sessions ------------------------- */
function buildSession(kind) {
  const s = getState();
  if (kind === 'today') {
    if (!s.today || s.today.date !== todayISO()) setToday(pickTodaysQuestion(s.skillStats, s.mistakes).id);
    const q = getQuestion(getState().today.qid);
    return {
      kind, questions: [q], deferred: false, source: 'Today’s question',
      title: 'Today’s question',
      intro: getState().today.claimed
        ? `From your weakest skill, ${SKILLS[q.skill].label}. You already collected today’s bonus.`
        : `From your weakest skill, ${SKILLS[q.skill].label}. Answer it for +15 bonus XP and 10 coins.`,
    };
  }
  const questions = buildPracticeSet(s.session, s.skillStats);
  return {
    kind: 'path', questions, deferred: s.session.feedback === 'end', source: 'Practice set',
    title: 'Your practice set',
    intro: `${questions.length} questions, weighted toward your weakest skills.${s.session.feedback === 'end' ? ' Answer them all, then check your answers at the end.' : ''}`,
    patterns: s.session.style === 'rule' ? [...new Set(questions.map((q) => q.pattern))] : [],
  };
}

function sessionHTML(set) {
  return `<div class="lesson-inner">
    ${lessonHeader({ header: COURSE.title, subhead: set.kind === 'today' ? CONFIG.streakQuote : 'Personal practice set' })}
    <p class="lesson-kind">${set.kind === 'today' ? 'Daily question' : 'Built for you'}</p>
    <h1 class="lesson-title">${set.title}</h1>
    <p class="muted">${set.intro}</p>
    ${set.patterns?.length ? `<div class="rule-card"><strong>Patterns in this set:</strong><ul>${set.patterns.map((p) => `<li>${p}</li>`).join('')}</ul></div>` : ''}
    ${set.questions.map((q, i) => questionCardHTML(q, { number: i + 1, mode: set.deferred ? 'select' : 'learn', tools: true })).join('')}
    ${set.deferred ? '<p style="margin-top:1.25rem"><button type="button" class="btn btn-primary" data-action="check-set">Check my answers</button></p>' : ''}
    <div class="set-summary" hidden></div>
  </div>`;
}

/* ------------------------------- Render ------------------------------ */
export function render(view, { name, params, rerender }) {
  if (!drawer) drawer = createToolsDrawer();
  const isSession = name === 'session';
  const s = getState();

  let lesson = null;
  let set = null;
  let navHTML;
  if (isSession) {
    if (!rerender || !currentSet || currentSet.kind !== (params[0] === 'today' ? 'today' : 'path')) {
      currentSet = buildSession(params[0] === 'today' ? 'today' : 'path');
    }
    set = currentSet;
    navHTML = set.kind === 'path'
      ? `<button type="button" class="btn btn-outline btn-sm" data-action="new-set">New set</button><a class="btn btn-primary btn-sm" href="#/home">Done</a>`
      : `<a class="btn btn-primary btn-sm" href="#/home">Back to dashboard</a>`;
  } else {
    lesson = getLesson(params[0]) || getLesson(s.lastLesson) || nextUnfinished(s.lessonsDone);
    setLastLesson(lesson.id);
    const prev = LESSONS[lessonIndex(lesson.id) - 1];
    navHTML = `${prev
      ? `<a class="btn btn-outline btn-sm" href="#/practice/${prev.id}">‹ ${t('player.prev')}</a>`
      : `<span class="btn btn-outline btn-sm" aria-disabled="true">‹ ${t('player.prev')}</span>`}
      <button type="button" class="btn btn-primary btn-sm" data-action="complete">${t('player.next')} ›</button>`;
  }

  view.innerHTML = `
  <div class="player ${drawer.isOpen() ? 'has-drawer' : ''}">
    <aside class="curriculum" aria-label="Course lessons">${curriculumHTML(lesson?.id)}</aside>
    <section class="stage">
      ${stageBarHTML(navHTML)}
      <div class="stage-body">
        <article class="lesson" id="lesson">${isSession ? sessionHTML(set) : lessonHTML(lesson)}</article>
        <div class="drawer-slot"></div>
      </div>
    </section>
  </div>`;

  const playerEl = view.querySelector('.player');
  const lessonEl = view.querySelector('#lesson');

  // A language change re-draws the page; put back any answers already graded here.
  if (!rerender) graded.clear();
  lessonEl.querySelectorAll('.q-card').forEach((card) => {
    if (!graded.has(card.dataset.qid)) return;
    const q = getQuestion(card.dataset.qid);
    const choice = graded.get(q.id);
    card.dataset.answered = choice === q.answer ? 'right' : 'wrong';
    gradeCard(card, q, choice, { saved: choice !== q.answer });
  });
  view.querySelector('.drawer-slot').append(drawer.el);
  drawer.refresh();

  // Keep the stage-bar buttons and layout in sync with the drawer.
  drawer.onChange = (pane) => {
    playerEl.classList.toggle('has-drawer', Boolean(pane));
    view.querySelectorAll('.stage-bar .tool-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tool === pane)));
  };
  drawer.onChange(drawer.isOpen() ? drawer.pane : null);

  // Tell the tools which question (or lesson) the student is looking at.
  const contextFromCard = (card) => ({ kind: 'question', q: getQuestion(card.dataset.qid), number: Number(card.dataset.number) });
  const keptCard = rerender && drawer.questionId ? lessonEl.querySelector(`.q-card[data-qid="${drawer.questionId}"]`) : null;
  const firstCard = keptCard || lessonEl.querySelector('.q-card');
  drawer.setContext(firstCard ? contextFromCard(firstCard) : { kind: 'lesson', lesson });
  lessonEl.addEventListener('click', (event) => {
    const card = event.target.closest('.q-card');
    if (card) drawer.setContext(contextFromCard(card));
  });

  // After every question is graded, show a short summary.
  const showSummaryIfDone = () => {
    const cards = [...lessonEl.querySelectorAll('.q-card')];
    if (!cards.length || cards.some((c) => !c.dataset.locked)) return;
    const right = cards.filter((c) => c.dataset.answered === 'right').length;
    const missed = cards.length - right;
    const summary = lessonEl.querySelector('.set-summary');
    summary.hidden = false;
    summary.innerHTML = `<p><strong>You got ${right} of ${cards.length} right.</strong> ${missed ? 'Read the explanation for each one you missed.' : 'Clean set.'}</p>
      ${isSession
        ? `<button type="button" class="btn btn-primary btn-sm" data-action="new-set">Build another set</button> <a class="btn btn-outline btn-sm" href="#/home">Back to dashboard</a>`
        : `<button type="button" class="btn btn-primary btn-sm" data-action="complete">${t('player.next')} ›</button>`}`;
  };

  const source = isSession ? set.source : `Lesson: ${lesson.title}`;
  wireQuestionCards(lessonEl, {
    source,
    onAnswer: (q, choice, card, result) => {
      if (!result) return;                                   // 'select' mode: graded later
      graded.set(q.id, choice);
      card.dataset.answered = result.correct ? 'right' : 'wrong';
      if (set?.kind === 'today') {
        const bonus = claimTodayBonus();
        if (bonus) setTimeout(() => toast(`Daily bonus: +${bonus.xp} XP and ${bonus.coins} coins`, 'gold'), 700);
      }
      showSummaryIfDone();
    },
  });

  onAction(view, {
    tool: (el) => {
      const card = el.closest('.q-card');
      if (card) { drawer.setContext(contextFromCard(card)); drawer.open(el.dataset.tool); }
      else drawer.toggle(el.dataset.tool);
    },
    complete: () => {
      const result = completeLesson(lesson.id);
      if (result) announce(result);
      const next = LESSONS[lessonIndex(lesson.id) + 1];
      if (next) navigate(`practice/${next.id}`);
      else { toast('You finished every lesson in the course!', 'gold'); navigate('home'); }
    },
    'check-set': (el) => {
      let xp = 0;
      let levelUp = null;
      lessonEl.querySelectorAll('.q-card').forEach((card) => {
        const q = getQuestion(card.dataset.qid);
        const choice = card.dataset.selected === undefined ? -1 : Number(card.dataset.selected);
        const result = recordAnswer(q, choice, set.source);
        graded.set(q.id, choice);
        xp += result.xp;
        levelUp = levelUp || result.levelUp;
        card.dataset.answered = result.correct ? 'right' : 'wrong';
        gradeCard(card, q, choice, { saved: result.savedToReview });
      });
      el.remove();
      announce({ xp, levelUp });
      showSummaryIfDone();
    },
    'new-set': () => {
      currentSet = buildSession('path');
      set = currentSet;
      graded.clear();
      lessonEl.innerHTML = sessionHTML(set);
      renderMath(lessonEl);
      const first = lessonEl.querySelector('.q-card');
      if (first) drawer.setContext(contextFromCard(first));
      lessonEl.scrollTop = 0;
    },
    'toggle-curriculum': () => playerEl.classList.toggle('show-curriculum'),
  });

  showSummaryIfDone();

  // On phones the sidebar is a slide-over; close it after picking a lesson.
  view.querySelector('.curriculum').addEventListener('click', (event) => {
    if (event.target.closest('a')) playerEl.classList.remove('show-curriculum');
  });
}
