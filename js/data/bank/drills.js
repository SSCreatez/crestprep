/**
 * drills.js: three practice questions (easy, medium, hard) for each of the 29
 * official skills. They power the skill drills in the Ultimate Course, the
 * diagnostic, the short practice sets, and today's question.
 */
import { rw, math, notes, goal, table, twoTexts } from './build.js';

const DRILLS = [];
const count = {};
const D = (code, ...args) => { count[code] = (count[code] || 0) + 1; DRILLS.push(rw(`d-${code}-${count[code]}`, code, ...args)); };
const DM = (code, ...args) => { count[code] = (count[code] || 0) + 1; DRILLS.push(math(`d-${code}-${count[code]}`, code, ...args)); };

/* =============================== READING AND WRITING =============================== */

D('wic', 1,
  `The museum's new dinosaur exhibit is designed to be ______: visitors are invited to touch the fossils, crank the moving models, and dig for replica bones in a sandbox.`,
  'wic', [`interactive`, `fragile`, `temporary`, `secretive`], 0,
  [`The colon introduces a description: visitors touch, crank, and dig.`, `An exhibit that invites visitors to take part is "interactive."`],
  `"Fragile" clashes with the clue: a fragile exhibit would not invite touching.`);
D('wic', 2,
  `Although the town council expected the parking proposal to spark a heated debate, the members' response was remarkably ______; the plan passed after a brief discussion in which no one raised an objection.`,
  'wic', [`contentious`, `hostile`, `subdued`, `elaborate`], 2,
  [`"Although" sets up a contrast with the heated debate the council expected.`, `A quiet, low-key response with a brief discussion is "subdued."`],
  `"Contentious" describes the debate the council expected, not the response that actually happened.`);
D('wic', 3,
  `Historian Leila Farouk argues that the craft guilds of thirteenth-century Cairo were not the rigid monopolies earlier scholars described. Guild records, she notes, show members routinely working outside their assigned trades and admitting newcomers with little ceremony; the guilds' rules, in other words, were applied in a notably ______ manner.`,
  'wic', [`punitive`, `permissive`, `arcane`, `consistent`], 1,
  [`Farouk rejects the "rigid" view. Members worked outside their trades and newcomers joined easily.`, `Rules applied loosely are applied in a "permissive" manner.`],
  `"Consistent" fits the rigid-monopoly view that Farouk argues against, not her evidence.`);

D('tsp', 1,
  `Every spring, the town of Milford holds a seed swap in its public library. Gardeners bring envelopes of seeds saved from last year's plants and trade them for varieties they have never grown. Organizers say the swap helps keep rare local vegetables, such as the Milford purple bean, from disappearing.`,
  'purpose', [
    `To compare two methods of growing vegetables`,
    `To argue that libraries should stop lending books`,
    `To explain why the Milford purple bean is difficult to grow`,
    `To describe a community event and explain one of its benefits`], 3,
  [`The text describes the seed swap, then says what it accomplishes (protecting rare vegetables).`, `Describing an event and a benefit is the main purpose.`],
  `The purple bean is only an example of what the swap protects; the text never says it is hard to grow.`);
D('tsp', 2,
  `Many people assume that the first Europeans to taste coffee loved it at once. <u>In fact, when coffee reached Venice in the early 1600s, some religious officials condemned it and asked the pope to ban it.</u> According to a popular story, the pope tasted the drink before deciding, approved it, and coffeehouses soon spread across Italy.`,
  'function', [
    `It explains why coffeehouses spread quickly across Italy.`,
    `It challenges a common assumption with a historical example.`,
    `It describes the pope's personal reaction to coffee.`,
    `It suggests that coffee was popular in Venice before the 1600s.`], 1,
  [`The first sentence states an assumption: Europeans loved coffee at once.`, `The underlined sentence begins "In fact" and gives an example of people opposing coffee, which challenges that assumption.`],
  `The pope's reaction comes in the next sentence, not the underlined one.`);
D('tsp', 3,
  `For decades, astronomers believed that Saturn's rings formed along with the planet about 4.5 billion years ago. Data from the Cassini spacecraft complicated that view: the rings are almost pure ice with very little dust, which suggests they may be only a few hundred million years old. Some researchers, however, propose that the rings could be ancient but kept clean by a process that steadily removes dust, so the question remains open.`,
  'structure', [
    `It introduces a hypothesis, explains how it was tested, and reports that the test confirmed it.`,
    `It describes a discovery, explains why scientists ignored it, and argues that it has since been proven.`,
    `It compares two spacecraft and concludes that one gathered more reliable data.`,
    `It presents a long-held view, describes evidence that challenges it, and notes an alternative explanation that keeps the issue unsettled.`], 3,
  [`Sentence 1: the old view. Sentence 2: Cassini evidence against it. Sentence 3: "however," another explanation, so the question remains open.`, `Only one choice includes all three moves, including the unsettled ending.`],
  `The first choice sounds scientific, but nothing was "confirmed"; the text ends by saying the question is open.`);

D('ctc', 1,
  twoTexts(`Some nutrition experts recommend that everyone eat breakfast every day, arguing that a morning meal improves concentration at school and at work.`,
    `A review of thirteen studies found that adults who skipped breakfast did not do worse on tests of attention than adults who ate it. The reviewers concluded that breakfast's benefits for concentration may be smaller than many people believe.`),
  `Based on the texts, how would the reviewers in Text 2 most likely respond to the recommendation in Text 1?`, [
    `They would argue that the evidence that breakfast improves concentration is weaker than the recommendation suggests.`,
    `They would agree that skipping breakfast seriously harms attention.`,
    `They would claim that breakfast matters for children but not for adults.`,
    `They would suggest eating breakfast later in the morning.`], 0,
  [`Text 1 says breakfast improves concentration. Text 2 found no attention difference and says the benefit may be smaller than believed.`, `So the Text 2 reviewers would question how strong the evidence is.`],
  `Text 2 never mentions children, so a claim about children goes beyond what the reviewers said.`);
D('ctc', 2,
  twoTexts(`The Great Wall of China is often described as one continuous structure. In reality, it is a series of walls built by different dynasties over roughly two thousand years, and many sections do not connect.`,
    `Archaeologist Wen Hu argues that treating the Great Wall as a single project hides how differently each dynasty used it. Some sections, she notes, worked mainly as customs checkpoints that taxed trade rather than as military barriers.`),
  `Based on the texts, the author of Text 1 and Wen Hu (Text 2) would most likely agree that`, [
    `every section of the Great Wall was built for the same military purpose.`,
    `most of the Great Wall was built during a single dynasty.`,
    `describing the Great Wall as one unified structure is misleading.`,
    `the Great Wall failed to stop invasions.`], 2,
  [`Text 1: it is not one continuous structure. Text 2: treating it as a single project hides real differences.`, `Both reject the "one unified wall" description.`],
  `Wen Hu says some sections were customs checkpoints, so "the same military purpose" contradicts Text 2.`);
