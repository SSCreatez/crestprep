/**
 * dashboard.js: what a student sees after signing in.
 *
 * One decision drives the whole screen (see render below):
 *   - First-time student (no results yet) → choose how to start: add a
 *     Bluebook practice test in Crest Ingest or take the diagnostic, then set a goal.
 *   - Returning student → the study calendar, front and center, built from
 *     their newest test, plus their Crest Cache and today's bonus question.
 */
import { CONFIG } from '../config.js';
import { getState, isReturningStudent, setGoal, togglePlan, dailyXp, loginDemo, resetProgress, setToday } from '../store.js';
import { levelProgress } from '../lib/scoring.js';
import { analyzeResult } from '../lib/bluebookAnalyzer.js';
import { buildCalendar, taskKey } from '../lib/calendarGenerator.js';
import { formatDate, daysBetween, todayISO } from '../lib/dates.js';
import { onAction, esc, toast, renderMath } from '../lib/dom.js';
import { pickTodaysQuestion } from '../lib/session.js';
import { getQuestion } from '../data/questions.js';
import { SKILLS } from '../data/skills.js';
import { goalFormHTML, readGoal } from '../components/goalForm.js';
import { rowHasContent } from '../components/errorLog.js';
import { ICONS } from '../components/icons.js';

let editingGoal = false;
let selectedDate = null;   // a day picked in "The next 7 days" (null = today)

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
}

/** Destructive buttons need two clicks; the first one asks "Click again to confirm". */
function armed(button) {
  if (button.dataset.armed) return true;
  button.dataset.armed = 'true';
  const label = button.textContent;
  button.textContent = 'Click again to confirm';
  setTimeout(() => { delete button.dataset.armed; button.textContent = label; }, 4000);
  return false;
}

function footer(s) {
  return `<div class="dash-foot">
    <span>${s.user.provider === 'demo' ? 'Demo account with sample results.' : 'Signed in with Google. Progress saves in this browser.'}</span>
    <span>
      ${s.user.provider === 'demo' ? '<button type="button" class="link-btn" data-action="reload-demo">Reload demo data</button> · ' : ''}
      <button type="button" class="link-btn" data-action="reset-progress">Start over as a new student</button>
    </span>
  </div>`;
}

/* ------------------------- First-time student ------------------------- */
function firstTimeDashboard(s) {
  const goalBlock = s.goal && !editingGoal
    ? `<p class="goal-summary"><b class="mono">${s.goal.target}</b> by ${formatDate(s.goal.date, { month: 'long', day: 'numeric', year: 'numeric' })}
         <span class="muted">(${daysBetween(todayISO(), s.goal.date)} days)</span>
         <button type="button" class="btn btn-ghost btn-sm" data-action="edit-goal">Edit</button></p>`
    : goalFormHTML(s.goal);
  return `
  <div class="page"><div class="wrap-narrow dash">
    <header class="page-head">
      <h1>${greeting()}, ${esc(s.user.name)}!</h1>
      <p>Let's find out what to work on. Pick one way to start; either one builds your weak-spot list and your study calendar.</p>
    </header>
    <div class="start-grid">
      <a class="start-card" href="#/upload">
        <span class="row-icon">${ICONS.upload}</span>
        <h2>Add a Bluebook practice test</h2>
        <p>Already took one? Upload the score report, mark what you missed, and get a breakdown with resources for every weak spot.</p>
        <span class="btn btn-primary">Open Crest Ingest</span>
      </a>
      <a class="start-card" href="#/tests/diagnostic">
        <span class="row-icon">${ICONS.target}</span>
        <h2>Take our adaptive diagnostic</h2>
        <p>No Bluebook test yet? A short test that adapts from Module 1 to Module 2, like the real one. About 17 minutes.</p>
        <span class="btn btn-outline">Start the diagnostic</span>
      </a>
    </div>
    <section class="panel" data-goal-panel>
      <h2 class="h-sm">Goal score and test date</h2>
      <p class="muted small">Your calendar counts down to this date. Leave the current score blank if you don't know it yet.</p>
      ${goalBlock}
    </section>
    ${footer(s)}
  </div></div>`;
}

/* -------------------------- Returning student ------------------------- */
const LINK_LABEL = { lesson: 'Open lesson' };

