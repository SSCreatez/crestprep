/**
 * course.js: the curriculum shown in the course player's sidebar.
 *
 * A chapter holds lessons. A lesson is either:
 *   kind: 'guide'     → a written note guide (blocks of text, rules, tables, traps)
 *   kind: 'practice'  → a practice set (a list of question ids from questions.js)
 *
 * Note guide block types: p, rule, trap, steps (numbered, for real sequences),
 * list (bulleted), table, example. Rendered by components/noteGuide.js.
 *
 * Skill drills: every official College Board skill has a three-question drill
 * (easy → medium → hard) from data/bank/drills.js. A drill has `skill` set to
 * the official skill id, which is how breakdown recommendations link to it.
 */
import { DRILLS } from './bank/drills.js';

function skillDrill(skill, title, rule) {
  return {
    id: `drill-${skill}`, kind: 'practice', skill, title: `Skill drill: ${title}`, rule,
    questions: DRILLS.filter((q) => q.cb === skill).sort((a, b) => a.difficulty - b.difficulty).map((q) => q.id),
  };
}

export const COURSE = {
  title: 'Digital SAT Ultimate Course',
  chapters: [
    {
      id: 'welcome',
      title: 'Welcome to the course & adaptive SAT guide',
      header: 'Digital SAT Ultimate Course',
      subhead: 'Start here: how the test and this course work',
      lessons: [
        {
          id: 'welcome-sat', kind: 'guide', minutes: 6,
          title: 'How the Digital SAT works',
          guide: [
            { type: 'p', text: `The Digital SAT is taken on a laptop or tablet in College Board's Bluebook app. It has two sections, and each section is split into two modules.` },
            { type: 'table', head: ['Section', 'Modules', 'Questions', 'Time'], rows: [
              ['Reading & Writing', '2 modules of 27', '54', '64 minutes'],
              ['Math', '2 modules of 22', '44', '70 minutes'],
            ] },
            { type: 'p', text: `You get a 10-minute break between the two sections. A graphing calculator (Desmos) is built into Bluebook for the entire Math section.` },
            { type: 'rule', title: 'How the adaptive part works', text: `Your Module 1 results decide which Module 2 you see. Do well in Module 1 and you get a harder Module 2. Only the harder Module 2 can take you to the top of the score range.` },
            { type: 'trap', text: `Rushing Module 1 to "save time for the hard questions" backfires. Module 1 accuracy is what unlocks the harder module.` },
            { type: 'steps', title: 'How to use this course', items: [
              `Add a Bluebook practice test in Crest Ingest, or take the diagnostic in the Tests tab, to find your starting point.`,
              `Set your goal score and test date on Home so CrestPrep can build your study calendar.`,
              `Read each note guide, then do the practice set that follows it. Your calendar checks them off for you.`,
              `Every Wednesday, redo the questions in your error log.`,
            ] },
          ],
        },
        {
          id: 'welcome-tools', kind: 'guide', minutes: 3,
          title: 'Your tools: Desmos, tutor, and language helper',
          guide: [
            { type: 'p', text: `Three tools sit in the bar above every lesson. Open one and it slides in beside the question, so you never lose your place.` },
            { type: 'list', items: [
              `<strong>Desmos calculator.</strong> The same graphing calculator you will use on test day. Questions with a Desmos shortcut can load their equations for you in one click.`,
              `<strong>Tutor.</strong> Asks you questions and gives hints one step at a time. It never gives away the answer, because working it out yourself is what makes it stick.`,
              `<strong>Language helper.</strong> Shows a plain-English version of the question and translates the key words into Español, हिन्दी, 中文, or Tiếng Việt.`,
            ] },
            { type: 'rule', title: 'When to reach for Desmos', text: `Use Desmos when a question gives you equations you could graph: systems, quadratics, circles, or an unknown constant you can turn into a slider. For plain arithmetic, solving by hand is faster.` },
          ],
        },
      ],
    },
    {
      id: 'rw-intro',
      title: 'Intro to Reading & Writing + written note guides',
      header: 'Reading & Writing Course',
      subhead: 'Written note guides for every question type',
      lessons: [
        {
          id: 'rw-families', kind: 'guide', minutes: 4,
          title: 'The four question types in Reading & Writing',
          guide: [
            { type: 'p', text: `Every Reading & Writing question comes with its own short passage, usually 25 to 150 words. There is one question per passage, so you never juggle long texts.` },
            { type: 'table', head: ['Question type', 'What it tests', 'Share of section'], rows: [
              ['Craft & Structure', 'Words in context, text structure and purpose, connections between two texts', 'About 28%'],
              ['Information & Ideas', 'Main idea, details, evidence, and inferences', 'About 26%'],
              ['Standard English Conventions', 'Sentence boundaries, punctuation, verb agreement and tense', 'About 26%'],
              ['Expression of Ideas', 'Transitions and rhetorical synthesis (notes questions)', 'About 20%'],
            ] },
            { type: 'rule', title: 'Read the question first', text: `The question tells you what to look for: a main idea, a missing word, a punctuation mark. Read it before the passage so you read with a purpose.` },
            { type: 'p', text: `Chapters 1 to 3 cover each type with a note guide followed by a practice set.` },
          ],
        },
      ],
    },
    {
      id: 'boundaries',
      title: 'Chapter 1: Sentence structure & boundaries',
      header: 'Reading & Writing Course',
      subhead: 'Chapter 1: Sentence structure and boundaries',
      lessons: [
        {
          id: 'boundaries-guide', kind: 'guide', minutes: 5,
          title: 'Note guide: joining independent clauses',
          guide: [
            { type: 'p', text: `An independent clause has a subject and a verb and can stand alone as a sentence. Most boundary questions ask how two of them should be joined.` },
            { type: 'table', head: ['Way to join two independent clauses', 'Example'], rows: [
              ['Period', 'The experiment had finished. The lab closed early.'],
              ['Semicolon', 'The experiment had finished; the lab closed early.'],
              ['Comma + FANBOYS (for, and, nor, but, or, yet, so)', 'The experiment had finished, so the lab closed early.'],
              ['Colon, when the second clause explains the first', 'The lab closed early: the experiment had finished.'],
            ] },
            { type: 'rule', title: 'The comma splice rule', text: `A comma by itself can never join two independent clauses. On the SAT, a comma splice is always wrong.` },
            { type: 'trap', text: `Words like "however" and "therefore" are not FANBOYS. "The experiment had finished, however, the lab stayed open" is still a comma splice. Write "The experiment had finished; however, the lab stayed open."` },
            { type: 'steps', title: 'How to answer a boundary question', items: [
              `Read the words before the blank. Could they stand alone as a sentence?`,
              `Read the words after the blank. Could they stand alone too?`,
              `If both can, you need a period, a semicolon, a colon, or a comma plus FANBOYS.`,
              `If only one can, you usually need a single comma or no punctuation at all.`,
            ] },
          ],
        },
        {
          id: 'boundaries-practice', kind: 'practice',
          title: 'Practice: boundaries, plurals, and agreement',
          rule: `Two complete sentences need a period, a semicolon, a colon, or a comma + FANBOYS. A comma alone is a splice.`,
          questions: ['r-sec-03', 'r-sec-02', 'r-sec-01'],
        },
        skillDrill('boundaries', 'Boundaries', `Check whether each side of the blank could stand alone. Extra information gets matching punctuation on both sides.`),
      ],
    },
    {
      id: 'transitions',
      title: 'Chapter 2: Transitions & rhetorical synthesis',
      header: 'Reading & Writing Course',
      subhead: 'Chapter 2: Transitions and rhetorical synthesis',
      lessons: [
        {
          id: 'transitions-guide', kind: 'guide', minutes: 5,
          title: 'Note guide: transitions and notes questions',
          guide: [
            { type: 'p', text: `Transition questions give you two ideas and ask for the word that connects them. The right answer depends only on how the ideas relate, so figure that out before you look at the choices.` },
            { type: 'table', head: ['Relationship', 'Transitions that signal it'], rows: [
              ['Same direction (adding on)', 'also, furthermore, similarly, in addition'],
              ['Opposite direction (contrast)', 'however, by contrast, nevertheless, still'],
              ['Cause and result', 'therefore, consequently, as a result, thus'],
              ['Example', 'for example, for instance'],
              ['Time or sequence', 'then, later, finally, previously'],
            ] },
            { type: 'steps', title: 'Name the relationship first', items: [
              `Cover the answer choices.`,
              `Read the sentence before the blank and the sentence with the blank.`,
              `Say the relationship in your own words: same, opposite, cause, example, or time.`,
              `Pick the choice that matches. Two choices that mean the same thing cancel each other out.`,
            ] },
            { type: 'rule', title: 'Rhetorical synthesis: match the goal', text: `In notes questions, read the goal in the question first. The right answer does exactly what the goal asks, not the choice with the most detail or the most interesting fact.` },
            { type: 'trap', text: `Every choice in a notes question is true according to the notes. Being true is not enough; it has to accomplish the goal.` },
          ],
        },
        {
          id: 'transitions-practice', kind: 'practice',
          title: 'Practice: transitions and synthesis',
          rule: `Name the relationship (same, opposite, cause, example) before you read the choices. For notes questions, match the goal.`,
          questions: ['r-eoi-01', 'r-eoi-02', 'r-eoi-03'],
        },
        skillDrill('transitions', 'Transitions', `Cover the choices and name the relationship first: contrast, cause, example, addition, or sequence.`),
        skillDrill('rhetorical-synthesis', 'Rhetorical Synthesis', `Read the goal first. The right sentence does exactly that job, using only the notes it needs.`),
      ],
    },
    {
      id: 'context',
      title: 'Chapter 3: Words in context & evidence',
      header: 'Reading & Writing Course',
      subhead: 'Chapter 3: Words in context and reading for evidence',
      lessons: [
        {
          id: 'context-guide', kind: 'guide', minutes: 4,
          title: 'Note guide: predict before you peek',
          guide: [
            { type: 'p', text: `Words-in-context questions ask for the most precise word for a blank. Evidence and inference questions ask what the text supports. Both reward the same habit: decide what the text says before you read the choices.` },
            { type: 'steps', title: 'Predict before you peek', items: [
              `Cover the choices and read the full text.`,
              `Find the clue. Colons, dashes, and words like "although" or "in other words" often define the blank.`,
              `Put your own word in the blank.`,
              `Pick the choice closest to your word. Watch for the choice that means the exact opposite.`,
            ] },
            { type: 'rule', title: 'Stay inside the evidence', text: `For inference and main idea questions, the answer must be supported by the text alone. If you need outside knowledge to defend a choice, it is wrong.` },
            { type: 'trap', text: `Extreme words such as "only," "always," "never," and "proves" are usually too strong for what a short passage can support.` },
          ],
        },
        {
          id: 'context-practice', kind: 'practice',
          title: 'Practice: words in context and evidence',
          rule: `Predict your own word from the clue, then match it. For inferences, stay inside the evidence.`,
          questions: ['r-cs-01', 'r-ii-01', 'r-cs-02', 'r-ii-02'],
        },
        skillDrill('words-in-context', 'Words in Context', `Predict a word from the clue in the text, then pick the choice that matches it in meaning and strength.`),
      ],
    },
    {
      id: 'grammar-form',
      title: 'Chapter 4: Form, structure & sense (grammar)',
      header: 'Reading & Writing Course',
      subhead: 'Agreement, verb forms, pronouns, and modifiers',
      lessons: [
        {
          id: 'grammar-form-guide', kind: 'guide', minutes: 5,
          title: 'Note guide: making the words fit together',
          guide: [
            { type: 'p', text: `Form, Structure, and Sense questions check whether the words in a sentence fit together: verbs agree with their subjects, pronouns match the nouns they stand for, the sentence has a real main verb, and descriptions sit next to what they describe.` },
            { type: 'rule', title: 'Find the true subject', text: `Cross out the phrase between the subject and the verb ("of the old lighthouse," "along with her students"). Then match: singular subject, singular verb; plural subject, plural verb.` },
            { type: 'table', head: ['What changes in the choices', 'What to check', 'Example'], rows: [
              ['is / are, has / have', 'The true subject, not the nearest noun', 'The keys to the cabinet <em>are</em> missing.'],
              ['it / they, its / their', 'The noun the pronoun stands for', 'The studios built <em>their</em> own labs.'],
              ['publish / publishing / to publish', 'Does the sentence still need a main verb?', 'The team <em>published</em> its results in 2020.'],
              ['Who comes after the comma', 'Opening descriptions describe the next noun', 'Born in 1949, <em>the poet</em> wrote...'],
              ['students / student\u2019s / students\u2019', 'Plural, possessive, or both?', 'The <em>students\u2019</em> projects (projects owned by several students)'],
            ] },
            { type: 'steps', title: 'How to answer', items: [
              `Look at the choices first. What is changing: the verb, a pronoun, the word order, or an apostrophe?`,
              `Find what that word must agree with or describe.`,
              `Match number (singular or plural) and tense with the rest of the text.`,
            ] },
            { type: 'trap', text: `The noun closest to the blank is usually not the subject. "The list of names <em>are</em> long" is wrong because the list is long.` },
          ],
        },
        skillDrill('form-structure-and-sense', 'Form, Structure, and Sense', `Find the true subject, the pronoun's noun, or the thing being described, then make the blank agree with it.`),
      ],
    },
    {
      id: 'structure-purpose',
      title: 'Chapter 5: Purpose, structure & cross-text',
      header: 'Reading & Writing Course',
      subhead: 'What a text does, and how two texts compare',
      lessons: [
        {
          id: 'structure-purpose-guide', kind: 'guide', minutes: 5,
          title: 'Note guide: what is the text doing?',
          guide: [
            { type: 'p', text: `Purpose, structure, and function questions ask what the author is doing, not just what the text says. Cross-text questions give two short texts and ask how the authors would respond to each other.` },
            { type: 'steps', title: 'Label every sentence', items: [
              `Give each sentence a two- or three-word job: "old belief," "new evidence," "example," "objection," "conclusion."`,
              `For purpose questions, ask why the whole text exists. For function questions, ask what the underlined part does for the text around it.`,
              `Match your labels, in order, to a choice. Every part of the choice has to be true.`,
            ] },
            { type: 'rule', title: 'Cross-text: one line per author', text: `Write Text 1's claim in one line and Text 2's view in one line. The answer describes how the Text 2 author would react to Text 1, using only what Text 2 actually says.` },
            { type: 'trap', text: `Half-right choices: the first half matches the text, the second half adds something it never does (like "and proves it" when the text says the question is still open).` },
          ],
        },
        skillDrill('text-structure-and-purpose', 'Text Structure and Purpose', `Label what each sentence does, then match the whole sequence.`),
        skillDrill('cross-text-connections', 'Cross-Text Connections', `State each author's claim in one line. Answer only from what Text 2 says.`),
      ],
    },
    {
      id: 'ideas-evidence',
      title: 'Chapter 6: Main ideas, evidence & inferences',
      header: 'Reading & Writing Course',
      subhead: 'Central ideas, support from text and data, and logical conclusions',
      lessons: [
        {
          id: 'ideas-evidence-guide', kind: 'guide', minutes: 6,
          title: 'Note guide: prove it from the text',
          guide: [
            { type: 'p', text: `Information and Ideas questions reward one habit: every answer must be backed by the text or the data in front of you, with nothing added.` },
            { type: 'rule', title: 'Main idea', text: `Find the one point every sentence supports. Watch for a turn ("however," "in fact"): the main point often comes right after it. Too narrow (one detail) and too broad (beyond the text) are both wrong.` },
            { type: 'rule', title: 'Support or weaken a claim', text: `Write the claim with every part included. To support it, a finding must match all of it. To weaken it, a finding must show the expected pattern failing.` },
            { type: 'table', head: ['Data question step', 'What to do'], rows: [
              ['1. Read the claim', 'What exactly must the data show? Which groups or years?'],
              ['2. Find the rows', 'Locate only the rows and columns the claim mentions.'],
              ['3. Check every word', '"Every," "most," "increased," "more than": test each choice against the numbers.'],
            ] },
            { type: 'rule', title: 'Inferences', text: `The blank finishes an argument. Summarize the evidence in one sentence, then choose the conclusion that must follow from it, with no extra assumptions.` },
            { type: 'trap', text: `True but irrelevant: a choice can state a real fact from the text or table and still not support the claim being made.` },
          ],
        },
        skillDrill('central-ideas-and-details', 'Central Ideas and Details', `Find the point every sentence supports. Too narrow and too broad are both wrong.`),
        skillDrill('command-of-evidence', 'Command of Evidence', `Write the claim with all its parts. The answer must be true and must match every part.`),
        skillDrill('inferences', 'Inferences', `Summarize the evidence, then pick the conclusion that must follow, with nothing added.`),
      ],
    },
    {
      id: 'math-core',
      title: 'Math essentials: algebra, data, and geometry',
      header: 'Digital SAT Math Course',
      subhead: 'Essentials: algebra, data, and geometry',
      lessons: [
        {
          id: 'math-core-guide', kind: 'guide', minutes: 5,
          title: `Note guide: the points you can't afford to lose`,
          guide: [
            { type: 'p', text: `Algebra and Advanced Math each make up about 35% of the Math section; Problem-Solving & Data Analysis and Geometry & Trigonometry are about 15% each. Most of the easier points come down to a few habits.` },
            { type: 'rule', title: 'Solve for what they ask', text: `If the question asks for \\(6x - 4\\), you may not need x at all. Circle the last line of the question before you start.` },
            { type: 'table', head: ['Topic', 'What to remember'], rows: [
              ['Linear models', 'Total = fixed cost + rate × amount. The fixed part never changes.'],
              ['Ratios', 'Scale both parts by the same factor: 3 : 2 becomes 12 : 8.'],
              ['Mean vs. median', 'Mean = total ÷ count. Median = middle value in order. Outliers pull the mean, not the median.'],
              ['Exponential growth', 'start × (growth factor)<sup>number of steps</sup>. Doubling every 3 hours → \\(2^{t/3}\\).'],
              ['Right-triangle trig', 'For the two acute angles, the sine of one equals the cosine of the other.'],
            ] },
            { type: 'trap', text: `Many wrong answers are correct numbers from the middle of the problem: x when the question wants \\(6x - 4\\), or the slope when it wants the intercept.` },
          ],
        },
        {
          id: 'math-core-practice', kind: 'practice',
          title: 'Practice: essentials set',
          rule: `Circle what the question asks for. Wrong answers are often correct values from a middle step.`,
          questions: ['m-alg-01', 'm-psd-01', 'm-psd-03', 'm-psd-02', 'm-alg-02', 'm-geo-01', 'm-adv-02'],
        },
      ],
    },
    {
      id: 'algebra',
      title: 'Math: Algebra, every skill',
      header: 'Math Course',
      subhead: 'Linear equations, functions, systems, and inequalities',
      lessons: [
        {
          id: 'algebra-guide', kind: 'guide', minutes: 6,
          title: 'Note guide: lines, systems, and inequalities',
          guide: [
            { type: 'table', head: ['Form', 'Equation', 'What you can read off'], rows: [
              ['Slope-intercept', '\\(y = mx + b\\)', 'slope \\(m\\), y-intercept \\((0, b)\\)'],
              ['Standard', '\\(Ax + By = C\\)', 'slope \\(-\\frac{A}{B}\\); set \\(x = 0\\) or \\(y = 0\\) for intercepts'],
              ['Point-slope', '\\(y - y_1 = m(x - x_1)\\)', 'a point \\((x_1, y_1)\\) and slope \\(m\\)'],
            ] },
            { type: 'rule', title: 'Word problems', text: `The starting amount is the intercept; the amount "per" something is the slope. "$15 plus $0.10 per text" becomes \\(15 + 0.10t\\).` },
            { type: 'rule', title: 'How many solutions does a system have?', text: `Different slopes: exactly one. Same slope, different intercepts: none (parallel lines). Same line: infinitely many. For one equation in \\(x\\), "infinitely many" means both sides are identical after simplifying.` },
            { type: 'rule', title: 'Inequalities', text: `"At most" is ≤, "at least" is ≥. Flip the sign when you multiply or divide by a negative. With answer choices, plug each one in.` },
            { type: 'trap', text: `Answer what was asked. Many wrong choices are the value of a middle step, like \\(4x\\) instead of \\(x\\), or \\(y\\) instead of \\(x\\).` },
          ],
        },
        skillDrill('linear-equations-in-one-variable', 'Linear equations in one variable', `Undo operations in reverse order, and distribute first if there are parentheses.`),
        skillDrill('linear-functions', 'Linear functions', `Slope is the rate of change; the intercept is the starting value.`),
        skillDrill('linear-equations-in-two-variables', 'Linear equations in two variables', `Rewrite as y = mx + b to read the slope and intercept.`),
        skillDrill('systems-of-two-linear-equations-in-two-variables', 'Systems of linear equations', `Eliminate or substitute, or graph both lines and tap the intersection.`),
        skillDrill('linear-inequalities-in-one-or-two-variables', 'Linear inequalities', `Translate the words, then test the answer choices.`),
      ],
    },
    {
      id: 'advanced-math',
      title: 'Math: Advanced Math, every skill',
      header: 'Math Course',
      subhead: 'Quadratics, exponentials, and equivalent expressions',
      lessons: [
        {
          id: 'advanced-math-guide', kind: 'guide', minutes: 6,
          title: 'Note guide: quadratics and exponentials',
          guide: [
            { type: 'table', head: ['Quadratic form', 'Equation', 'Shows you'], rows: [
              ['Standard', '\\(y = ax^2 + bx + c\\)', 'y-intercept \\(c\\); vertex at \\(x = -\\frac{b}{2a}\\)'],
              ['Vertex', '\\(y = a(x - h)^2 + k\\)', 'vertex \\((h, k)\\), the max or min'],
              ['Factored', '\\(y = a(x - p)(x - q)\\)', 'x-intercepts \\(p\\) and \\(q\\); the vertex is halfway between them'],
            ] },
            { type: 'rule', title: 'Exponential models', text: `\\(a(1 + r)^t\\) grows by \\(r\\) (as a decimal) each period; \\(a(1 - r)^t\\) shrinks. The base tells you the percent: 1.03 is +3%, 0.85 is −15%. If the exponent is \\(\\frac{t}{4}\\), the change happens every 4 units of \\(t\\).` },
            { type: 'rule', title: 'Equivalent expressions', text: `Distribute and combine like terms carefully. If two polynomials are equal for every \\(x\\), match the coefficients of each power of \\(x\\).` },
            { type: 'example', title: 'Example', text: `\\((2x + a)(x - 3) = 2x^2 + bx - 15\\). Constants: \\(-3a = -15\\), so \\(a = 5\\). x-terms: \\(-6 + a = b\\), so \\(b = -1\\).` },
            { type: 'trap', text: `A question asking for the maximum value wants the y-value of the vertex, not the x-value where it happens.` },
          ],
        },
        skillDrill('nonlinear-functions', 'Nonlinear functions', `Know the three quadratic forms and what the base of an exponential means.`),
        skillDrill('nonlinear-equations-in-one-variable-and-systems-of-equations-in-two-variables', 'Nonlinear equations and systems', `Set equal to zero and factor, use the discriminant, or graph and count intersections.`),
        skillDrill('equivalent-expressions', 'Equivalent expressions', `Expand carefully, watch the signs, and match coefficients.`),
      ],
    },
    {
      id: 'data-analysis',
      title: 'Math: Problem-Solving & Data, every skill',
      header: 'Math Course',
      subhead: 'Rates, percents, statistics, probability, and studies',
      lessons: [
        {
          id: 'data-analysis-guide', kind: 'guide', minutes: 6,
          title: 'Note guide: percents, data, and studies',
          guide: [
            { type: 'rule', title: 'Percent change', text: `Increase by \\(p\\%\\): multiply by \\(1 + \\frac{p}{100}\\). Decrease: multiply by \\(1 - \\frac{p}{100}\\). Two changes in a row multiply; they never just add. "150% greater than \\(x\\)" means \\(2.5x\\).` },
            { type: 'rule', title: 'Center and spread', text: `Mean = total ÷ count; median = middle value in order. An outlier pulls the mean but barely moves the median. Standard deviation is small when values cluster near the mean.` },
            { type: 'rule', title: 'Probability', text: `Part ÷ whole, where the whole is the group you are choosing from. "If a student who chose salad is selected" makes the salad students the whole.` },
            { type: 'table', head: ['The study used...', 'You can conclude...'], rows: [
              ['Random selection from a population', 'Results generalize to that population'],
              ['Random assignment to groups', 'The treatment caused the difference'],
              ['Neither', 'Only an association among the people studied'],
            ] },
            { type: 'rule', title: 'Margin of error', text: `Estimate ± margin gives a plausible range for the whole population, not for the sample. A larger random sample usually gives a smaller margin.` },
            { type: 'trap', text: `Units: if a rate is per minute and the question asks for hours, convert before you answer.` },
          ],
        },
        skillDrill('ratios-rates-proportional-relationships-and-units', 'Ratios, rates, and units', `Write the units, set up the proportion, and convert before answering.`),
        skillDrill('percentages', 'Percentages', `Multiply by (1 ± rate), one change at a time.`),
        skillDrill('one-variable-data-distributions-and-measures-of-center-and-spread', 'One-variable data', `Mean uses the total; median is the middle; spread is about distance from the mean.`),
        skillDrill('two-variable-data-models-and-scatterplots', 'Scatterplots and models', `Plug in for predictions; slope is the change per unit of x.`),
        skillDrill('probability-and-conditional-probability', 'Probability', `Part over the right whole. "Given" shrinks the whole.`),
        skillDrill('inference-from-sample-statistics-and-margin-of-error', 'Sample statistics and margin of error', `Generalize only to the population sampled, and use estimate ± margin.`),
        skillDrill('evaluating-statistical-claims-observational-studies-and-experiments', 'Studies and experiments', `Random assignment → cause. Random selection → generalize.`),
      ],
    },
    {
      id: 'geometry',
      title: 'Math: Geometry & Trigonometry, every skill',
      header: 'Math Course',
      subhead: 'Area, volume, angles, triangles, trig, and circles',
      lessons: [
        {
          id: 'geometry-guide', kind: 'guide', minutes: 6,
          title: 'Note guide: shapes, triangles, and circles',
          guide: [
            { type: 'rule', title: 'Angles', text: `A triangle's angles sum to 180°, and so do angles on a straight line. Vertical angles are equal. When parallel lines are cut by another line, corresponding angles are equal.` },
            { type: 'table', head: ['Triangle fact', 'Use it when'], rows: [
              ['\\(a^2 + b^2 = c^2\\)', 'You know two sides of a right triangle'],
              ['30°-60°-90° sides: \\(x, x\\sqrt{3}, 2x\\)', 'A right triangle has a 30° or 60° angle'],
              ['45°-45°-90° sides: \\(x, x, x\\sqrt{2}\\)', 'A right triangle is isosceles'],
              ['Similar triangles: matching sides share one ratio', 'Angles match or the problem says "similar"'],
            ] },
            { type: 'rule', title: 'SOH-CAH-TOA', text: `sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. The two acute angles of a right triangle are complementary, so \\(\\sin A = \\cos B\\).` },
            { type: 'rule', title: 'Circles', text: `\\((x - h)^2 + (y - k)^2 = r^2\\): center \\((h, k)\\), radius \\(r\\). If it's expanded, complete the square. Arc length = \\(\\frac{\\text{angle}}{360} \\cdot 2\\pi r\\); radians: \\(\\pi\\) = 180°.` },
            { type: 'rule', title: 'Scaling', text: `Multiply every length by \\(k\\): area is multiplied by \\(k^2\\) and volume by \\(k^3\\).` },
            { type: 'trap', text: `The reference sheet gives you the formulas, but not which length is the radius. Halve a diameter before you use it.` },
          ],
        },
        skillDrill('area-and-volume', 'Area and volume', `Write the formula first; check radius vs. diameter.`),
        skillDrill('lines-angles-and-triangles', 'Lines, angles, and triangles', `Use 180°, vertical angles, and proportional sides.`),
        skillDrill('right-triangles-and-trigonometry', 'Right triangles and trigonometry', `Label opposite, adjacent, and hypotenuse from the angle you care about.`),
        skillDrill('circles', 'Circles', `Get to (x − h)² + (y − k)² = r², then read the center and radius.`),
      ],
    },
    {
      id: 'math-800',
      title: 'Advanced Digital SAT Math #1 (aiming for 800)',
      header: 'Advanced Digital SAT Math Course #1',
      subhead: 'Hard questions for students aiming for 800',
      lessons: [
        {
          id: 'math-800-guide', kind: 'guide', minutes: 7,
          title: 'Note guide: methods for the hardest questions',
          guide: [
            { type: 'p', text: `These question types separate a 750 from an 800. Each one has a short, reliable method. Learn the method and the question stops being hard.` },
            { type: 'rule', title: 'Matching coefficients', text: `If two polynomials are equal for every value of x, the coefficients of each power of x must match. Expand only the terms you need.` },
            { type: 'example', title: 'Example', text: `If \\((ax + 1)(x + 2) = 3x^2 + 7x + 2\\), the \\(x^2\\) terms give \\(a = 3\\). Check the x terms: \\(2a + 1 = 7\\). It works.` },
            { type: 'rule', title: 'Percent chains', text: `Translate every sentence into an equation first: "a is 250% of b" means \\(a = 2.5b\\). Then substitute. Never multiply or divide percents in your head.` },
            { type: 'rule', title: 'How many solutions?', text: `For \\(ax^2 + bx + c = 0\\), the discriminant \\(b^2 - 4ac\\) decides: positive means two real solutions, zero means exactly one, negative means none.` },
            { type: 'rule', title: 'Circles', text: `Complete the square for x and for y to reach \\((x - h)^2 + (y - k)^2 = r^2\\). The right side is \\(r^2\\), not r.` },
            { type: 'trap', text: `Hard questions put the answer to a middle step among the choices. Before you select, reread what the question asks for.` },
          ],
        },
        {
          id: 'math-800-practice', kind: 'practice',
          title: 'Practice: hard questions set 1',
          rule: `Translate words into equations, expand only the terms you need, and reread the last line before you select.`,
          questions: ['m-adv-03', 'm-psd-04', 'm-adv-04', 'm-geo-02'],
        },
      ],
    },
    {
      id: 'desmos',
      title: 'Master SAT Desmos course',
      header: 'Master SAT Desmos Course',
      subhead: 'Graphing shortcuts for test day',
      lessons: [
        {
          id: 'desmos-guide', kind: 'guide', minutes: 5,
          title: 'Note guide: five Desmos moves',
          guide: [
            { type: 'p', text: `Desmos is built into the Digital SAT for the whole Math section. These five moves cover most of the questions where it saves time. Open the Desmos tool above and try each one as you read.` },
            { type: 'list', items: [
              `<strong>Systems:</strong> type both equations and tap where the lines cross.`,
              `<strong>Minimum or maximum:</strong> graph the function and tap the turning point (the vertex).`,
              `<strong>Sliders:</strong> type an equation with an unknown constant like k. Desmos adds a slider; drag it until the graph does what the question describes.`,
              `<strong>Regression:</strong> put data in a table and type \\(y_1 \\sim mx_1 + b\\) to get the best-fit slope and intercept.`,
              `<strong>Test the choices:</strong> graph each answer choice and see which one passes through the given points.`,
            ] },
            { type: 'rule', title: 'Know when to stop', text: `If you can solve it by hand in two lines, do that. Desmos shines when the algebra is messy, not when it is short.` },
            { type: 'trap', text: `Desmos shows the point where something happens, like (3, −4). Make sure you report the part the question asks for: the x-value or the y-value.` },
          ],
        },
        {
          id: 'desmos-practice', kind: 'practice',
          title: 'Practice: solve it with Desmos',
          rule: `Graph it, tap the key point, and report the coordinate the question asks for.`,
          questions: ['m-alg-03', 'm-adv-01'],
        },
      ],
    },
  ],
};