D('ctc', 3,
  twoTexts(`Economists have long assumed that people value a reward less the longer they must wait for it, and that this decline is steady: an extra week of waiting matters about as much whether the reward comes in one month or in one year.`,
    `Economist Hiro Tanaka offered people $100 today or $110 in one week; most took the $100 immediately. But when offered $100 in fifty-two weeks or $110 in fifty-three weeks, most chose to wait for the $110, even though the extra week again paid $10.`),
  `Based on the texts, how would Tanaka (Text 2) most likely respond to the assumption described in Text 1?`, [
    `By agreeing with it, since participants treated the extra week the same way in both offers`,
    `By noting that it holds only for rewards larger than $100`,
    `By arguing that people usually prefer distant rewards to immediate ones`,
    `By pointing out that his results suggest an extra week matters more when it delays an immediate reward than when it delays a distant one`], 3,
  [`Text 1 assumes the cost of an extra week is the same no matter when the reward comes.`, `Tanaka's participants refused to wait a week for an immediate reward but accepted a week's wait for a distant one, so the extra week did not matter equally.`],
  `The first choice is the trap: participants chose differently in the two offers, which is evidence against the steady-decline assumption.`);

D('cid', 1,
  `Honeybees share the location of food through a movement called the waggle dance. A bee returning to the hive walks in a figure-eight pattern, shaking its body along the straight middle path. The angle of that straight run shows other bees which direction to fly, and the length of the shaking tells them how far away the food is.`,
  'main', [
    `Honeybees prefer flowers that grow close to the hive.`,
    `Honeybees use a dance to communicate where food can be found.`,
    `The waggle dance is performed only at night.`,
    `Scientists disagree about why honeybees dance.`], 1,
  [`Every sentence explains how the waggle dance tells other bees where food is.`, `The main idea is that the dance communicates the food's location.`],
  `Nothing in the text says bees prefer nearby flowers; the dance actually reports distances of any length.`);
D('cid', 2,
  `Grandmother kept her garden the way other people kept diaries. Each row held a year: the tomatoes she planted the spring Ana was born, the sunflowers from the summer the creek flooded, the stubborn mint that no one remembered planting at all. When visitors praised the vegetables, she only nodded. It was the rows themselves, and what they remembered, that made her proud.`,
  `According to the text, what is true about Grandmother's garden?`, [
    `It was planted all at once in the year Ana was born.`,
    `It was badly damaged when the creek flooded.`,
    `Its rows are connected to events from different years.`,
    `It produces vegetables that visitors want to buy.`], 2,
  [`"Each row held a year," followed by examples tied to events (Ana's birth, the flood).`, `So the rows are linked to events from different years.`],
  `The flood is mentioned only as the summer the sunflowers were planted; the text never says the garden was damaged.`);
D('cid', 3,
  `In the 1950s, many city planners favored replacing crowded older neighborhoods with tall apartment towers surrounded by open lawns. Writer Jane Jacobs disagreed. Busy sidewalks lined with shops and front doors, she argued, were not a sign of disorder: because residents and shopkeepers were constantly watching the street, such neighborhoods were safer. In Jacobs's view, planners had mistaken the very features that made neighborhoods work for problems to be cleared away.`,
  'main', [
    `Jacobs argued that planners misjudged busy streets, which she believed made neighborhoods safer rather than more disorderly.`,
    `Jacobs believed that tall apartment towers were the safest kind of city housing.`,
    `City planners in the 1950s mainly wanted to reduce the number of shops in cities.`,
    `Jacobs and the planners agreed that crowded neighborhoods needed more open space.`], 0,
  [`The text sets up the planners' view, then gives Jacobs's objection: busy streets made neighborhoods safer.`, `The last sentence sums it up: planners mistook useful features for problems.`],
  `The third choice exaggerates one detail. The planners wanted towers and lawns; reducing shops was never their stated goal.`);

D('coe', 1,
  `A student claims that octopuses can solve problems. In an aquarium study, researcher Mia Santos placed a live crab inside a clear jar with a screw-on lid and lowered the jar into an octopus's tank.`,
  `Which finding, if true, would most directly support the student's claim?`, [
    `The octopus ignored the jar and hunted other prey.`,
    `The octopus changed color when the jar was lowered into the tank.`,
    `The crab tried to climb out of the jar before the lid was closed.`,
    `The octopus unscrewed the lid and removed the crab within a few minutes.`], 3,
  [`The claim is about solving problems.`, `Opening a screw-top jar to reach food is solving a problem.`],
  `Changing color is a real octopus behavior, but it says nothing about problem solving.`);
D('coe', 2,
  `${table('Average daily screen time (hours)', ['Age group', 'Weekday', 'Weekend'], [['8–10', '3.1', '4.6'], ['11–13', '4.4', '6.2'], ['14–16', '5.3', '7.0']])}A researcher studying children's media use notes that screen time rises with age and that, in every age group shown in the table, ______`,
  'table', [
    `weekday screen time is above 5 hours.`,
    `weekend screen time is higher than weekday screen time.`,
    `weekend screen time is exactly 1.5 hours higher than weekday screen time.`,
    `screen time is lower for 14- to 16-year-olds than for 8- to 10-year-olds.`], 1,
  [`Check each choice against all three rows.`, `Weekend beats weekday in every row (4.6 > 3.1, 6.2 > 4.4, 7.0 > 5.3).`],
  `"Exactly 1.5 hours" is true only for ages 8–10 (the other gaps are 1.8 and 1.7). The claim says "every age group."`);
D('coe', 3,
  `Biologist Rosa Kim hypothesizes that city blackbirds sing at a higher pitch than forest blackbirds because traffic noise, which is mostly low-pitched, drowns out low notes. To test this, she recorded blackbirds in twelve cities and twelve forests.`,
  `Which finding, if true, would most directly weaken Kim's hypothesis?`, [
    `City blackbirds sang at a higher average pitch than forest blackbirds did.`,
    `Traffic noise in all twelve cities was mostly low-pitched.`,
    `Within the cities, blackbirds on quiet streets sang at the same high pitch as blackbirds beside busy highways.`,
    `Forest blackbirds sang more often in the early morning than city blackbirds did.`], 2,
  [`If traffic noise causes high pitch, birds in noisier spots should sing higher than birds in quiet spots.`, `Equal pitch on quiet streets and beside highways suggests noise is not the cause, which weakens the hypothesis.`],
  `The first two choices fit the hypothesis; they would support it, not weaken it.`);

