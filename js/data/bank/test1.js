/**
 * test1.js: CrestPrep Practice Test 1. Original questions that follow the
 * skill-by-skill sequence of College Board's Practice Test 4.
 *   R1 / M1 → Module 1.  R2 / M2 → Module 2 pool (see bank/tests.js).
 */
import { testMakers, notes, goal, table, twoTexts } from './build.js';

const { list, R1, R2, M1, M2 } = testMakers(1);

/* ======================= Reading and Writing: Module 1 ======================= */
R1('wic', 1, `Some desert plants survive long dry spells by storing water in their thick leaves. When rain finally comes, these plants ______ it quickly, filling their leaves within hours before the ground dries out again.`,
  'wic', [`reject`, `absorb`, `resemble`, `postpone`], 1,
  [`The plants store water and fill their leaves within hours of rain.`, `Taking in water quickly is "absorb."`], `"Reject" is the opposite of what the plants do with the rain.`);
R1('wic', 2, `Many of the craters on the Moon's surface ______ an ancient period of heavy bombardment: because the Moon has almost no wind or water to wear them away, they preserve evidence of impacts that happened billions of years ago.`,
  'wic', [`record`, `predict`, `prevent`, `imitate`], 0,
  [`After the colon, the craters "preserve evidence" of ancient impacts.`, `Preserving evidence of past events is recording them.`], `"Predict" points to the future, but the impacts happened billions of years ago.`);
R1('wic', 2, `Although composer Florence Price's Symphony in E Minor won a national prize in 1932 and was performed by the Chicago Symphony Orchestra, her work was largely ______ for decades afterward; only after a trove of her manuscripts turned up in an abandoned house in 2009 did orchestras begin performing it widely again.`,
  'wic', [`celebrated`, `imitated`, `overlooked`, `revised`], 2,
  [`"Although" contrasts early success with what came later; "only after... did orchestras begin performing it widely again."`, `Work that went unperformed for decades was "overlooked."`],
  `"Celebrated" describes her early success, the side of the contrast the blank is set against.`);
R1('wic', 3, `Painter Rina Alvarez's canvases are often described as purely abstract, but Alvarez says that each one ______ a specific memory: the swirling blues of one painting, for instance, are rooted in a childhood storm she watched from her grandmother's porch in Veracruz.`,
  'wic', [`anticipates`, `dismisses`, `conceals`, `originates in`], 3,
  [`The example says the blues are "rooted in" a childhood storm.`, `A painting rooted in a memory "originates in" it.`],
  `"Conceals" is tempting because the paintings look abstract, but the example shows the memory is the source of the painting, not something hidden by it.`);
R1('tsp', 1, `Gordon Parks is best known for his photographs of American life in the mid-1900s, but he was also a composer, a novelist, and a film director. In 1971, he directed the movie <i>Shaft</i>, and he wrote the musical scores for several films.`,
  'purpose', [`To explain how Parks learned to compose music`, `To describe the plot of <i>Shaft</i>`, `To point out that Parks worked in several art forms besides photography`, `To argue that Parks's films were more important than his photographs`], 2,
  [`The text starts with photography ("best known for"), then lists other work: composing, novels, directing.`, `Its purpose is to show his range beyond photography.`], `The text never ranks his films above his photographs, so the "argue" choice goes too far.`);
R1('tsp', 2, `At first, Nadia saw only a gray strip of stones along the riverbank. Then one of the stones moved. She knelt and found that the "stone" was a toad, its bumpy skin the exact color of the gravel around it. Once she knew what to look for, she counted eleven more before the light faded.`,
  'structure', [`It describes a first impression of a scene, then a discovery that changes how the character sees it.`, `It contrasts two characters' views of the same riverbank.`, `It explains why toads are hard to find and then lists ways to find them.`, `It presents a problem and explains why the character cannot solve it.`], 0,
  [`First: only stones. Then: a stone moves and turns out to be a toad. Finally: she sees many more.`, `A first impression, then a discovery that changes what she sees.`], `Only Nadia appears in the text, so a contrast between two characters' views can't be right.`);
R1('tsp', 2, `Coral reefs cover less than 1 percent of the ocean floor. Yet they support roughly a quarter of all known marine species. <u>This crowding of life into so small an area is possible partly because corals build complex structures full of cracks, ledges, and caves, each of which can shelter different animals.</u> Protecting reefs, scientists argue, therefore protects a far larger share of ocean life than their size would suggest.`,
  'function', [`It introduces a counterargument that the final sentence rejects.`, `It provides evidence that reefs are smaller than scientists once believed.`, `It describes a threat that coral reefs face.`, `It offers an explanation for the situation described in the previous two sentences.`], 3,
  [`Sentences 1 and 2 set up a puzzle: tiny area, huge share of species.`, `The underlined sentence explains how that is possible ("possible partly because...").`], `The final sentence builds on the underlined sentence ("therefore"); it does not reject it.`);
R1('ctc', 3, twoTexts(`Many historians have argued that the invention of farming led directly to rigid social hierarchies: once people could store grain, a few individuals could control the surplus and rule over everyone else.`,
  `Archaeologist Tomasz Wilk points to sites where people farmed for more than a thousand years while living in settlements with no signs of ranked classes: houses of similar size, shared storehouses, and no elite burials. For Wilk, farming made hierarchy possible but did not make it inevitable.`),
  `Based on the texts, how would Wilk (Text 2) most likely respond to the historians' argument in Text 1?`,
  [`By agreeing that storing grain always allowed a few people to rule`, `By arguing that it overstates the link between farming and hierarchy, since some farming communities long remained without ranked classes`, `By claiming that hierarchies developed before farming began`, `By suggesting that early farming communities had no way to store surplus grain`], 1,
  [`Text 1: farming led directly to hierarchy. Text 2: some farming communities stayed equal for centuries; farming made hierarchy possible, not inevitable.`, `So Wilk would say the historians overstate the connection.`],
  `Text 2 mentions shared storehouses, so these communities clearly could store grain; they just didn't let a few people control it.`);
R1('cid', 1, `Every morning before school, Theo checked on the sparrows' nest in the gutter above his window. He kept a notebook of what he saw: the day the first egg appeared, the morning he heard faint peeping, the afternoon he counted four open beaks. By June the notebook was full, the nest was empty, and Theo felt both proud and a little lonely.`,
  'main', [`Theo tries to keep the young sparrows from leaving the nest.`, `Theo is frustrated that the nest blocks his window.`, `Theo carefully observes and records the progress of a nest over time.`, `Theo learns to identify many kinds of birds.`], 2,
  [`Each detail shows Theo watching the nest and writing down changes: egg, peeping, four beaks, empty nest.`, `The main idea is his careful, ongoing observation.`], `Theo feels "a little lonely" when the birds leave, but he never tries to stop them.`);
R1('cid', 2, `In 1913, journalist Ida B. Wells helped found the Alpha Suffrage Club, one of the first organizations devoted to winning voting rights for Black women in Illinois. Club members went door to door in Chicago, registering voters and explaining how to use the ballot. Their efforts helped elect Oscar De Priest as the city's first Black alderman in 1915.`,
  `According to the text, what did members of the Alpha Suffrage Club do?`,
  [`They ran for the position of alderman themselves.`, `They started a newspaper about voting rights.`, `They moved the club out of Chicago in 1915.`, `They went door to door to register voters.`], 3,
  [`The second sentence says members "went door to door in Chicago, registering voters."`, `That is stated directly.`], `The members helped elect De Priest; the text doesn't say they ran for office.`);
R1('coe', 2, `${table('Community gardens in four towns', ['Town', '2010', '2020'], [['Alton', '12', '30'], ['Brisby', '25', '27'], ['Corel', '8', '22'], ['Dunmore', '40', '35']])}An urban planner notes that between 2010 and 2020, the number of community gardens grew in most of the towns shown but that one town, ______`,
  'table', [`Alton, had more gardens than any other town in 2020.`, `Dunmore, had fewer gardens in 2020 than in 2010.`, `Corel, had the most gardens in 2010.`, `Brisby, more than doubled its number of gardens.`], 1,
  [`The planner sets one town apart from the towns that grew.`, `Dunmore went from 40 to 35, the only decrease.`], `Alton grew a lot, but Dunmore still had more gardens in 2020 (35 vs. 30), and the claim is about a town that did not grow.`);
