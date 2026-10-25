/**
 * tests.js: the full-length CrestPrep practice tests, assembled like Bluebook.
 *
 *   Reading and Writing: Module 1 (27 questions) → Module 2 (27 questions)
 *   Math:                Module 1 (22 questions) → Module 2 (22 questions)
 *
 * Each test file holds Module 1 plus a slightly larger Module 2 pool. The
 * harder Module 2 leaves out the 6 easiest questions in the pool; the easier
 * Module 2 leaves out the 6 hardest. Questions keep their written order.
 */
import { TEST1 } from './test1.js';
import { TEST2 } from './test2.js';
import { TEST3 } from './test3.js';

export const MODULE_LENGTH = { rw: 27, math: 22 };

function assemble(n, list) {
  const sections = {};
  for (const section of ['rw', 'math']) {
    const m1 = list.filter((q) => q.section === section && q.mod === 1).map((q) => q.id);
    const pool = list.filter((q) => q.section === section && q.mod === 2);
    const size = MODULE_LENGTH[section];
    const ranked = pool.map((q, i) => ({ q, i })).sort((a, b) => a.q.difficulty - b.q.difficulty || a.i - b.i);
    const pick = (slice) => slice.sort((a, b) => a.i - b.i).map(({ q }) => q.id);
    sections[section] = {
      m1,
      easier: pick(ranked.slice(0, size)),
      harder: pick(ranked.slice(ranked.length - size)),
    };
  }
  return { n, kind: `full${n}`, label: `CrestPrep Practice Test ${n}`, sections };
}

const SOURCES = [TEST1, TEST2, TEST3].filter((list) => list.length);
export const TEST_QUESTIONS = SOURCES.flat();
export const FULL_TESTS = SOURCES.map((list, i) => assemble(i + 1, list));