D('inf', 1,
  `Plants need sunlight to make food. In a dense forest, the tallest trees capture most of the light before it reaches the ground. As a result, small plants growing on the forest floor ______`,
  'complete', [
    `receive more light than the tallest trees do.`,
    `must survive on much less light than the trees above them.`,
    `grow faster than plants in open fields.`,
    `do not need sunlight to make food.`], 1,
  [`Tall trees take most of the light first.`, `So plants on the ground get much less light.`],
  `The last choice contradicts the first sentence, which says plants need sunlight.`);
D('inf', 2,
  `Archaeologists studying a 3,000-year-old village found grinding stones covered in residue from wheat and barley but none from the wild seeds that earlier people in the region had relied on. They also found storage pits large enough to hold grain for an entire winter. Together, these findings suggest that the villagers ______`,
  'complete', [
    `abandoned the village before each winter.`,
    `did not know how to grind grain into flour.`,
    `had come to depend on farmed grain rather than gathered wild seeds.`,
    `traded wild seeds to nearby villages in exchange for wheat.`], 2,
  [`Grinding stones show wheat and barley, not wild seeds; pits stored grain for winter.`, `Both clues point to relying on farmed grain.`],
  `Trading is never mentioned, so that choice needs an assumption the text does not support.`);
D('inf', 3,
  `Researchers once taught a group of wild crows that a person wearing a particular mask was dangerous; afterward, those crows scolded anyone who wore it. Years later, crows that had never seen the masked person themselves, including young birds hatched after the original experiment, also scolded the mask. Because these birds lacked any personal experience with the mask, the researchers concluded that ______`,
  'complete', [
    `crows can learn about threats from other crows, not only from direct experience.`,
    `young crows are more aggressive than older crows.`,
    `the mask resembled a natural predator of crows.`,
    `crows forget threats within a few years.`], 0,
  [`Birds with no experience of the mask still treated it as dangerous.`, `They must have learned it from other crows.`],
  `"The mask resembled a predator" would explain scolding, but the original crows learned the danger only after being taught, so the text points to social learning.`);

D('syn', 1,
  notes(`The ruby-throated hummingbird is about 3 inches long.`, `Each fall, many ruby-throated hummingbirds fly across the Gulf of Mexico.`, `The flight across the Gulf is about 500 miles.`, `They make the crossing without stopping.`),
  goal(`emphasize the distance of the hummingbirds' flight`), [
    `The ruby-throated hummingbird is about 3 inches long.`,
    `Many ruby-throated hummingbirds migrate each fall.`,
    `Ruby-throated hummingbirds fly about 500 miles across the Gulf of Mexico without stopping.`,
    `Some birds cross the Gulf of Mexico in the fall.`], 2,
  [`The goal is distance.`, `Only one choice includes the 500-mile figure.`],
  `Body length is a true note, but it is about size, not distance.`);
D('syn', 2,
  notes(`The Golden Gate Bridge in San Francisco opened in 1937.`, `Its main span is about 4,200 feet long.`, `The Brooklyn Bridge in New York opened in 1883.`, `Its main span is about 1,600 feet long.`, `Both are suspension bridges.`),
  goal(`contrast the lengths of the two bridges' main spans`), [
    `The Golden Gate Bridge and the Brooklyn Bridge are both suspension bridges.`,
    `The Brooklyn Bridge opened in 1883, more than fifty years before the Golden Gate Bridge.`,
    `The Golden Gate Bridge opened in 1937 and has a main span of about 4,200 feet.`,
    `With a main span of about 4,200 feet, the Golden Gate Bridge is far longer than the Brooklyn Bridge, whose main span is about 1,600 feet.`], 3,
  [`A contrast needs both spans and a comparison.`, `Only the last choice gives both numbers and compares them.`],
  `The opening-date choice is a contrast, but of dates, not span lengths.`);
D('syn', 3,
  notes(`Ada Lovelace (1815–1852) was an English mathematician.`, `She wrote notes about the Analytical Engine, a mechanical computer designed by Charles Babbage.`, `Her notes included a step-by-step method for the machine to calculate a sequence called the Bernoulli numbers.`, `Many historians consider this method the first published computer program.`),
  goal(`present Lovelace's achievement to an audience unfamiliar with the Analytical Engine`), [
    `Lovelace's method for calculating Bernoulli numbers on the Analytical Engine is considered the first published computer program.`,
    `English mathematician Ada Lovelace wrote what many historians consider the first published computer program: a method for calculating Bernoulli numbers on the Analytical Engine, a mechanical computer designed by Charles Babbage.`,
    `Ada Lovelace, an English mathematician, lived from 1815 to 1852.`,
    `Charles Babbage designed the Analytical Engine, which Lovelace wrote about.`], 1,
  [`Two jobs: state the achievement, and explain the Analytical Engine for readers who don't know it.`, `Only one choice does both, by describing the Engine as a mechanical computer.`],
  `The first choice states the achievement but assumes readers already know what the Analytical Engine is.`);

D('tra', 1,
  `Sea otters are among the few mammals that use tools. ______ an otter will rest a flat rock on its chest and strike clams against it until the shells crack open.`,
  'trans', [`However,`, `For example,`, `Instead,`, `In conclusion,`], 1,
  [`Sentence 1 makes a general claim: otters use tools.`, `Sentence 2 gives a specific case, so "For example" fits.`],
  `"However" signals a contrast, but the second sentence supports the first.`);
D('tra', 2,
  `The first commercial voice-recognition programs, released in the 1990s, required users to pause after every word. ______ modern programs can follow natural, continuous speech.`,
  'trans', [`Similarly,`, `As a result,`, `By contrast,`, `For instance,`], 2,
  [`Old programs needed pauses; modern programs do not.`, `That is a contrast, so "By contrast" fits.`],
  `"As a result" would mean the pauses caused modern programs to understand continuous speech, which the text never claims.`);
D('tra', 3,
  `Linguist Marta Ruiz expected that children raised with two languages would learn new words more slowly than children raised with one, since their attention is split between two vocabularies. ______ the bilingual children in her study learned invented words just as quickly as the monolingual children did.`,
  'trans', [`Accordingly,`, `In addition,`, `Specifically,`, `However,`], 3,
  [`Ruiz expected bilingual children to be slower.`, `They were just as fast, which goes against her expectation, so "However" fits.`],
  `"Accordingly" would mean the result matched the expectation. It did the opposite.`);