R1('coe', 2, `Ecologist Ana Ribeiro hypothesizes that hummingbirds in the Andes Mountains save energy on cold nights by entering torpor, a sleep-like state in which body temperature drops sharply. To test this, she measured the body temperatures of sleeping hummingbirds on nights of different temperatures.`,
  `Which finding, if true, would most directly support Ribeiro's hypothesis?`,
  [`The birds' body temperatures stayed the same on warm nights and cold nights.`, `The birds fed more often during warm afternoons than during cold mornings.`, `On the coldest nights, the birds' body temperatures fell far below their daytime levels.`, `Hummingbirds in the Andes are smaller than hummingbirds in lowland forests.`], 2,
  [`Torpor means body temperature drops sharply, and the hypothesis links it to cold nights.`, `Temperatures falling far below normal on the coldest nights fits exactly.`], `The first choice describes no change, which would weaken the hypothesis.`);
R1('coe', 3, `${table('Melting points of metals', ['Metal', 'Melting point (°C)'], [['Tin', '232'], ['Lead', '327'], ['Aluminum', '660'], ['Copper', '1,085'], ['Iron', '1,538']])}Early metalworkers could shape some metals long before others, partly because a simple wood fire reaches only about 900°C while some metals melt only at much higher temperatures. For example, ______`,
  'table', [`copper melts at a lower temperature than aluminum.`, `aluminum and iron both melt below 900°C.`, `lead melts at a higher temperature than copper.`, `tin and lead melt below 900°C, while iron melts at more than 1,500°C.`], 3,
  [`The example must show some metals melting below 900°C and some far above it.`, `Tin (232) and lead (327) are below 900; iron (1,538) is far above.`], `The other choices misread the table: copper is higher than aluminum, iron is above 900, and lead is lower than copper.`);
R1('coe', 3, `In Mariel Osei's novel <i>The Lantern Keeper</i>, the narrator describes her grandfather as someone who stays calm even in frightening situations.`,
  `Which quotation from <i>The Lantern Keeper</i> most effectively illustrates the claim?`,
  [`"Grandfather kept the lantern lit every night, even in summer, when few ships passed."`, `"When the storm tore the shutters from their hinges, Grandfather only set down his tea and said, 'Well, we'll need new ones,' as if remarking on the weather."`, `"The lighthouse stairs numbered one hundred and twelve, and Grandfather climbed them twice a day."`, `"I was terrified of the dark water below the cliffs, and I never went near the edge."`], 1,
  [`The claim needs two things: a frightening situation and Grandfather staying calm.`, `A storm tearing off shutters is frightening, and his mild reply shows calm.`], `The last quotation describes fear, but it's the narrator's fear, not Grandfather's calm.`);
R1('inf', 2, `In many bird species, males with brighter feathers attract more mates. But bright feathers also make birds easier for predators to spot. Biologists studying one species of finch found that on islands with no hawks, males were much more brightly colored than males on nearby islands where hawks were common. This pattern suggests that ______`,
  'complete', [`the risk of being spotted by predators may limit how bright males' feathers become.`, `hawks prefer to hunt brightly colored females.`, `females on hawk-free islands prefer dull-colored males.`, `finches on hawk-free islands produce fewer offspring.`], 0,
  [`Bright feathers attract mates but also predators. Without hawks, males are brighter.`, `So predators probably hold back how bright males can get.`], `The text never compares females' colors, so the hawks-hunt-females choice adds a claim the text doesn't support.`);
R1('inf', 3, `Ice cores from Antarctica trap tiny bubbles of ancient air, which allows scientists to measure carbon dioxide levels from the distant past. In the deepest, oldest layers of ice, however, the enormous pressure gradually squeezes the bubbles until the trapped air becomes locked inside the ice crystals themselves. As a result, scientists hoping to measure carbon dioxide in the very oldest ice ______`,
  'complete', [`cannot rely on the same bubble-sampling methods they use for younger ice.`, `will find more air bubbles than in younger layers.`, `have shown that carbon dioxide levels never changed.`, `should study ice from the Arctic instead.`], 0,
  [`Normal measurements depend on bubbles. In the oldest ice, the bubbles disappear into the crystals.`, `So the usual bubble-based method won't work there.`], `"More air bubbles" contradicts the text, which says the bubbles are squeezed away.`);
R1('bnd', 1, `One of the first tax-supported free public libraries in the United States opened in Peterborough, New Hampshire, in ______ funded by the town, it was open to every resident.`,
  'conv', [`1833. Funded`, `1833, funded`, `1833 funded`, `1833 and, funded`], 0,
  [`"One of the first... opened in Peterborough, New Hampshire, in 1833" is a complete sentence, and so is "Funded by the town, it was open to every resident."`, `A period correctly separates the two sentences.`], `A comma alone between two complete sentences creates a comma splice.`);
R1('bnd', 2, `Octopuses have three hearts. Two of them pump blood through the ______ the third pumps it through the rest of the body.`,
  'conv', [`gills, the`, `gills the`, `gills; the`, `gills: and the`], 2,
  [`"Two of them pump blood through the gills" and "the third pumps it through the rest of the body" can each stand alone.`, `A semicolon joins two complete sentences.`], `With no punctuation, the two sentences run together (a run-on).`);
R1('bnd', 3, `The festival's lineup featured three headliners: Ana Tijoux, a rapper from ______ Natalia Lafourcade, a singer-songwriter from Mexico; and Bomba Estéreo, a band from Colombia.`,
  'conv', [`Chile,`, `Chile;`, `Chile:`, `Chile`], 1,
  [`Each item already contains a comma ("Ana Tijoux, a rapper from Chile").`, `In a list like this, semicolons separate the items, matching the semicolon after "Mexico."`], `A comma would make it impossible to tell where one headliner ends and the next begins.`);
R1('fss', 1, `Each of the paintings in the gallery's new exhibit ______ a scene from the artist's childhood in Lagos.`,
  'conv', [`shows`, `show`, `are showing`, `have shown`], 0,
  [`The subject is "Each," which is singular. "Of the paintings" is a phrase in between.`, `A singular subject needs the singular verb "shows."`], `"Show" agrees with "paintings," but "paintings" is not the subject.`);
R1('fss', 1, `Last summer, the research team traveled to Iceland, where its members ______ samples of volcanic rock from three different lava fields.`,
  'conv', [`collect`, `will collect`, `collected`, `are collecting`], 2,
  [`"Last summer" and "traveled" put the sentence in the past.`, `The past-tense "collected" matches.`], `"Will collect" puts a past trip in the future.`);
R1('fss', 2, `After hiking to the cliffs, the researchers examined the two ______ nests and found that both contained bits of plastic woven among the twigs.`,
  'conv', [`birds'`, `bird's`, `birds`, `birds's`], 0,
  [`"Two" means more than one bird, and the nests belong to them.`, `Plural possessive: birds'.`], `"Bird's" is possessive but singular, which clashes with "two."`);
R1('tra', 1, `Mars and Earth both have seasons, polar ice caps, and days of about the same length. ______ Mars has an atmosphere so thin that liquid water cannot last long on its surface.`,
  'trans', [`Similarly,`, `For example,`, `Therefore,`, `However,`], 3,
  [`Sentence 1 lists similarities. Sentence 2 gives a big difference.`, `A shift from similarity to difference calls for "However."`], `"Similarly" would continue the list of similarities, but the second sentence is a difference.`);
R1('tra', 2, `Some species of bamboo can grow nearly a meter in a single day and are ready to harvest in three to five years, compared with decades for most hardwood trees. ______ some builders see bamboo as a more renewable alternative to wood.`,
  'trans', [`Nevertheless,`, `For this reason,`, `In contrast,`, `Meanwhile,`], 1,
  [`Sentence 1 gives bamboo's fast growth; sentence 2 gives a conclusion builders draw from it.`, `That is cause and effect, so "For this reason" fits.`], `"Nevertheless" signals something unexpected, but seeing a fast-growing plant as renewable is exactly what you'd expect.`);
R1('syn', 1, notes(`Alligators and crocodiles are both large reptiles.`, `An alligator has a wide, U-shaped snout.`, `A crocodile has a narrower, V-shaped snout.`, `Both can be found in Florida.`),
  goal(`emphasize a difference between alligators and crocodiles`),
  [`Alligators and crocodiles are both large reptiles.`, `Both alligators and crocodiles can be found in Florida.`, `Alligators have wide, U-shaped snouts, while crocodiles have narrower, V-shaped snouts.`, `Crocodiles have narrower, V-shaped snouts.`], 2,
  [`A difference needs both animals compared on one feature.`, `The snout-shape choice names both and contrasts them.`], `The last choice describes only crocodiles, so it doesn't show a difference.`);
