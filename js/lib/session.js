/**
 * session.js: builds personalized practice.
 *
 * buildPracticeSet() follows the "Your study path today" settings:
 *   size      → how many questions
 *   ramp      → 'ease' (easy → hard), 'mixed', or 'hard' (hardest first)
 * and pulls more questions from the student's weakest skills.
 */
import { QUESTIONS } from '../data/questions.js';
import { rankSkills } from './scoring.js';
import { shuffle, hashString } from './util.js';
import { todayISO } from './dates.js';

export const SESSION_OPTIONS = {
  size:     [[6, '6 questions a set'], [12, '12 questions a set'], [20, '20 questions a set']],
  style:    [['rule', 'Short rule, then practice'], ['straight', 'Straight to questions']],
  feedback: [['each', 'Feedback after every question'], ['end', 'Feedback at the end of the set']],
  ramp:     [['ease', 'Ease in, then build'], ['mixed', 'Mixed difficulty'], ['hard', 'Hardest first']],
};

export const optionLabel = (key, value) => SESSION_OPTIONS[key].find(([v]) => v === value)?.[1] ?? value;

export function buildPracticeSet(settings, stats) {
  // Weakest skills get 3 picks per round, the next two get 2, the rest get 1.
  const ranked = rankSkills(stats);
  const buckets = ranked.map((skill, rank) => ({
    weight: rank < 2 ? 3 : rank < 4 ? 2 : 1,
    pool: shuffle(QUESTIONS.filter((q) => q.skill === skill)),
  }));

  const picked = [];
  while (picked.length < settings.size && buckets.some((b) => b.pool.length)) {
    for (const bucket of buckets) {
      for (let i = 0; i < bucket.weight && bucket.pool.length && picked.length < settings.size; i++) {
        picked.push(bucket.pool.shift());
      }
    }
  }

  if (settings.ramp === 'ease') picked.sort((a, b) => a.difficulty - b.difficulty);
  else if (settings.ramp === 'hard') picked.sort((a, b) => b.difficulty - a.difficulty);
  else return shuffle(picked);
  return picked;
}

/**
 * Today's question: one question from the weakest skill that the student
 * hasn't already mastered. The date seeds the choice, so it stays the same all day.
 */
export function pickTodaysQuestion(stats, mistakes) {
  const missed = new Set(mistakes.map((m) => m.qid));
  for (const skill of rankSkills(stats)) {
    const pool = QUESTIONS.filter((q) => q.skill === skill);
    if (!pool.length) continue;
    const preferred = pool.filter((q) => !missed.has(q.id));
    const list = preferred.length ? preferred : pool;
    return list[hashString(todayISO()) % list.length];
  }
  return QUESTIONS[0];
}