D('bnd', 1,
  `Mount Everest is the highest mountain above sea ______ its peak rises about 29,000 feet above the ocean.`,
  'conv', [`level, its`, `level; its`, `level its`, `level and, its`], 1,
  [`"Mount Everest is the highest mountain above sea level" and "its peak rises..." are both complete sentences.`, `A semicolon can join two complete sentences.`],
  `A comma alone between two complete sentences is a comma splice.`);
D('bnd', 2,
  `The chef's winter stew gets its warmth from three ______ cumin, coriander, and smoked paprika.`,
  'conv', [`spices:`, `spices;`, `spices, and`, `spices`], 0,
  [`The first part is a complete sentence, and what follows is a list naming the three spices.`, `A colon introduces a list after a complete sentence.`],
  `A semicolon must have a complete sentence on both sides, and "cumin, coriander, and smoked paprika" is not one.`);
D('bnd', 3,
  `The tallest moai statue ever erected on Rapa ______ known as Paro, stands nearly 33 feet high.`,
  'conv', [`Nui; known`, `Nui: known`, `Nui, known`, `Nui known`], 2,
  [`"known as Paro" is extra information that already ends with a comma before "stands."`, `Extra information needs a matching comma on both sides.`],
  `A semicolon or colon would split the subject from its verb "stands."`);

D('fss', 1,
  `The keys to the old lighthouse ______ kept in a locked drawer at the town hall.`,
  'conv', [`is`, `has been`, `was`, `are`], 3,
  [`The subject is "keys," not "lighthouse." Skip the phrase "to the old lighthouse."`, `"Keys" is plural, so it needs the plural verb "are."`],
  `"Is" agrees with "lighthouse," the noun closest to the blank, but that is not the subject.`);
D('fss', 2,
  `In the 1920s, several Hollywood film studios built their own film-processing laboratories so that ______ could control the quality of every print.`,
  'conv', [`it`, `they`, `he or she`, `one`], 1,
  [`The pronoun refers back to "studios," which is plural.`, `A plural antecedent needs the plural pronoun "they."`],
  `"It" would match a single studio, but the sentence names several.`);
D('fss', 3,
  `Born in a small fishing village in 1949, ______`,
  'conv', [
    `the poems of Esi Owusu often describe the sea.`,
    `Esi Owusu often describes the sea in her poems.`,
    `the sea appears often in Esi Owusu's poems.`,
    `Esi Owusu's poems often describe the sea.`], 1,
  [`The opening phrase describes a person who was born in a village.`, `The noun right after the comma must be that person: Esi Owusu.`],
  `"Esi Owusu's poems" looks close, but it makes the poems the thing that was born in 1949.`);

/* ======================================= MATH ======================================= */

DM('lin1', 1, `If \\(4x + 9 = 37\\), what is the value of \\(x\\)?`, ['4', '7', '9', '28'], 1,
  [`Subtract 9 from both sides: \\(4x = 28\\).`, `Divide by 4: \\(x = 7\\).`], `28 is the value of \\(4x\\), one step short.`);
DM('lin1', 2, `If \\(3(x - 2) = 2x + 5\\), what is the value of \\(x\\)?`, ['1', '3', '7', '11'], 3,
  [`Distribute: \\(3x - 6 = 2x + 5\\).`, `Subtract \\(2x\\) and add 6: \\(x = 11\\).`], `7 comes from forgetting to multiply the 2 by 3 (\\(3x - 2 = 2x + 5\\)).`);
DM('lin1', 3, `In the equation \\(6(2x + k) = 12x + 30\\), \\(k\\) is a constant. If the equation has infinitely many solutions, what is the value of \\(k\\)?`, ['5', '6', '24', '30'], 0,
  [`Distribute: \\(12x + 6k = 12x + 30\\).`, `Infinitely many solutions means both sides are identical, so \\(6k = 30\\) and \\(k = 5\\).`], `30 is the value of \\(6k\\), not \\(k\\).`);

DM('linf', 1, `The function \\(f\\) is defined by \\(f(x) = 7x - 4\\). What is the value of \\(f(3)\\)?`, ['3', '10', '17', '25'], 2,
  [`Substitute 3 for \\(x\\): \\(7(3) - 4\\).`, `\\(21 - 4 = 17\\).`], `25 comes from adding 4 instead of subtracting it.`);
DM('linf', 2, `A candle is 18 inches tall when it is lit, and it burns at a constant rate of 1.5 inches per hour. Which function \\(h\\) gives the candle's height, in inches, \\(t\\) hours after it is lit?`,
  ['\\(h(t) = 18 + 1.5t\\)', '\\(h(t) = 18 - 1.5t\\)', '\\(h(t) = 1.5 - 18t\\)', '\\(h(t) = 18t - 1.5\\)'], 1,
  [`The starting height is 18, so 18 is the constant.`, `The candle gets shorter by 1.5 each hour, so subtract \\(1.5t\\).`], `\\(18 + 1.5t\\) would make the candle grow taller as it burns.`);
DM('linf', 3, `For the linear function \\(g\\), \\(g(2) = 11\\) and \\(g(6) = 23\\). What is the value of \\(g(12)\\)?`, ['3', '35', '41', '46'], 2,
  [`Slope: \\((23 - 11) \\div (6 - 2) = 3\\).`, `From \\(x = 6\\) to \\(x = 12\\) is 6 more units, so \\(g(12) = 23 + 6(3) = 41\\).`], `46 doubles \\(g(6)\\). Doubling the input of a linear function doesn't double the output unless the line passes through the origin (here \\(g(0) = 5\\)).`);

DM('lin2', 1, `Tickets to a school play cost $5 for students and $8 for adults. The drama club sold \\(s\\) student tickets and \\(a\\) adult tickets for a total of $640. Which equation represents this situation?`,
  ['\\(8s + 5a = 640\\)', '\\(13(s + a) = 640\\)', '\\(5s + 8a = 640\\)', '\\(5s - 8a = 640\\)'], 2,
  [`Student tickets bring in \\(5s\\) dollars and adult tickets bring in \\(8a\\) dollars.`, `Together they total 640: \\(5s + 8a = 640\\).`], `\\(8s + 5a\\) swaps the prices of the two kinds of tickets.`);
DM('lin2', 2, `What is the slope of the line in the xy-plane given by \\(4x + 2y = 10\\)?`, ['−4', '−2', '2', '5'], 1,
  [`Solve for \\(y\\): \\(2y = -4x + 10\\), so \\(y = -2x + 5\\).`, `The coefficient of \\(x\\) is the slope: −2.`], `−4 is the coefficient before dividing by 2, and 5 is the y-intercept.`);
