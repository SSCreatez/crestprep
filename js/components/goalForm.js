/**
 * goalForm.js: goal score, test date, and (optional) current score.
 * Views call readGoal() when the student presses "Save" (data-action="save-goal").
 */
import { todayISO, addDays, daysBetween } from '../lib/dates.js';

export function goalFormHTML(goal, suggestedCurrent = '') {
  return `
  <div class="goal-form">
    <label class="field">Goal score
      <input class="input" type="number" inputmode="numeric" min="400" max="1600" step="10" name="target" value="${goal?.target ?? ''}" placeholder="e.g. 1500">
    </label>
    <label class="field">Test date
      <input class="input" type="date" name="date" min="${addDays(todayISO(), 1)}" value="${goal?.date ?? ''}">
    </label>
    <label class="field">Current score <span class="muted">(optional)</span>
      <input class="input" type="number" inputmode="numeric" min="400" max="1600" step="10" name="current" value="${goal?.current ?? suggestedCurrent ?? ''}" placeholder="If you know it">
    </label>
    <button type="button" class="btn btn-primary" data-action="save-goal">Save</button>
  </div>
  <p class="form-error" role="alert" data-goal-error></p>`;
}

/** Read and check the form. Returns { goal } or { error } with a message that says how to fix it. */
export function readGoal(container) {
  const value = (name) => container.querySelector(`[name="${name}"]`).value.trim();
  const current = value('current') ? Number(value('current')) : null;
  const target = Number(value('target'));
  const date = value('date');

  if (!target || target < 400 || target > 1600) return { error: 'Enter a goal score between 400 and 1600.' };
  if (!date || daysBetween(todayISO(), date) < 1) return { error: 'Pick a test date after today.' };
  if (current !== null && (current < 400 || current > 1600)) return { error: 'Current score must be between 400 and 1600, or leave it blank.' };
  if (current !== null && target <= current) return { error: 'Your goal needs to be higher than your current score.' };
  return { goal: { current, target, date } };
}
