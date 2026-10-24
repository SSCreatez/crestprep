/**
 * store.js: the single source of truth for a student's progress.
 *
 * All progress lives in ONE object, saved to localStorage after every change.
 * Views never edit it directly; they call the functions below. Each Google
 * account also keeps its own saved copy, so students can share a computer.
 *
 * Syncing progress across devices later only means changing load() and save().
 */
import { levelFromXp, LEVEL_TITLES } from './lib/scoring.js';
import { todayISO, addDays, daysBetween } from './lib/dates.js';
import { CONFIG } from './config.js';

const STORAGE_KEY = 'crestprep:v2';
const accountKey = (id) => `crestprep:account:${id}`;
const listeners = new Set();

function blankState() {
  return {
    user: null,                 // { id, name, provider: 'google' | 'demo' }
    xp: 0,
    coins: 0,
    streak: { count: 0, best: 0, lastDay: null },
    activity: {},               // XP earned per day: { '2026-10-22': 35 }
    skillStats: {},             // per domain: { right, total, rightW, totalW }
    mistakes: [],               // practice questions answered wrong
    lessonsDone: [],
    lastLesson: null,
    results: [],                // Bluebook uploads and diagnostics, newest first
    goal: null,                 // { target, date, current (optional) }
    scoreHistory: [],           // [{ date, score, label }]
    session: { size: 12, style: 'rule', feedback: 'each', ramp: 'ease' },
    planChecks: {},             // calendar tasks ticked off: { 'cal-2026-10-22-0': true }
    today: null,                // today's bonus question { date, qid, claimed }
    prefs: { theme: 'academic', lang: 'en' },
  };
}

function readJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

function load() {
  const saved = readJSON(STORAGE_KEY);
  if (!saved) return blankState();
  const base = blankState();
  return { ...base, ...saved, prefs: { ...base.prefs, ...saved.prefs }, session: { ...base.session, ...saved.session } };
}

let state = load();

function save() {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, json);
    if (state.user?.provider === 'google') localStorage.setItem(accountKey(state.user.id), json);
  } catch { /* storage full or blocked */ }
}

/** Save, then tell every listener what kind of change happened ('data' or 'prefs'). */
function commit(kind = 'data') {
  save();
  listeners.forEach((fn) => fn(kind));
}

/* ------------------------------ Reading ------------------------------ */
export const getState = () => state;
export const isLoggedIn = () => Boolean(state.user);
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

/** First-time vs. returning: a returning student has at least one result (Bluebook upload or diagnostic). */
export const isReturningStudent = () => state.results.length > 0;
export const getResult = (id) => state.results.find((r) => r.id === id);
export const dailyXp = () => state.activity[todayISO()] || 0;

/** The streak only counts if the student practiced today or yesterday. */
export function currentStreak() {
  const { count, lastDay } = state.streak;
  if (!lastDay) return 0;
  return daysBetween(lastDay, todayISO()) <= 1 ? count : 0;
}

/* ----------------------------- Accounts ------------------------------ */

/** Called by auth.js after Google sign-in. Loads that account's saved progress if it has any. */
export function loginWithGoogle({ id, name }) {
  const { prefs } = state;
  if (state.user?.id !== id) state = { ...blankState(), ...(readJSON(accountKey(id)) || {}) };
  state.prefs = prefs;
  state.user = { id, name, provider: 'google' };
  commit();
}

/** Demo account: a returning student with a Bluebook result and a goal, so every screen has data. */
export function loginDemo() {
  const { prefs } = state;
  const today = todayISO();
  state = {
    ...blankState(),
    prefs,
    user: { id: 'demo', name: CONFIG.creator.firstName, provider: 'demo' },
    xp: 60,
    coins: 50,
    streak: { count: 5, best: 9, lastDay: addDays(today, -1) },
    activity: Object.fromEntries([1, 2, 3, 4, 5, 9, 10, 12].map((d, i) => [addDays(today, -d), [30, 45, 20, 55, 35, 25, 40, 15][i]])),
    skillStats: {
      algebra:             { right: 15, total: 17, rightW: 30, totalW: 34 },
      advanced_math:       { right: 11, total: 15, rightW: 25, totalW: 36 },
      problem_solving:     { right: 10, total: 11, rightW: 19, totalW: 21 },
      geometry_trig:       { right: 5,  total: 8,  rightW: 9,  totalW: 16 },
      information_ideas:   { right: 11, total: 13, rightW: 23, totalW: 27 },
      craft_structure:     { right: 8,  total: 12, rightW: 17, totalW: 27 },
      expression_of_ideas: { right: 10, total: 11, rightW: 19, totalW: 21 },
      standard_english:    { right: 9,  total: 13, rightW: 16, totalW: 24 },
    },
    lessonsDone: ['welcome-sat', 'welcome-tools'],
    lastLesson: 'rw-families',
    results: [{
      id: 'demo-bluebook',
      source: 'bluebook',
      label: 'Bluebook Practice Test 4',
      date: addDays(today, -6),
      scores: { rw: 660, math: 640, total: 1300 },
      misses: {
        'nonlinear-functions': 3, 'equivalent-expressions': 2, 'circles': 2, 'right-triangles-and-trigonometry': 1,
        'percentages': 1, 'linear-functions': 1, 'one-variable-data-distributions-and-measures-of-center-and-spread': 1,
        'words-in-context': 3, 'command-of-evidence': 2, 'transitions': 2, 'boundaries': 2,
        'form-structure-and-sense': 2, 'inferences': 1, 'central-ideas-and-details': 1,
      },
    }],
    goal: { current: 1300, target: 1550, date: addDays(today, 140) },
    scoreHistory: [
      { date: addDays(today, -42), score: 1240, label: 'Starting estimate' },
      { date: addDays(today, -6), score: 1300, label: 'Bluebook Practice Test 4' },
    ],
  };
  commit();
}