DM('lin2', 3, `A line in the xy-plane passes through the points \\((-2, 7)\\) and \\((4, -5)\\). What is the x-intercept of the line?`,
  ['\\((0, 3)\\)', '\\(\\left(\\frac{3}{2}, 0\\right)\\)', '\\((3, 0)\\)', '\\(\\left(-\\frac{3}{2}, 0\\right)\\)'], 1,
  [`Slope: \\((-5 - 7) \\div (4 - (-2)) = -2\\). Using \\((4, -5)\\): \\(y = -2x + 3\\).`, `Set \\(y = 0\\): \\(-2x + 3 = 0\\), so \\(x = \\frac{3}{2}\\).`], `\\((0, 3)\\) is the y-intercept, not the x-intercept.`);

DM('sys', 1, `\\(x + y = 10\\)<br>\\(x - y = 4\\)<br>What is the value of \\(x\\) in the solution to the system of equations above?`, ['3', '6', '7', '14'], 2,
  [`Add the equations: \\(2x = 14\\).`, `So \\(x = 7\\).`], `3 is the value of \\(y\\).`);
DM('sys', 2, `A café sells muffins for $3 each and smoothies for $5 each. On Monday it sold 40 of these items for a total of $164. How many smoothies did it sell?`, ['18', '20', '22', '24'], 2,
  [`Let \\(m + s = 40\\) and \\(3m + 5s = 164\\). Substitute \\(m = 40 - s\\): \\(120 - 3s + 5s = 164\\).`, `\\(2s = 44\\), so \\(s = 22\\).`], `18 is the number of muffins.`,
  { desmos: ['m+s=40', '3m+5s=164'], desmosTip: 'Rename the variables x and y, graph both lines, and tap the intersection.' });
DM('sys', 3, `\\(3x - 2y = 8\\)<br>\\(kx - 6y = 20\\)<br>In the system of equations above, \\(k\\) is a constant. For what value of \\(k\\) does the system have no solution?`, ['3', '6', '9', '12'], 2,
  [`No solution means parallel lines: the same slope but different equations.`, `Multiply the first equation by 3: \\(9x - 6y = 24\\). Matching the \\(y\\)-coefficients requires \\(k = 9\\), and since \\(20 \\ne 24\\), the lines are parallel.`], `6 matches the \\(y\\)-coefficient, not the \\(x\\)-coefficient.`);

DM('ineq', 1, `Which of the following values of \\(x\\) satisfies \\(2x - 5 > 9\\)?`, ['5', '6', '7', '8'], 3,
  [`Add 5: \\(2x > 14\\).`, `Divide by 2: \\(x > 7\\). Only 8 is greater than 7.`], `7 makes the two sides equal, but the inequality is strict (>).`);
DM('ineq', 2, `A delivery van can carry at most 1,500 pounds. The driver weighs 180 pounds, and each box weighs 40 pounds. Which inequality represents the number of boxes, \\(b\\), the van can carry along with the driver?`,
  ['\\(180 + 40b \\le 1{,}500\\)', '\\(180 + 40b \\ge 1{,}500\\)', '\\(40 + 180b \\le 1{,}500\\)', '\\(180b + 40 \\ge 1{,}500\\)'], 0,
  [`Total weight: driver 180 plus 40 for each box, \\(180 + 40b\\).`, `"At most 1,500" means \\(\\le 1{,}500\\).`], `≥ would mean "at least," the opposite of a weight limit.`);
DM('ineq', 3, `\\(y > 2x - 3\\)<br>\\(y < -x + 6\\)<br>Which point \\((x, y)\\) is a solution to the system of inequalities above?`, ['\\((4, 4)\\)', '\\((3, 2)\\)', '\\((1, 4)\\)', '\\((-1, 8)\\)'], 2,
  [`Test \\((1, 4)\\): \\(4 > 2(1) - 3 = -1\\) ✓ and \\(4 < -1 + 6 = 5\\) ✓.`, `Each other point fails one inequality.`], `\\((-1, 8)\\) passes the first inequality but fails the second (8 is not less than 7). A point must satisfy both.`,
  { desmos: ['y>2x-3', 'y<-x+6'] });

DM('nlf', 1, `The function \\(f\\) is defined by \\(f(x) = x^2 + 3\\). What is the value of \\(f(4)\\)?`, ['11', '16', '19', '25'], 2,
  [`Substitute 4: \\(4^2 + 3\\).`, `\\(16 + 3 = 19\\).`], `11 comes from \\(2 \\cdot 4 + 3\\), treating the square as doubling.`);
DM('nlf', 2, `A town has 12,000 residents, and its population grows by 3% each year. Which function \\(P\\) models the population \\(t\\) years from now?`,
  ['\\(P(t) = 12{,}000(1.03)^t\\)', '\\(P(t) = 12{,}000(0.03)^t\\)', '\\(P(t) = 12{,}000 + 1.03t\\)', '\\(P(t) = 12{,}000(1.3)^t\\)'], 0,
  [`Growing by 3% each year multiplies by \\(1 + 0.03 = 1.03\\) each year.`, `After \\(t\\) years: \\(12{,}000(1.03)^t\\).`], `\\(1.3\\) would be 30% growth, and \\(0.03\\) would shrink the population almost to zero.`);
DM('nlf', 3, `The function \\(f\\) is defined by \\(f(x) = -(x - 5)(x + 1)\\). What is the maximum value of \\(f(x)\\)?`, ['2', '5', '9', '−5'], 2,
  [`The roots are \\(x = 5\\) and \\(x = -1\\), so the vertex is halfway between them at \\(x = 2\\).`, `\\(f(2) = -(2 - 5)(2 + 1) = -(-3)(3) = 9\\).`], `2 is the x-value where the maximum happens, not the maximum value itself.`,
  { desmos: ['f(x)=-(x-5)(x+1)'] });

DM('nle', 1, `If \\(x^2 = 49\\) and \\(x > 0\\), what is the value of \\(x\\)?`, ['7', '24.5', '49', '−7'], 0,
  [`Take the square root of both sides: \\(x = 7\\) or \\(x = -7\\).`, `Since \\(x > 0\\), \\(x = 7\\).`], `24.5 is \\(49 \\div 2\\). Squaring is not doubling.`);
DM('nle', 2, `What are the solutions to \\(x^2 - 5x - 14 = 0\\)?`, ['\\(x = -7\\) and \\(x = 2\\)', '\\(x = 7\\) and \\(x = -2\\)', '\\(x = 7\\) and \\(x = 2\\)', '\\(x = -7\\) and \\(x = -2\\)'], 1,
  [`Find two numbers that multiply to −14 and add to −5: −7 and 2. So \\((x - 7)(x + 2) = 0\\).`, `\\(x = 7\\) or \\(x = -2\\).`], `\\(-7\\) and \\(2\\) are the numbers inside the factors; the solutions have the opposite signs.`);
