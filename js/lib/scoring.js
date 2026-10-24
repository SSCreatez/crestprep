/**
 * scoring.js: levels, mastery, and the projected SAT score.
 * The level curve and titles are ported from the first version of CrestPrep.
 */
import { SKILLS, skillsIn } from '../data/skills.js';

export const LEVEL_TITLES = [
  'Newcomer', 'Apprentice', 'Scholar', 'Strategist', 'Sharpshooter',
  'Analyst', 'Tactician', 'Specialist', 'Virtuoso', 'Summit Seeker',
];

/** Level n starts at 50 × (n − 1)² XP, so each level takes a little longer than the last. */
export const levelFromXp = (xp) => Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
export const xpForLevel = (level) => 50 * (level - 1) ** 2;

export function levelProgress(xp) {
  const level = levelFromXp(xp);
  const start = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return {
    level,
    title: LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1],
    into: xp - start,
    span: next - start,
    pct: Math.round(((xp - start) / (next - start)) * 100),
  };
}

/** Mastery of one skill as a percent (null if the student hasn't tried it yet). */
export function masteryPct(stat) {
  if (!stat || !stat.total) return null;
  return Math.round((stat.rightW / stat.totalW) * 100);
}

/**
 * Projected section score (200–800) from practice results.
 *  1. Difficulty-weighted accuracy: a hard question counts 3×, an easy one 1×.
 *  2. Confidence: with fewer than 20 answers, the estimate stays near the middle
 *     so one lucky guess can't fake a perfect score.
 */
export function sectionProjection(stats, section) {
  let rightW = 0;
  let totalW = 0;
  let answered = 0;
  for (const skill of skillsIn(section)) {
    const s = stats[skill];
    if (!s) continue;
    rightW += s.rightW;
    totalW += s.totalW;
    answered += s.total;
  }
  if (!answered) return null;
  const accuracy = rightW / totalW;
  const confidence = Math.min(1, answered / 20);
  const blended = accuracy * confidence + 0.5 * (1 - confidence);
  return Math.round((200 + 600 * blended) / 10) * 10;
}

export function projectedScore(stats) {
  const math = sectionProjection(stats, 'math');
  const rw = sectionProjection(stats, 'rw');
  if (math == null || rw == null) return null;
  return { math, rw, total: math + rw };
}

/** Skills sorted weakest first. Untried skills count as 50% so they get attention too. */
export function rankSkills(stats, section = null) {
  const keys = section ? skillsIn(section) : Object.keys(SKILLS);
  const score = (key) => masteryPct(stats[key]) ?? 50;
  return [...keys].sort((a, b) => score(a) - score(b));
}

/** Digital SAT pace: seconds available per question (35 min / 22 for Math, 32 min / 27 for R&W). */
export const PACE_SECONDS = { math: 95, rw: 71 };
