/**
 * adaptive.js: the Digital SAT's adaptive format, at three sizes.
 *
 *   Module 1 (mixed or medium questions)
 *        │
 *        ├─ enough right → Harder Module 2 (score range reaches 800)
 *        └─ fewer        → Easier Module 2 (score range tops out lower)
 *
 *   Full-length tests: 27 + 27 Reading and Writing, 22 + 22 Math, fixed
 *                      questions from data/bank/tests.js (like Bluebook).
 *   Diagnostic:        6 + 6 per section, each question from a different
 *                      official skill, so 24 questions touch most skills.
 *   Practice sets:     4 + 4 questions in one section.
 *
 * The real test uses item response theory; the estimate here is a simpler
 * curve based on the share of questions right and the route taken.
 */
import { QUESTIONS, getQuestion } from '../data/questions.js';
import { FULL_TESTS } from '../data/bank/tests.js';
import { shuffle } from './util.js';

export const TEST_KINDS = {
  diagnostic: { label: 'CrestPrep diagnostic', sections: ['rw', 'math'], size: 6 },
  math: { label: 'Math practice set', sections: ['math'], size: 4 },
  rw: { label: 'Reading and Writing practice set', sections: ['rw'], size: 4 },
  ...Object.fromEntries(FULL_TESTS.map((test) => [test.kind, { label: test.label, sections: ['rw', 'math'], full: test }])),
};

/** Share of Module 1 needed for the harder Module 2. */
const ROUTE_SHARE = { full: 0.55, short: 0.6 };
export const routeThreshold = (m1Length, full = false) => Math.ceil(m1Length * (full ? ROUTE_SHARE.full : ROUTE_SHARE.short));

/** Reading and Writing questions appear in the same order as on the real test. */
const RW_ORDER = ['words-in-context', 'text-structure-and-purpose', 'cross-text-connections', 'central-ideas-and-details',
  'command-of-evidence', 'inferences', 'boundaries', 'form-structure-and-sense', 'transitions', 'rhetorical-synthesis'];
const orderIndex = (q) => (q.section === 'rw' ? RW_ORDER.indexOf(q.cb) : q.difficulty);

/**
 * Pick a module from the practice pool: questions at one difficulty, each from
 * a different official skill when possible, preferring skills not yet used.
 */
export function pickModule(section, difficulty, exclude = [], size = 4) {
  const pool = shuffle(QUESTIONS.filter((q) => q.section === section && q.difficulty === difficulty && !exclude.includes(q.id)));
  const usedBefore = new Set(exclude.map((id) => getQuestion(id)?.cb));
  const picked = [];
  const skills = new Set();
  const take = (test) => pool.forEach((q) => {
    if (picked.length < size && !picked.includes(q) && test(q)) { picked.push(q); skills.add(q.cb); }
  });
  take((q) => !usedBefore.has(q.cb) && !skills.has(q.cb));   // new skills first
  take((q) => !skills.has(q.cb));                             // then any skill not in this module
  take(() => true);                                           // then anything left
  return picked.sort((a, b) => orderIndex(a) - orderIndex(b)).map((q) => q.id);
}

export function createRun(kind) {
  const spec = TEST_KINDS[kind];
  return {
    kind,
    label: spec.label,
    full: Boolean(spec.full),
    sections: spec.sections.map((section) => ({
      section,
      m1: spec.full ? [...spec.full.sections[section].m1] : pickModule(section, 2, [], spec.size),
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

export const routeFor = (m1Correct, m1Length, full = false) => (m1Correct >= routeThreshold(m1Length, full) ? 'harder' : 'easier');

/** The Module 2 question ids for a section once its route is known. */
export function module2For(run, sec) {
  const spec = TEST_KINDS[run.kind];
  if (spec.full) return [...spec.full.sections[sec.section][sec.route]];
  return pickModule(sec.section, sec.route === 'harder' ? 3 : 1, sec.m1, spec.size);
}

/* Share of questions right → section score on the harder route. */
const CURVE = [[0, 200], [0.25, 330], [0.5, 480], [0.7, 600], [0.85, 690], [0.95, 760], [1, 800]];
function onCurve(share) {
  for (let i = 1; i < CURVE.length; i++) {
    const [x1, y1] = CURVE[i];
    const [x0, y0] = CURVE[i - 1];
    if (share <= x1) return y0 + ((share - x0) / (x1 - x0)) * (y1 - y0);
  }
  return 800;
}

export const ROUTE_CEILING = { harder: 800, easier: 640 };

/** Section estimate (200–800). The harder route can reach 800; the easier route cannot. */
export function estimateSection(route, m1Correct, m2Correct, m1Length, m2Length) {
  const share = (m1Correct + m2Correct) / Math.max(1, m1Length + m2Length);
  const raw = route === 'harder' ? onCurve(share) + 10 : onCurve(share) - 70;
  return Math.max(200, Math.min(ROUTE_CEILING[route], Math.round(raw / 10) * 10));
}

