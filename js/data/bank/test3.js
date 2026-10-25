/**
 * test3.js: CrestPrep Practice Test 3. Original questions that follow the
 * skill-by-skill sequence of College Board's Practice Test 6.
 *   R1 / M1 → Module 1.  R2 / M2 → Module 2 pool (see bank/tests.js).
 */
import { testMakers, notes, goal, table, twoTexts } from './build.js';

const { list, R1, R2, M1, M2 } = testMakers(3);

/* ======================= Reading and Writing: Module 1 ======================= */
R1('wic', 1, `The new library's design ______ an open book: its two wings slope upward from a central spine, like pages spread apart.`,
  'wic', [`resembles`, `replaces`, `predicts`, `ignores`], 0,
  [`The comparison after the colon: "like pages spread apart."`, `Looking like something is "resembling" it.`], `"Replaces" doesn't fit; the building looks like a book, it doesn't take a book's place.`);
R1('wic', 2, `In the introduction to her anthology of early science fiction by women, editor Nora Patel ______ the collection's goals plainly: to recover stories that magazines once published widely but that later histories of the genre left out.`,
  'wic', [`conceals`, `outlines`, `questions`, `exaggerates`], 1,
  [`After the colon, Patel states her goals clearly.`, `Stating goals clearly is "outlining" them.`], `"Conceals" contradicts "plainly."`);
R1('wic', 2, `Early studies of how teenagers use social media focused almost entirely on harms such as lost sleep. Psychologist Amira Saleh's research aims at ______ that imbalance by also measuring benefits, such as the support teens find in online communities for people with rare illnesses.`,
  'wic', [`worsening`, `celebrating`, `predicting`, `correcting`], 3,
  [`Earlier studies were lopsided; Saleh adds the missing side (benefits).`, `Fixing an imbalance is "correcting" it.`], `"Worsening" is the opposite: measuring benefits balances the research.`);
R1('wic', 3, `The twelfth-century philosopher Ibn Rushd, known in Europe as Averroes, wrote detailed commentaries on Aristotle that were translated into Latin and studied for centuries. His influence on European thought was so ______ that many medieval scholars referred to him simply as "the Commentator."`,
  'wic', [`fleeting`, `controversial`, `pervasive`, `accidental`], 2,
  [`His work was studied "for centuries," and scholars knew him by a one-word title.`, `Influence that spread widely and lasted is "pervasive."`], `"Fleeting" clashes with influence that lasted for centuries.`);
R1('tsp', 2, `Glass frogs, found in rainforests of Central and South America, are named for their see-through skin. <u>When a glass frog sleeps, it hides most of its red blood cells in its liver, making its body far more transparent than when it is awake.</u> Researchers think this trick helps the frogs avoid predators during the day, when they rest on leaves.`,
  'function', [`It explains how glass frogs got their name.`, `It describes the habitat where glass frogs live.`, `It describes a surprising behavior that the final sentence then offers an explanation for.`, `It challenges the idea that glass frogs are transparent.`], 2,
  [`The underlined sentence describes what the frog does while sleeping.`, `The last sentence suggests why (avoiding predators).`], `The name comes from the first sentence, not the underlined one.`);
R1('tsp', 2, `Pianist Martha Argerich is famous for her dazzling technique, but critics most often praise something else: her spontaneity. She is known to change her interpretation of a piece from one performance to the next, so that even listeners who have heard her play a work many times can still be surprised.`,
  'purpose', [`To identify a quality of Argerich's playing that critics especially admire`, `To explain how Argerich developed her technique`, `To argue that Argerich's technique is overrated`, `To describe the pieces Argerich performs most often`], 0,
  [`"Critics most often praise something else: her spontaneity," then an explanation of it.`, `The purpose is to identify that admired quality.`], `The text never criticizes her technique; it calls it "dazzling."`);
R1('tsp', 3, `In 1928, Alexander Fleming noticed that mold growing in one of his dishes had killed the bacteria around it. He identified the substance responsible, which he called penicillin, but he struggled to produce it in useful amounts and eventually moved on to other research. More than a decade later, scientists Howard Florey and Ernst Chain developed methods to purify penicillin, turning Fleming's observation into a lifesaving drug.`,
  'structure', [`It presents a theory, explains how Fleming tested it, and reports that the test failed.`, `It compares two ways of growing mold and argues that one is safer.`, `It describes a disagreement between Fleming and later scientists about who discovered penicillin.`, `It describes an observation, explains why its discoverer couldn't fully use it, and then tells how others later did.`], 3,
  [`Fleming's observation → he couldn't make enough → Florey and Chain made it usable.`, `Observation, limitation, later success.`], `The text describes no disagreement about credit.`);
R1('ctc', 3, twoTexts(`Many economists argue that offering people small rewards, such as gift cards, is an effective way to encourage healthy habits like exercising. <u>Once the habit is established, they claim, people will keep it up even after the rewards stop.</u>`,
  `In a study led by economist Teresa Domingo, gym members who were paid for each visit went to the gym far more often than an unpaid comparison group. But within two months after the payments ended, the paid group's attendance had dropped back to the level of the unpaid group.`),
  `Based on the texts, how would Domingo (Text 2) most likely respond to the underlined claim in Text 1?`,
  [`By agreeing that paid participants kept exercising after the payments ended`, `By noting that her findings suggest the habit may fade once the rewards stop`, `By arguing that rewards never increase how often people exercise`, `By suggesting that gift cards work better than cash payments`], 1,
  [`The claim: the habit lasts after rewards end.`, `Domingo found attendance fell back once payments ended.`], `"Rewards never increase exercise" contradicts Domingo, whose paid group went far more often during the payments.`);
R1('cid', 2, `Archaeologist Ana Ruiz studied the remains of an Iron Age settlement in Spain. Earlier researchers had assumed that the settlement's large stone tower was a fortress. Ruiz found no weapons near the tower but did find hundreds of storage jars, scales, and stamped clay seals. She argues that the tower was more likely a place where goods were collected, weighed, and recorded.`,
  'main', [`Ruiz argues that evidence suggests a tower once thought to be a fortress was used to store and track goods.`, `Ruiz argues that the settlement was frequently attacked.`, `Earlier researchers found hundreds of storage jars near the tower.`, `Ruiz believes Iron Age settlements in Spain had no fortresses.`], 0,
  [`Old view: fortress. Ruiz's evidence: jars, scales, seals, no weapons.`, `Her conclusion: a place for handling goods.`], `"No fortresses anywhere" overgeneralizes from one tower at one site.`);
R1('cid', 1, `The okapi, which lives in the rainforests of central Africa, has striped legs like a zebra's, but it is actually the closest living relative of the giraffe. Like a giraffe, it has a long, dark tongue that it uses to strip leaves from branches.`,
  `According to the text, how is the okapi similar to the giraffe?`,
  [`Both have striped legs.`, `Both live in the rainforests of central Africa.`, `Both are closely related to zebras.`, `Both use a long tongue to strip leaves from branches.`], 3,
  [`"Like a giraffe, it has a long, dark tongue..."`, `That's the similarity the text names.`], `The striped legs are compared with a zebra's, not a giraffe's.`);
R1('coe', 2, `${table('Bicycles made by companies in Larkfield', ['Company', '1890', '1900'], [['Arrow', '1,200', '900'], ['Brightwheel', '400', '3,100'], ['Cole & Sons', '2,000', '2,200'], ['Dart', '800', '150']])}Historian Pia Lund notes that the 1890s brought dramatic change to Larkfield's bicycle makers: while some companies shrank, Brightwheel ______`,
  'table', [`made more bicycles than any other company in 1890.`, `grew from 400 bicycles in 1890 to 3,100 in 1900, the most of any company that year.`, `made fewer bicycles in 1900 than in 1890.`, `made 900 bicycles in 1900.`], 1,
  [`The sentence contrasts companies that shrank with Brightwheel's dramatic change.`, `Brightwheel jumped from 400 to 3,100, the top total in 1900.`], `900 bicycles in 1900 is Arrow's number, not Brightwheel's.`);