DM('nle', 3, `\\(y = x^2 - 4x + 7\\)<br>\\(y = 2x - 2\\)<br>How many solutions does the system of equations above have?`, ['Zero', 'Exactly one', 'Exactly two', 'Infinitely many'], 1,
  [`Set the right sides equal: \\(x^2 - 4x + 7 = 2x - 2\\), so \\(x^2 - 6x + 9 = 0\\).`, `That is \\((x - 3)^2 = 0\\), which has exactly one solution, \\(x = 3\\): the line touches the parabola at one point.`], `A line and a parabola often cross twice, but this line is tangent to the parabola.`,
  { desmos: ['y=x^2-4x+7', 'y=2x-2'] });

DM('eqv', 1, `Which expression is equivalent to \\(3(2x + 5) - 4x\\)?`, ['\\(2x + 5\\)', '\\(2x + 15\\)', '\\(10x + 15\\)', '\\(6x + 11\\)'], 1,
  [`Distribute: \\(6x + 15 - 4x\\).`, `Combine like terms: \\(2x + 15\\).`], `\\(2x + 5\\) forgets to multiply the 5 by 3.`);
DM('eqv', 2, `Which expression is equivalent to \\((x + 4)(x - 9)\\)?`, ['\\(x^2 - 36\\)', '\\(x^2 + 5x - 36\\)', '\\(x^2 - 5x - 36\\)', '\\(x^2 - 13x - 36\\)'], 2,
  [`FOIL: \\(x^2 - 9x + 4x - 36\\).`, `Combine: \\(x^2 - 5x - 36\\).`], `\\(x^2 - 36\\) skips the middle terms.`);
DM('eqv', 3, `If \\((2x + a)(x - 3) = 2x^2 + bx - 15\\) for all values of \\(x\\), where \\(a\\) and \\(b\\) are constants, what is the value of \\(b\\)?`, ['−11', '−1', '5', '11'], 1,
  [`Constant terms: \\(a \\cdot (-3) = -15\\), so \\(a = 5\\).`, `x-terms: \\(2x \\cdot (-3) + a \\cdot x = (-6 + 5)x\\), so \\(b = -1\\).`], `5 is the value of \\(a\\), and −11 comes from subtracting 5 instead of adding it.`);

DM('rat', 1, `A car travels 210 miles in 3.5 hours at a constant speed. What is the car's speed, in miles per hour?`, ['50', '60', '70', '73.5'], 1,
  [`Speed = distance ÷ time.`, `\\(210 \\div 3.5 = 60\\).`], `73.5 multiplies 210 by 0.35 instead of dividing by 3.5.`);
DM('rat', 2, `A pancake recipe uses 3 cups of flour for every 2 cups of milk. How many cups of milk are needed for 12 cups of flour?`, ['6', '18', '8', '24'], 2,
  [`Set up \\(\\frac{3}{2} = \\frac{12}{m}\\).`, `\\(3m = 24\\), so \\(m = 8\\).`], `18 flips the ratio (milk to flour).`);
DM('rat', 3, `A printer prints 45 pages per minute. At this rate, how many hours will it take to print 16,200 pages?`, ['6', '36', '60', '360'], 0,
  [`Minutes: \\(16{,}200 \\div 45 = 360\\).`, `Hours: \\(360 \\div 60 = 6\\).`], `360 is the time in minutes. The question asks for hours.`);

DM('pct', 1, `What is 35% of 260?`, ['35', '74', '91', '225'], 2,
  [`Change 35% to 0.35.`, `\\(0.35 \\times 260 = 91\\).`], `225 is \\(260 - 35\\), subtracting the percent as if it were a number.`);
DM('pct', 2, `A jacket originally priced at $80 is on sale for 25% off. An 8% sales tax is then applied to the sale price. What is the total cost of the jacket?`, ['$54.00', '$60.00', '$64.80', '$66.40'], 2,
  [`Sale price: \\(80 \\times 0.75 = 60\\).`, `With tax: \\(60 \\times 1.08 = 64.80\\).`], `$66.40 combines the changes into one 17% discount. Percent changes multiply in order; they don't add.`);
DM('pct', 3, `The number \\(y\\) is 150% greater than the number \\(x\\), and \\(x\\) is 40% of the positive number \\(z\\). The value of \\(y\\) is what percent of \\(z\\)?`, ['60%', '100%', '150%', '190%'], 1,
  [`"150% greater than \\(x\\)" means \\(y = x + 1.5x = 2.5x\\). Also \\(x = 0.4z\\).`, `\\(y = 2.5(0.4z) = z\\), which is 100% of \\(z\\).`], `60% treats "150% greater than" as "150% of."`);

DM('one', 1, `What is the mean of the data set 2, 5, 5, 9, 14?`, ['5', '7', '9', '12'], 1,
  [`Add the values: \\(2 + 5 + 5 + 9 + 14 = 35\\).`, `Divide by 5: \\(35 \\div 5 = 7\\).`], `5 is the median (the middle value) and also the mode.`);
DM('one', 2, `Data set A: 10, 20, 30, 40, 50<br>Data set B: 28, 29, 30, 31, 32<br>Which statement about the two data sets is true?`, [
  'They have the same mean, but data set A has a larger standard deviation.',
  'They have the same mean, but data set B has a larger standard deviation.',
  'Data set A has a larger mean and a larger standard deviation.',
  'They have the same mean and the same standard deviation.'], 0,
  [`Both sets are symmetric around 30, so both means are 30.`, `Set A is spread far from 30 and set B is packed close to it, so A's standard deviation is larger.`], `Same mean doesn't mean same spread. Set B's values barely move from 30.`);
DM('one', 3, `A list of 9 numbers has a mean of 20. When one number is removed from the list, the mean of the remaining 8 numbers is 18. What number was removed?`, ['2', '18', '20', '36'], 3,
  [`Original total: \\(9 \\times 20 = 180\\). New total: \\(8 \\times 18 = 144\\).`, `The removed number is \\(180 - 144 = 36\\).`], `2 is the drop in the mean, not the removed value.`);

DM('two', 1, `For a group of students, the line of best fit \\(y = 4x + 62\\) models quiz score, \\(y\\), in terms of hours studied, \\(x\\). What score does the line predict for a student who studies 5 hours?`, ['62', '67', '82', '86'], 2,
  [`Substitute 5: \\(4(5) + 62\\).`, `\\(20 + 62 = 82\\).`], `67 adds 5 instead of multiplying it by 4.`);
