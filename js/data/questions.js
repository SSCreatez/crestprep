/**
 * questions.js: the question bank.
 *
 * Every question has the same shape, so every feature can use it:
 *   section, skill, difficulty  → routing in adaptive tests, mastery on Progress
 *   choices + answer            → grading
 *   steps, trap, desmosTip      → the written step-by-step explanation
 *   pattern + hints             → the guided tutor (hints never reveal the answer)
 *   plain                       → the language helper's plain-English version
 *   desmos                      → expressions the calculator can load in one click
 *
 * Math is written in LaTeX between \\( and \\) and typeset by KaTeX.
 * To add a question, copy one block, give it a new id, and add the id to a lesson in course.js.
 *
 * The bigger banks live in data/bank/: skill drills (drills.js) and the three
 * full-length CrestPrep practice tests (test1.js, test2.js, test3.js).
 */
import { QUESTION_TO_SKILL } from './cbSkills.js';
import { DRILLS } from './bank/drills.js';
import { TEST_QUESTIONS } from './bank/tests.js';

const CORE = [
  /* ---------------------------------- MATH ---------------------------------- */
  {
    id: 'm-alg-01', section: 'math', skill: 'algebra', difficulty: 1,
    stem: `If \\(3x + 7 = 25\\), what is the value of \\(6x - 4\\)?`,
    choices: ['6', '14', '32', '36'], answer: 2,
    steps: [
      `Subtract 7 from both sides: \\(3x = 18\\).`,
      `Double both sides to get the piece the question uses: \\(6x = 36\\).`,
      `Subtract 4: \\(6x - 4 = 32\\). The answer is C.`,
    ],
    trap: `A (6) is x itself and D (36) is 6x. Both are stops along the way, not the answer.`,
    desmosTip: `Not needed here. Two lines of algebra is faster than graphing.`,
    pattern: 'Solve for the expression they ask for',
    hints: [
      `Read the last line again. Is the question asking for x, or for something else?`,
      `Start by getting \\(3x\\) alone. What does \\(3x\\) equal?`,
      `\\(6x\\) is just \\(2 \\cdot 3x\\). Use that, then subtract 4.`,
    ],
    plain: `First find what 3x equals. Then use it to find the value of 6x − 4.`,
  },
  {
    id: 'm-psd-01', section: 'math', skill: 'problem_solving', difficulty: 1,
    stem: `A phone plan costs $15 per month plus $0.10 for each text message sent. Last month, Ana's bill was $27.40. How many text messages did she send?`,
    choices: ['124', '152', '174', '274'], answer: 0,
    steps: [
      `Remove the fixed monthly cost: $27.40 − $15 = $12.40.`,
      `Each text costs $0.10, so divide: 12.40 ÷ 0.10 = 124.`,
      `She sent 124 texts. The answer is A.`,
    ],
    trap: `D (274) comes from dividing the whole bill by 0.10 without removing the $15 fixed cost first.`,
    desmosTip: `Type 15 + 0.10x = 27.40 and Desmos draws a vertical line at the answer.`,
    desmos: ['15+0.10x=27.40'],
    pattern: 'Linear model: fixed cost + rate × amount',
    hints: [
      `Which part of the bill does not depend on how many texts she sent?`,
      `Take away the fixed $15. How much money is left for texts?`,
      `Each text is $0.10. How many groups of $0.10 fit into what's left?`,
    ],
    plain: `The plan costs $15 every month, plus 10 cents for each text. The total bill was $27.40. Find the number of texts.`,
  },
  {
    id: 'm-psd-02', section: 'math', skill: 'problem_solving', difficulty: 1,
    stem: `The data set below lists the number of books five students read over the summer.<br><strong>4, 7, 7, 9, 13</strong><br>How much greater is the mean of the data set than its median?`,
    choices: ['0', '1', '2', '6'], answer: 1,
    steps: [
      `Median: the values are already in order, so the middle value is 7.`,
      `Mean: \\((4 + 7 + 7 + 9 + 13) \\div 5 = 40 \\div 5 = 8\\).`,
      `Difference: \\(8 - 7 = 1\\). The answer is B.`,
    ],
    trap: `A (0) assumes the mean and median are always equal. The 13 pulls the mean up but leaves the median alone.`,
    desmosTip: `Type mean([4,7,7,9,13]) and median([4,7,7,9,13]) on separate lines.`,
    desmos: ['\\operatorname{mean}([4,7,7,9,13])', '\\operatorname{median}([4,7,7,9,13])'],
    pattern: 'Mean vs. median: outliers pull the mean',
    hints: [
      `Are the numbers already in order? Which one sits in the middle?`,
      `For the mean, add all five numbers. What is the total?`,
      `Divide the total by 5, then compare it with the median.`,
    ],
    plain: `Five students read 4, 7, 7, 9, and 13 books. Find the average (mean) and the middle number (median). How far apart are they?`,
  },
  {
    id: 'm-psd-03', section: 'math', skill: 'problem_solving', difficulty: 1,
    stem: `A recipe uses 3 cups of flour for every 2 cups of sugar. If a baker uses 12 cups of flour, how many cups of sugar should the baker use?`,
    choices: ['6', '8', '10', '18'], answer: 1,
    steps: [
      `Write the ratio as flour : sugar = 3 : 2.`,
      `12 cups of flour is 4 times 3, so multiply the sugar by 4 too.`,
      `\\(2 \\times 4 = 8\\) cups of sugar. The answer is B.`,
    ],
    trap: `D (18) flips the ratio by computing 12 × 3/2. Keep flour with flour and sugar with sugar.`,
    desmosTip: `A proportion is faster by hand: \\(\\tfrac{3}{2} = \\tfrac{12}{s}\\).`,
    pattern: 'Proportions: scale both parts by the same factor',
    hints: [
      `Write the ratio as flour : sugar. What are the two numbers?`,
      `How many times bigger is 12 than 3?`,
      `Multiply the sugar amount by that same number.`,
    ],
    plain: `For every 3 cups of flour, the recipe uses 2 cups of sugar. With 12 cups of flour, how much sugar is needed?`,
  },
  {
    id: 'm-alg-02', section: 'math', skill: 'algebra', difficulty: 2,
    stem: `A line in the xy-plane passes through the points \\((-2, 5)\\) and \\((4, -7)\\). What is the y-intercept of the line?`,
    choices: ['\\(-2\\)', '\\(1\\)', '\\(3\\)', '\\(9\\)'], answer: 1,
    steps: [
      `Slope: \\(m = \\dfrac{-7 - 5}{4 - (-2)} = \\dfrac{-12}{6} = -2\\).`,
      `Plug in a point to find b: \\(5 = -2(-2) + b\\), so \\(5 = 4 + b\\).`,
      `\\(b = 1\\). The answer is B.`,
    ],
    trap: `A (−2) is the slope, not the intercept. The question asks where the line crosses the y-axis.`,
    desmosTip: `Plot both points, type the point-slope form, and tap where the line crosses the y-axis.`,
    desmos: ['(-2,5)', '(4,-7)', 'y-5=\\frac{-7-5}{4+2}\\left(x+2\\right)'],
    pattern: 'Two points → slope → intercept',
    hints: [
      `What do you need first before you can write the line's equation?`,
      `Slope is change in y ÷ change in x. Be careful subtracting a negative.`,
      `Put one point into \\(y = mx + b\\) and solve for b.`,
    ],
    plain: `A straight line goes through two points. Find where the line crosses the y-axis.`,
  },
  {
    id: 'm-alg-03', section: 'math', skill: 'algebra', difficulty: 2,
    stem: `\\[2x + 3y = 12\\]\\[x - y = 1\\]If \\((x, y)\\) is the solution to the system of equations above, what is the value of \\(x + y\\)?`,
    choices: ['3', '4', '5', '6'], answer: 2,
    steps: [
      `From the second equation, \\(x = y + 1\\).`,
      `Substitute: \\(2(y + 1) + 3y = 12\\), so \\(5y + 2 = 12\\) and \\(y = 2\\).`,
      `Then \\(x = 3\\), so \\(x + y = 5\\). The answer is C.`,
    ],
    trap: `A (3) is x alone. Reread the last line of the question before you choose.`,
    desmosTip: `Type both equations and tap the point where the lines cross.`,
    desmos: ['2x+3y=12', 'x-y=1'],
    pattern: 'Systems of linear equations',
    hints: [
      `Which equation makes it easy to get one variable by itself?`,
      `Rewrite \\(x - y = 1\\) as \\(x = y + 1\\) and substitute it into the first equation.`,
      `Once you have y, find x. Then add them, since that is what the question wants.`,
    ],
    plain: `Two equations share the same x and y. Find x and y, then add them together.`,
  },
  {
    id: 'm-adv-01', section: 'math', skill: 'advanced_math', difficulty: 2,
    stem: `The function \\(f\\) is defined by \\(f(x) = x^2 - 6x + 5\\). What is the minimum value of \\(f(x)\\)?`,
    choices: ['\\(-4\\)', '\\(-9\\)', '\\(3\\)', '\\(5\\)'], answer: 0,
    steps: [
      `The vertex of \\(ax^2 + bx + c\\) is at \\(x = -\\dfrac{b}{2a} = -\\dfrac{-6}{2} = 3\\).`,
      `The minimum value is the output there: \\(f(3) = 9 - 18 + 5 = -4\\).`,
      `The answer is A.`,
    ],
    trap: `C (3) is where the minimum happens (the x-value), not the minimum value itself.`,
    desmosTip: `Graph f(x) and tap the lowest point. Desmos labels the vertex for you.`,
    desmos: ['f(x)=x^2-6x+5'],
    pattern: 'Vertex = minimum or maximum of a parabola',
    hints: [
      `A parabola that opens upward has its lowest point at the vertex. How do you find the vertex's x-value?`,
      `Use \\(x = -\\tfrac{b}{2a}\\) with \\(a = 1\\) and \\(b = -6\\).`,
      `Plug that x-value back into f. The output is the minimum value.`,
    ],
    plain: `This is a U-shaped graph. Find the lowest y-value the graph reaches.`,
  },
  {
    id: 'm-geo-01', section: 'math', skill: 'geometry_trig', difficulty: 2,
    stem: `In right triangle \\(ABC\\), angle \\(C\\) is the right angle and \\(\\sin A = \\dfrac{5}{13}\\). What is the value of \\(\\cos B\\)?`,
    choices: ['\\(\\dfrac{5}{12}\\)', '\\(\\dfrac{5}{13}\\)', '\\(\\dfrac{12}{13}\\)', '\\(\\dfrac{13}{5}\\)'], answer: 1,
    steps: [
      `Angles A and B add up to 90°, so they are complementary.`,
      `The side opposite A is the side adjacent to B, so \\(\\sin A = \\cos B\\).`,
      `\\(\\cos B = \\dfrac{5}{13}\\). The answer is B.`,
    ],
    trap: `C (12/13) is cos A. It feels right because 5-12-13 is a familiar triangle, but the question asks about angle B.`,
    desmosTip: `No graph needed. Sketch the triangle and label the sides instead.`,
    pattern: 'Complementary angles: sin A = cos B',
    hints: [
      `In a right triangle, what do the two smaller angles add up to?`,
      `Draw the triangle. Which side is opposite A? Is that same side next to B?`,
      `Compare the ratio for sin A with the ratio for cos B.`,
    ],
    plain: `A triangle has a 90° angle at C. You know the sine of angle A. Find the cosine of angle B.`,
  },
  {
    id: 'm-adv-02', section: 'math', skill: 'advanced_math', difficulty: 2,
    stem: `A colony of 800 bacteria doubles in size every 3 hours. Which expression gives the number of bacteria after \\(t\\) hours?`,
    choices: ['\\(800(2)^{3t}\\)', '\\(800(2)^{t/3}\\)', '\\(800(3)^{t/2}\\)', '\\(1600^{t/3}\\)'], answer: 1,
    steps: [
      `Exponential growth looks like \\(\\text{start} \\times (\\text{growth factor})^{\\text{number of steps}}\\).`,
      `The start is 800 and the growth factor is 2, because the colony doubles.`,
      `It doubles once every 3 hours, so after t hours there have been \\(t/3\\) doublings: \\(800(2)^{t/3}\\). The answer is B.`,
    ],
    trap: `A (exponent 3t) would double three times every hour. Test it: at t = 3, only B gives 1,600.`,
    desmosTip: `The points (3, 1600) and (6, 3200) are loaded. Type each choice with x in place of t; the right one passes through both.`,
    desmos: ['(3,1600)', '(6,3200)'],
    pattern: 'Exponential growth: start × factor^(time ÷ step)',
    hints: [
      `"Doubles" tells you the growth factor. Which choices use it?`,
      `If the colony doubles every 3 hours, how many doublings happen in t hours?`,
      `Test a value: at t = 3 the colony should be 1,600. Which choice gives that?`,
    ],
    plain: `There are 800 bacteria. Every 3 hours, the number doubles. Which formula gives the number after t hours?`,
  },
  {
    id: 'm-adv-03', section: 'math', skill: 'advanced_math', difficulty: 3,
    stem: `\\[(kx - 2)(3x^2 + mx + 4) = 12x^3 + 2x^2 + 12x - 8\\]In the equation above, \\(k\\) and \\(m\\) are constants. If the equation is true for all values of \\(x\\), what is the value of \\(km\\)?`,
    choices: ['\\(-8\\)', '\\(2\\)', '\\(6\\)', '\\(8\\)'], answer: 3,
    steps: [
      `You only need two terms. The \\(x^3\\) term: \\(kx \\cdot 3x^2 = 3kx^3\\), so \\(3k = 12\\) and \\(k = 4\\).`,
      `The \\(x^2\\) terms: \\(kx \\cdot mx = kmx^2\\) and \\(-2 \\cdot 3x^2 = -6x^2\\). So \\(km - 6 = 2\\).`,
      `That gives \\(km = 8\\) directly. You never have to find m. The answer is D.`,
    ],
    trap: `C (6) comes from forgetting the \\(-6x^2\\) that the \\(-2\\) contributes. When matching a coefficient, collect every product that lands on that power of x.`,
    desmosTip: `k and m are loaded as sliders. Drag them until the two curves sit exactly on top of each other.`,
    desmos: ['k=1', 'm=1', 'y=(kx-2)(3x^2+mx+4)', 'y=12x^3+2x^2+12x-8'],
    pattern: 'Matching coefficients',
    hints: [
      `If two polynomials are equal for every x, what must be true about their coefficients?`,
      `Start with the highest power. Which two terms multiply to give an \\(x^3\\) term?`,
      `Now collect every product that gives an \\(x^2\\) term. There are two of them.`,
    ],
    plain: `Multiply out the left side. It must match the right side exactly. Use that to find k times m.`,
  },
  {
    id: 'm-psd-04', section: 'math', skill: 'problem_solving', difficulty: 3,
    stem: `The positive number \\(a\\) is 250% of the number \\(b\\), and \\(a\\) is 35% of the number \\(c\\). If \\(c\\) is \\(p\\%\\) of \\(b\\), which of the following is closest to the value of \\(p\\)?`,
    choices: ['14', '88', '285', '714'], answer: 3,
    steps: [
      `Translate each sentence: \\(a = 2.5b\\) and \\(a = 0.35c\\).`,
      `Set them equal: \\(0.35c = 2.5b\\), so \\(c = \\dfrac{2.5}{0.35}b \\approx 7.14b\\).`,
      `7.14 as a percent is about 714%, so \\(p \\approx 714\\). The answer is D.`,
    ],
    trap: `B (88) multiplies the percents (2.5 × 0.35 ≈ 0.88) and A (14) divides them upside down. Write equations instead of juggling percents in your head.`,
    desmosTip: `Use Desmos as a calculator: type 2.5/0.35, then multiply by 100.`,
    pattern: 'Percent chains: translate, then substitute',
    hints: [
      `Turn "a is 250% of b" into an equation. What does "of" mean in math?`,
      `You now have two expressions that both equal a. What can you do with them?`,
      `Solve for c in terms of b, then turn the multiplier into a percent.`,
    ],
    plain: `a is 2.5 times b. a is also 0.35 times c. About what percent of b is c?`,
  },
  {
    id: 'm-adv-04', section: 'math', skill: 'advanced_math', difficulty: 3,
    stem: `\\[2x^2 - kx + 18 = 0\\]In the equation above, \\(k\\) is a positive constant. If the equation has exactly one real solution, what is the value of \\(k\\)?`,
    choices: ['6', '9', '12', '36'], answer: 2,
    steps: [
      `A quadratic has exactly one real solution when its discriminant is 0: \\(b^2 - 4ac = 0\\).`,
      `Here \\(a = 2\\), \\(b = -k\\), and \\(c = 18\\): \\(k^2 - 4(2)(18) = 0\\), so \\(k^2 = 144\\).`,
      `Since k is positive, \\(k = 12\\). The answer is C.`,
    ],
    trap: `A (6) comes from dropping the 4: \\(k^2 = 2 \\cdot 18 = 36\\). Write out \\(b^2 - 4ac\\) in full every time.`,
    desmosTip: `k is loaded as a slider. Drag it until the parabola just touches the x-axis. That is exactly one real solution.`,
    desmos: ['k=1', 'y=2x^2-kx+18'],
    pattern: 'Discriminant: how many real solutions',
    hints: [
      `Which part of the quadratic formula decides how many real solutions there are?`,
      `Identify a, b, and c. Careful: b is \\(-k\\), not k.`,
      `Set the discriminant equal to 0 and solve for k. Remember that k is positive.`,
    ],
    plain: `This equation has only one answer for x. Find the positive number k that makes that happen.`,
  },
  {
    id: 'm-geo-02', section: 'math', skill: 'geometry_trig', difficulty: 3,
    stem: `The equation of a circle in the xy-plane is \\(x^2 + y^2 - 6x + 8y = 11\\). What is the radius of the circle?`,
    choices: ['\\(\\sqrt{11}\\)', '6', '11', '36'], answer: 1,
    steps: [
      `Complete the square for x: \\(x^2 - 6x = (x - 3)^2 - 9\\).`,
      `Complete the square for y: \\(y^2 + 8y = (y + 4)^2 - 16\\).`,
      `So \\((x - 3)^2 + (y + 4)^2 = 11 + 9 + 16 = 36\\), and the radius is \\(\\sqrt{36} = 6\\). The answer is B.`,
    ],
    trap: `D (36) is \\(r^2\\), not r. A (√11) skips completing the square entirely.`,
    desmosTip: `Graph it, then tap the leftmost and rightmost points. Half the distance between them is the radius.`,
    desmos: ['x^2+y^2-6x+8y=11'],
    pattern: 'Circle equations: complete the square',
    hints: [
      `What form does a circle's equation need to be in before you can read its radius?`,
      `Group the x-terms and the y-terms. What number completes \\(x^2 - 6x\\) into a perfect square?`,
      `Add the same numbers to the right side, then take the square root.`,
    ],
    plain: `This equation describes a circle. Rewrite it so you can see the radius.`,
  },

  /* ---------------------------- READING & WRITING ---------------------------- */
  {
    id: 'r-sec-01', section: 'rw', skill: 'standard_english', difficulty: 1,
    passage: `The collection of rare maps, donated by a retired sea captain, ______ now on display in the library's east wing.`,
    stem: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: ['are', 'is', 'were', 'have been'], answer: 1,
    steps: [
      `Find the subject. Cross out the phrase between the commas and the phrase "of rare maps."`,
      `What's left is "The collection," which is singular.`,
      `A singular subject takes "is." The answer is B.`,
    ],
    trap: `A (are) agrees with "maps," the noun closest to the blank. The test puts a plural noun there on purpose.`,
    pattern: 'Subject–verb agreement: find the real subject',
    hints: [
      `What is the sentence mainly about: the maps, or the thing that holds them?`,
      `Cross out the phrase between the commas and "of rare maps." Which noun is left?`,
      `Is that noun singular or plural? Pick the verb that matches it.`,
    ],
    plain: `A group (a collection) of old maps was given to the library. Choose the verb that fits the word "collection."`,
  },
  {
    id: 'r-sec-02', section: 'rw', skill: 'standard_english', difficulty: 1,
    passage: `Each of the firm's three ______ presented a different solution to the bridge design problem.`,
    stem: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: [`engineer's`, `engineers'`, 'engineers', `engineers's`], answer: 2,
    steps: [
      `Ask whether the word owns anything. The word after the blank is "presented," a verb, so nothing is owned.`,
      `With nothing owned, the word is a plain plural with no apostrophe.`,
      `"Three engineers" is correct. The answer is C.`,
    ],
    trap: `B (engineers') looks advanced, but an apostrophe only belongs there if a noun follows that the engineers own.`,
    pattern: 'Plurals vs. possessives',
    hints: [
      `Look at the word right after the blank. Is it something the engineers own?`,
      `If nothing is owned, does the word need an apostrophe at all?`,
      `"Three" tells you how many. Pick the simple plural.`,
    ],
    plain: `A company has three engineers, and each one gave a different idea. Choose the correct spelling of "engineers."`,
  },
  {
    id: 'r-eoi-01', section: 'rw', skill: 'expression_of_ideas', difficulty: 1,
    passage: `Early electric cars of the 1900s were quiet and easy to start. ______ they lost ground to gasoline cars once mass production made gasoline models far cheaper.`,
    stem: `Which choice completes the text with the most logical transition?`,
    choices: ['Similarly,', 'For example,', 'However,', 'Therefore,'], answer: 2,
    steps: [
      `The first sentence lists advantages of electric cars.`,
      `The second says they lost ground anyway, the opposite of what those advantages would predict.`,
      `That is a contrast, so "However" fits. The answer is C.`,
    ],
    trap: `D (Therefore) signals cause and effect, but being quiet and easy to start did not cause electric cars to lose ground.`,
    pattern: 'Transitions: name the relationship first',
    hints: [
      `Is the second sentence good news or bad news for electric cars?`,
      `Does the second sentence continue the first idea or turn against it?`,
      `Which choice signals a turn in direction?`,
    ],
    plain: `First sentence: electric cars had good points. Second sentence: they still lost to gas cars. Choose the word that connects these ideas.`,
  },
  {
    id: 'r-sec-03', section: 'rw', skill: 'standard_english', difficulty: 2,
    passage: `Marine biologist Sylvia Earle has spent more than 7,000 hours ______ her research has helped shape modern ocean conservation policy.`,
    stem: `Which choice completes the text so that it conforms to the conventions of Standard English?`,
    choices: ['underwater, her', 'underwater; her', 'underwater her', 'underwater and, her'], answer: 1,
    steps: [
      `"Marine biologist Sylvia Earle has spent more than 7,000 hours underwater" is a complete sentence.`,
      `"Her research has helped shape modern ocean conservation policy" is also a complete sentence.`,
      `Two independent clauses need a period, a semicolon, or a comma plus FANBOYS. Only B uses one of these. The answer is B.`,
    ],
    trap: `A (comma alone) creates a comma splice, the most tested boundary error on the SAT.`,
    pattern: 'Sentence boundaries: two independent clauses',
    hints: [
      `Read the words before the blank. Could they stand alone as a sentence?`,
      `Now read the words after the blank. Could they stand alone too?`,
      `What punctuation can join two complete sentences without a FANBOYS word?`,
    ],
    plain: `This line holds two full sentences. Choose the punctuation that joins two full sentences correctly.`,
  },
  {
    id: 'r-eoi-02', section: 'rw', skill: 'expression_of_ideas', difficulty: 2,
    passage: `Octopuses can change the color of their skin in a fraction of a second. Their eyes, ______ contain only one type of light receptor, which suggests that octopuses may be colorblind.`,
    stem: `Which choice completes the text with the most logical transition?`,
    choices: ['consequently,', 'for instance,', 'similarly,', 'however,'], answer: 3,
    steps: [
      `Sentence one: octopuses are masters of color.`,
      `Sentence two: they may not be able to see color at all, which is surprising after sentence one.`,
      `A surprising turn calls for a contrast transition. The answer is D.`,
    ],
    trap: `A (consequently) would mean color-changing skin causes colorblindness. The text never says that.`,
    pattern: 'Transitions: name the relationship first',
    hints: [
      `What does the first sentence lead you to expect about octopuses and color?`,
      `Does the second sentence fit that expectation or go against it?`,
      `Choose the word that signals the text is changing direction.`,
    ],
    plain: `Octopuses change their skin color very fast. But their eyes may not see color. Choose the connecting word.`,
  },
  {
    id: 'r-cs-01', section: 'rw', skill: 'craft_structure', difficulty: 2,
    passage: `The committee's report was notably ______: it listed the proposed budget's strengths and weaknesses in equal detail without arguing for or against approving it.`,
    stem: `Which choice completes the text with the most logical and precise word or phrase?`,
    choices: ['evenhanded', 'partisan', 'exaggerated', 'incomplete'], answer: 0,
    steps: [
      `The colon means the words after it explain the blank.`,
      `The report covered strengths and weaknesses "in equal detail" and took no side.`,
      `A word for "fair to both sides" is "evenhanded." The answer is A.`,
    ],
    trap: `B (partisan) means the opposite: taking a side. The SAT often includes the exact opposite of the right answer.`,
    pattern: 'Words in context: predict before you peek',
    hints: [
      `What does the colon tell you about the words that come after it?`,
      `Before looking at the choices, describe the report in your own words.`,
      `Which choice is closest to "fair" or "balanced"?`,
    ],
    plain: `The report talked about good points and bad points equally and did not choose a side. Pick the word that means "fair to both sides."`,
  },
  {
    id: 'r-ii-01', section: 'rw', skill: 'information_ideas', difficulty: 2,
    passage: `Historians once described medieval Europe as a period of scientific stagnation. Recent studies of manuscripts from monastic libraries, however, have revealed detailed astronomical tables and careful records of eclipses, suggesting that inquiry into the natural world continued throughout the period.`,
    stem: `Which choice best states the main idea of the text?`,
    choices: [
      'Monastic libraries were the only places where medieval science took place.',
      'New evidence challenges the view that scientific inquiry stopped in medieval Europe.',
      'Medieval astronomers predicted eclipses more accurately than ancient astronomers did.',
      'Historians have stopped studying medieval manuscripts.',
    ], answer: 1,
    steps: [
      `The text sets up an old view (stagnation), then turns with "however."`,
      `The new evidence, astronomical tables and eclipse records, shows that inquiry continued.`,
      `B captures both the old view and the challenge to it. The answer is B.`,
    ],
    trap: `A uses "only," which the text never supports. Extreme words like "only" and "always" are red flags.`,
    pattern: 'Main idea: old view vs. new evidence',
    hints: [
      `Which word in the middle of the text signals a turn?`,
      `What did historians used to think, and what does the new evidence show?`,
      `Find the choice that covers both halves without adding anything new.`,
    ],
    plain: `People used to think there was no science in medieval Europe. Newly studied old books show people were studying the sky. What is the main point?`,
  },
  {
    id: 'r-cs-02', section: 'rw', skill: 'craft_structure', difficulty: 3,
    passage: `Although critics initially dismissed the novelist's debut as derivative, later scholars argued that its apparent borrowings were in fact ______: deliberate, knowing reworkings of older texts.`,
    stem: `Which choice completes the text with the most logical and precise word or phrase?`,
    choices: ['inadvertent', 'arbitrary', 'calculated', 'superficial'], answer: 2,
    steps: [
      `The colon defines the blank: "deliberate, knowing reworkings."`,
      `"Although" sets up a contrast with critics who saw the borrowings as lazy copying.`,
      `"Calculated" means done on purpose, with careful thought. The answer is C.`,
    ],
    trap: `A (inadvertent) means accidental, the opposite of "deliberate." It is a hard word placed to catch students who only half-know it.`,
    pattern: 'Words in context: predict before you peek',
    hints: [
      `What follows the colon? That phrase is a definition of the blank.`,
      `Put "deliberate, knowing" into a single word of your own.`,
      `Which choice means "done on purpose"? Watch for the choice that means the opposite.`,
    ],
    plain: `Critics said the book copied other books. Later experts said the copying was on purpose and clever. Pick the word that means "on purpose."`,
  },
  {
    id: 'r-ii-02', section: 'rw', skill: 'information_ideas', difficulty: 3,
    passage: `In a study of 40 urban gardens, researchers found that plots with more native flowering plants hosted a greater variety of bee species. The total number of individual bees, however, did not differ between plots with many native plants and plots with few.`,
    stem: `Which choice best states a conclusion supported by the text?`,
    choices: [
      'Native plants attract more bees overall than non-native plants do.',
      'Native flowering plants may support bee diversity more than bee abundance.',
      'Urban gardens host fewer bee species than rural gardens do.',
      'Bees avoid garden plots that contain few native plants.',
    ], answer: 1,
    steps: [
      `Finding 1: more native plants went with more kinds of bees (diversity).`,
      `Finding 2: more native plants did not change the number of bees (abundance).`,
      `B states exactly that split. The answer is B.`,
    ],
    trap: `A contradicts finding 2, since the total number of bees did not change. D is too strong: bees still visited those plots in the same numbers.`,
    pattern: 'Inference: stay inside the evidence',
    hints: [
      `The text reports two findings. What are they?`,
      `Which finding is about kinds of bees, and which is about how many bees?`,
      `Cross out any choice the text contradicts or never mentions, like rural gardens.`,
    ],
    plain: `More native flowers meant more kinds of bees, but not more bees in total. Which statement matches this?`,
  },
  {
    id: 'r-eoi-03', section: 'rw', skill: 'expression_of_ideas', difficulty: 3,
    passage: `While researching a topic, a student has taken the following notes:<ul><li>The Riverside Seed Library lends vegetable and herb seeds to local gardeners for free.</li><li>At the end of the growing season, borrowers return seeds saved from their own harvest.</li><li>In its first year, the library lent seeds to 312 households.</li><li>It now stocks 140 varieties.</li></ul>`,
    stem: `The student wants to explain how the seed library keeps its collection stocked. Which choice most effectively uses relevant information from the notes to accomplish this goal?`,
    choices: [
      'The Riverside Seed Library lent seeds to 312 households in its first year.',
      'Because borrowers return seeds saved from their own harvest, the Riverside Seed Library can keep lending for free.',
      'The Riverside Seed Library now stocks 140 varieties of vegetable and herb seeds.',
      'Local gardeners can borrow vegetable and herb seeds from the Riverside Seed Library.',
    ], answer: 1,
    steps: [
      `Read the goal first: explain how the library keeps its collection stocked.`,
      `The note that answers "how" is the one about borrowers returning saved seeds.`,
      `Only B uses that note. The answer is B.`,
    ],
    trap: `C sounds like it's about the collection, but it only says how big the collection is, not how it stays stocked. True is not the same as relevant.`,
    pattern: 'Rhetorical synthesis: match the goal',
    hints: [
      `Before reading the choices, underline the goal in the question.`,
      `Which single note explains how the seeds get replaced?`,
      `Find the choice that uses that note. Skip choices that are true but off-goal.`,
    ],
    plain: `The student wants to explain how the library gets new seeds. Which sentence explains that?`,
  },
];

CORE.forEach((q) => { q.cb = QUESTION_TO_SKILL[q.id]; });

/**
 * The practice pool: the core questions plus the skill drills. Lessons, the
 * short practice sets, the diagnostic, and today's question all draw from here.
 */
export const QUESTIONS = [...CORE, ...DRILLS];

/** Everything, including full-length test questions (kept out of the practice pool so the tests stay fresh). */
export const ALL_QUESTIONS = [...QUESTIONS, ...TEST_QUESTIONS];

/** Look up one question by id. */
const BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
export const getQuestion = (id) => BY_ID.get(id);
