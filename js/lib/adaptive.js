/**
 * adaptive.js: a mini version of the Digital SAT's adaptive format.
 *
 *   Module 1: medium questions
 *        │
 *        ├─ 2+ of 3 correct → Harder Module 2 (score range reaches 800)
 *        └─ fewer           → Easier Module 2 (score range tops out lower)
 *
 * The real test uses item response theory with 22–27 questions per module.
 * This mini test shows the same routing idea in 6 questions per section.
 */
import { QUESTIONS } from '../data/questions.js';
import { shuffle } from './util.js';

export const MODULE_SIZE = 3;
export const ROUTE_THRESHOLD = 2; // correct answers in Module 1 needed for the harder Module 2

export const TEST_KINDS = {
  diagnostic: { label: 'CrestPrep diagnostic', sections: ['rw', 'math'] },
  math: { label: 'Math practice set', sections: ['math'] },
  rw: { label: 'Reading and Writing practice set', sections: ['rw'] },
};

export function pickModule(section, difficulty, exclude = []) {
  const pool = QUESTIONS.filter((q) => q.section === section && q.difficulty === difficulty && !exclude.includes(q.id));
  return shuffle(pool).slice(0, MODULE_SIZE).map((q) => q.id);
}

export function createRun(kind) {
  return {
    kind,
    label: TEST_KINDS[kind].label,
    sections: TEST_KINDS[kind].sections.map((section) => ({
      section,
      m1: pickModule(section, 2),
      m2: [],
      route: null,
      answers: {},        // question id → chosen index
      m1Correct: 0,
      m2Correct: 0,
      score: null,
    })),
    si: 0,                // which section is running
    stage: 'm1',          // 'm1' → 'routing' → 'm2' → (next section or 'results')
    qi: 0,                // question index inside the current module
    moduleStart: Date.now(),
  };
}

export const routeFor = (m1Correct) => (m1Correct >= ROUTE_THRESHOLD ? 'harder' : 'easier');

/** Rough section estimate. The harder route starts higher and can reach 800; the easier route cannot. */
export function estimateSection(route, m1Correct, m2Correct) {
  const raw = route === 'harder'
    ? 530 + 30 * m1Correct + 60 * m2Correct   // 590–800
    : 340 + 40 * m1Correct + 50 * m2Correct;  // 340–530
  return Math.min(800, Math.round(raw / 10) * 10);
}

export const ROUTE_CEILING = { harder: 800, easier: estimateSection('easier', ROUTE_THRESHOLD - 1, MODULE_SIZE) };