R1('coe', 2, `When a grocery store moved its fresh produce from the back of the store to the entrance, sales of fruits and vegetables rose by 20 percent. The store's managers suggested that shoppers tend to buy more of whatever they see first, before their baskets start to fill.`,
  `Which finding, if true, would most directly support the managers' explanation?`,
  [`Fruit and vegetable prices rose during the study.`, `Most shoppers said they preferred the store's old layout.`, `When the store later moved its bakery to the entrance, bakery sales rose while produce sales returned to their earlier level.`, `The store sells more vegetables in summer than in winter.`], 2,
  [`The explanation: whatever is seen first sells more.`, `If moving the bakery to the front boosts bakery sales instead, it's the position, not the product, that matters.`], `Shoppers' stated preferences don't tell us what they actually bought.`);
R1('coe', 3, `Art historian Carla Moss claims that two exhibitions held in 1971, one in New York and one in Los Angeles, together marked a turning point in how major museums treated the work of Black artists.`,
  `Which finding, if true, would most directly support Moss's claim?`,
  [`Both exhibitions received mixed reviews from critics in 1971.`, `In the five years after 1971, major museums in both cities bought far more works by Black artists than they had in the previous twenty years.`, `Several artists appeared in both exhibitions.`, `The New York exhibition drew more visitors than the Los Angeles exhibition.`], 1,
  [`A "turning point" needs a clear change in museums' behavior before vs. after.`, `A sharp rise in purchases after 1971 shows that change.`], `Shared artists connect the two shows but don't show any change in how museums acted.`);
R1('coe', 3, `${table('Speeds of four lizard species (meters per second)', ['Species', 'Maximum sprint speed', 'Average speed while hunting'], [['A', '3.0', '2.7'], ['B', '2.4', '0.8'], ['C', '1.8', '1.6'], ['D', '2.8', '1.0']])}Biologists studying four lizard species found that some species hunt at speeds close to their maximum, while others hunt far below it. For example, ______`,
  'table', [`species A has the highest maximum sprint speed of the four species.`, `species D hunts faster than species A.`, `species B and species D have the same maximum sprint speed.`, `species C hunts at 1.6 meters per second, close to its maximum of 1.8, while species B hunts at 0.8 meters per second, far below its maximum of 2.4.`], 3,
  [`The example must show both patterns: near-maximum hunting and far-below-maximum hunting.`, `Species C (1.6 of 1.8) and species B (0.8 of 2.4) show both.`], `Species A's top speed is true, but it doesn't compare hunting speed with maximum speed at all.`);
R1('inf', 2, `The pterosaur <i>Tupandactylus</i> had a huge, sail-like crest on its head that was far too thin and fragile to have been used in fights. Fossils also show that the crest was much larger in adults than in juveniles. Paleontologists therefore suggest that the crest most likely ______`,
  'complete', [`served as a display, perhaps to attract mates, rather than as a weapon.`, `helped young pterosaurs fly faster.`, `was used to break open hard-shelled prey.`, `grew only after an animal had been injured.`], 0,
  [`Too fragile for fighting, and big mainly in adults.`, `A feature that grows large in adults and isn't for fighting fits a display.`], `Young pterosaurs had small crests, so the crest can't have been mainly for juveniles' flight.`);
R1('inf', 3, `In a study by economist Ravi Menon, shoppers chose between two otherwise identical coffees, one labeled "fair trade" and priced 10 percent higher. When the label explained exactly how much more the coffee farmers were paid, more shoppers chose the fair-trade coffee than when the label simply said "fair trade." This result suggests that ______`,
  'complete', [`most shoppers do not care how coffee farmers are paid.`, `shoppers prefer cheaper coffee in every situation.`, `specific information about how a product benefits producers may make shoppers more willing to pay extra for it.`, `fair-trade labels reduce coffee sales.`], 2,
  [`Same coffee, same price; only the label's detail changed.`, `More detail about farmers' pay led more shoppers to pay extra.`], `"In every situation" is contradicted: some shoppers chose the pricier coffee, more so with the detailed label.`);
R1('bnd', 1, `Every spring, volunteers in the town ______ hundreds of native trees along the riverbank.`,
  'conv', [`plant:`, `plant,`, `plant`, `plant—`], 2,
  [`"Plant" is the verb and "hundreds of native trees" is its object.`, `No punctuation goes between a verb and its object.`], `A comma would split the verb from its object.`);
R1('bnd', 2, `In 1969, the Apollo 11 astronauts left a small reflector panel on the Moon's ______ scientists still bounce lasers off it today to measure the distance between Earth and the Moon.`,
  'conv', [`surface. Scientists`, `surface, scientists`, `surface scientists`, `surface, and, scientists`], 0,
  [`Both parts are complete sentences.`, `A period separates them correctly.`], `A comma alone between them creates a comma splice.`);
R1('bnd', 3, `Biologists filming sleeping octopuses noticed that the animals' skin sometimes flashed through the same color patterns they use while awake. The team wondered whether these patterns might replay the animals' waking ______`,
  'conv', [`experiences?`, `experiences.`, `experiences?"`, `experiences!`], 1,
  [`"The team wondered whether..." is a statement that reports a question; it doesn't ask one directly.`, `A statement ends with a period.`], `A question mark belongs only on a direct question, such as "Do these patterns replay...?"`);
R1('fss', 2, `The Hope Diamond, ______ more than a billion years ago deep within Earth, is now displayed at the Smithsonian's National Museum of Natural History.`,
  'conv', [`forming`, `it formed`, `which form`, `formed`], 3,
  [`The main verb is "is displayed." The blank starts a description between commas.`, `"Formed more than a billion years ago" describes the diamond in the past.`], `"Forming" suggests the diamond is still forming now, which clashes with "a billion years ago."`);
R1('fss', 1, `A flock of starlings ______ able to change direction almost instantly, as each bird reacts to the movements of its closest neighbors.`,
  'conv', [`are`, `is`, `were`, `have been`], 1,
  [`The subject is "flock," one group. "Of starlings" is in between.`, `Singular subject, singular verb: "is."`], `"Are" agrees with "starlings," which isn't the subject.`);
R1('fss', 3, `Among the artifacts recovered from the ancient shipwreck near the Greek island of Antikythera ______ a bronze device with dozens of gears that may be the oldest known analog computer.`,
  'conv', [`were`, `have been`, `are`, `was`], 3,
  [`The sentence is inverted: the subject comes after the verb. The subject is "a bronze device," singular.`, `Past, singular: "was."`], `"Were" agrees with "artifacts," but "artifacts" is inside the opening phrase, not the subject.`);
R1('tra', 2, `Some astrobiologists argue that the word "life" is too tied to life on Earth to describe whatever might be found on other planets. ______ they suggest using a broader term for any system that grows, reproduces, and uses energy.`,
  'trans', [`Instead,`, `Similarly,`, `For example,`, `Finally,`], 0,
  [`They reject one word and propose a replacement.`, `"Instead" introduces an alternative.`], `"For example" would make the new term an example of the old one, but it replaces it.`);
R1('tra', 2, `In the mountains of the western United States, warmer winters are causing snow at low elevations to melt earlier in spring. ______ the snowpack at the highest elevations has so far changed very little.`,
  'trans', [`As a result,`, `On the other hand,`, `For instance,`, `Likewise,`], 1,
  [`Low elevations: big change. High elevations: little change.`, `A contrast: "On the other hand."`], `"Likewise" would mean high elevations changed in the same way, but they barely changed.`);
R1('syn', 1, notes(`Janaki Ammal (1897–1984) was an Indian botanist.`, `She studied sugarcane.`, `Many sugarcane varieties grown in India were not very sweet.`, `She developed sweeter hybrid varieties that could thrive in India's climate.`, `These hybrids reduced India's need to import sugarcane.`),
  goal(`emphasize Ammal's achievement`),
  [`Janaki Ammal lived from 1897 to 1984.`, `Many sugarcane varieties grown in India were not very sweet.`, `Indian botanist Janaki Ammal developed sweeter hybrid varieties of sugarcane that could thrive in India's climate, reducing the country's need to import sugarcane.`, `Janaki Ammal studied sugarcane.`], 2,
  [`An achievement is something she accomplished and why it mattered.`, `Only the third choice gives both.`], `"She studied sugarcane" describes her work but not what she achieved.`);