/* ---- Lookups used across the app ---- */
export const LESSONS = COURSE.chapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({ ...lesson, chapterId: chapter.id })),
);
const LESSON_BY_ID = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));

export const getLesson = (id) => LESSON_BY_ID.get(id);
export const getChapter = (id) => COURSE.chapters.find((chapter) => chapter.id === id);
export const lessonIndex = (id) => LESSONS.findIndex((lesson) => lesson.id === id);
export const PRACTICE_QUESTION_COUNT = LESSONS.reduce((sum, l) => sum + (l.questions?.length || 0), 0);

/** Percent of lessons finished, overall or within a list of chapter ids. */
export function percentComplete(doneIds, chapterIds = null) {
  const pool = chapterIds ? LESSONS.filter((l) => chapterIds.includes(l.chapterId)) : LESSONS;
  if (!pool.length) return 0;
  const done = pool.filter((l) => doneIds.includes(l.id)).length;
  return Math.round((done / pool.length) * 100);
}

/** The first lesson the student hasn't finished (where "Resume course" should go). */
export function nextUnfinished(doneIds, chapterIds = null) {
  const pool = chapterIds ? LESSONS.filter((l) => chapterIds.includes(l.chapterId)) : LESSONS;
  return pool.find((l) => !doneIds.includes(l.id)) || pool[pool.length - 1];
}