DM('two', 2, `The line of best fit \\(y = 85x + 120\\) models a store's daily sales, \\(y\\), in dollars, in terms of the number of hours, \\(x\\), the store is open. Which is the best interpretation of 85 in this context?`, [
  'The store makes $85 on days it is closed.',
  'Each additional hour the store is open is associated with about $85 more in daily sales.',
  'The store is open about 85 hours per week.',
  'Daily sales increase by about $120 for each additional hour.'], 1,
  [`85 is the slope, the coefficient of \\(x\\).`, `Slope is the predicted change in \\(y\\) (dollars) for each one-unit increase in \\(x\\) (hours).`], `$120 is the intercept, not the hourly rate.`);
DM('two', 3, `${table('Bacteria in a culture', ['Hours, \\(x\\)', 'Bacteria (thousands), \\(y\\)'], [['0', '4'], ['1', '6'], ['2', '9'], ['3', '13.5']])}Which type of model best fits the data in the table?`,
  ['Decreasing linear', 'Increasing linear', 'Increasing exponential', 'Decreasing exponential'], 2,
  [`Differences: 2, 3, 4.5. These are not constant, so the model isn't linear.`, `Ratios: \\(6 \\div 4 = 9 \\div 6 = 13.5 \\div 9 = 1.5\\). A constant ratio above 1 means increasing exponential.`], `The values rise steadily, but rising by a growing amount each hour rules out linear.`);

DM('prob', 1, `A bag contains 6 red marbles, 4 blue marbles, and 10 green marbles. If one marble is selected at random, what is the probability that it is blue?`, ['\\(\\frac{1}{10}\\)', '\\(\\frac{1}{5}\\)', '\\(\\frac{1}{4}\\)', '\\(\\frac{2}{5}\\)'], 1,
  [`Total marbles: \\(6 + 4 + 10 = 20\\).`, `\\(P(\\text{blue}) = \\frac{4}{20} = \\frac{1}{5}\\).`], `\\(\\frac{2}{5}\\) compares blue marbles with green marbles (4 to 10), not with the whole bag.`);
DM('prob', 2, `${table('Favorite lunch by grade', ['Grade', 'Pizza', 'Salad', 'Sandwich', 'Total'], [['9', '40', '25', '35', '100'], ['10', '30', '45', '25', '100'], ['Total', '70', '70', '60', '200']])}If a student who chose salad is selected at random, what is the probability that the student is in grade 10?`,
  ['\\(\\frac{9}{40}\\)', '\\(\\frac{9}{20}\\)', '\\(\\frac{9}{14}\\)', '\\(\\frac{5}{14}\\)'], 2,
  [`"A student who chose salad" means the whole is the 70 salad students.`, `Grade 10 salad students: 45. \\(\\frac{45}{70} = \\frac{9}{14}\\).`], `\\(\\frac{9}{20}\\) is \\(\\frac{45}{100}\\), which uses all grade 10 students as the whole.`);
DM('prob', 3, `A spinner has 8 equal sections numbered 1 through 8. If the spinner is spun twice, what is the probability that both spins land on a number greater than 5?`, ['\\(\\frac{3}{64}\\)', '\\(\\frac{9}{64}\\)', '\\(\\frac{3}{8}\\)', '\\(\\frac{3}{4}\\)'], 1,
  [`Numbers greater than 5: 6, 7, 8. So \\(P = \\frac{3}{8}\\) for one spin.`, `The spins are independent: \\(\\frac{3}{8} \\cdot \\frac{3}{8} = \\frac{9}{64}\\).`], `\\(\\frac{3}{4}\\) adds the two probabilities instead of multiplying them.`);

DM('samp', 1, `A random sample of 400 voters in a city found that 58% support building a new park. Based on this sample, which is the best estimate of how many of the city's 50,000 voters support the park?`, ['232', '2,900', '29,000', '58,000'], 2,
  [`Use the sample proportion for the whole city: \\(0.58 \\times 50{,}000\\).`, `That's 29,000 voters.`], `232 is 58% of the 400 people sampled, not of the whole city.`);
DM('samp', 2, `Based on a random sample of a town's residents, researchers estimated that 64% of residents recycle, with a margin of error of 4%. Which conclusion is most appropriate?`, [
  'Exactly 64% of the town\'s residents recycle.',
  'Between 60% and 68% of the people in the sample recycle.',
  'It is plausible that between 60% and 68% of all the town\'s residents recycle.',
  'Fewer than 60% of the town\'s residents recycle.'], 2,
  [`The estimate ± the margin of error gives a plausible range for the whole population.`, `64% ± 4% is 60% to 68% of all residents.`], `The margin of error describes the population, not the sample. Exactly 64% of the sample recycles.`);
DM('samp', 3, `Researchers selected 500 people at random from all library card holders in a city and asked how many books they read each year. To which group can the results most appropriately be generalized?`, [
  'All residents of the city',
  'Only the 500 people surveyed',
  'All library card holders in the country',
  'All library card holders in the city'], 3,
  [`A random sample represents the population it was drawn from.`, `The sample was drawn from the city's library card holders.`], `"All residents of the city" includes people without library cards, who could never have been chosen.`);

DM('stud', 1, `A researcher wants to find out whether a new fertilizer causes tomato plants to grow taller. Which method would allow the researcher to make that conclusion?`, [
  'Ask local gardeners whether they use the fertilizer and compare the heights of their plants.',
  'Measure plants in one garden that already uses the fertilizer.',
  'Randomly assign plants to receive the fertilizer or no fertilizer, then compare their growth.',
  'Give the fertilizer to the healthiest-looking plants and compare them with the rest.'], 2,
  [`Cause-and-effect conclusions require random assignment to groups.`, `Only the third method randomly assigns the fertilizer.`], `Choosing the healthiest plants for the fertilizer builds in a difference before the test even starts.`);
DM('stud', 2, `A researcher randomly assigned 100 volunteers to drink either green tea or water every evening for 6 weeks. The green tea group reported better sleep, on average. Which conclusion is best supported?`, [
  'Green tea causes better sleep for all adults.',
  'Green tea is likely to cause better sleep for people similar to the volunteers in the study.',
  'There is no relationship between green tea and sleep.',
  'Water causes worse sleep for all adults.'], 1,
  [`Random assignment supports a cause-and-effect conclusion.`, `The volunteers weren't a random sample of all adults, so the result applies to people like them.`], `"All adults" overreaches: volunteers were not randomly selected from all adults.`);
