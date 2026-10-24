/**
 * dashboard.js: what a student sees after signing in.
 *
 * One decision drives the whole screen (see render below):
 *   - First-time student (no results yet) → choose how to start: upload a
 *     Bluebook practice test or take the diagnostic, then set a goal.
 *   - Returning student → today's study tasks with minutes, front and center.
 */
import { CONFIG } from '../config.js';
import { getState, isReturningStudent, setGoal, togglePlan, dailyXp, loginDemo, resetProgress } from '../store.js';
import { levelProgress } from '../lib/scoring.js';
import { analyzeResult } from '../lib/bluebookAnalyzer.js';
import { buildCalendar } from '../lib/calendarGenerator.js';
import { formatDate, daysBetween, todayISO } from '../lib/dates.js';
import { onAction, esc, toast } from '../lib/dom.js';
import { goalFormHTML, readGoal } from '../components/goalForm.js';
import { ICONS } from '../components/icons.js';

let editingGoal = false;

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
      <h1>${greeting()}, ${esc(s.user.name)}</h1>
      <p>Let's find out what to work on. Pick one way to start; either one builds your weak-spot list and your study calendar.</p>
    </header>
    <div class="start-grid">
      <a class="start-card" href="#/upload">
        <span class="row-icon">${ICONS.upload}</span>
        <h2>Upload a past Bluebook practice test</h2>
        <p>Already took one? Add the questions you missed and get a breakdown with resources for every weak spot.</p>
        <span class="btn btn-primary">Add my Bluebook results</span>
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
function taskHTML(task, key, checks) {
  const link = task.href
    ? `<a href="${task.href}" ${task.external ? 'target="_blank" rel="noopener"' : ''}>${task.external ? 'Open Question Bank' : 'Open'}</a>`
    : '';
  return `<li class="task task-${task.kind}">
    <label>
      <input type="checkbox" data-action="task-check" data-key="${key}" ${checks[key] ? 'checked' : ''}>
      <span class="task-title">${esc(task.title)}${task.detail ? `<span class="task-detail">${esc(task.detail)}</span>` : ''}</span>
    </label>
    <span class="task-side">${task.minutes ? `<b class="mono">${task.minutes} min</b>` : ''}${link}</span>
  </li>`;
}

function shortLabel(task) {
  const text = task.title.split(':')[0];
  return text.length > 26 ? `${text.slice(0, 24)}…` : text;
}

function returningDashboard(s) {
  const latest = s.results[0];
  const analysis = analyzeResult(latest);
  const lp = levelProgress(s.xp);

  let main;
  let goalSide = '';
  if (!s.goal || editingGoal) {
    main = `<section class="panel" data-goal-panel>
      <h2 class="h-sm">Set your goal score and test date</h2>
      <p class="muted small">Your calendar needs a test date. Your current score is filled in from ${esc(latest.label)} when it has one.</p>
      ${goalFormHTML(s.goal, latest.scores?.total ?? '')}
      ${s.goal ? '<button type="button" class="btn btn-ghost btn-sm" data-action="cancel-goal">Cancel</button>' : ''}
    </section>`;
  } else {
    const calendar = buildCalendar({ goal: s.goal, weakSpots: analysis.weakSpots });
    const today = calendar.days[0];
    main = `
    <section class="panel today-card">
      <div class="today-head">
        <h2>Today, ${formatDate(today.date, { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <span class="today-total mono">${today.total ? `${today.total} min` : 'Rest'}</span>
      </div>
      <ul class="task-list">${today.tasks.map((task, i) => taskHTML(task, `cal-${today.date}-${i}`, s.planChecks)).join('')}</ul>
    </section>
    <section class="panel">
      <h2 class="h-sm">The next 7 days</h2>
      <div class="week-strip">
        ${calendar.days.slice(0, 7).map((day) => `
          <div class="week-day week-${day.tasks[0].kind}">
            <span class="wd">${formatDate(day.date, { weekday: 'short' })}</span>
            <b class="mono">${day.total ? `${day.total}m` : 'Rest'}</b>
            <span class="wt">${esc(shortLabel(day.tasks[0]))}</span>
          </div>`).join('')}
      </div>
    </section>`;
    goalSide = `<section class="panel">
      <h2 class="h-sm">Goal</h2>
      <p class="goal-line mono">${s.goal.current ?? '?'} → ${s.goal.target}</p>
      <p class="small muted">${calendar.daysLeft} days until ${formatDate(s.goal.date, { month: 'long', day: 'numeric' })}. About ${calendar.minutes} minutes on a normal day.</p>
      <button type="button" class="btn btn-outline btn-sm" data-action="edit-goal">Edit goal</button>
    </section>`;
  }

  return `
  <div class="page"><div class="wrap dash-wide">
    <header class="page-head">
      <h1>${greeting()}, ${esc(s.user.name)}</h1>
      <p>Your plan is built from ${esc(latest.label)} (${formatDate(latest.date, { month: 'short', day: 'numeric' })}).</p>
    </header>
    <div class="dash-grid">
      <div class="dash-main">${main}</div>
      <aside class="dash-side">
        ${goalSide}
        <section class="panel">
          <h2 class="h-sm">Your top weak spots</h2>
          ${analysis.weakSpots.length
            ? `<ol class="spot-list">${analysis.weakSpots.slice(0, 3).map((w) => `<li><span>${esc(w.skill.name)}</span><b class="mono">${w.misses}</b></li>`).join('')}</ol>`
            : '<p class="small muted">No misses recorded. Nice.</p>'}
          <a class="small" href="#/results/${latest.id}">See the full breakdown</a>
        </section>
        <section class="panel side-actions">
          <h2 class="h-sm">Add new results</h2>
          <a class="btn btn-outline btn-sm" href="#/upload">${ICONS.upload} Upload a Bluebook test</a>
          <a class="btn btn-outline btn-sm" href="#/tests/diagnostic">${ICONS.target} Retake the diagnostic</a>
        </section>
        <section class="panel">
          <p class="greet-level">Level ${lp.level} · ${lp.title}</p>
          <div class="bar"><span style="width:${lp.pct}%"></span></div>
          <p class="small mono muted" style="margin:.4rem 0 0">${dailyXp()} / ${CONFIG.dailyGoalXp} XP today</p>
          <a class="small" href="#/session/today">Answer today's bonus question</a>
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
  };

  onAction(view, {
    'save-goal': () => {
      const panel = view.querySelector('[data-goal-panel]');
      const { goal, error } = readGoal(panel);
      if (error) { panel.querySelector('[data-goal-error]').textContent = error; return; }
      setGoal(goal);
      editingGoal = false;
      toast('Goal saved', 'good');
      draw();
    },
    'edit-goal': () => { editingGoal = true; draw(); },
    'cancel-goal': () => { editingGoal = false; draw(); },
    'reload-demo': (el) => { if (!armed(el)) return; loginDemo(); draw(); toast('Demo data reloaded', 'good'); },
    'reset-progress': (el) => { if (!armed(el)) return; resetProgress(); editingGoal = false; draw(); },
  });
  onAction(view, { 'task-check': (el) => togglePlan(el.dataset.key, el.checked) }, 'change');

  draw();
}