R1('syn', 2, notes(`The Statue of Liberty was designed by French sculptor Frédéric-Auguste Bartholdi.`, `Its internal iron framework was designed by engineer Gustave Eiffel.`, `Eiffel also designed the Eiffel Tower in Paris.`, `The Eiffel Tower is made almost entirely of iron.`),
  goal(`emphasize a similarity between the Statue of Liberty and the Eiffel Tower`),
  [`Gustave Eiffel designed both the Eiffel Tower and the iron framework inside the Statue of Liberty.`, `The Statue of Liberty was designed by Frédéric-Auguste Bartholdi.`, `The Eiffel Tower is made almost entirely of iron.`, `The Statue of Liberty was designed by a French sculptor, while the Eiffel Tower was designed by an engineer.`], 0,
  [`A similarity needs something the two structures share.`, `Both involve Eiffel's iron designs.`], `The last choice is a contrast, not a similarity.`);
R1('syn', 3, notes(`People in ancient Egypt used tall stone obelisks whose shadows marked the time of day.`, `In ancient China, sundials were used to mark the hours.`, `The ancient Greeks and Romans built sundials in public squares.`, `All of these devices used the position of the Sun's shadow to tell time.`),
  goal(`make a generalization about how ancient peoples kept time`),
  [`The ancient Greeks and Romans built sundials in public squares.`, `In ancient China, sundials were used to mark the hours.`, `Egyptian obelisks cast shadows that marked the time of day.`, `Many ancient peoples, from Egypt to China to Greece and Rome, told time by tracking the position of the Sun's shadow.`], 3,
  [`A generalization covers many cases.`, `The last choice states the shared pattern across all the examples.`], `Each of the first three choices describes only one culture.`);

/* ===================== Reading and Writing: Module 2 pool ===================== */
R2('wic', 1, `The little ferry <u>fought</u> its way across the bay, its bow rising and slamming down against every wave, while the passengers clutched the rails and watched the dock grow slowly larger.`,
  `As used in the text, what does the word "fought" most nearly mean?`,
  [`argued`, `struggled`, `attacked`, `competed`], 1,
  [`The ferry moves forward with great effort against the waves.`, `"Fought its way" means "struggled."`], `"Attacked" is the literal fighting sense, which doesn't fit a boat crossing a bay.`);
R2('wic', 1, `The city's annual food festival ______ dishes from more than forty countries, giving visitors a chance to sample cuisines from around the world.`,
  'wic', [`concealed`, `postponed`, `featured`, `criticized`], 2,
  [`Visitors can sample dishes from forty countries.`, `The festival "featured" (included and showed off) them.`], `"Concealed" contradicts visitors being able to sample the dishes.`);
R2('wic', 2, `Before painting a mural, artist Lucía Ortega ______ the neighborhood for weeks, interviewing residents and sketching its streets so that the finished work reflects the community's own stories.`,
  'wic', [`explores`, `avoids`, `decorates`, `abandons`], 0,
  [`She interviews residents and sketches streets to learn about the place.`, `Getting to know an area this way is "exploring" it.`], `"Decorates" is what the mural eventually does, but the blank describes the weeks of research before painting.`);
R2('wic', 3, `Designer William Morris believed that beauty should be ______ even the most ordinary objects; his company produced wallpaper, tiles, and furniture decorated with intricate patterns of leaves and flowers.`,
  'wic', [`limited to`, `absent from`, `hidden behind`, `evident in`], 3,
  [`His company decorated everyday items like wallpaper and tiles.`, `He wanted beauty to be visible, "evident in," ordinary objects.`], `"Limited to" would mean beauty belongs only in ordinary objects, which goes further than the text.`);
R2('wic', 3, `Chemist Stephanie Kwolek is best remembered for inventing Kevlar, the strong, lightweight fiber used in protective vests. But Kwolek's career was ______ in other ways as well: she received some twenty-eight patents and spent years encouraging young women to pursue careers in science.`,
  'wic', [`unremarkable`, `distinguished`, `brief`, `controversial`], 1,
  [`After the colon: many patents and years of mentoring.`, `A career marked by achievement is "distinguished."`], `"Brief" clashes with "spent years" encouraging young scientists.`);
R2('tsp', 2, `The library was a long walk from Marisol's apartment, and in winter the wind off the river cut straight through her thin coat. Still, every Saturday she went, returning with as many books as the librarian would let her carry. She had decided that by the end of the year she would read every book on the shelf marked "Science," and she meant to do it.`,
  'purpose', [`To describe the library's collection of science books`, `To explain why Marisol dislikes winter`, `To portray Marisol's determination to reach a goal she has set`, `To show that the librarian limits how many books Marisol may borrow`], 2,
  [`Hardships (long walk, cold) + "Still, every Saturday she went" + a firm goal.`, `The purpose is to show her determination.`], `The borrowing limit is a small detail, not the point of the text.`);
R2('tsp', 2, `Bats are often described as blind, but this belief is mistaken. <u>Although many bats rely on echolocation to hunt insects in the dark, all bat species can see, and some large fruit bats have excellent eyesight</u> that helps them find food at dusk.`,
  'portion', [`It corrects a common misconception by giving accurate information about bats' vision.`, `It explains how echolocation works.`, `It argues that fruit bats are smarter than insect-eating bats.`, `It introduces a belief that the rest of the text supports.`], 0,
  [`Sentence 1 says the "blind" belief is mistaken.`, `The underlined portion supplies the facts: all bats can see, and some see very well.`], `Echolocation is mentioned, but the portion never explains how it works.`);
R2('tsp', 3, `For centuries, sailors told stories of "rogue waves," walls of water far taller than the waves around them, but many scientists dismissed the reports as exaggerations. In 1995, an instrument on the Draupner oil platform in the North Sea recorded a single wave about 84 feet high in seas where the surrounding waves were about 39 feet. Since then, researchers have studied how such waves form rather than whether they exist.`,
  'structure', [`It presents a scientific theory and explains why sailors rejected it.`, `It compares two oil platforms and the waves each one recorded.`, `It describes a measurement error and how scientists corrected it.`, `It describes claims that were long doubted, presents a measurement that confirmed them, and notes how research changed as a result.`], 3,
  [`Doubted sailors' stories → 1995 measurement → research shifts from "whether" to "how."`, `Only the last choice includes all three parts.`], `The doubters were scientists, not sailors, so the first choice reverses the roles.`);
R2('ctc', 3, twoTexts(`Many art historians have described the Ice Age "Venus" figurines, small carved statues of women found across Europe, as fertility symbols, perhaps used in rituals meant to encourage childbirth.`,
  `Anthropologist LeRoy McDermott proposed that some of the figurines may have been made by women looking down at their own bodies, which would explain why the statues show the upper body in detail but have feet that are small or missing.`),
  `Based on the texts, how would McDermott (Text 2) most likely respond to the art historians' view in Text 1?`,
  [`By agreeing that the figurines were made to encourage childbirth`, `By suggesting that the figurines' features may be explained by how they were made rather than by rituals`, `By arguing that the figurines were carved by men`, `By claiming that the figurines were made long after the Ice Age`], 1,
  [`Text 1: fertility symbols for rituals. Text 2: their shape reflects women viewing their own bodies.`, `McDermott offers an explanation based on how they were made.`], `McDermott suggests women made some of them, so "carved by men" reverses his idea.`);