R1('syn', 2, notes(`Kara Walker is an American artist.`, `She is known for large cutouts made of black paper, called silhouettes.`, `Her silhouettes show scenes from American history, especially slavery.`, `One work, <i>Gone</i> (1994), stretches about 50 feet across a gallery wall.`),
  goal(`describe Walker's work to an audience unfamiliar with her`),
  [`<i>Gone</i> stretches about 50 feet across a gallery wall.`, `American artist Kara Walker creates large black-paper silhouettes that depict scenes from American history.`, `Walker's silhouettes depict scenes from American history, especially slavery.`, `Kara Walker made <i>Gone</i> in 1994.`], 1,
  [`An unfamiliar audience needs to learn who Walker is and what her work is like.`, `Only one choice identifies her as an American artist and describes her silhouettes.`], `The third choice describes the work but assumes readers already know who Walker is.`);
R1('syn', 3, notes(`Göbekli Tepe is an archaeological site in southeastern Turkey.`, `Its carved stone pillars were raised about 11,000 years ago.`, `That is about 6,000 years before Stonehenge was built.`, `Archaeologist Klaus Schmidt led excavations there beginning in the 1990s.`, `Schmidt argued that the site was a ceremonial center, not a village.`),
  goal(`present Schmidt's argument to an audience unfamiliar with Göbekli Tepe`),
  [`Schmidt argued that Göbekli Tepe was a ceremonial center, not a village.`, `Göbekli Tepe's pillars were raised about 6,000 years before Stonehenge was built.`, `Beginning in the 1990s, Klaus Schmidt led excavations at Göbekli Tepe.`, `Archaeologist Klaus Schmidt argued that Göbekli Tepe, a site in Turkey with stone pillars raised about 11,000 years ago, was a ceremonial center rather than a village.`], 3,
  [`Two jobs: state Schmidt's argument and explain what Göbekli Tepe is.`, `Only the last choice does both.`], `The first choice states the argument but never explains what or where Göbekli Tepe is.`);

/* ===================== Reading and Writing: Module 2 pool ===================== */
R2('wic', 1, `The online market for secondhand clothing has grown ______ over the past decade, and analysts expect it to keep expanding as more shoppers look for affordable, sustainable fashion.`,
  'wic', [`steadily`, `reluctantly`, `secretly`, `briefly`], 0,
  [`The market grew over a decade and is expected to "keep expanding."`, `Growth that continues over time is steady.`], `"Briefly" clashes with growth across a whole decade that is still continuing.`);
R2('wic', 2, `Getting useful molecules into plant cells is difficult because each cell is surrounded by a tough wall. Engineer Hao Lin's team designed tiny carbon tubes that can ______ this barrier, slipping through the wall without damaging the cell inside.`,
  'wic', [`reinforce`, `penetrate`, `imitate`, `overlook`], 1,
  [`The tubes slip "through the wall."`, `Getting through a barrier is penetrating it.`], `"Reinforce" means strengthen, which would make the wall even harder to get through.`);
R2('wic', 2, `Physicists searching for rare particle collisions cannot simply watch for them; the collisions are too fast and too numerous. Instead, computer programs ______ billions of recorded events, discarding ordinary ones and flagging the few that match the patterns physicists are looking for.`,
  'wic', [`sift through`, `add to`, `predict`, `conceal`], 0,
  [`The programs go through events, discard most, and flag a few.`, `That sorting process is "sift through."`], `"Predict" doesn't fit; the events are already recorded.`);
R2('wic', 3, `Some critics found novelist Hiro Saito's latest book ______: its plot jumps among four time periods without warning, and several characters share names, leaving readers unsure whose story they are following.`,
  'wic', [`predictable`, `sentimental`, `bewildering`, `concise`], 2,
  [`After the colon: jumping timelines, shared names, readers unsure what's happening.`, `Something that leaves readers confused is "bewildering."`], `"Predictable" is the opposite: readers can't even follow the plot, let alone predict it.`);
R2('wic', 3, `Although physician Rebecca Lee Crumpler is remembered mainly as the first Black woman to earn a medical degree in the United States, historians note that she was also an early ______ of preventive care: her 1883 book urged mothers to focus on diet, hygiene, and rest to keep children from falling ill in the first place.`,
  'wic', [`skeptic`, `proponent`, `beneficiary`, `casualty`], 1,
  [`Her book urged practices that prevent illness.`, `Someone who promotes an idea is a "proponent" of it.`], `"Skeptic" is the opposite of someone urging readers to follow an approach.`);
R2('tsp', 2, `Many people assume that sharks must keep swimming at all times in order to breathe. <u>This is true for some species, such as the great white, which rely on water flowing over their gills as they move.</u> Others, however, such as the nurse shark, can pump water over their gills while resting motionless on the sea floor.`,
  'function', [`It explains why nurse sharks rest on the sea floor.`, `It challenges the idea that sharks need water to breathe.`, `It acknowledges that a common belief is accurate for certain sharks before the text presents exceptions.`, `It introduces a species that the rest of the text describes in detail.`], 2,
  [`The underlined sentence says the belief "is true for some species."`, `The next sentence ("however") gives exceptions.`], `Nurse sharks appear in the next sentence, not the underlined one.`);
R2('tsp', 3, `For years, scientists assumed that plants grown in space would struggle to orient their roots, since roots normally grow downward in response to gravity. But when researchers grew small mustard plants called Arabidopsis aboard the International Space Station, the roots still spread out in an orderly, slanted pattern, apparently guided by light and by touch rather than by gravity.`,
  'purpose', [`To argue that plants should not be grown in space`, `To explain why Arabidopsis was chosen for the experiment`, `To compare how fast plants grow on Earth and in space`, `To describe an experiment whose results cast doubt on an assumption about how roots grow`], 3,
  [`The text states an assumption, then ("But") an experiment with a surprising result.`, `Its purpose is to show results that challenge the assumption.`], `The text never explains why Arabidopsis was chosen; it only names the plant.`);
R2('tsp', 3, `In 1859, French astronomer Urbain Le Verrier proposed that a small, unseen planet, which he named Vulcan, orbited closer to the Sun than Mercury does. Its pull, he argued, explained small irregularities in Mercury's orbit. Astronomers searched for Vulcan for decades without success. Then, in 1915, Albert Einstein's theory of general relativity accounted for Mercury's motion exactly, with no extra planet needed.`,
  'structure', [`It describes a proposed explanation for an observation, notes a failed effort to confirm it, and then presents a different explanation that made it unnecessary.`, `It presents a theory, describes evidence for it, and explains how it was later expanded.`, `It compares two scientists' explanations and argues that the first was more reasonable.`, `It describes a discovery and the dispute over who deserved credit for it.`], 0,
  [`Le Verrier's Vulcan explains Mercury → searches fail → Einstein explains Mercury without Vulcan.`, `Explanation, failed confirmation, replacement.`], `The second choice says the evidence supported the theory, but the searches for Vulcan failed.`);
R2('ctc', 3, twoTexts(`Some psychologists argue that multitasking, such as studying while texting, is simply a skill: people who do it often get better at it, just as practice improves any skill.`,
  `In a study by researcher Dana Okafor, people who reported multitasking the most actually performed worse on tests of switching between tasks than people who rarely multitasked. Okafor suggests that frequent multitasking may train people to be more easily distracted rather than more efficient.`),
  `Based on the texts, how would Okafor (Text 2) most likely respond to the psychologists' argument in Text 1?`,
  [`By agreeing that people who multitask often become better at switching tasks`, `By arguing that her findings contradict it, since frequent multitaskers showed weaker task-switching ability`, `By suggesting that the psychologists studied too few people who text while studying`, `By arguing that multitasking improves performance only on memory tests`], 1,
  [`Text 1: practice makes multitaskers better. Text 2: the most frequent multitaskers did worse at switching tasks.`, `Okafor's results go against the "practice improves it" argument.`], `The first choice is the reverse of Okafor's finding.`);
