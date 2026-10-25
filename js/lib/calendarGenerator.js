/**
 * calendarGenerator.js: turns a goal and weak spots into a day-by-day plan
 * with minute estimates.
 *
 *  - The plan starts on the day the latest test was added (`start`), so a day's
 *    tasks stay the same every time the student opens it. Adding a new test or
 *    changing the goal is what rebuilds it.
 *  - Daily time grows with the points needed per week, from 20 to 45 minutes.
 *  - Weak skills rotate through the weekdays; a skill that cost 3 questions
 *    comes up 3 times as often as one that cost 1. The first time a skill comes
 *    up, its day starts with the matching CrestPrep lesson and practice set.
 *  - Wednesday: redo the error log. Saturday: CrestPrep practice, or a full
 *    Bluebook test every other week. Sunday: rest.
 *  - The day before the test is rest; test day is a checklist.
 */
import { todayISO, addDays, daysBetween, weekday } from './dates.js';
import { clamp } from './util.js';
import { QUESTION_BANK_URL } from './bluebookAnalyzer.js';

const FULL_TEST_MINUTES = 145;   // 2 h 14 min of testing plus the 10-minute break
const MAX_DAYS = 180;

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

/**
 * A study day for one weak spot. The first time it comes up: lesson, Question
 * Bank, then the CrestPrep practice set. Later times: Question Bank and a
 * personal practice set. Tasks with a lessonId tick themselves off when the
 * student finishes that lesson in the course.
 */
function skillDay(spot, minutes, firstTime) {
  const tasks = skillTasks(spot, minutes, firstTime);
  tasks[0].short = spot.skill.name;     // what the 7-day strip shows for this day
  return tasks;
}

function skillTasks(spot, minutes, firstTime) {
  const { lesson, drill, questionBank } = spot.recs;
  const qb = (mins) => ({
    key: `qb-${spot.skill.id}`, kind: 'drill', title: `${spot.skill.name}: Question Bank practice`,
    detail: questionBank.join(' → '), minutes: mins, href: QUESTION_BANK_URL, external: true,
  });
  if (firstTime && (lesson || drill)) {
    const tasks = [];
    if (lesson) tasks.push({ key: `lesson-${lesson.id}`, kind: 'lesson', title: `Lesson: ${lesson.title}`, minutes: lesson.minutes || 5, href: lesson.href, lessonId: lesson.id });
    const used = (lesson?.minutes || 0) + (drill ? 10 : 0);
    tasks.push(qb(Math.max(10, minutes - used)));
    if (drill) tasks.push({ key: `set-${drill.id}`, kind: 'drill', title: `CrestPrep set: ${drill.title}`, minutes: 10, href: drill.href, lessonId: drill.id });
    return tasks;
  }
  return [qb(minutes - 10), { key: 'path', kind: 'drill', title: 'Practice set built from your weak skills', minutes: 10, href: '#/session/path' }];
}

/**
 * Build the plan from `start` to the test date, then return the days from
 * `today` on. reviewHref is where Wednesday's "redo your misses" task points.
 */
export function buildCalendar({ goal, weakSpots, start = todayISO(), today = todayISO(), reviewHref = '#/cache' }) {
  const first = start <= today ? start : today;
  const { perWeek, minutes } = dailyMinutes(goal, daysBetween(first, goal.date));
  const order = rotation(weakSpots);
  const seen = new Set();
  let turn = 0;

  const days = [];
  const length = Math.min(daysBetween(first, goal.date), MAX_DAYS + daysBetween(first, today));
  for (let i = 0; i <= length; i++) {
    const date = addDays(first, i);
    const left = daysBetween(date, goal.date);
    let tasks;
    if (left === 0) {
      tasks = [{ key: 'test-day', kind: 'test', title: 'Test day: charged device with Bluebook installed, photo ID, admission ticket', minutes: 0 }];
    } else if (left === 1) {
      tasks = [{ key: 'rest', kind: 'rest', title: 'Rest. Skim your notes, pack your bag, sleep early', minutes: 15 }];
    } else if (weekday(date) === 0) {
      tasks = [{ key: 'rest', kind: 'rest', title: 'Rest day', minutes: 0 }];
    } else if (weekday(date) === 6) {
      tasks = Math.floor(i / 7) % 2 === 0
        ? [{ key: 'set', kind: 'test', title: 'CrestPrep practice: the diagnostic or a short set (or a full-length CrestPrep test if you have 2½ hours)', minutes: 35, href: '#/tests' }]
        : [{ key: 'full-test', kind: 'test', title: 'Full Bluebook practice test, then add it in Crest Ingest', minutes: FULL_TEST_MINUTES, href: '#/upload' }];
    } else if (weekday(date) === 3) {
      tasks = [{ key: 'review', kind: 'review', title: 'Redo the questions in your error log', detail: 'Cover the answer, solve it again, then check.', minutes, href: reviewHref }];
    } else if (order.length) {
      const spot = order[turn++ % order.length];
      tasks = skillDay(spot, minutes, !seen.has(spot.skill.id));
      seen.add(spot.skill.id);
    } else {
      tasks = [{ key: 'path', kind: 'drill', title: 'Practice set from your weakest skills', minutes, href: '#/session/path' }];
    }
    if (date >= today) days.push({ date, tasks, total: tasks.reduce((sum, t) => sum + t.minutes, 0) });
  }
  return { daysLeft: daysBetween(today, goal.date), perWeek, minutes, days };
}

/** A task's checkbox key. The same task on the same day always gets the same key. */
export const taskKey = (date, task) => `cal-${date}-${task.key}`;
