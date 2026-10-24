/**
 * cbSkills.js: College Board's official Digital SAT domains and skills, the
 * same names used in Bluebook score details and the SAT Suite Question Bank.
 * Domain keys match data/skills.js, so practice questions and uploads line up.
 */
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const CB_DOMAINS = [
  { key: 'information_ideas', section: 'rw', label: 'Information and Ideas',
    skills: ['Central Ideas and Details', 'Command of Evidence', 'Inferences'] },
  { key: 'craft_structure', section: 'rw', label: 'Craft and Structure',
    skills: ['Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections'] },
  { key: 'expression_of_ideas', section: 'rw', label: 'Expression of Ideas',
    skills: ['Rhetorical Synthesis', 'Transitions'] },
  { key: 'standard_english', section: 'rw', label: 'Standard English Conventions',
    skills: ['Boundaries', 'Form, Structure, and Sense'] },
  { key: 'algebra', section: 'math', label: 'Algebra',
    skills: ['Linear equations in one variable', 'Linear functions', 'Linear equations in two variables',
      'Systems of two linear equations in two variables', 'Linear inequalities in one or two variables'] },
  { key: 'advanced_math', section: 'math', label: 'Advanced Math',
    skills: ['Nonlinear functions', 'Nonlinear equations in one variable and systems of equations in two variables', 'Equivalent expressions'] },
  { key: 'problem_solving', section: 'math', label: 'Problem-Solving and Data Analysis',
    skills: ['Ratios, rates, proportional relationships, and units', 'Percentages',
      'One-variable data: distributions and measures of center and spread', 'Two-variable data: models and scatterplots',
      'Probability and conditional probability', 'Inference from sample statistics and margin of error',
      'Evaluating statistical claims: observational studies and experiments'] },
  { key: 'geometry_trig', section: 'math', label: 'Geometry and Trigonometry',
    skills: ['Area and volume', 'Lines, angles, and triangles', 'Right triangles and trigonometry', 'Circles'] },
];

export const CB_SKILLS = CB_DOMAINS.flatMap((d) =>
  d.skills.map((name) => ({ id: slug(name), name, domain: d.key, section: d.section })),
);
const BY_ID = new Map(CB_SKILLS.map((s) => [s.id, s]));
export const getSkill = (id) => BY_ID.get(id);
export const getDomain = (key) => CB_DOMAINS.find((d) => d.key === key);

/** The official skill each CrestPrep practice question tests (the diagnostic uses this). */
export const QUESTION_TO_SKILL = {
  'm-alg-01': 'linear-equations-in-one-variable',
  'm-psd-01': 'ratios-rates-proportional-relationships-and-units',
  'm-psd-02': 'one-variable-data-distributions-and-measures-of-center-and-spread',
  'm-psd-03': 'ratios-rates-proportional-relationships-and-units',
  'm-alg-02': 'linear-equations-in-two-variables',
  'm-alg-03': 'systems-of-two-linear-equations-in-two-variables',
  'm-adv-01': 'nonlinear-functions',
  'm-geo-01': 'right-triangles-and-trigonometry',
  'm-adv-02': 'nonlinear-functions',
  'm-adv-03': 'equivalent-expressions',
  'm-psd-04': 'percentages',
  'm-adv-04': 'nonlinear-equations-in-one-variable-and-systems-of-equations-in-two-variables',
  'm-geo-02': 'circles',
  'r-sec-01': 'form-structure-and-sense',
  'r-sec-02': 'form-structure-and-sense',
  'r-eoi-01': 'transitions',
  'r-sec-03': 'boundaries',
  'r-eoi-02': 'transitions',
  'r-cs-01': 'words-in-context',
  'r-ii-01': 'central-ideas-and-details',
  'r-cs-02': 'words-in-context',
  'r-ii-02': 'inferences',
  'r-eoi-03': 'rhetorical-synthesis',
};