R2('cid', 1, `Most people picture deserts as hot, but the largest desert on Earth is Antarctica. A desert is defined by how little precipitation it receives, not by its temperature, and parts of Antarctica's interior get less than 2 inches of precipitation a year, less than many parts of the Sahara.`,
  'main', [`The Sahara is slowly becoming colder.`, `Most deserts receive more rain than scientists once thought.`, `Antarctica is the coldest place on Earth.`, `Antarctica counts as a desert because deserts are defined by low precipitation, not by heat.`], 3,
  [`The text corrects the "deserts are hot" idea using Antarctica.`, `The key reason: deserts are defined by precipitation.`], `Antarctica is extremely cold, but the text's point is about why it counts as a desert.`);
R2('cid', 1, `To find out whether dogs notice when objects break the rules of physics, researcher Elena Varga showed dogs a ball rolling behind a screen. Sometimes the ball reappeared on the other side as expected; other times it seemed to vanish. Varga measured how long each dog stared at the scene, reasoning that dogs would look longer at events that surprised them.`,
  `According to the text, how did Varga judge whether a dog was surprised?`,
  [`By measuring how long the dog looked at the scene`, `By recording whether the dog barked`, `By checking whether the dog chased the ball`, `By comparing the dog's heart rate before and after`], 0,
  [`The last sentence: she "measured how long each dog stared."`, `Longer looking meant more surprise.`], `Barking and heart rate are reasonable ideas, but the text describes only staring time.`);
R2('cid', 3, `Linguists once assumed that whistled languages, in which speakers whistle the sounds of an ordinary spoken language, were curiosities found only in a few isolated mountain villages. Researcher Julien Meyer has documented around seventy such languages worldwide, from the Canary Islands to Turkey to Mexico. Meyer notes that they tend to arise wherever terrain such as steep valleys or dense forest makes shouting impractical, because a whistle carries much farther than the voice.`,
  'main', [`Whistled languages are disappearing because mountain villages are becoming less isolated.`, `Whistled languages are more widespread than once believed and tend to develop where terrain makes long-distance speech difficult.`, `Meyer has learned to speak around seventy whistled languages.`, `Whistled languages replace spoken languages in mountain villages.`], 1,
  [`The text corrects an old assumption (rare curiosities) with Meyer's findings (about seventy worldwide), then explains where they arise.`, `The main idea combines both points.`], `Meyer "documented" the languages; the text never says he speaks them.`);
R2('coe', 2, `A student hypothesizes that students who eat lunch outdoors return to class more focused than students who eat indoors, because time outside reduces mental fatigue. The student plans to compare teachers' ratings of students' focus after lunch.`,
  `Which finding, if true, would most directly weaken the student's hypothesis?`,
  [`Students who ate outdoors received higher average focus ratings than students who ate indoors.`, `Most students said they preferred eating outdoors.`, `Students who ate outdoors received the same average focus ratings as students who ate indoors.`, `Teachers rated focus on a scale from 1 to 10.`], 2,
  [`The hypothesis predicts higher focus for the outdoor group.`, `No difference in ratings goes against that prediction.`], `The first choice would support the hypothesis, not weaken it.`);
R2('coe', 3, `In Tomas Reyes's novel <i>The Orchard Years</i>, the narrator contrasts his brother's restlessness with his own contentment on the family farm.`,
  `Which quotation from <i>The Orchard Years</i> most effectively illustrates the claim?`,
  [`"Miguel and I both learned to prune the apple trees when we were barely tall enough to reach the branches."`, `"Every autumn, buyers came from the city to taste our apples and argue about the price."`, `"I sometimes wondered whether the orchard would survive another dry summer."`, `"Miguel was always staring down the road toward the city, counting the days until he could leave; I could imagine no better life than the one between these rows of trees."`], 3,
  [`The claim needs a contrast: the brother restless, the narrator content.`, `The last quotation shows both sides.`], `The first quotation shows something the brothers share, not a contrast.`);
R2('coe', 2, `${table('Share of commuters who bike to work (%)', ['Town', '2015', '2023'], [['Harlow', '4', '9'], ['Benton', '6', '7'], ['Corwin', '3', '11'], ['Ashby', '8', '6']])}Urban planner Kemi Adeyemi studied bike commuting in four towns that built protected bike lanes between 2015 and 2023. She found that bike commuting rose in most of the towns, with the largest increase in ______`,
  'table', [`Harlow, where the share rose from 4% to 9%.`, `Corwin, where the share rose from 3% to 11%.`, `Ashby, where the share was highest in 2015.`, `Benton, where the share rose from 6% to 7%.`], 1,
  [`Compute each change: Harlow +5, Benton +1, Corwin +8, Ashby −2.`, `Corwin's 8-point rise is the largest.`], `Harlow's numbers are accurate, but its increase (5 points) is smaller than Corwin's.`);
R2('coe', 3, `Sociolinguist Mira Halvorsen hypothesizes that people ask more questions in conversation when they speak with someone they consider higher in status, as a way of showing deference. To test this, she recorded conversations between employees and their managers and between employees and coworkers at the same level.`,
  `Which finding, if true, would most strongly support Halvorsen's hypothesis?`,
  [`Managers asked more questions than employees did in every conversation.`, `Employees spoke for longer with coworkers than with managers.`, `Employees asked significantly more questions when speaking with managers than when speaking with coworkers at the same level.`, `Employees asked the same number of questions no matter whom they spoke with.`], 2,
  [`The hypothesis compares the same people talking up (to managers) versus across (to peers).`, `More questions to managers fits the prediction.`], `The first choice is about managers' questions, but the hypothesis is about people speaking to someone higher in status.`);
R2('coe', 2, `In the poem "The Tide-Line" by Ines Marwood, the speaker expresses regret about having left home.`,
  `Which quotation from "The Tide-Line" most effectively illustrates the claim?`,
  [`"I traded the harbor's voice for the city's hum, / and now no bell I hear can call me home."`, `"The gulls wheel slowly over the gray stones."`, `"My mother mended nets beside the door."`, `"The city's lights burn bright against the night."`], 0,
  [`Regret about leaving needs two things: leaving home, and wishing it were otherwise.`, `"Traded the harbor... now no bell... can call me home" shows both.`], `The mother mending nets is a memory of home, but it shows no regret about leaving.`);
R2('inf', 2, `Theater historian Ruth Kessler studied how often Shakespeare's plays were reprinted during his lifetime. She found that history plays such as <i>Richard II</i> were reprinted far more often than comedies were. Because printers tended to reprint books they expected to sell, Kessler concludes that ______`,
  'complete', [`Shakespeare wrote more history plays than comedies.`, `history plays were probably more popular with readers than comedies were at the time.`, `comedies were performed on stage more often than history plays.`, `printers disliked Shakespeare's comedies.`], 1,
  [`More reprints of history plays + printers reprint what sells.`, `So history plays likely sold better: they were more popular with readers.`], `The evidence is about printed books, so it can't tell us how often plays were performed.`);
R2('inf', 3, `Pollen preserved in lake mud records which plants grew nearby. In mud from Lake Teller, pollen from corn, a crop grown by people in the region, appears in layers dating from about 1,100 years ago, then disappears entirely from layers dating from about 750 years ago, while pollen from wild grasses and shrubs increases. Because corn does not grow wild in the region, these findings suggest that ______`,
  'complete', [`wild grasses were planted by farmers after their corn failed.`, `corn first arrived in the region about 750 years ago.`, `the lake dried up about 1,100 years ago.`, `people stopped growing corn near the lake about 750 years ago.`], 3,
  [`Corn needs people to grow it. Corn pollen vanishes around 750 years ago, and wild plants take over.`, `So farming of corn near the lake ended then.`], `The arrival choice reverses the timeline: corn pollen was present from 1,100 years ago and disappeared 750 years ago.`);
R2('bnd', 1, `Every year, millions of monarch butterflies migrate from Canada and the United States ______ forests in central Mexico.`,
  'conv', [`to:`, `to,`, `to`, `to—`], 2,
  [`"To" is a preposition, and "forests in central Mexico" is its object.`, `No punctuation goes between a preposition and its object.`], `A colon after "to" splits the preposition from the words it needs.`);
R2('bnd', 2, `The scientists ______ discovered the new species of frog named it after a local guide who led them to the site.`,
  'conv', [`who`, `, who`, `; who`, `: who`], 0,
  [`"Who discovered the new species of frog" tells which scientists: it's essential information.`, `Essential clauses take no commas.`], `A single comma would separate the subject "scientists" from its verb "named."`);