/** Clears this browser's session. A Google account's own saved copy stays for next time. */
export function signOut() {
  state = { ...blankState(), prefs: state.prefs };
  commit();
}

/** Wipe progress but keep the account and display preferences (turns a student back into first-time). */
export function resetProgress() {
  const { prefs, user } = state;
  state = { ...blankState(), prefs, user };
  commit();
}

/* ------------------------------ Results ------------------------------ */

/** Save a Bluebook upload or a diagnostic. Its score (if any) also updates the goal's current score. */
export function addResult(result) {
  const entry = { id: `r${Date.now()}`, date: todayISO(), ...result };
  state.results.unshift(entry);
  if (entry.scores?.total) {
    state.scoreHistory.push({ date: entry.date, score: entry.scores.total, label: entry.label });
    if (state.goal) state.goal = { ...state.goal, current: entry.scores.total };
  }
  commit();
  return entry;
}

/* ------------------------------ Practice ----------------------------- */

/** Add XP for today and keep the streak honest. */
function logActivity(xp) {
  const today = todayISO();
  state.activity[today] = (state.activity[today] || 0) + xp;
  const streak = state.streak;
  if (streak.lastDay === today) return;
  const gap = streak.lastDay ? daysBetween(streak.lastDay, today) : Infinity;
  streak.count = gap === 1 ? streak.count + 1 : 1;
  streak.lastDay = today;
  streak.best = Math.max(streak.best, streak.count);
}

function addXp(amount) {
  const before = levelFromXp(state.xp);
  state.xp += amount;
  logActivity(amount);
  const after = levelFromXp(state.xp);
  return after > before ? { level: after, title: LEVEL_TITLES[Math.min(after, LEVEL_TITLES.length) - 1] } : null;
}

/**
 * The core learning loop, called every time a student answers a question:
 * awards XP (+10 correct, +5 bonus on hard questions, +2 for trying),
 * updates mastery for the question's domain, and remembers misses.
 */
export function recordAnswer(question, choice, source, { silent = false } = {}) {
  const correct = choice === question.answer;
  const xp = correct ? 10 + (question.difficulty === 3 ? 5 : 0) : 2;

  const stat = state.skillStats[question.skill] || { right: 0, total: 0, rightW: 0, totalW: 0 };
  stat.total += 1;
  stat.totalW += question.difficulty;
  if (correct) { stat.right += 1; stat.rightW += question.difficulty; }
  state.skillStats[question.skill] = stat;

  if (correct) state.coins += 2;
  else if (!state.mistakes.some((m) => m.qid === question.id)) {
    state.mistakes.unshift({ qid: question.id, choice, source, at: Date.now() });
  }
  const levelUp = addXp(xp);
  if (!silent) commit();
  return { correct, xp, levelUp };
}

export function completeLesson(lessonId) {
  if (state.lessonsDone.includes(lessonId)) return null;
  state.lessonsDone.push(lessonId);
  const levelUp = addXp(10);
  commit();
  return { xp: 10, levelUp };
}

export function setLastLesson(lessonId) {
  if (state.lastLesson === lessonId) return;
  state.lastLesson = lessonId;
  save();
}

/* ---------------------------- Goals & plans -------------------------- */
export function setGoal(goal) { state.goal = goal; commit(); }
export function setSession(key, value) { state.session = { ...state.session, [key]: value }; commit(); }

export function togglePlan(key, checked) {
  if (checked) state.planChecks[key] = true;
  else delete state.planChecks[key];
  commit();
}

/* --------------------------- Daily question -------------------------- */
export function setToday(qid) {
  state.today = { date: todayISO(), qid, claimed: false };
  save();
}

export function claimTodayBonus() {
  if (!state.today || state.today.claimed) return null;
  state.today.claimed = true;
  state.coins += 10;
  const levelUp = addXp(15);
  commit();
  return { xp: 15, coins: 10, levelUp };
}

/* ---------------------------- Preferences ---------------------------- */
export function setPref(key, value) {
  state.prefs = { ...state.prefs, [key]: value };
  commit('prefs');
}