R2('cid', 2, `One might expect the most brightly colored poison frogs to be the most toxic, since bright colors warn predators away. But a study of many species found that the link is not so simple: some dull-colored frogs are highly toxic, while a few bright ones carry only weak toxins. The researchers suggest that color and toxicity may evolve partly independently.`,
  'main', [`Bright colors make poison frogs more toxic.`, `Dull-colored frogs are never toxic.`, `Predators avoid all brightly colored animals.`, `Contrary to what one might expect, a poison frog's coloring is not a reliable guide to how toxic it is.`], 3,
  [`Expectation: brighter = more toxic. Finding: not reliably.`, `The main idea is that color doesn't reliably predict toxicity.`], `"Never toxic" is contradicted: some dull frogs are highly toxic.`);
R2('cid', 1, `Microbiologist Hana Ito sampled the bacteria living in the soil around the roots of rice plants. She found that the bacterial community changed as the plants grew, which was important because it suggested that the plants themselves might be shaping which microbes live near their roots.`,
  `According to the text, why was Ito's finding important?`,
  [`It suggested that rice plants may influence which bacteria live around their roots.`, `It showed that rice plants grow faster in sandy soil.`, `It proved that bacteria harm rice plants.`, `It revealed that soil bacteria never change.`], 0,
  [`"Important because it suggested that the plants themselves might be shaping which microbes live near their roots."`, `The first choice restates that.`], `"Never change" contradicts the finding that the community changed.`);
R2('cid', 3, `Researchers analyzed thousands of handwritten letters from the 1800s. Writers who used many words related to sadness were no more likely, according to records, to have been ill or to have lost a family member than writers who used few such words. Instead, heavy use of sad words was most common among writers who had attended schools that taught letter writing by having students copy published model letters.`,
  `Based on the text, which statement would the researchers most likely agree with?`,
  [`People in the 1800s were sadder than people today.`, `Letters from the 1800s are an unreliable source of historical information.`, `The number of sad words in a letter may reflect a writer's schooling more than the writer's circumstances.`, `Schools in the 1800s discouraged students from expressing emotion.`], 2,
  [`Sad words didn't track illness or loss; they tracked a type of schooling.`, `So word choice may reflect training more than life events.`], `"Unreliable source" is far too broad; the finding is about one feature of the letters.`);
R2('coe', 1, `${table('Recreation visits to four US national parks (millions)', ['Park', '2019', '2023'], [['Great Smoky Mountains', '12.5', '13.3'], ['Grand Canyon', '6.0', '4.7'], ['Zion', '4.5', '4.6'], ['Yellowstone', '4.0', '4.5']])}Of the four parks in the table, the one with the most visits in both years was ______`,
  'table', [`Grand Canyon, which had fewer visits in 2023 than in 2019.`, `Great Smoky Mountains, with 12.5 million visits in 2019 and 13.3 million in 2023.`, `Yellowstone, whose visits increased by 0.5 million.`, `Zion, with 4.6 million visits in 2023.`], 1,
  [`Look for the largest number in each year's column.`, `Great Smoky Mountains leads both years.`], `Grand Canyon's drop is accurate, but it wasn't the most-visited park in either year.`);
R2('coe', 3, `In Amaru Quispe's poem "Departure," the speaker feels both excitement and fear while leaving home.`,
  `Which quotation from "Departure" most effectively illustrates the claim?`,
  [`"My heart runs ahead to the bright, unknown city / even as my feet drag on the station stairs."`, `"The train was twenty minutes late that morning."`, `"I had never been so happy in my life."`, `"My mother waved until the platform disappeared."`], 0,
  [`The claim needs two feelings: excitement and fear.`, `"Heart runs ahead" (eager) vs. "feet drag" (reluctant, afraid).`], `"Never been so happy" shows excitement only.`);
R2('coe', 2, `${table('Mean ratings of two playground designs (scale of 1–10)', ['Age group', 'Design A', 'Design B'], [['5–7', '8.2', '6.1'], ['8–10', '7.0', '7.4'], ['11–13', '5.3', '8.0']])}Designers found that younger children preferred Design A, while older children preferred Design B. For example, ______`,
  'table', [`children ages 8–10 gave both designs ratings of 7.0 or higher.`, `Design A received its highest rating from children ages 5–7.`, `children ages 5–7 rated Design A 8.2 and Design B 6.1, while children ages 11–13 rated Design A 5.3 and Design B 8.0.`, `children ages 11–13 rated Design A higher than Design B.`], 2,
  [`The example must show both halves: younger prefer A, older prefer B.`, `Ages 5–7 (A higher) and 11–13 (B higher) show both.`], `"Design A's highest rating came from ages 5–7" is true but shows only half of the pattern.`);
R2('coe', 3, `Political scientist Elena Brandt argues that people who get most of their news from social media feeds come to believe they are well informed even when they are not, because they assume that important news will reach them without effort.`,
  `Which finding, if true, would most directly support Brandt's argument?`,
  [`People who relied on social media for news spent more time online each day.`, `People who sought out news directly were older, on average.`, `Most social media users follow at least one news organization.`, `People who relied mostly on social media rated their knowledge of current events highly but answered fewer factual questions correctly than people who sought out news directly.`], 3,
  [`The argument: feeling informed without being informed.`, `High self-ratings plus low quiz scores show exactly that gap.`], `Time spent online says nothing about how informed people are or feel.`);
R2('coe', 3, `Researchers hypothesize that a certain beetle species finds flowers mainly by their yellow color rather than by their scent.`,
  `Which finding, if true, would most directly weaken the researchers' hypothesis?`,
  [`The beetles visited yellow flowers more often than red flowers.`, `The beetles visited unscented yellow paper flowers far less often than real flowers, and they visited real flowers just as often when the flowers' color was hidden behind white mesh.`, `The beetles' eyes contain receptors that detect yellow light.`, `The beetles were most active in the morning.`], 1,
  [`If color mattered most, yellow paper flowers should attract beetles, and hiding color should reduce visits.`, `The opposite happened, which points to scent.`], `Preferring yellow over red would support the color hypothesis.`);
R2('inf', 2, `When novelist Inés Garza began writing about her childhood village, she wanted readers to hear how her neighbors actually spoke. Instead of translating their Spanish into English, she kept many of their words and phrases in Spanish without italics or explanation, trusting readers to understand them from context. Garza's approach suggests that she ______`,
  'complete', [`valued capturing her characters' voices over making every word immediately clear to every reader.`, `expected all of her readers to be fluent in Spanish.`, `was unable to translate the phrases into English.`, `wanted to hide her characters' conversations from readers.`], 0,
  [`Her goal: readers should hear real speech. Her choice: keep Spanish, rely on context.`, `She chose authenticity over instant clarity.`], `"Fluent in Spanish" goes too far: she trusted context to help readers who aren't.`);
R2('inf', 3, `Pottery made in the ancient city of Teotihuacan, in central Mexico, has been found at sites hundreds of miles away in the Maya region. Maya-style pottery has also been found in one neighborhood of Teotihuacan, and analysis shows it was made from local clay rather than imported. Archaeologists therefore conclude that ______`,
  'complete', [`Teotihuacan imported most of its pottery from the Maya region.`, `the Maya never traded with Teotihuacan.`, `people familiar with Maya pottery traditions likely lived in Teotihuacan and made pottery there.`, `all of Teotihuacan's pottery was made by Maya potters.`], 2,
  [`Maya-style pots made from local clay means they were made in Teotihuacan, not shipped in.`, `So people who knew Maya styles likely lived and worked there.`], `The first choice contradicts the finding that the Maya-style pottery used local clay.`);
R2('bnd', 1, `Many visitors to the aquarium ask the same question when they reach the jellyfish tank: how can animals without brains move so ______`,
  'conv', [`gracefully?`, `gracefully.`, `gracefully!`, `gracefully`], 0,
  [`After the colon comes a direct question ("how can animals...").`, `A direct question ends with a question mark.`], `A period would turn a direct question into a statement.`);