R2('bnd', 2, `Cassava, a starchy root ______ is a staple food for hundreds of millions of people in Africa, Asia, and South America.`,
  'conv', [`vegetable;`, `vegetable—`, `vegetable`, `vegetable,`], 3,
  [`"A starchy root vegetable" is extra information that starts with a comma after "Cassava."`, `It must close with a matching comma.`], `A dash can't close information that opened with a comma; the pair must match.`);
R2('bnd', 3, `The bridge took nearly fourteen years to ______ its builders had to sink its massive stone towers deep into the riverbed by hand.`,
  'conv', [`build, its`, `build: its`, `build its`, `build, and, its`], 1,
  [`Both sides are complete sentences, and the second explains the first (why it took so long).`, `A colon can join two sentences when the second explains the first.`], `A comma alone creates a comma splice.`);
R2('fss', 1, `The tiny glass beads found at the site ______ that the village once traded with merchants from distant regions.`,
  'conv', [`suggest`, `suggests`, `has suggested`, `is suggesting`], 0,
  [`The subject is "beads," which is plural ("found at the site" describes them).`, `A plural subject takes "suggest."`], `"Suggests" agrees with "site," which is not the subject.`);
R2('fss', 2, `After years of careful measurements, astronomer Vera Rubin ______ evidence that galaxies contain far more mass than can be seen, a finding that pointed to the existence of dark matter.`,
  'conv', [`providing`, `to provide`, `provided`, `having provided`], 2,
  [`The sentence needs a main verb for the subject "Vera Rubin."`, `"Provided" is a finite past-tense verb; the other choices are not.`], `"Providing" can't be a sentence's only verb; the sentence would be a fragment.`);
R2('fss', 3, `Designed to filter rainwater before it reaches the river, ______`,
  'conv', [`the city has planted rain gardens along several streets.`, `rain gardens have been planted along several streets by the city.`, `the planting of rain gardens along several streets was done by the city.`, `along several streets, the city has planted rain gardens.`], 1,
  [`What was designed to filter rainwater? The rain gardens.`, `"Rain gardens" must come right after the comma.`], `The first choice makes the city the thing designed to filter rainwater.`);
R2('fss', 2, `The museum's collection of ancient coins is famous for ______ variety: it includes pieces from more than forty civilizations.`,
  'conv', [`it's`, `their`, `they're`, `its`], 3,
  [`The pronoun refers to "collection," which is singular, and shows possession.`, `Singular possessive: its.`], `"It's" means "it is," which doesn't fit before "variety."`);
R2('tra', 1, `The volunteers spent the morning clearing fallen branches from the trail. ______ they repainted the faded trail markers so hikers would not get lost.`,
  'trans', [`Afterward,`, `Instead,`, `For example,`, `Nonetheless,`], 0,
  [`Two tasks, one after the other.`, `"Afterward" shows time order.`], `"Instead" would mean they repainted markers rather than clearing branches, but they did both.`);
R2('tra', 2, `One way for a restaurant to reduce food waste is to donate unsold meals to shelters. ______ the restaurant can compost food scraps, turning them into fertilizer for local farms.`,
  'trans', [`Consequently,`, `Alternatively,`, `In other words,`, `For instance,`], 1,
  [`The text offers one way, then another option.`, `"Alternatively" introduces another option.`], `"In other words" would mean composting restates donating, but they are different methods.`);
R2('tra', 3, `Early critics dismissed the 1913 Armory Show in New York as a collection of bizarre experiments that would soon be forgotten. ______ the exhibition introduced many American viewers to modern European art and is now regarded as a turning point in American painting.`,
  'trans', [`Therefore,`, `Moreover,`, `Similarly,`, `Nevertheless,`], 3,
  [`The critics predicted it would be forgotten; it became a turning point instead.`, `A result that goes against what was said calls for "Nevertheless."`], `"Moreover" adds a similar point, but the second sentence contradicts the critics.`);
R2('syn', 1, notes(`Solar-powered water pumps are used on some farms in India.`, `They run on energy from the sun instead of diesel fuel.`, `Once installed, they cost almost nothing to run.`, `Diesel pumps require farmers to buy fuel regularly.`),
  goal(`explain an advantage of solar-powered pumps over diesel pumps`),
  [`Solar-powered water pumps are used on some farms in India.`, `Diesel pumps require farmers to buy fuel regularly.`, `Unlike diesel pumps, which require regular fuel purchases, solar-powered pumps cost almost nothing to run once installed.`, `Solar-powered pumps run on energy from the sun.`], 2,
  [`An advantage over diesel needs a comparison that favors solar.`, `Only one choice compares running costs.`], `"Diesel pumps require... fuel" hints at the advantage but never mentions solar pumps.`);
R2('syn', 2, notes(`Venus has a thick atmosphere made mostly of carbon dioxide.`, `Its average surface temperature is about 870°F.`, `Mercury, which is closer to the Sun, reaches a maximum daytime temperature of about 800°F.`, `Venus is the hottest planet in the solar system.`),
  goal(`emphasize how hot Venus is compared with Mercury`),
  [`Venus has a thick atmosphere made mostly of carbon dioxide.`, `Mercury is closer to the Sun than Venus is.`, `Even though Mercury is closer to the Sun, Venus is hotter: its average surface temperature is about 870°F, while Mercury's daytime temperature peaks at about 800°F.`, `Venus's average surface temperature is about 870°F.`], 2,
  [`The goal is a comparison of the two planets' temperatures.`, `Only one choice gives both temperatures and compares them.`], `The last choice gives Venus's temperature but never mentions Mercury.`);
R2('syn', 3, notes(`Robin Wall Kimmerer is a botanist and a member of the Citizen Potawatomi Nation.`, `In 2013, she published <i>Braiding Sweetgrass</i>.`, `The book combines scientific knowledge about plants with Indigenous teachings.`, `It became a bestseller several years after it was published.`),
  goal(`introduce <i>Braiding Sweetgrass</i> to an audience already familiar with Robin Wall Kimmerer`),
  [`<i>Braiding Sweetgrass</i>, Kimmerer's 2013 book, combines scientific knowledge about plants with Indigenous teachings.`, `Robin Wall Kimmerer, a botanist and a member of the Citizen Potawatomi Nation, published a book in 2013.`, `Botanist Robin Wall Kimmerer is a member of the Citizen Potawatomi Nation.`, `The book became a bestseller several years after it was published.`], 0,
  [`This audience already knows Kimmerer, so the sentence should focus on the book: its title and what it is about.`, `Only the first choice names the book and describes it.`], `The second choice spends its words introducing Kimmerer, whom the audience already knows, and never names the book.`);

/* ============================== Math: Module 1 ============================== */
M1('pct', 1, `What percentage of 400 is 92?`, ['4.6%', '23%', '46%', '92%'], 1,
  [`Set up \\(\\frac{x}{100} \\cdot 400 = 92\\), so \\(4x = 92\\).`, `\\(x = 23\\).`], `46% is 92 out of 200, not 400.`);
M1('one', 1, `${table('Votes for the class field trip', ['Destination', 'Votes'], [['Museum', '9'], ['Aquarium', '14'], ['Zoo', '6'], ['Science center', '11']])}How many more students voted for the aquarium than for the zoo?`, ['5', '6', '8', '20'], 2,
  [`Aquarium: 14. Zoo: 6.`, `\\(14 - 6 = 8\\).`], `20 adds the two counts instead of subtracting.`);
M1('nle', 1, `If \\(\\frac{x^2}{16} = 25\\) and \\(x > 0\\), what is the value of \\(x\\)?`, ['5', '9', '20', '400'], 2,
  [`Multiply both sides by 16: \\(x^2 = 400\\).`, `Since \\(x > 0\\), \\(x = 20\\).`], `400 is \\(x^2\\), one step short.`);
M1('lin1', 1, `Seven times a number \\(n\\) is 12 more than 3 times \\(n\\). Which equation represents this situation?`,
  ['\\(7n = 3n + 12\\)', '\\(7n + 12 = 3n\\)', '\\(7 + n = 3n + 12\\)', '\\(7n = 3(n + 12)\\)'], 0,
  [`"Seven times a number" is \\(7n\\); "12 more than 3 times n" is \\(3n + 12\\).`, `"Is" means equals: \\(7n = 3n + 12\\).`], `\\(7n + 12 = 3n\\) puts the 12 on the wrong side.`);