/** One task. Lessons and practice sets check themselves off once finished in the course. */
function taskHTML(task, key, s) {
  const finished = Boolean(task.lessonId && s.lessonsDone.includes(task.lessonId));
  const link = task.href
    ? `<a href="${task.href}" ${task.external ? 'target="_blank" rel="noopener"' : ''}>${task.external ? 'Open Question Bank' : LINK_LABEL[task.kind] || 'Open'}</a>`
    : '';
  return `<li class="task task-${task.kind}">
    <label>
      <input type="checkbox" data-action="task-check" data-key="${key}" ${finished || s.planChecks[key] ? 'checked' : ''} ${finished ? 'disabled title="Finished in the course"' : ''}>
      <span class="task-title">${esc(task.title)}${task.detail ? `<span class="task-detail">${esc(task.detail)}</span>` : ''}${finished ? '<span class="task-detail">done in the course!</span>' : ''}</span>
    </label>
    <span class="task-side">${task.minutes ? `<b class="mono">${task.minutes} min</b>` : ''}${link}</span>
  </li>`;
}

function shortLabel(task) {
  const text = task.short || task.title.split(':')[0];
  return text.length > 26 ? `${text.slice(0, 24)}…` : text;
}

function cachePanel(s) {
  return `<section class="panel cache-card">
    <h2 class="h-sm">Crest Cache</h2>
    <p class="small muted">${s.results.length} test${s.results.length === 1 ? '' : 's'} saved, with breakdowns and error logs.</p>
    <ul class="cache-mini">
      ${s.results.slice(0, 3).map((r) => `<li><a href="#/results/${r.id}">${esc(r.label)}</a><span class="mono">${r.scores?.total ?? '–'}</span></li>`).join('')}
    </ul>
    <a class="btn btn-outline btn-sm" href="#/cache">Open my Crest Cache</a>
  </section>`;
}

/** Today's question, under the calendar. The date picks it, so it's the same one all day. */
function dailyQuestionHTML(s) {
  const today = todayISO();
  if (!s.today || s.today.date !== today) setToday(pickTodaysQuestion(s.skillStats, s.mistakes).id);
  const { qid, claimed } = getState().today;
  const q = getQuestion(qid);
  return `<section class="panel daily-q">
    <div class="panel-title">
      <h2 class="h-sm">Today’s question</h2>
      <span class="tally-note">${SKILLS[q.skill].label}</span>
    </div>
    <p class="streak-quote">${esc(CONFIG.streakQuote)}</p>
    ${q.passage ? `<div class="q-passage daily-passage">${q.passage}</div>` : ''}
    <div class="daily-stem">${q.stem}</div>
    <div class="daily-foot">
      <a class="btn ${claimed ? 'btn-outline' : 'btn-primary'} btn-sm" href="#/session/today">View in Ultimate Course</a>
      <span class="small muted">${claimed ? 'Done for today! Streak kept alive.' : '+15 XP and 10 coins when you answer it'}</span>
    </div>
  </section>`;
}