DM('stud', 3, `An observational study of a random sample of 2,000 adults in a country found that adults who own a dog walk more minutes per day, on average, than adults who don't. Which conclusion is most appropriate?`, [
  'Owning a dog causes adults in the country to walk more.',
  'Among adults in the country, owning a dog is associated with walking more, but the study doesn\'t show that one causes the other.',
  'The results apply only to the 2,000 adults in the study.',
  'Adults in the country who walk more are more likely to buy a dog.'], 1,
  [`Random sampling lets the result be generalized to adults in the country.`, `Without random assignment, the study shows an association, not a cause.`], `"Causes" needs an experiment with random assignment; this study only observed.`);

DM('area', 1, `A rectangle has a length of 12 centimeters and a width of 5 centimeters. What is the area of the rectangle, in square centimeters?`, ['17', '34', '60', '120'], 2,
  [`Area = length × width.`, `\\(12 \\times 5 = 60\\).`], `34 is the perimeter, not the area.`);
DM('area', 2, `A right circular cylinder has a radius of 3 inches and a height of 10 inches. What is the volume of the cylinder, in cubic inches?`, ['\\(30\\pi\\)', '\\(90\\pi\\)', '\\(60\\pi\\)', '\\(300\\pi\\)'], 1,
  [`\\(V = \\pi r^2 h\\).`, `\\(\\pi (3)^2 (10) = 90\\pi\\).`], `\\(30\\pi\\) forgets to square the radius.`);
DM('area', 3, `A cube has a total surface area of 150 square inches. What is the volume of the cube, in cubic inches?`, ['25', '150', '625', '125'], 3,
  [`A cube has 6 equal faces: each face is \\(150 \\div 6 = 25\\), so each edge is 5.`, `Volume \\(= 5^3 = 125\\).`], `25 is the area of one face, not the volume.`);

DM('lat', 1, `Two lines intersect, and one of the angles formed measures 115°. What is the measure of an angle adjacent to it?`, ['25°', '65°', '115°', '245°'], 1,
  [`Adjacent angles formed by two intersecting lines sit on a straight line, so they add to 180°.`, `\\(180 - 115 = 65\\).`], `115° is the vertical angle (across from it), not the adjacent one.`);
DM('lat', 2, `In triangle \\(ABC\\), angle \\(A\\) measures 40°, and the measure of angle \\(B\\) is twice the measure of angle \\(A\\). What is the measure of angle \\(C\\)?`, ['40°', '60°', '80°', '100°'], 1,
  [`Angle \\(B = 2(40) = 80\\).`, `\\(C = 180 - 40 - 80 = 60\\).`], `80° is angle \\(B\\), not angle \\(C\\).`);
DM('lat', 3, `Triangles \\(PQR\\) and \\(STU\\) are similar, with \\(P\\), \\(Q\\), and \\(R\\) corresponding to \\(S\\), \\(T\\), and \\(U\\). If \\(PQ = 6\\), \\(QR = 9\\), and \\(ST = 10\\), what is the length of \\(TU\\)?`, ['5.4', '13', '15', '19'], 2,
  [`Scale factor from \\(PQR\\) to \\(STU\\): \\(10 \\div 6 = \\frac{5}{3}\\).`, `\\(TU = 9 \\cdot \\frac{5}{3} = 15\\).`], `13 adds 4 (the difference 10 − 6), but similar triangles scale by multiplying.`);

DM('trig', 1, `The legs of a right triangle have lengths 9 and 12. What is the length of the hypotenuse?`, ['15', '21', '108', '225'], 0,
  [`\\(c^2 = 9^2 + 12^2 = 81 + 144 = 225\\).`, `\\(c = 15\\).`], `225 is \\(c^2\\); take the square root.`);
DM('trig', 2, `In right triangle \\(ABC\\), angle \\(C\\) is the right angle, \\(AC = 8\\), \\(BC = 15\\), and \\(AB = 17\\). What is the value of \\(\\sin A\\)?`, ['\\(\\frac{8}{17}\\)', '\\(\\frac{15}{17}\\)', '\\(\\frac{8}{15}\\)', '\\(\\frac{15}{8}\\)'], 1,
  [`The side opposite angle \\(A\\) is \\(BC = 15\\); the hypotenuse is \\(AB = 17\\).`, `\\(\\sin A = \\frac{15}{17}\\).`], `\\(\\frac{8}{17}\\) is \\(\\cos A\\) (adjacent over hypotenuse).`);
DM('trig', 3, `In right triangle \\(XYZ\\), angle \\(Z\\) is the right angle, and \\(\\cos X = \\frac{5}{13}\\). What is the value of \\(\\sin Y\\)?`, ['\\(\\frac{5}{13}\\)', '\\(\\frac{12}{13}\\)', '\\(\\frac{5}{12}\\)', '\\(\\frac{12}{5}\\)'], 0,
  [`Angles \\(X\\) and \\(Y\\) add to 90°, so the side adjacent to \\(X\\) is the side opposite \\(Y\\).`, `So \\(\\sin Y = \\cos X = \\frac{5}{13}\\).`], `\\(\\frac{12}{13}\\) is \\(\\sin X\\). Complementary angles swap sine and cosine.`);

DM('circ', 1, `A circle has a radius of 7. What is the circumference of the circle?`, ['\\(7\\pi\\)', '\\(14\\pi\\)', '\\(49\\pi\\)', '\\(28\\pi\\)'], 1,
  [`\\(C = 2\\pi r\\).`, `\\(2\\pi (7) = 14\\pi\\).`], `\\(49\\pi\\) is the area, not the circumference.`);
DM('circ', 2, `What is the radius of the circle in the xy-plane with equation \\((x - 2)^2 + (y + 5)^2 = 36\\)?`, ['36', '18', '6', '5'], 2,
  [`In \\((x - h)^2 + (y - k)^2 = r^2\\), the right side is \\(r^2\\).`, `\\(r^2 = 36\\), so \\(r = 6\\).`], `36 is \\(r^2\\), and 18 halves it instead of taking the square root.`);
DM('circ', 3, `The equation \\(x^2 + y^2 - 6x + 8y = 11\\) defines a circle in the xy-plane. What is the radius of the circle?`, ['\\(\\sqrt{11}\\)', '11', '36', '6'], 3,
  [`Complete the square: \\((x^2 - 6x + 9) + (y^2 + 8y + 16) = 11 + 9 + 16\\).`, `\\((x - 3)^2 + (y + 4)^2 = 36\\), so \\(r = 6\\).`], `\\(\\sqrt{11}\\) skips completing the square; the 11 is not \\(r^2\\) yet.`,
  { desmos: ['x^2+y^2-6x+8y=11'] });

export { DRILLS };