R2('bnd', 2, `The museum's new wing will display three collections: textiles from Peru, Bolivia, and ______ ceramics from Japan and Korea; and bronze sculptures from Nigeria.`,
  'conv', [`Ecuador,`, `Ecuador;`, `Ecuador:`, `Ecuador`], 1,
  [`The first collection already contains commas (Peru, Bolivia, and Ecuador).`, `Semicolons separate the collections, matching the one after "Korea."`], `A comma would blur where the first collection ends.`);
R2('bnd', 2, `The three winners of the science fair—Aiko Tanaka, Mateo Ruiz, and Grace ______ will travel to the national competition in May.`,
  'conv', [`Obi,`, `Obi;`, `Obi`, `Obi—`], 3,
  [`The list of names opened with a dash after "fair."`, `It must close with a matching dash.`], `A comma can't close something opened with a dash, especially when the list itself uses commas.`);
R2('bnd', 3, `Engineers faced an unusual challenge when designing the Burj Khalifa in ______ at its great height, wind could make the tower sway dangerously, so they shaped it with setbacks that break up the wind.`,
  'conv', [`Dubai, at`, `Dubai: at`, `Dubai at`, `Dubai, which at`], 1,
  [`Both parts are complete sentences, and the second explains what the "unusual challenge" was.`, `A colon introduces an explanation after a complete sentence.`], `A comma alone between two complete sentences is a comma splice.`);
R2('fss', 1, `Rising ocean temperatures ______ the number of days each year when coral reefs are at risk of bleaching.`,
  'conv', [`increases`, `has increased`, `increase`, `is increasing`], 2,
  [`The subject is "temperatures," plural.`, `Plural verb: "increase."`], `"Increases" would need a singular subject.`);
R2('fss', 2, `An explorer who reached the North Pole region with Robert Peary in 1909, ______`,
  'conv', [`the expedition's success depended heavily on Matthew Henson's skills.`, `Matthew Henson's skills were essential to the expedition's success.`, `Matthew Henson was essential to the expedition's success because of his navigation and dogsledding skills.`, `the skills of Matthew Henson made the expedition succeed.`], 2,
  [`The opening phrase describes a person, an explorer.`, `The noun right after the comma must be that person: Matthew Henson.`], `"Matthew Henson's skills" makes the skills the explorer.`);
R2('fss', 3, `Thin enough to wrap around a fingertip yet sensitive enough to detect the faint pulse in a person's wrist, ______`,
  'conv', [`doctors could use the new sensor to monitor patients' heart rates continuously.`, `continuous heart-rate monitoring could be made possible by the new sensor.`, `the new sensor's design could allow doctors to monitor heart rates continuously.`, `the new sensor could allow doctors to monitor patients' heart rates continuously.`], 3,
  [`What is thin and sensitive? The sensor.`, `"The new sensor" must come right after the comma.`], `"The new sensor's design" makes the design the thing that detects a pulse.`);
R2('fss', 2, `Each of the students in the robotics club ______ responsible for building one part of the competition robot.`,
  'conv', [`is`, `are`, `were`, `have been`], 0,
  [`The subject is "Each," singular.`, `Singular: "is."`], `"Are" agrees with "students," which sits inside the phrase "of the students."`);
R2('tra', 1, `To excavate the site, archaeologists first mapped the area using ground-penetrating radar. Next, they dug test pits in the most promising spots. ______ they removed, cataloged, and analyzed each artifact in the lab.`,
  'trans', [`For example,`, `However,`, `Similarly,`, `Finally,`], 3,
  [`"First... Next..." sets up a sequence.`, `The last step: "Finally."`], `"However" signals a contrast, but this is just the next step.`);
R2('tra', 2, `As Earth's molten iron outer core moves, it generates electric currents. ______ these currents produce Earth's magnetic field, which shields the planet from much of the Sun's harmful radiation.`,
  'trans', [`Nevertheless,`, `In contrast,`, `In turn,`, `For example,`], 2,
  [`Moving iron → currents → magnetic field: a chain of causes.`, `"In turn" shows each step causing the next.`], `"In contrast" would set the currents against the moving iron, but one produces the other.`);
R2('tra', 3, `Readers often assume that Mary Shelley's <i>Frankenstein</i> exists in a single, fixed version. ______ Shelley revised the novel substantially for its 1831 edition, changing passages throughout and adding a new introduction.`,
  'trans', [`Likewise,`, `In reality,`, `Consequently,`, `Indeed,`], 1,
  [`The first sentence states an assumption; the second shows it's wrong.`, `"In reality" introduces the truth that corrects an assumption.`], `"Indeed" would confirm the assumption, but the revision proves it false.`);
R2('syn', 1, notes(`During World War I, Choctaw soldiers in the US Army sent military messages in the Choctaw language.`, `During World War II, Navajo soldiers in the US Marine Corps sent military messages in the Navajo language.`, `Enemy forces were unable to decode either group's messages.`),
  goal(`emphasize a similarity between the Choctaw and Navajo code talkers`),
  [`Both the Choctaw code talkers of World War I and the Navajo code talkers of World War II sent military messages in their own languages that enemy forces could not decode.`, `Choctaw soldiers served in World War I, while Navajo soldiers served in World War II.`, `Navajo soldiers served in the US Marine Corps.`, `Enemy forces could not decode messages sent by Choctaw soldiers.`], 0,
  [`A similarity needs something both groups share.`, `Both used their own languages, and neither code was broken.`], `The second choice is a difference (which war), not a similarity.`);
R2('syn', 2, notes(`Hurricanes form over warm ocean water.`, `They can be hundreds of miles wide.`, `Tornadoes form over land, usually from thunderstorms.`, `Most tornadoes are less than a quarter mile wide.`),
  goal(`contrast the sizes of hurricanes and tornadoes`),
  [`Hurricanes form over water, while tornadoes form over land.`, `Most tornadoes are less than a quarter mile wide.`, `Tornadoes usually form from thunderstorms.`, `Hurricanes can be hundreds of miles wide, whereas most tornadoes are less than a quarter mile wide.`], 3,
  [`The goal is a contrast of size.`, `Only the last choice gives both sizes.`], `The first choice is a contrast, but of location, not size.`);
R2('syn', 3, notes(`Biologist Monica Gagliano studied young pea plants.`, `She placed seedlings in pots shaped like an upside-down letter Y, so the roots had to choose one of two branches.`, `One branch led toward a pipe carrying the sound of flowing water, but no water.`, `Most seedlings grew their roots toward the sound.`),
  goal(`present Gagliano's study and its main finding`),
  [`Monica Gagliano is a biologist who studies pea plants.`, `One branch led toward a pipe carrying the sound of flowing water.`, `In a study by biologist Monica Gagliano, most pea seedlings grew their roots toward a pipe carrying the sound of flowing water, even though the pipe held no water.`, `Pea seedlings grow roots that can choose between two directions.`], 2,
  [`"Present the study and its finding" needs who, what was done, and what happened.`, `Only the third choice includes the setup and the result.`], `The second choice describes part of the setup but not the result.`);

/* ============================== Math: Module 1 ============================== */
M1('lin1', 1, `If \\(p + 6 + 9 = 21\\), what is the value of \\(p\\)?`, ['6', '15', '24', '36'], 0,
  [`\\(p + 15 = 21\\).`, `\\(p = 6\\).`], `36 adds everything together instead of subtracting.`);
M1('two', 1, `The line of best fit for a data set is \\(y = 1.8x + 32\\). What \\(y\\)-value does the line predict when \\(x = 25\\)?`, ['45', '58.8', '77', '90'], 2,
  [`\\(1.8(25) + 32\\).`, `\\(45 + 32 = 77\\).`], `45 forgets to add the 32.`);
M1('nle', 1, `If \\(k^2 - 53 = 91\\) and \\(k > 0\\), what is the value of \\(k\\)?`, ['12', '38', '72', '144'], 0,
  [`Add 53: \\(k^2 = 144\\).`, `\\(k = 12\\).`], `144 is \\(k^2\\), and 38 subtracts 53 instead of adding it.`);