M1('linf', 1, `The function \\(f(t) = 250 + 40t\\) gives the amount, in dollars, in Maya's savings account \\(t\\) weeks after she began making weekly deposits. What is the best interpretation of 40 in this context?`,
  ['Maya started with $40 in the account.', 'Maya will have $40 after 250 weeks.', 'Maya makes deposits for 40 weeks.', 'Maya deposits $40 each week.'], 3,
  [`40 is multiplied by \\(t\\), the number of weeks.`, `So the amount grows by $40 for each week: her weekly deposit.`], `$250 (the constant) is her starting amount, not $40.`);
M1('nlf', 1, `The function \\(f\\) is defined by \\(f(x) = 3x^2 - 5\\). What is the value of \\(f(-2)\\)?`, ['−17', '1', '7', '31'], 2,
  [`\\((-2)^2 = 4\\), so \\(3(4) - 5\\).`, `\\(12 - 5 = 7\\).`], `−17 squares only the 2 and keeps the negative: \\(3(-4) - 5\\). A negative number squared is positive.`);
M1('lin1', 2, `A climbing gym charges a $12 membership fee plus $4 per class. Ari used an $8 coupon and paid $64 in total. How many classes did Ari take?`, ['13', '15', '44', '60'], 1,
  [`\\(12 + 4c - 8 = 64\\), so \\(4c + 4 = 64\\).`, `\\(4c = 60\\), so \\(c = 15\\).`], `13 ignores the coupon (\\(12 + 4c = 64\\) gives 13).`);
M1('linf', 2, `${table('', ['\\(x\\)', '1', '3', '5'], [['\\(f(x)\\)', '8', '14', '20']])}The table shows three values of \\(x\\) and \\(f(x)\\) for the linear function \\(f\\). Which equation defines \\(f\\)?`,
  ['\\(f(x) = 3x + 5\\)', '\\(f(x) = 6x + 2\\)', '\\(f(x) = 3x + 8\\)', '\\(f(x) = 5x + 3\\)'], 0,
  [`Slope: \\((14 - 8) \\div (3 - 1) = 3\\).`, `\\(8 = 3(1) + b\\), so \\(b = 5\\): \\(f(x) = 3x + 5\\).`], `\\(3x + 8\\) uses 8 as the intercept, but 8 is \\(f(1)\\), not \\(f(0)\\).`);
M1('lat', 2, `Right triangles \\(ABC\\) and \\(DEF\\) are similar, with \\(A\\), \\(B\\), and \\(C\\) corresponding to \\(D\\), \\(E\\), and \\(F\\). Angle \\(C\\) is a right angle and angle \\(A\\) measures 38°. What is the measure of angle \\(E\\)?`, ['38°', '52°', '90°', '142°'], 1,
  [`In triangle \\(ABC\\): \\(B = 180 - 90 - 38 = 52\\).`, `Similar triangles have equal corresponding angles, so \\(E = B = 52°\\).`], `38° is angle \\(D\\), which corresponds to \\(A\\), not \\(E\\).`);
M1('two', 2, `${table('', ['\\(x\\)', '1', '2', '3', '4', '5'], [['\\(y\\)', '18', '15.5', '13.2', '10.9', '8.3']])}Which equation best models the data in the table?`,
  ['\\(y = -2.4x + 8.3\\)', '\\(y = -20.5x + 2.4\\)', '\\(y = 2.4x + 20.5\\)', '\\(y = -2.4x + 20.5\\)'], 3,
  [`\\(y\\) falls by about 2.4 each time \\(x\\) rises by 1, so the slope is about −2.4.`, `At \\(x = 1\\): \\(-2.4 + 20.5 = 18.1\\), close to 18. The intercept is about 20.5.`], `\\(y = 2.4x + 20.5\\) has a positive slope, but the data decrease.`);
M1('lin2', 2, `A theater sells adult tickets for $6 and child tickets for $4. The equation \\(6a + 4c = 120\\) represents a day's ticket sales of $120. If 8 adult tickets were sold, how many child tickets were sold?`, ['8', '12', '18', '30'], 2,
  [`\\(6(8) + 4c = 120\\), so \\(4c = 72\\).`, `\\(c = 18\\).`], `30 is \\(120 \\div 4\\), which forgets the adult sales.`);
M1('lin2', 2, `Line \\(\\ell\\) in the xy-plane has a slope of −3 and passes through the point \\((2, 5)\\). Which equation defines line \\(\\ell\\)?`,
  ['\\(y = -3x + 11\\)', '\\(y = -3x + 5\\)', '\\(y = 3x - 1\\)', '\\(y = -3x - 1\\)'], 0,
  [`\\(y - 5 = -3(x - 2)\\).`, `\\(y = -3x + 6 + 5 = -3x + 11\\).`], `\\(y = -3x + 5\\) uses the point's y-value as the intercept, but the point isn't on the y-axis.`);
M1('nle', 2, `If \\(\\sqrt{x + 11} = 6\\), what is the value of \\(x\\)?`, ['−5', '5', '25', '47'], 2,
  [`Square both sides: \\(x + 11 = 36\\).`, `\\(x = 25\\).`], `47 adds 11 instead of subtracting it.`);
M1('sys', 2, `\\(3x + y = 25\\)<br>\\(x + y = 9\\)<br>If \\((x, y)\\) is the solution to the system of equations above, what is the value of \\(2x\\)?`, ['8', '16', '17', '34'], 1,
  [`Subtract the second equation from the first: \\(2x = 16\\).`, `That's exactly what the question asks for.`], `8 is \\(x\\), not \\(2x\\).`);
M1('lin2', 3, `Line \\(t\\) is perpendicular to the line \\(2x + 5y = 10\\) and passes through \\((0, -1)\\). Which equation defines line \\(t\\)?`,
  ['\\(y = -\\frac{2}{5}x - 1\\)', '\\(y = \\frac{2}{5}x - 1\\)', '\\(y = -\\frac{5}{2}x - 1\\)', '\\(y = \\frac{5}{2}x - 1\\)'], 3,
  [`The given line: \\(y = -\\frac{2}{5}x + 2\\), slope \\(-\\frac{2}{5}\\).`, `Perpendicular slope is the negative reciprocal, \\(\\frac{5}{2}\\). With y-intercept −1: \\(y = \\frac{5}{2}x - 1\\).`], `\\(-\\frac{5}{2}\\) flips the fraction but forgets to change the sign.`);
M1('nlf', 2, `The function \\(f(x) = 350(1.06)^x\\) models the value, in dollars, of an investment \\(x\\) years after it was purchased. What is the best interpretation of 350 in this context?`,
  ['The investment was worth $350 when it was purchased.', 'The investment grows by $350 each year.', 'The investment is worth $350 after 6 years.', 'The investment grows by 35% each year.'], 0,
  [`At \\(x = 0\\), \\(f(0) = 350(1.06)^0 = 350\\).`, `So 350 is the starting value.`], `Growth is 6% per year (from 1.06), not $350 per year.`);
M1('rat', 2, `The ratio of a rectangle's length to its width is 7 to 3. If the length is 42 centimeters, what is the perimeter of the rectangle, in centimeters?`, ['18', '60', '120', '756'], 2,
  [`\\(\\frac{7}{3} = \\frac{42}{w}\\), so \\(w = 18\\).`, `Perimeter: \\(2(42 + 18) = 120\\).`], `60 is length + width, half the perimeter.`);
M1('area', 2, `The perimeter of square A is 4 times the perimeter of square B. The area of square B is 9 square inches. What is the area of square A, in square inches?`, ['36', '48', '108', '144'], 3,
  [`Square B's side is 3, so square A's side is \\(4 \\times 3 = 12\\).`, `Area of A: \\(12^2 = 144\\).`], `36 multiplies the area by 4, but when lengths are multiplied by 4, area is multiplied by 16.`);
M1('eqv', 2, `The perimeter \\(P\\) of a rectangle with length \\(L\\) and width \\(W\\) is given by \\(P = 2(L + W)\\). Which equation gives \\(W\\) in terms of \\(P\\) and \\(L\\)?`,
  ['\\(W = P - 2L\\)', '\\(W = \\frac{P}{2} - L\\)', '\\(W = 2P - L\\)', '\\(W = \\frac{P - L}{2}\\)'], 1,
  [`Divide both sides by 2: \\(\\frac{P}{2} = L + W\\).`, `Subtract \\(L\\): \\(W = \\frac{P}{2} - L\\).`], `\\(\\frac{P - L}{2}\\) subtracts \\(L\\) before dividing, but \\(L\\) was doubled too, so divide by 2 first.`);
