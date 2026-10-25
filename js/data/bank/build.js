/**
 * build.js: turns the short question lines in this folder into full question
 * objects (the same shape as the ones in data/questions.js).
 *
 * Every official College Board skill has a short code (wic, tra, lin1, circ...).
 * The code fills in the official skill, its domain, the tutor's pattern name,
 * three written hints, a plain-English version, and a Desmos tip, so each
 * question line only needs its own passage, choices, answer, steps, and trap.
 *
 * All passages and problems in this folder are original CrestPrep writing,
 * modeled on the skills and question types in College Board's practice tests.
 */
import { CB_SKILLS } from '../cbSkills.js';

const BY_NAME = new Map(CB_SKILLS.map((s) => [s.name, s]));

const MATH_PLAIN = 'Solve the problem, then read the last line again to check exactly what it asks for.';

export const CODES = {
  /* ------------------------------ Reading and Writing ------------------------------ */
  wic: { name: 'Words in Context', pattern: 'Words in context: predict before you peek',
    hints: ['Cover the choices. What word would you write in the blank, using only clues from the text?',
      'Find the clue that sets the meaning: a contrast word, a description after a colon, or an example.',
      'Test each choice in the blank. Does it match the clue in direction (positive or negative) and strength?'],
    plain: 'Choose the word that fits the meaning of the text best.' },
  tsp: { name: 'Text Structure and Purpose', pattern: 'Purpose and structure: describe what the text does',
    hints: ['Label what each sentence does in a few words: introduces, contrasts, gives an example, concludes.',
      'Ask why the author wrote it this way, not only what it says.',
      'Cross out choices that are only half right or describe something the text never does.'],
    plain: 'Decide what the text, or the underlined part, is doing.' },
  ctc: { name: 'Cross-Text Connections', pattern: 'Cross-text: state each claim, then compare',
    hints: ['Put Text 1’s main claim in your own words.',
      'Now put Text 2’s view on the same topic in your own words. Agree, disagree, or add a condition?',
      'Choose the reaction the Text 2 author would actually have, based only on what Text 2 says.'],
    plain: 'There are two short texts. Compare what the two authors think.' },
  cid: { name: 'Central Ideas and Details', pattern: 'Main idea: what does every sentence support?',
    hints: ['What single point do all the sentences support?',
      'Watch for a turn ("however," "but," "in fact"). The main point often comes right after it.',
      'Cross out choices that are too narrow (one detail) or too broad (beyond the text).'],
    plain: 'Find the main idea, or a detail the text states directly.' },
  coe: { name: 'Command of Evidence', pattern: 'Evidence: match every part of the claim',
    hints: ['Restate the exact claim or hypothesis, including every part of it.',
      'For a table, find the rows and columns the claim is about before reading the choices.',
      'The answer must be true and relevant. A true statement that does not support the claim is still wrong.'],
    plain: 'Choose the evidence (a quotation, a finding, or data) that best supports or weakens the claim.' },
  inf: { name: 'Inferences', pattern: 'Inference: what must be true?',
    hints: ['Summarize the reasoning so far in one sentence.',
      'The blank finishes the argument. What conclusion follows directly from the evidence given?',
      'Reject choices that need an extra assumption or go further than the text supports.'],
    plain: 'Choose the ending that follows logically from the text.' },
  syn: { name: 'Rhetorical Synthesis', pattern: 'Rhetorical synthesis: match the goal',
    hints: ['Read the goal in the question first. Underline its key words (emphasize, contrast, introduce, explain).',
      'Which notes does that goal need? Ignore the rest.',
      'Choose the sentence that does exactly what the goal asks. True but off-goal is wrong.'],
    plain: 'Use the notes to pick the sentence that does what the question asks.' },
  tra: { name: 'Transitions', pattern: 'Transitions: name the relationship first',
    hints: ['Cover the choices. How does this sentence relate to the one before it?',
      'Is it a contrast, a cause and effect, an example, an addition, or a next step in time?',
      'Choose the transition that names that relationship.'],
    plain: 'Choose the linking word or phrase that makes the most sense.' },
  bnd: { name: 'Boundaries', pattern: 'Boundaries: find the independent clauses',
    hints: ['Find the subject and verb on each side of the blank. Could each side stand alone as a sentence?',
      'Two complete sentences need a period, a semicolon, a colon, or a comma plus and/but/so.',
      'If one side cannot stand alone, look for a comma or no punctuation at all. Dashes and commas come in matching pairs.'],
    plain: 'Choose the correct punctuation.' },
  fss: { name: 'Form, Structure, and Sense', pattern: 'Grammar: agreement, verb form, and modifiers',
    hints: ['Find the subject that goes with the verb. Skip the phrases in between.',
      'Singular subject, singular verb; plural subject, plural verb. Match the tense the rest of the text uses.',
      'If a sentence opens with a description, the noun right after the comma must be the thing described.'],
    plain: 'Choose the grammatically correct word or phrase.' },

  /* ------------------------------------- Math ------------------------------------- */
  lin1: { name: 'Linear equations in one variable', pattern: 'Linear equation: isolate the variable',
    hints: ['Undo the operations in reverse order: addition and subtraction first, then multiplication and division.',
      'If parentheses appear, distribute before moving terms.',
      'Check the last line: does it ask for x, or for an expression like 2x + 1?'],
    desmosTip: 'Type the equation with x and Desmos draws a vertical line at the solution.' },
  linf: { name: 'Linear functions', pattern: 'Linear function: slope is the rate, intercept is the start',
    hints: ['In f(x) = mx + b, m is the change per 1 unit of x and b is the value when x = 0.',
      'From two points, slope = (change in output) ÷ (change in input).',
      'In word problems, the starting amount is the intercept and the per-unit amount is the slope.'],
    desmosTip: 'Enter the function and tap the graph at the x-value you need.' },
  lin2: { name: 'Linear equations in two variables', pattern: 'Two-variable linear: slope, intercepts, meaning',
    hints: ['Rewrite the equation as y = mx + b to read the slope and y-intercept.',
      'For an x-intercept, set y = 0. For a y-intercept, set x = 0.',
      'In context, each coefficient is a rate: what does one more unit of that variable add?'],
    desmosTip: 'Type the equation as given; Desmos labels intercepts when you tap them.' },
  sys: { name: 'Systems of two linear equations in two variables', pattern: 'Systems: solve together or graph the intersection',
    hints: ['Add or subtract the equations to eliminate one variable, or substitute one into the other.',
      'Double-check which variable the question asks for.',
      'No solution means parallel lines: same slope, different intercept. Infinitely many means the same line.'],
    desmosTip: 'Type both equations and tap the intersection point.' },
  ineq: { name: 'Linear inequalities in one or two variables', pattern: 'Inequalities: translate, then test values',
    hints: ['"At most" means ≤ and "at least" means ≥.',
      'When you multiply or divide by a negative number, flip the inequality sign.',
      'With answer choices, plug each one in and keep the one that makes every inequality true.'],
    desmosTip: 'Type the inequalities; the overlapping shaded region holds every solution.' },
  nlf: { name: 'Nonlinear functions', pattern: 'Nonlinear functions: exponential and quadratic models',
    hints: ['Exponential: a(1 + r)^t grows by a percent; a(1 − r)^t shrinks by a percent.',
      'Quadratic: the vertex is the maximum or minimum; the roots are where f(x) = 0.',
      'Substitute the given input carefully, including any negative sign.'],
    desmosTip: 'Graph the function and tap the vertex, intercepts, or the point you need.' },
  nle: { name: 'Nonlinear equations in one variable and systems of equations in two variables', pattern: 'Nonlinear equations: factor, discriminant, or graph',
    hints: ['Get everything on one side so it equals 0, then try factoring.',
      'The discriminant b² − 4ac tells you how many real solutions: positive two, zero one, negative none.',
      'For a system, set the two expressions for y equal to each other.'],
    desmosTip: 'Graph both sides (or both equations) and count or tap the intersections.' },
  eqv: { name: 'Equivalent expressions', pattern: 'Equivalent expressions: expand, factor, simplify',
    hints: ['Distribute or FOIL carefully, then combine like terms.',
      'If two expressions are equal for every x, the matching coefficients are equal.',
      'Watch the signs when you subtract a whole expression in parentheses.'],
    desmosTip: 'Graph the original and a choice: equivalent expressions draw the exact same curve.' },
  rat: { name: 'Ratios, rates, proportional relationships, and units', pattern: 'Ratios and units: set up the proportion',
    hints: ['Write the rate with units, like miles per hour, and let the units guide you.',
      'For a ratio, set up two equal fractions and cross-multiply.',
      'Convert units before you compute, and check which unit the answer needs.'],
    desmosTip: 'Not needed. A proportion or a unit conversion is faster by hand.' },
  pct: { name: 'Percentages', pattern: 'Percentages: multiply by (1 ± rate)',
    hints: ['Change the percent to a decimal: 35% is 0.35.',
      'An increase of p% multiplies by (1 + p/100); a decrease multiplies by (1 − p/100).',
      'For several changes, multiply the factors in order. Do not add the percents.'],
    desmosTip: 'Use Desmos as a quick calculator for the multiplication.' },
  one: { name: 'One-variable data: distributions and measures of center and spread', pattern: 'Data: mean, median, range, and spread',
    hints: ['Mean = total ÷ count. Median = the middle value after sorting.',
      'An extreme value pulls the mean but barely moves the median.',
      'Standard deviation measures spread: values packed near the mean give a small one.'],
    desmosTip: 'Type mean([...]) or median([...]) with your list of values.' },
  two: { name: 'Two-variable data: models and scatterplots', pattern: 'Scatterplots: read and interpret the model',
    hints: ['Plug the given x-value into the line of best fit to predict y.',
      'The slope is the predicted change in y for each 1-unit increase in x.',
      'Constant differences mean linear; constant ratios mean exponential.'],
    desmosTip: 'Type the model and tap the graph at the x-value you need.' },
  prob: { name: 'Probability and conditional probability', pattern: 'Probability: the part over the right whole',
    hints: ['Probability = favorable outcomes ÷ total outcomes in the group you are choosing from.',
      '"Given that" or "if a student who..." shrinks the whole to that group only.',
      'For two independent events in a row, multiply their probabilities.'],
    desmosTip: 'Not needed. Read the right row or column and divide.' },
  samp: { name: 'Inference from sample statistics and margin of error', pattern: 'Sampling: estimate, margin, and who it applies to',
    hints: ['A random sample can be generalized only to the population it was drawn from.',
      'Estimate ± margin of error gives the plausible range for the whole population.',
      'To estimate a count, multiply the sample proportion by the population size.'],
    desmosTip: 'Not needed. These are reasoning questions.' },
  stud: { name: 'Evaluating statistical claims: observational studies and experiments', pattern: 'Study design: random sampling vs. random assignment',
    hints: ['Random assignment to groups is what allows a cause-and-effect conclusion.',
      'Random selection from a population is what allows generalizing to that population.',
      'With only an observational study, say "associated with," not "causes."'],
    desmosTip: 'Not needed. These are reasoning questions.' },
  area: { name: 'Area and volume', pattern: 'Area and volume: write the formula first',
    hints: ['Write the formula before plugging in (the reference sheet has them all).',
      'Radius is half the diameter. Check whether you were given one or the other.',
      'If lengths are scaled by k, area scales by k² and volume by k³.'],
    desmosTip: 'Not needed. Write the formula and substitute.' },
  lat: { name: 'Lines, angles, and triangles', pattern: 'Angles and triangles: 180°, vertical angles, similar triangles',
    hints: ['Angles in a triangle sum to 180°. Angles on a straight line also sum to 180°.',
      'Vertical angles are equal. Parallel lines cut by a transversal make equal corresponding angles.',
      'Similar triangles have proportional sides: set up a ratio of matching sides.'],
    desmosTip: 'Not needed. Label the figure and use angle rules.' },
  trig: { name: 'Right triangles and trigonometry', pattern: 'Right triangles: SOH-CAH-TOA and Pythagoras',
    hints: ['Label the sides: opposite, adjacent, hypotenuse, relative to the angle you care about.',
      'sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.',
      'In a right triangle the two acute angles add to 90°, so sin of one equals cos of the other.'],
    desmosTip: 'Desmos can evaluate sin and cos, but check that it is in degree mode.' },
  circ: { name: 'Circles', pattern: 'Circles: center, radius, and arcs',
    hints: ['Standard form (x − h)² + (y − k)² = r² has center (h, k) and radius r.',
      'If the equation is expanded, complete the square for x and for y.',
      'An arc is a fraction of the circle: (central angle ÷ 360) × circumference.'],
    desmosTip: 'Type the circle equation and tap the graph to find the center and radius.' },
};