M1('ineq', 1, `During part of a flight, a small airplane's speed \\(s\\), in miles per hour, stayed between 150 and 170, inclusive. Which inequality represents this situation?`, ['\\(s \\le 150\\)', '\\(s \\ge 170\\)', '\\(s \\le 150\\) or \\(s \\ge 170\\)', '\\(150 \\le s \\le 170\\)'], 3,
  [`"Between 150 and 170, inclusive" means at least 150 and at most 170.`, `\\(150 \\le s \\le 170\\).`], `"\\(s \\le 150\\) or \\(s \\ge 170\\)" describes speeds outside that range.`);
M1('rat', 1, `One yard is equal to 36 inches. How many yards are equal to 1,116 inches?`, ['3.1', '31', '93', '310'], 1,
  [`\\(1{,}116 \\div 36\\).`, `\\(= 31\\) yards.`], `93 divides by 12, which converts inches to feet, not yards.`);
M1('linf', 1, `The function \\(f(x) = 14 + 4x\\) gives the total cost, in dollars, of attending a craft fair for \\(x\\) hours. If a visitor's total cost was $58, for how many hours did the visitor attend?`, ['4', '8', '11', '14'], 2,
  [`\\(14 + 4x = 58\\), so \\(4x = 44\\).`, `\\(x = 11\\).`], `14 is the fixed cost to get in, not the number of hours.`);
M1('linf', 2, `For the linear function \\(f\\), \\(f(0) = 30\\) and \\(f(4) = 18\\). Which equation defines \\(f\\)?`, ['\\(f(x) = 30x - 3\\)', '\\(f(x) = 3x + 30\\)', '\\(f(x) = -12x + 30\\)', '\\(f(x) = -3x + 30\\)'], 3,
  [`Slope: \\((18 - 30) \\div (4 - 0) = -3\\).`, `Intercept: \\(f(0) = 30\\). So \\(f(x) = -3x + 30\\).`], `−12 is the total change from \\(x = 0\\) to \\(x = 4\\); divide by 4 to get the slope.`);
M1('nlf', 2, `The function \\(P(t) = 1{,}800(0.92)^t\\) estimates the number of fish in a lake \\(t\\) years after 2020. Which statement about the estimate is true?`,
  ['The number of fish decreases by 8% each year.', 'The number of fish decreases by 92% each year.', 'The number of fish increases by 8% each year.', 'The number of fish decreases by 1,800 each year.'], 0,
  [`Multiplying by 0.92 keeps 92% each year.`, `So 8% is lost each year.`], `0.92 is the share that remains, not the share lost; that's why 92% is a trap.`);
M1('linf', 1, `A coffee shop starts the day with 4,500 paper cups and expects to use 70 cups per hour. Which equation gives the number of cups, \\(c\\), remaining after \\(h\\) hours?`, ['\\(c = 4{,}500 - 70h\\)', '\\(c = 70h - 4{,}500\\)', '\\(c = 4{,}500 + 70h\\)', '\\(c = 4{,}500h - 70\\)'], 0,
  [`Start: 4,500. Each hour removes 70.`, `\\(c = 4{,}500 - 70h\\).`], `\\(4{,}500 + 70h\\) would mean the shop gains cups every hour.`);
M1('ineq', 2, `Which point \\((x, y)\\) satisfies the inequality \\(4x + y < 30\\)?`, ['\\((6, 7)\\)', '\\((7, 3)\\)', '\\((8, -1)\\)', '\\((5, 9)\\)'], 3,
  [`Test \\((5, 9)\\): \\(20 + 9 = 29 < 30\\) ✓.`, `The others all give 31.`], `Every wrong choice gives 31, just one over, so check each carefully.`);
M1('eqv', 2, `Which expression is equivalent to \\((x^2 + 5)^2\\)?`, ['\\(x^4 + 25\\)', '\\(x^4 + 10x^2 + 25\\)', '\\(x^4 + 5x^2 + 25\\)', '\\(2x^2 + 10\\)'], 1,
  [`\\((x^2 + 5)(x^2 + 5) = x^4 + 5x^2 + 5x^2 + 25\\).`, `\\(= x^4 + 10x^2 + 25\\).`], `\\(x^4 + 25\\) squares each term but skips the middle terms.`);
M1('nlf', 1, `The function \\(h\\) is defined by \\(h(x) = 3x^3 - 4\\). What is the value of \\(h(2)\\)?`, ['2', '8', '20', '212'], 2,
  [`\\(2^3 = 8\\), so \\(3(8) - 4\\).`, `\\(24 - 4 = 20\\).`], `212 computes \\((3 \\cdot 2)^3 - 4\\); the exponent applies only to \\(x\\).`);
M1('area', 2, `A triangle has a base of 12 centimeters and an area of 54 square centimeters. What is the height of the triangle, in centimeters?`, ['4.5', '9', '13.5', '18'], 1,
  [`\\(\\frac{1}{2}(12)h = 54\\), so \\(6h = 54\\).`, `\\(h = 9\\).`], `4.5 forgets the \\(\\frac{1}{2}\\) (it solves \\(12h = 54\\)).`);
M1('lin2', 2, `The relationship between \\(x\\) and \\(y\\) is linear. When \\(x = 2\\), \\(y = 13\\), and when \\(x = 6\\), \\(y = 25\\). What is the value of \\(y\\) when \\(x = 10\\)?`, ['7', '30', '37', '65'], 2,
  [`Slope: \\((25 - 13) \\div (6 - 2) = 3\\).`, `From \\(x = 6\\) to 10: \\(25 + 4(3) = 37\\).`], `65 multiplies 13 by 5 as if \\(y\\) were proportional to \\(x\\), but this line doesn't pass through the origin.`);
M1('eqv', 2, `The formula \\(d = \\frac{rt}{60}\\) gives the distance \\(d\\), in miles, traveled at \\(r\\) miles per hour for \\(t\\) minutes. Which equation gives \\(t\\) in terms of \\(d\\) and \\(r\\)?`, ['\\(t = \\frac{60d}{r}\\)', '\\(t = \\frac{dr}{60}\\)', '\\(t = \\frac{60r}{d}\\)', '\\(t = \\frac{d}{60r}\\)'], 0,
  [`Multiply both sides by 60: \\(60d = rt\\).`, `Divide by \\(r\\): \\(t = \\frac{60d}{r}\\).`], `\\(\\frac{dr}{60}\\) multiplies by \\(r\\) when you need to divide by it.`);
M1('nle', 2, `The equation \\(w^2 + 8w - 33 = 0\\) can be rewritten as \\((w + 4)^2 = m\\). What is the value of \\(m\\)?`, ['16', '33', '37', '49'], 3,
  [`Move 33: \\(w^2 + 8w = 33\\). Add \\(4^2 = 16\\) to both sides.`, `\\((w + 4)^2 = 49\\).`], `37 adds 4 instead of \\(4^2\\).`);
M1('one', 2, `What is the median of the data set 12, 7, 15, 9, 20, 7, 11?`, ['7', '11', '12', '15'], 1,
  [`Sort: 7, 7, 9, 11, 12, 15, 20.`, `The middle (4th) value is 11.`], `15 is the middle of the unsorted list; sort first.`);
M1('nlf', 3, `The function \\(f\\) is defined by \\(f(x) = 5(3)^x - 20\\). What is the y-coordinate of the y-intercept of the graph of \\(y = f(x)\\) in the xy-plane?`, ['−20', '−15', '−5', '15'], 1,
  [`The y-intercept is where \\(x = 0\\): \\(3^0 = 1\\).`, `\\(5(1) - 20 = -15\\).`], `−20 treats \\(3^0\\) as 0.`);
M1('pct', 2, `In 2023, Zara earned 15% more than she earned in 2022. If she earned $41,400 in 2023, how much did she earn in 2022?`, ['$6,210', '$35,190', '$36,000', '$47,610'], 2,
  [`2023 = 1.15 × 2022, so 2022 = \\(41{,}400 \\div 1.15\\).`, `\\(= 36{,}000\\).`], `$35,190 takes 15% off the 2023 amount, but the 15% was based on 2022's earnings, not 2023's.`);
