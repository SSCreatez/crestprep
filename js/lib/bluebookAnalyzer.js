/**
 * bluebookAnalyzer.js: turns a practice test's missed questions into a plan.
 *
 *  1. Count misses per official skill and per domain.
 *  2. Rank weak spots: the skill that cost the most questions comes first.
 *  3. For each weak spot, build recommendations:
 *       - the exact SAT Suite Question Bank filters
 *       - "Saransh personally recommends!": a YouTube walkthrough (data/resources.js)
 *       - the matching CrestPrep lesson and practice set
 *  4. Write a short plain-English summary.
 *
 * A result looks like: { label, scores, misses: { 'nonlinear-functions': 3, ... } }.
 * Uploads and the diagnostic both produce this shape, so both use this file.
 */
import { CB_DOMAINS, getSkill, getDomain } from '../data/cbSkills.js';
import { RESOURCES, videoFor } from '../data/resources.js';
import { LESSONS } from '../data/course.js';
import { getQuestion } from '../data/questions.js';

export const QUESTION_BANK_URL = 'https://satsuitequestionbank.collegeboard.org/';
const SECTION_NAME = { rw: 'Reading and Writing', math: 'Math' };

/**
 * The CrestPrep lessons for a weak spot: the skill drill for that exact
 * official skill (or, failing that, the first practice set in its domain),
 * and the note guide in the same chapter.
 */
export function lessonsFor(domainKey, skillId = null) {
  const drill = (skillId && LESSONS.find((l) => l.kind === 'practice' && l.skill === skillId))
    || LESSONS.find((l) => l.kind === 'practice' && l.questions.some((id) => getQuestion(id).skill === domainKey));
  const guide = drill && LESSONS.find((l) => l.kind === 'guide' && l.chapterId === drill.chapterId);
  const link = (lesson) => lesson && { id: lesson.id, title: lesson.title, minutes: lesson.minutes, href: `#/practice/${lesson.id}` };
  return { guide: link(guide), drill: link(drill) };
}

function recommendationsFor(skill) {
  const { guide, drill } = lessonsFor(skill.domain, skill.id);
  return {
    questionBank: ['SAT', SECTION_NAME[skill.section], getDomain(skill.domain).label, skill.name],
    video: videoFor(skill),
    tip: RESOURCES[skill.id]?.tip || null,
    lesson: guide,
    drill,
  };
}

export function analyzeResult(result) {
  const spots = Object.entries(result.misses || {})
    .filter(([, count]) => count > 0)
    .map(([id, misses]) => ({ skill: getSkill(id), misses }))
    .filter((spot) => spot.skill)
    .sort((a, b) => b.misses - a.misses);

  const total = spots.reduce((sum, spot) => sum + spot.misses, 0);
  const domains = CB_DOMAINS
    .map((domain) => ({ domain, misses: spots.filter((s) => s.skill.domain === domain.key).reduce((sum, s) => sum + s.misses, 0) }))
    .filter((d) => d.misses > 0)
    .sort((a, b) => b.misses - a.misses);
  const weakSpots = spots.map((spot) => ({ ...spot, recs: recommendationsFor(spot.skill) }));

  return { total, domains, weakSpots, summary: summarize(total, domains, weakSpots) };
}

function summarize(total, domains, weakSpots) {
  if (!total) return 'No missed questions recorded. Try a harder practice set to find your next weak spot.';
  const bySection = { rw: 0, math: 0 };
  domains.forEach((d) => { bySection[d.domain.section] += d.misses; });
  const first = weakSpots.slice(0, 2).map((s) => `${s.skill.name} (${s.misses})`).join(' and ');
  const lean = bySection.math === bySection.rw
    ? 'Your misses are split evenly between the sections, so your calendar alternates them.'
    : `More of your misses came from ${bySection.math > bySection.rw ? 'Math' : 'Reading and Writing'} (${Math.max(bySection.math, bySection.rw)} of ${total}), so your calendar leans that way.`;
  return `You missed ${total} question${total === 1 ? '' : 's'}. ${domains[0].domain.label} cost you the most, with ${domains[0].misses}. Start with ${first}. ${lean}`;
}