M1('circ', 3, `Point \\(O\\) is the center of a circle with radius 9. Points \\(R\\) and \\(S\\) lie on the circle, and arc \\(RS\\) has a measure of 100°. What is the length of arc \\(RS\\)?`, ['\\(5\\pi\\)', '\\(10\\pi\\)', '\\(22.5\\pi\\)', '\\(90\\pi\\)'], 0,
  [`Circumference: \\(2\\pi(9) = 18\\pi\\).`, `Arc length: \\(\\frac{100}{360} \\cdot 18\\pi = 5\\pi\\).`], `\\(22.5\\pi\\) is the area of the sector, not the length of the arc.`);
M1('eqv', 3, `For \\(x > 0\\), the expression \\(\\sqrt[3]{x^{12}} \\cdot \\sqrt{x}\\) is equivalent to \\(x^k\\). What is the value of \\(k\\)?`, ['4.5', '6', '6.5', '8'], 0,
  [`\\(\\sqrt[3]{x^{12}} = x^{12/3} = x^4\\) and \\(\\sqrt{x} = x^{1/2}\\).`, `Multiply by adding exponents: \\(4 + \\frac{1}{2} = 4.5\\).`], `6.5 halves 12 instead of dividing it by 3 (a cube root divides the exponent by 3).`);
M1('nle', 3, `\\(y = x^2 + bx + 13\\)<br>\\(y = 2x + 4\\)<br>In the system above, \\(b\\) is a positive constant. The graphs of the equations intersect at exactly one point. What is the value of \\(b\\)?`, ['2', '4', '6', '8'], 3,
  [`Set equal: \\(x^2 + bx + 13 = 2x + 4\\), so \\(x^2 + (b - 2)x + 9 = 0\\).`, `One solution means discriminant 0: \\((b - 2)^2 - 36 = 0\\), so \\(b - 2 = \\pm 6\\). Since \\(b > 0\\), \\(b = 8\\).`], `6 is \\(b - 2\\), not \\(b\\). (The other solution, \\(b = -4\\), isn't positive.)`,
  { desmos: ['y=x^2+bx+13', 'y=2x+4'], desmosTip: 'Graph both with a slider for b and drag until the line just touches the parabola.' });

/* ============================ Math: Module 2 pool ============================ */
M2('one', 1, `${table('Estimated deer population in a park', ['Year', 'Deer'], [['2019', '120'], ['2020', '145'], ['2021', '180'], ['2022', '150'], ['2023', '165']])}In which year was the estimated deer population the greatest?`, ['2019', '2020', '2021', '2023'], 2,
  [`Compare the counts: 120, 145, 180, 150, 165.`, `The largest is 180, in 2021.`], `2023 is the most recent year, not the year with the most deer.`);
M2('rat', 1, `A swimmer swam 4,400 yards. If 1 mile equals 1,760 yards, how many miles did the swimmer swim?`, ['2.5', '2.75', '3.5', '4.4'], 0,
  [`\\(4{,}400 \\div 1{,}760\\).`, `\\(= 2.5\\) miles.`], `4.4 just divides by 1,000, as if a mile were 1,000 yards.`);
M2('eqv', 1, `Which expression is equivalent to \\(15x^4 - 6x^4\\)?`, ['\\(9\\)', '\\(21x^4\\)', '\\(9x^4\\)', '\\(9x^8\\)'], 2,
  [`These are like terms, so subtract the coefficients.`, `\\(15 - 6 = 9\\), keeping \\(x^4\\): \\(9x^4\\).`], `\\(9x^8\\) adds the exponents; that only happens when you multiply.`);
M2('sys', 1, `\\(x = 4y\\)<br>\\(x + 2y = 30\\)<br>What is the value of \\(y\\) in the solution to the system above?`, ['5', '6', '15', '20'], 0,
  [`Substitute: \\(4y + 2y = 30\\).`, `\\(6y = 30\\), so \\(y = 5\\).`], `20 is the value of \\(x\\).`);
M2('ineq', 2, `\\(y \\le x + 2\\)<br>\\(y \\ge -2x + 6\\)<br>Which point \\((x, y)\\) is a solution to the system of inequalities above?`, ['\\((0, 1)\\)', '\\((1, 5)\\)', '\\((-2, 0)\\)', '\\((3, 4)\\)'], 3,
  [`Test \\((3, 4)\\): \\(4 \\le 5\\) ✓ and \\(4 \\ge 0\\) ✓.`, `Each other point fails at least one inequality.`], `\\((-2, 0)\\) passes the first inequality but fails the second (\\(0 \\ge 10\\) is false).`,
  { desmos: ['y\\le x+2', 'y\\ge -2x+6'] });
M2('nle', 1, `If \\(|x - 3| = 8\\), which of the following could be the value of \\(x\\)?`, ['−5', '3', '5', '8'], 0,
  [`\\(x - 3 = 8\\) or \\(x - 3 = -8\\).`, `So \\(x = 11\\) or \\(x = -5\\). Only −5 is a choice.`], `8 is the distance from 3, not a value of \\(x\\).`);
M2('linf', 1, `The function \\(f(x) = 9x + 4\\) gives the total number of people on a camping trip with \\(x\\) counselors. If there are 76 people on the trip, how many counselors are there?`, ['8', '9', '72', '76'], 0,
  [`\\(9x + 4 = 76\\), so \\(9x = 72\\).`, `\\(x = 8\\).`], `72 is \\(9x\\); divide by 9 to get the number of counselors.`);
M2('nlf', 2, `The function \\(h\\) is defined by \\(h(x) = x^2 - 4\\). For which value of \\(x\\) is \\(h(x) = 21\\)?`, ['−21', '5', '17', '25'], 1,
  [`\\(x^2 - 4 = 21\\), so \\(x^2 = 25\\).`, `\\(x = 5\\) (or −5).`], `25 is \\(x^2\\), not \\(x\\). 17 subtracts 4 from 21 instead of adding it.`);
M2('nlf', 1, `The function \\(f\\) is defined by \\(f(x) = 6(2)^x + 5\\). What is the value of \\(f(0)\\)?`, ['5', '11', '12', '17'], 1,
  [`\\(2^0 = 1\\), so \\(f(0) = 6(1) + 5\\).`, `\\(= 11\\).`], `5 treats \\(2^0\\) as 0. Any nonzero number to the power 0 is 1.`);
M2('samp', 2, `Based on a random sample of 500 residents of a county, the estimated proportion of residents who own a bicycle is 0.42, with a margin of error of 0.05. Which of the following is a plausible value for the proportion of all county residents who own a bicycle?`, ['0.32', '0.36', '0.40', '0.55'], 2,
  [`Plausible range: \\(0.42 \\pm 0.05\\), from 0.37 to 0.47.`, `Only 0.40 is in that range.`], `0.36 is close, but it falls just below 0.37.`);
M2('ineq', 2, `A truck can tow a trailer if the combined weight of the trailer and its cargo is no more than 8,000 pounds. The trailer weighs 1,400 pounds, and each box of cargo weighs 55 pounds. What is the maximum number of boxes the truck can tow?`, ['119', '120', '121', '145'], 1,
  [`\\(1{,}400 + 55b \\le 8{,}000\\), so \\(55b \\le 6{,}600\\).`, `\\(b \\le 120\\). The maximum is 120.`], `145 is \\(8{,}000 \\div 55\\), forgetting the trailer's own weight.`);
M2('nle', 2, `The equation \\(x^2 + 10x = 39\\) can be rewritten in the form \\((x + k)^2 = m\\), where \\(k\\) and \\(m\\) are constants. What is the value of \\(m\\)?`, ['5', '39', '44', '64'], 3,
  [`Complete the square: add \\(\\left(\\frac{10}{2}\\right)^2 = 25\\) to both sides.`, `\\((x + 5)^2 = 39 + 25 = 64\\).`], `44 adds 5 (which is \\(k\\)) instead of \\(5^2\\).`);
M2('prob', 2, `A box contains 50 tiles of equal size: 18 red, 20 blue, and the rest yellow. If one tile is chosen at random, what is the probability that it is not blue?`, ['\\(\\frac{2}{5}\\)', '\\(\\frac{3}{5}\\)', '\\(\\frac{6}{25}\\)', '\\(\\frac{9}{25}\\)'], 1,
  [`Not blue: \\(50 - 20 = 30\\) tiles.`, `\\(\\frac{30}{50} = \\frac{3}{5}\\).`], `\\(\\frac{2}{5}\\) is the probability that the tile IS blue.`);