M1('circ', 3, `Circle A in the xy-plane has equation \\((x + 2)^2 + y^2 = 9\\). Circle B has the same center as circle A, and its radius is twice the radius of circle A. Which equation defines circle B?`,
  ['\\((x + 2)^2 + y^2 = 18\\)', '\\((x + 2)^2 + y^2 = 36\\)', '\\((x - 2)^2 + y^2 = 36\\)', '\\((x + 4)^2 + y^2 = 36\\)'], 1,
  [`Circle A: center \\((-2, 0)\\), radius 3. Circle B: same center, radius 6.`, `\\(r^2 = 36\\): \\((x + 2)^2 + y^2 = 36\\).`], `18 doubles \\(r^2\\) instead of doubling \\(r\\).`);
M1('trig', 3, `In triangle \\(ABC\\), angle \\(C\\) is a right angle, angle \\(B\\) measures 30°, and \\(AC = 7\\). What is the length of \\(AB\\)?`, ['3.5', '\\(7\\sqrt{3}\\)', '\\(14\\sqrt{3}\\)', '14'], 3,
  [`\\(AC\\) is opposite the 30° angle, so it's the short leg.`, `In a 30°-60°-90° triangle the hypotenuse is twice the short leg: \\(AB = 14\\).`], `\\(7\\sqrt{3}\\) is the other leg, \\(BC\\), not the hypotenuse.`);
M1('nlf', 3, `On day 0, a post had 80 comments. An exponential model estimates that the number of comments increased by 25% every 3 days. Which function \\(C\\) gives the estimated number of comments \\(t\\) days after day 0?`,
  ['\\(C(t) = 80(1.25)^{\\frac{t}{3}}\\)', '\\(C(t) = 80(1.25)^{3t}\\)', '\\(C(t) = 80(0.25)^{\\frac{t}{3}}\\)', '\\(C(t) = 80(1.75)^{t}\\)'], 0,
  [`Growth by 25% uses the factor 1.25.`, `It happens once every 3 days, so the exponent is \\(\\frac{t}{3}\\).`], `\\(3t\\) in the exponent would apply the growth three times per day.`);

/* ============================ Math: Module 2 pool ============================ */
M2('linf', 1, `The function \\(f\\) is defined by \\(f(x) = 9x\\). For what value of \\(x\\) is \\(f(x) = 81\\)?`, ['9', '72', '90', '729'], 0,
  [`\\(9x = 81\\).`, `\\(x = 9\\).`], `729 is \\(f(81)\\), plugging in 81 instead of solving for it.`);
M2('lat', 1, `Angles 1 and 2 are vertical angles. If angle 1 measures 64°, what is the measure of angle 2?`, ['16°', '64°', '116°', '296°'], 1,
  [`Vertical angles are equal.`, `Angle 2 = 64°.`], `116° is the supplementary (adjacent) angle.`);
M2('prob', 1, `On a street, 6 houses are blue, 9 are white, and 5 are gray. If one house is chosen at random, what is the probability that it is blue?`, ['\\(\\frac{3}{20}\\)', '\\(\\frac{1}{4}\\)', '\\(\\frac{3}{10}\\)', '\\(\\frac{3}{7}\\)'], 2,
  [`Total: \\(6 + 9 + 5 = 20\\).`, `\\(\\frac{6}{20} = \\frac{3}{10}\\).`], `\\(\\frac{3}{7}\\) is \\(\\frac{6}{14}\\), blue compared with non-blue, not with all houses.`);
M2('sys', 1, `\\(x = 8\\)<br>\\(3x - y = 17\\)<br>What is the value of \\(y\\) in the solution to the system above?`, ['−7', '1', '7', '17'], 2,
  [`\\(24 - y = 17\\).`, `\\(y = 7\\).`], `−7 drops the negative sign on \\(y\\) at the last step.`);
M2('pct', 1, `Hana's food order cost $45, and she left a tip of 20% of the cost of the order. How much was the tip?`, ['$4.50', '$9.00', '$20.00', '$54.00'], 1,
  [`\\(0.20 \\times 45\\).`, `\\(= 9\\).`], `$54 is the total with the tip, not the tip itself.`);
M2('eqv', 1, `Which expression is equivalent to \\(4x^5 + 12x^3\\)?`, ['\\(4x^3(x^2 + 12)\\)', '\\(4x^5(1 + 3x)\\)', '\\(12x^3(x^2 + 1)\\)', '\\(4x^3(x^2 + 3)\\)'], 3,
  [`Greatest common factor: \\(4x^3\\).`, `\\(4x^5 \\div 4x^3 = x^2\\); \\(12x^3 \\div 4x^3 = 3\\).`], `\\(4x^3(x^2 + 12)\\) forgets to divide the 12 by 4.`);
M2('rat', 1, `The ratio of the length of segment \\(AB\\) to the length of segment \\(CD\\) is 5 to 1. If \\(AB = 3.5\\), what is the length of \\(CD\\)?`, ['0.7', '1.5', '8.5', '17.5'], 0,
  [`\\(CD\\) is one-fifth of \\(AB\\).`, `\\(3.5 \\div 5 = 0.7\\).`], `17.5 multiplies by 5, reversing the ratio.`);
M2('lin1', 2, `If \\(6(3x - 4) = 66\\), what is the value of \\(3x - 4\\)?`, ['5', '11', '30', '62'], 1,
  [`Divide both sides by 6.`, `\\(3x - 4 = 11\\).`], `5 is \\(x\\), not \\(3x - 4\\).`);
M2('linf', 2, `The function \\(f(t) = 3t + 22\\) gives the estimated height, in centimeters, of a sunflower \\(t\\) days after a gardener first measured it. What is the best interpretation of 3 in this context?`,
  ['The sunflower was 3 centimeters tall when first measured.', 'The gardener measured the sunflower for 3 days.', 'The sunflower\'s height triples each day.', 'The sunflower grows about 3 centimeters each day.'], 3,
  [`3 multiplies \\(t\\), the number of days.`, `So the height increases by 3 cm per day.`], `22 cm is the first measured height, not 3.`);
M2('nle', 2, `What is the sum of the solutions to \\((x + 4)(x - 7)(x + 1) = 0\\)?`, ['−12', '−2', '2', '12'], 2,
  [`Solutions: \\(x = -4\\), \\(x = 7\\), \\(x = -1\\).`, `Sum: \\(-4 + 7 - 1 = 2\\).`], `−2 uses the numbers in the factors without flipping their signs (4 − 7 + 1).`);
M2('rat', 2, `Brian saves \\(\\frac{3}{8}\\) of the $240 he earns each week. How much does he save in 12 weeks?`, ['$90', '$1,080', '$1,800', '$2,880'], 1,
  [`Weekly savings: \\(\\frac{3}{8} \\times 240 = 90\\).`, `\\(90 \\times 12 = 1{,}080\\).`], `$1,800 is what he spends, not what he saves.`);
M2('lin1', 2, `The length of a rectangle is 4 inches more than 3 times its width. The perimeter of the rectangle is 48 inches. What is the width of the rectangle, in inches?`, ['5', '6', '11', '19'], 0,
  [`\\(2(w + 3w + 4) = 48\\), so \\(8w + 8 = 48\\).`, `\\(w = 5\\).`], `19 is the length (\\(3 \\cdot 5 + 4\\)), not the width.`);
M2('one', 2, `What is the median of the data set 4, 9, 12, 15, 20, 30?`, ['12', '13.5', '15', '17'], 1,
  [`With an even number of values, average the two middle ones.`, `\\((12 + 15) \\div 2 = 13.5\\).`], `15 is the mean (90 ÷ 6), not the median.`);
M2('area', 2, `A right circular cylinder has a volume of \\(72\\pi\\) cubic inches and a radius of 3 inches. What is the height of the cylinder, in inches?`, ['4', '8', '12', '24'], 1,
  [`\\(\\pi(3)^2 h = 72\\pi\\), so \\(9h = 72\\).`, `\\(h = 8\\).`], `24 forgets to square the radius (\\(3h = 72\\)).`);