export const STEMS = {
  wic: 'Which choice completes the text with the most logical and precise word or phrase?',
  purpose: 'Which choice best describes the main purpose of the text?',
  structure: 'Which choice best describes the overall structure of the text?',
  function: 'Which choice best describes the function of the underlined sentence in the text as a whole?',
  portion: 'Which choice best describes the function of the underlined portion in the text as a whole?',
  main: 'Which choice best states the main idea of the text?',
  complete: 'Which choice most logically completes the text?',
  table: 'Which choice most effectively uses data from the table to complete the statement?',
  conv: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
  trans: 'Which choice completes the text with the most logical transition?',
};

/** "While researching a topic, a student has taken the following notes:" with a bullet list. */
export const notes = (...items) =>
  `While researching a topic, a student has taken the following notes:<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

/** The stem for a rhetorical synthesis question. */
export const goal = (text) =>
  `The student wants to ${text}. Which choice most effectively uses relevant information from the notes to accomplish this goal?`;

/** A small data table for a passage or a math question. */
export const table = (caption, head, rows) =>
  `<table class="q-table"><caption>${caption}</caption><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>`
  + `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

/** Two-text passages for cross-text questions. */
export const twoTexts = (one, two) => `<p><strong>Text 1</strong><br>${one}</p><p><strong>Text 2</strong><br>${two}</p>`;

