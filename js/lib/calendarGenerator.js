/**
 * calendarGenerator.js: turns a goal and weak spots into a day-by-day plan
 * with minute estimates.
 *
 *  - Daily time grows with the points needed per week, from 20 to 45 minutes.
 *  - Weak skills rotate through the weekdays; a skill that cost 3 questions
 *    comes up 3 times as often as one that cost 1.
 *  - Wednesday: redo missed questions. Saturday: a practice set, or a full
 *    Bluebook test every other week. Sunday: rest.
 *  - The day before the test is rest; test day is a checklist.
 */
import { todayISO, addDays, daysBetween, weekday } from './dates.js';
import { clamp } from './util.js';
import { QUESTION_BANK_URL } from './bluebookAnalyzer.js';

const FULL_TEST_MINUTES = 145;   // 2 h 14 min of testing plus the 10-minute break
const MAX_DAYS = 120;

/** Points needed per week → minutes per day. With no current score, assume a 150-point gap. */
export function dailyMinutes(goal, daysLeft) {
  const weeks = Math.max(1, Math.ceil((daysLeft + 1) / 7));
  const gap = goal.current ? Math.max(0, goal.target - goal.current) : 150;
  const perWeek = gap / weeks;
  return { perWeek: Math.ceil(perWeek / 10) * 10, minutes: Math.round(clamp(20 + perWeek / 2, 20, 45) / 5) * 5 };
}

/** Repeat each weak spot by how many questions it cost (up to 3), interleaved. */
function rotation(weakSpots) {
  const turns = weakSpots.slice(0, 6).map((spot) => ({ spot, left: Math.min(3, spot.misses) }));
  const order = [];
  while (turns.some((t) => t.left > 0)) {
    for (const t of turns) if (t.left > 0) { order.push(t.spot); t.left -= 1; }
  }
  return order;
}

function drillTasks(spot, minutes) {
  const { drill } = spot.recs;
  const tasks = [{
    kind: 'drill',
    title: `${spot.skill.name}: Question Bank practice`,
    detail: spot.recs.questionBank.join(' → '),
    minutes: drill ? minutes - 10 : minutes,
    href: QUESTION_BANK_URL,
    external: true,
  }];
  if (drill) tasks.push({ kind: 'drill', title: `CrestPrep drill: ${drill.title}`, minutes: 10, href: drill.href });
  return tasks;
}

export function buildCalendar({ goal, weakSpots, today = todayISO() }) {
  const daysLeft = daysBetween(today, goal.date);
  const { perWeek, minutes } = dailyMinutes(goal, daysLeft);
  const order = rotation(weakSpots);
  let turn = 0;

  const days = [];
  for (let i = 0; i <= Math.min(daysLeft, MAX_DAYS); i++) {
    const date = addDays(today, i);
    const left = daysBetween(date, goal.date);
    let tasks;
    if (left === 0) {
      tasks = [{ kind: 'test', title: 'Test day: charged device with Bluebook installed, photo ID, admission ticket', minutes: 0 }];
    } else if (left === 1) {
      tasks = [{ kind: 'rest', title: 'Rest. Skim your notes, pack your bag, sleep early', minutes: 15 }];
    } else if (weekday(date) === 0) {
      tasks = [{ kind: 'rest', title: 'Rest day', minutes: 0 }];
    } else if (weekday(date) === 6) {
      tasks = Math.floor(i / 7) % 2 === 0
        ? [{ kind: 'test', title: 'Bluebook-style practice set on CrestPrep', minutes: 35, href: '#/tests' }]
        : [{ kind: 'test', title: 'Full Bluebook practice test, then add your results here', minutes: FULL_TEST_MINUTES, href: '#/upload' }];
    } else if (weekday(date) === 3) {
      tasks = [{ kind: 'review', title: 'Redo every question you missed this week', minutes }];
    } else if (order.length) {
      tasks = drillTasks(order[turn++ % order.length], minutes);
    } else {
      tasks = [{ kind: 'drill', title: 'Practice set from your weakest skills', minutes, href: '#/session/path' }];
    }
    days.push({ date, tasks, total: tasks.reduce((sum, t) => sum + t.minutes, 0) });
  }
  return { daysLeft, perWeek, minutes, days };
}