M2('nle', 2, `How many real solutions does the equation \\((x - 3)^2 = -16\\) have?`, ['Zero', 'Exactly one', 'Exactly two', 'Infinitely many'], 0,
  [`A real number squared is never negative.`, `So no real \\(x\\) makes the left side equal −16.`], `"Exactly two" comes from taking square roots without noticing the negative.`);
M2('lin2', 2, `Line \\(k\\) is defined by \\(y = 7x + 18\\). Line \\(j\\) is parallel to line \\(k\\) and passes through the point \\((2, 5)\\). What is the y-intercept of line \\(j\\)?`, ['\\((0, 5)\\)', '\\((0, 18)\\)', '\\((0, 19)\\)', '\\((0, -9)\\)'], 3,
  [`Parallel means the same slope, 7: \\(y = 7x + b\\).`, `\\(5 = 14 + b\\), so \\(b = -9\\).`], `\\((0, 18)\\) is line \\(k\\)'s intercept; parallel lines share slope, not intercept.`);
M2('linf', 3, `There is a linear relationship between the number of cars, \\(c\\), on a commuter train and the maximum number of passengers it can carry. A train with 4 cars can carry 500 passengers, and a train with 7 cars can carry 860 passengers. What is the maximum number of passengers a train with 10 cars can carry?`, ['1,120', '1,220', '1,250', '1,720'], 1,
  [`Each added car adds \\((860 - 500) \\div 3 = 120\\) passengers.`, `\\(860 + 3(120) = 1{,}220\\).`], `1,250 assumes passengers are proportional to cars (\\(500 \\times 2.5\\)), but the line doesn't pass through the origin.`);
M2('eqv', 3, `For \\(a > 0\\), the expression \\(\\sqrt{a^3} \\cdot \\sqrt[3]{a^2}\\) is equivalent to \\(a^k\\). What is the value of \\(k\\)?`, ['\\(\\frac{5}{6}\\)', '1', '\\(\\frac{6}{5}\\)', '\\(\\frac{13}{6}\\)'], 3,
  [`\\(\\sqrt{a^3} = a^{3/2}\\) and \\(\\sqrt[3]{a^2} = a^{2/3}\\).`, `Add exponents: \\(\\frac{3}{2} + \\frac{2}{3} = \\frac{9}{6} + \\frac{4}{6} = \\frac{13}{6}\\).`], `1 multiplies the exponents instead of adding them.`);
M2('sys', 3, `\\(x - 2y = 9\\)<br>\\(x + 6y = 1\\)<br>If \\((x, y)\\) is the solution to the system above, what is the value of \\(x - y\\)?`, ['−1', '6', '7', '8'], 3,
  [`Subtract the first equation from the second: \\(8y = -8\\), so \\(y = -1\\). Then \\(x = 9 + 2(-1) = 7\\).`, `\\(x - y = 7 - (-1) = 8\\).`], `6 is \\(x + y\\); subtracting a negative adds.`);
M2('trig', 2, `A 26-foot ladder leans against a vertical wall. The bottom of the ladder is 10 feet from the base of the wall. How high up the wall does the top of the ladder reach, in feet?`, ['16', '20', '24', '36'], 2,
  [`\\(10^2 + h^2 = 26^2\\), so \\(h^2 = 676 - 100 = 576\\).`, `\\(h = 24\\).`], `16 subtracts the lengths (26 − 10) instead of their squares.`);
M2('nlf', 3, `Which expression is equivalent to \\((1.21)^{\\frac{x}{2}}\\)?`, ['\\((1.1)^x\\)', '\\((0.605)^x\\)', '\\((1.21)^{2x}\\)', '\\((2.42)^x\\)'], 0,
  [`\\((1.21)^{\\frac{x}{2}} = \\left((1.21)^{\\frac{1}{2}}\\right)^x\\).`, `\\(\\sqrt{1.21} = 1.1\\), so it's \\((1.1)^x\\).`], `0.605 halves the base; an exponent of \\(\\frac{1}{2}\\) means a square root, not half.`);
M2('linf', 3, `For the linear function \\(f\\), \\(f(24) = 10\\) and \\(f(30) = 13\\). If \\(f(x) = ax + b\\), what is the value of \\(b\\)?`, ['−2', '0.5', '10', '22'], 0,
  [`\\(a = (13 - 10) \\div (30 - 24) = 0.5\\).`, `\\(10 = 0.5(24) + b\\), so \\(b = -2\\).`], `0.5 is \\(a\\), the slope.`);
M2('circ', 3, `Points \\(A\\) and \\(B\\) lie on a circle with center \\(C\\), and angle \\(ACB\\) measures 70°. What is the measure of angle \\(CAB\\)?`, ['20°', '35°', '55°', '70°'], 2,
  [`\\(CA\\) and \\(CB\\) are radii, so triangle \\(ACB\\) is isosceles with equal base angles.`, `\\((180 - 70) \\div 2 = 55\\).`], `35° halves 70 instead of halving what's left after subtracting it from 180.`);
M2('two', 3, `The line of best fit for data set F is \\(y = 4.2 + 1.5x\\), and the line of best fit for data set G is \\(y = 6.8 + 0.9x\\). Which statement is true?`,
  ['F\'s line has the greater slope, and G\'s line has the greater y-intercept.', 'F\'s line has the greater slope and the greater y-intercept.', 'G\'s line has the greater slope, and F\'s line has the greater y-intercept.', 'G\'s line has the greater slope and the greater y-intercept.'], 0,
  [`Slopes: F 1.5, G 0.9. F's is greater.`, `Intercepts: F 4.2, G 6.8. G's is greater.`], `The form \\(a + bx\\) puts the intercept first; mixing up the two numbers gives the third choice.`);
M2('sys', 3, `\\(5x + 2y = 11\\)<br>\\(15x + ky = 40\\)<br>In the system above, \\(k\\) is a constant. For what value of \\(k\\) does the system have no solution?`, ['2', '3', '6', '15'], 2,
  [`Multiply the first equation by 3: \\(15x + 6y = 33\\).`, `With \\(k = 6\\), the left sides match but \\(33 \\ne 40\\): parallel lines, no solution.`], `2 matches the original \\(y\\)-coefficient but ignores that the \\(x\\)-coefficient was tripled.`);
M2('nlf', 3, `The function \\(f\\) is defined by \\(f(x) = 2x^2 - 12x + 23\\). What is the minimum value of \\(f(x)\\)?`, ['−5', '3', '5', '23'], 2,
  [`Vertex at \\(x = -\\frac{-12}{2(2)} = 3\\).`, `\\(f(3) = 18 - 36 + 23 = 5\\).`], `3 is where the minimum happens, not the minimum value.`,
  { desmos: ['f(x)=2x^2-12x+23'] });
M2('nle', 3, `The graphs of \\(y = x^2 - 6x + 4\\) and \\(y = -2x + 1\\) intersect at the points \\((x_1, y_1)\\) and \\((x_2, y_2)\\). What is the value of \\(x_1 + x_2\\)?`, ['−4', '−3', '3', '4'], 3,
  [`Set equal: \\(x^2 - 6x + 4 = -2x + 1\\), so \\(x^2 - 4x + 3 = 0\\).`, `\\((x - 1)(x - 3) = 0\\): \\(x = 1\\) and \\(x = 3\\). Sum: 4.`], `3 is just one of the x-values.`,
  { desmos: ['y=x^2-6x+4', 'y=-2x+1'] });
M2('samp', 2, `Based on a random sample of a city's workers, researchers estimated that the mean commute time for all workers in the city is 26 minutes, with a margin of error of 3 minutes. Which of the following is a plausible value for the mean commute time of all workers in the city?`, ['18', '21', '22', '28'], 3,
  [`Plausible range: \\(26 \\pm 3\\), from 23 to 29 minutes.`, `Only 28 falls in that range.`], `22 is close, but it's below 23.`);

export const TEST3 = list;