function make(section, code, fields) {
  const info = CODES[code];
  const cb = info && BY_NAME.get(info.name);
  if (!cb) throw new Error(`Unknown skill code "${code}" on ${fields.id}`);
  const { hint, ...rest } = fields;
  return {
    section,
    skill: cb.domain,
    cb: cb.id,
    pattern: info.pattern,
    hints: hint ? [hint, ...info.hints.slice(0, 2)] : info.hints,
    plain: section === 'math' ? MATH_PLAIN : info.plain,
    desmosTip: info.desmosTip,
    ...rest,
    steps: Array.isArray(fields.steps) ? fields.steps : [fields.steps],
  };
}

/** One Reading and Writing question. `stem` can be a key of STEMS or full text. */
export function rw(id, code, difficulty, passage, stem, choices, answer, steps, trap, extra = {}) {
  return make('rw', code, { id, difficulty, passage, stem: STEMS[stem] || stem, choices, answer, steps, trap, ...extra });
}

/** One Math question. */
export function math(id, code, difficulty, stem, choices, answer, steps, trap, extra = {}) {
  return make('math', code, { id, difficulty, stem, choices, answer, steps, trap, ...extra });
}

/**
 * Makers for one full-length test. Each call adds a question and numbers it:
 *   R1 / R2 → Reading and Writing Module 1 / Module 2 pool
 *   M1 / M2 → Math Module 1 / Module 2 pool
 */
export function testMakers(n) {
  const list = [];
  const counts = {};
  const add = (key, section, mod) => (...args) => {
    counts[key] = (counts[key] || 0) + 1;
    const id = `t${n}-${key}-${String(counts[key]).padStart(2, '0')}`;
    const q = section === 'rw' ? rw(id, ...args) : math(id, ...args);
    list.push({ ...q, bank: `test${n}`, mod });
  };
  return { list, R1: add('rw1', 'rw', 1), R2: add('rw2', 'rw', 2), M1: add('m1', 'math', 1), M2: add('m2', 'math', 2) };
}