function returningDashboard(s) {
  const latest = s.results[0];
  const analysis = analyzeResult(latest);
  const lp = levelProgress(s.xp);
  const today = todayISO();

  let main;
  let goalSide = '';
  if (!s.goal || editingGoal) {
    main = `<section class="panel" data-goal-panel>
      <h2 class="h-sm">Set your goal score and test date</h2>
      <p class="muted small">Your calendar needs a test date. Your current score is filled in from ${esc(latest.label)} when it has one.</p>
      ${goalFormHTML(s.goal, latest.scores?.total ?? '')}
      ${s.goal ? '<button type="button" class="btn btn-ghost btn-sm" data-action="cancel-goal">Cancel</button>' : ''}
    </section>`;
  } else if (daysBetween(today, s.goal.date) < 0) {
    main = `<section class="panel" data-goal-panel>
      <h2 class="h-sm">Your test date has passed</h2>
      <p>How did it go? Set your next goal and test date, and your calendar starts again from there.</p>
      ${goalFormHTML({ ...s.goal, date: '' }, latest.scores?.total ?? '')}
    </section>`;
  } else {
    const calendar = buildCalendar({
      goal: s.goal,
      weakSpots: analysis.weakSpots,
      start: latest.addedOn || latest.date,
      today,
      reviewHref: `#/results/${latest.id}`,
    });
    const week = calendar.days.slice(0, 7);
    const day = week.find((d) => d.date === selectedDate) || week[0];
    const isToday = day.date === today;
    main = `
    <section class="panel today-card">
      <div class="today-head">
        <h2>${isToday ? 'Today, ' : ''}${formatDate(day.date, { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <span class="today-total mono">${day.total ? `${day.total} min` : 'Rest'}</span>
      </div>
      <ul class="task-list">${day.tasks.map((task) => taskHTML(task, taskKey(day.date, task), s)).join('')}</ul>
      ${isToday ? '' : '<button type="button" class="btn btn-ghost btn-sm back-today" data-action="pick-day" data-date="">Back to today</button>'}
    </section>
    <section class="panel">
      <h2 class="h-sm">The next 7 days</h2>
      <div class="week-strip" role="list">
        ${week.map((d) => `
          <button type="button" role="listitem" class="week-day week-${d.tasks[0].kind} ${d.date === day.date ? 'is-selected' : ''}" data-action="pick-day" data-date="${d.date}" aria-pressed="${d.date === day.date}">
            <span class="wd">${d.date === today ? 'Today' : formatDate(d.date, { weekday: 'short' })}</span>
            <b class="mono">${d.total ? `${d.total}m` : 'Rest'}</b>
            <span class="wt">${esc(shortLabel(d.tasks[0]))}</span>
          </button>`).join('')}
      </div>
      <p class="small muted plan-source">Built from ${esc(latest.label)}. Add a new test in <a href="#/upload">Crest Ingest</a> and your plan updates.</p>
    </section>`;
    goalSide = `<section class="panel">
      <h2 class="h-sm">Goal</h2>
      <p class="goal-line mono">${s.goal.current ?? '?'} → ${s.goal.target}</p>
      <p class="small muted">${calendar.daysLeft} day${calendar.daysLeft === 1 ? '' : 's'} until ${formatDate(s.goal.date, { month: 'long', day: 'numeric' })}, which should only be ${calendar.minutes} minutes a day!</p>
      <button type="button" class="btn btn-outline btn-sm" data-action="edit-goal">Edit goal</button>
    </section>`;
  }

  const logCount = (latest.errorLog || []).filter(rowHasContent).length;
  return `
  <div class="page"><div class="wrap dash-wide">
    <header class="page-head">
      <h1>${greeting()}, ${esc(s.user.name)}!</h1>
      <p>Your plan is built from ${esc(latest.label)} (${formatDate(latest.date, { month: 'short', day: 'numeric' })})${logCount ? `, including the ${logCount} question${logCount === 1 ? '' : 's'} in its error log` : ''} :)</p>
    </header>
    <div class="dash-grid">
      <div class="dash-main">${main}${dailyQuestionHTML(s)}</div>
      <aside class="dash-side">
        ${goalSide}
        <section class="panel">
          <h2 class="h-sm">My weak spots</h2>
          ${analysis.weakSpots.length
            ? `<ol class="spot-list">${analysis.weakSpots.slice(0, 3).map((w) => `<li><span>${esc(w.skill.name)}</span><b class="mono">${w.misses}</b></li>`).join('')}</ol>`
            : '<p class="small muted">No misses recorded. Nice!</p>'}
          <a class="small" href="#/results/${latest.id}">See the full breakdown</a>
        </section>
        ${cachePanel(s)}
        <section class="panel side-actions">
          <h2 class="h-sm">Add new results</h2>
          <a class="btn btn-outline btn-sm" href="#/upload">${ICONS.upload} Add a test in Crest Ingest</a>
          <a class="btn btn-outline btn-sm" href="#/tests/diagnostic">${ICONS.target} Retake the diagnostic</a>
        </section>
        <section class="panel">
          <p class="greet-level">Level ${lp.level} · ${lp.title}</p>
          <div class="bar"><span style="width:${lp.pct}%"></span></div>
          <p class="small mono muted" style="margin:.4rem 0 0">${dailyXp()} / ${CONFIG.dailyGoalXp} XP today</p>
        </section>
      </aside>
    </div>
    ${footer(s)}
  </div></div>`;
}

export function render(view) {
  const draw = () => {
    const s = getState();
    // The key decision: has this student given us any results yet?
    if (isReturningStudent()) {
      view.innerHTML = returningDashboard(s);
    } else {
      view.innerHTML = firstTimeDashboard(s);
    }
    renderMath(view);
  };

  onAction(view, {
    'save-goal': () => {
      const panel = view.querySelector('[data-goal-panel]');
      const { goal, error } = readGoal(panel);
      if (error) { panel.querySelector('[data-goal-error]').textContent = error; return; }
      setGoal(goal);
      editingGoal = false;
      selectedDate = null;
      toast('Goal saved', 'good');
      draw();
    },
    'edit-goal': () => { editingGoal = true; draw(); },
    'cancel-goal': () => { editingGoal = false; draw(); },
    'pick-day': (el) => { selectedDate = el.dataset.date || null; draw(); },
    'reload-demo': (el) => { if (!armed(el)) return; loginDemo(); selectedDate = null; draw(); toast('Demo data reloaded', 'good'); },
    'reset-progress': (el) => { if (!armed(el)) return; resetProgress(); editingGoal = false; selectedDate = null; draw(); },
  });
  onAction(view, { 'task-check': (el) => togglePlan(el.dataset.key, el.checked) }, 'change');

  draw();
}
