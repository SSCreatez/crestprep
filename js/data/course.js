/**
 * course.js: the curriculum shown in the course player's sidebar.
 *
 * A chapter holds lessons. A lesson is either:
 *   kind: 'guide'     → a written note guide (blocks of text, rules, tables, traps)
 *   kind: 'practice'  → a practice set (a list of question ids from questions.js)
 *
 * Note guide block types: p, rule, trap, steps (numbered, for real sequences),
 * list (bulleted), table, example. Rendered by components/noteGuide.js.
 */
export const COURSE = {
  title: 'Ultimate Digital SAT Course',
  chapters: [
    {
      id: 'welcome',
      title: 'Welcome to the course & adaptive SAT guide',
      header: 'Ultimate Digital SAT Course',
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
              `Take the baseline test in the Tests tab to find your starting point.`,
              `Set your target score and test date so the Plan tab can build your calendar.`,
              `Read each note guide, then do the practice set that follows it.`,
              `Every question you miss is saved to Review. Clear it once a week.`,
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