M2('linf', 2, `The function \\(f\\) is defined by \\(f(x) = 2x + 3\\). The graph of \\(y = g(x)\\) is the graph of \\(y = f(x)\\) shifted down 7 units. What is the value of \\(g(4)\\)?`, ['−3', '0', '4', '11'], 2,
  [`\\(g(x) = f(x) - 7 = 2x - 4\\).`, `\\(g(4) = 8 - 4 = 4\\).`], `11 is \\(f(4)\\) before the shift.`);
M2('rat', 2, `A radio host said that 3 times as many people voted for a proposal as voted against it. If 840 people voted and everyone voted either for or against, how many people voted for the proposal?`, ['210', '280', '560', '630'], 3,
  [`If \\(a\\) voted against, \\(3a\\) voted for: \\(4a = 840\\), so \\(a = 210\\).`, `For: \\(3(210) = 630\\).`], `280 divides 840 by 3, but the total has 4 equal parts (3 for, 1 against).`);
M2('lat', 2, `Two lines intersect. One of the angles formed measures \\((3x + 10)°\\), and the angle vertical to it measures \\((5x - 30)°\\). What is the value of \\(x\\)?`, ['20', '25', '40', '70'], 0,
  [`Vertical angles are equal: \\(3x + 10 = 5x - 30\\).`, `\\(40 = 2x\\), so \\(x = 20\\).`], `25 treats the angles as supplementary (\\(8x - 20 = 180\\)), but vertical angles are equal.`);
M2('lin1', 3, `In the equation \\(4(ax - 3) = 12x + 7\\), \\(a\\) is a constant. If the equation has no solution, what is the value of \\(a\\)?`, ['−3', '3', '4', '12'], 1,
  [`Distribute: \\(4ax - 12 = 12x + 7\\).`, `No solution means the x-terms cancel but the constants don't: \\(4a = 12\\), so \\(a = 3\\) (and \\(-12 \\ne 7\\)).`], `12 is \\(4a\\), not \\(a\\).`);
M2('nlf', 3, `The function \\(f\\) is defined by \\(f(x) = (x - 10)(x + 14)\\). What is the minimum value of \\(f(x)\\)?`, ['−144', '−140', '−24', '−2'], 0,
  [`The roots are 10 and −14, so the vertex is halfway: \\(x = -2\\).`, `\\(f(-2) = (-12)(12) = -144\\).`], `−2 is the x-value of the vertex; −140 is \\(f(0)\\).`,
  { desmos: ['f(x)=(x-10)(x+14)'] });
M2('nlf', 3, `The graph of \\(y = a(x - h)^2 + k\\) is shown in the xy-plane, where \\(a\\), \\(h\\), and \\(k\\) are positive constants. Which statement about the graph must be true?`,
  ['Its vertex is in Quadrant I, and the parabola opens upward.', 'Its vertex is in Quadrant II, and the parabola opens upward.', 'Its vertex is in Quadrant I, and the parabola opens downward.', 'Its vertex is in Quadrant IV, and the parabola opens downward.'], 0,
  [`The vertex is \\((h, k)\\): both positive, so Quadrant I.`, `\\(a > 0\\) means the parabola opens upward.`], `Quadrant II would need a negative \\(h\\); the form \\(x - h\\) with \\(h > 0\\) shifts right.`);
M2('trig', 3, `In right triangle \\(JKL\\), angle \\(J\\) is the right angle and \\(\\sin K = \\frac{8}{17}\\). What is the value of \\(\\tan L\\)?`, ['\\(\\frac{8}{15}\\)', '\\(\\frac{8}{17}\\)', '\\(\\frac{15}{17}\\)', '\\(\\frac{15}{8}\\)'], 3,
  [`\\(\\sin K = \\frac{8}{17}\\): side opposite \\(K\\) (that's \\(JL\\)) is 8, hypotenuse \\(KL\\) is 17, so \\(JK = 15\\).`, `\\(\\tan L = \\frac{\\text{opposite } L}{\\text{adjacent } L} = \\frac{JK}{JL} = \\frac{15}{8}\\).`], `\\(\\frac{8}{15}\\) is \\(\\tan K\\). Switching angles flips tangent.`);
M2('nle', 3, `In the equation \\(2x^2 + 14x + c = 0\\), \\(c\\) is a constant. If the equation has no real solutions, which of the following could be the value of \\(c\\)?`, ['−25', '0', '24', '25'], 3,
  [`No real solutions: \\(b^2 - 4ac < 0\\), so \\(196 - 8c < 0\\).`, `\\(c > 24.5\\). Only 25 works.`], `24 is close, but \\(196 - 192 = 4 > 0\\), which gives two real solutions.`);
M2('sys', 3, `\\(3x + 4y = 27\\)<br>\\(2x - 4y = -2\\)<br>If \\((x, y)\\) is the solution to the system above, what is the value of \\(x + y\\)?`, ['3', '5', '8', '13'], 2,
  [`Add the equations: \\(5x = 25\\), so \\(x = 5\\). Then \\(15 + 4y = 27\\), so \\(y = 3\\).`, `\\(x + y = 8\\).`], `5 is \\(x\\) alone and 3 is \\(y\\) alone.`);
M2('nlf', 2, `A car's value, in dollars, is modeled by \\(V(t) = 28{,}000(0.85)^t\\), where \\(t\\) is the number of years since it was purchased. Which statement is true?`,
  ['The car loses 85% of its value each year.', 'The car\'s value decreases by $15 each year.', 'The car\'s value decreases by $4,200 each year.', 'The car\'s value decreases by 15% each year.'], 3,
  [`Multiplying by 0.85 keeps 85% of the value.`, `So the value drops by 15% each year.`], `$4,200 is only the first year's drop (15% of $28,000); later drops are smaller.`);
M2('one', 2, `The data set 3, 7, 7, 8, 10, 14, \\(n\\) has a median of 8. Which of the following could be the value of \\(n\\)?`, ['1', '5', '6', '9'], 3,
  [`With 7 values, the median is the 4th value in order.`, `If \\(n \\ge 8\\), the order is 3, 7, 7, 8, ... and the 4th value is 8. Only 9 works.`], `If \\(n\\) is 5 or 6, it slides in early and the 4th value becomes 7.`);
M2('circ', 3, `What are the center and radius of the circle in the xy-plane with equation \\(x^2 + y^2 + 8x - 6y = 0\\)?`,
  ['Center \\((4, -3)\\), radius 5', 'Center \\((-4, 3)\\), radius 5', 'Center \\((-4, 3)\\), radius 25', 'Center \\((8, -6)\\), radius 0'], 1,
  [`Complete the squares: \\((x + 4)^2 + (y - 3)^2 = 16 + 9 = 25\\).`, `Center \\((-4, 3)\\), radius \\(\\sqrt{25} = 5\\).`], `Center \\((4, -3)\\) flips the signs; \\((x + 4)\\) means \\(h = -4\\).`);
M2('area', 3, `Two identical right rectangular prisms each have a square base with side length 4 centimeters and a height of 10 centimeters. They are glued together, base to base, to form one prism. What is the surface area of the new prism, in square centimeters?`, ['320', '336', '352', '384'], 2,
  [`The new prism has a 4 by 4 base and a height of 20.`, `Surface area: \\(2(16) + 4(4 \\cdot 20) = 32 + 320 = 352\\).`], `384 adds the two prisms' surface areas, but the two glued faces are now hidden.`);
M2('pct', 3, `The number 195 is \\(p\\%\\) greater than 30. What is the value of \\(p\\)?`, ['6.5', '165', '550', '650'], 2,
  [`\\(195 = 30\\left(1 + \\frac{p}{100}\\right)\\), so \\(1 + \\frac{p}{100} = 6.5\\).`, `\\(\\frac{p}{100} = 5.5\\), so \\(p = 550\\).`], `650 means 195 is 650% OF 30. "Greater than" subtracts the original 100%.`);
M2('trig', 2, `An isosceles right triangle has a hypotenuse of length \\(10\\sqrt{2}\\). What is the area of the triangle?`, ['25', '50', '100', '200'], 1,
  [`In a 45°-45°-90° triangle, hypotenuse = leg \\(\\cdot \\sqrt{2}\\), so each leg is 10.`, `Area: \\(\\frac{1}{2}(10)(10) = 50\\).`], `100 forgets the \\(\\frac{1}{2}\\) in the triangle area formula.`);

export const TEST1 = list;
