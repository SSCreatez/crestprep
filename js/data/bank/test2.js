/**
 * test2.js: CrestPrep Practice Test 2. Original questions that follow the
 * skill-by-skill sequence of College Board's Practice Test 5.
 *   R1 / M1 → Module 1.  R2 / M2 → Module 2 pool (see bank/tests.js).
 */
import { testMakers, notes, goal, table, twoTexts } from './build.js';

const { list, R1, R2, M1, M2 } = testMakers(2);

/* ======================= Reading and Writing: Module 1 ======================= */
R1('wic', 1, `The hikers followed leave-no-trace rules, packing out every wrapper and scattering the cold ashes of their campfire so that the next visitors would find no ______ of their stay.`,
  'wic', [`shortage`, `sign`, `reward`, `rumor`], 1,
  [`The hikers erased everything they left behind.`, `So later visitors would find no "sign" (evidence) of them.`], `"Shortage" doesn't fit: the point is leaving no evidence, not running low on something.`);
R1('wic', 1, `Museum conservators handle the ancient papyrus scrolls with special care because the material is extremely ______: even a slight bend can make it crack.`,
  'wic', [`durable`, `valuable`, `familiar`, `fragile`], 3,
  [`The clue after the colon: a slight bend can make it crack.`, `Easily broken means "fragile."`], `The scrolls are surely valuable, but value doesn't explain why a slight bend cracks them.`);
R1('wic', 2, `Satellite images allow forecasters to warn coastal residents of ______ hurricanes several days before the storms reach land, giving families time to board up windows and leave if necessary.`,
  'wic', [`imminent`, `previous`, `harmless`, `gradual`], 0,
  [`The storms haven't arrived yet but will soon ("several days before the storms reach land").`, `About to happen: "imminent."`], `"Harmless" contradicts the need to board up windows and leave.`);
R1('wic', 3, `Engineers at the startup Terra Lumen have ______ an unusual trait of certain soil bacteria: because the microbes release tiny electric currents as they digest organic matter, the team built fuel cells that turn ordinary mud into a trickle of power for remote sensors.`,
  'wic', [`disregarded`, `harnessed`, `exaggerated`, `questioned`], 1,
  [`The engineers built a device that uses the bacteria's currents.`, `Putting something to productive use is "harnessing" it.`], `"Disregarded" is the opposite; the team's whole design depends on the trait.`);
R1('tsp', 1, `I'm not the tallest girl at tryouts, Rosa thought as she laced her shoes, but nobody gets back on defense faster than I do, and nobody dives for loose balls the way I do. If Coach Ellis wants someone who never quits, she'll pick me.`,
  'purpose', [`To describe the rules for basketball tryouts`, `To compare Rosa with the tallest player on the team`, `To show why Rosa believes she has a chance to make the team`, `To explain why Coach Ellis prefers tall players`], 2,
  [`Rosa admits she isn't tallest, then lists her strengths: speed and effort.`, `She ends confident that the coach will pick her.`], `The text never says what Coach Ellis prefers; it only gives Rosa's hopes.`);
R1('tsp', 2, `German-language newspapers were common in the United States in the 1800s. By the 1890s, roughly 800 were being published across the country, and cities with large German immigrant communities, such as Milwaukee and Cincinnati, supported several daily papers in German.`,
  'purpose', [`To argue that German-language newspapers were more accurate than English-language ones`, `To show that German-language newspapers were widespread in the United States in the 1800s`, `To explain why German-language newspapers declined after the 1890s`, `To compare Milwaukee's newspapers with Cincinnati's`], 1,
  [`The first sentence states the point; the second backs it up with numbers and examples.`, `Its purpose is to show how common these newspapers were.`], `Milwaukee and Cincinnati are examples, not things being compared.`);
R1('tsp', 2, `The Río Tinto, a river in southern Spain, runs deep red because its water is extremely acidic and full of dissolved iron. <u>Because conditions in the river resemble those that may have existed on early Mars, scientists study the microbes that thrive there.</u> They hope these organisms will show what kinds of life might once have survived on the red planet.`,
  'function', [`It contrasts the river's color with the color of Mars.`, `It describes the chemical makeup of the river.`, `It suggests that research in the river has been unsuccessful.`, `It explains why scientists study the microbes in the Río Tinto.`], 3,
  [`The underlined sentence gives a reason ("Because...") that scientists study the microbes.`, `The next sentence adds what they hope to learn.`], `The river's chemistry appears in the first sentence, not the underlined one.`);
R1('ctc', 3, twoTexts(`Some historians of science argue that major discoveries are best credited to individual geniuses, pointing to figures like Isaac Newton, whose laws of motion seemed to appear almost fully formed in a single book.`,
  `Historian Grace Liu argues that focusing on lone geniuses distorts how science works. Newton himself, she notes, relied heavily on the observations of astronomers such as Johannes Kepler and on mathematical tools developed by many others; his laws were a synthesis as much as an invention.`),
  `Based on the texts, how would Liu (Text 2) most likely respond to the historians in Text 1?`,
  [`By agreeing that Newton developed his laws without outside influence`, `By claiming that Kepler deserves more credit than Newton for the laws of motion`, `By arguing that their own example overlooks how much Newton depended on the work of others`, `By suggesting that Newton's laws of motion were incorrect`], 2,
  [`Text 1 uses Newton as the model lone genius.`, `Liu says Newton built on Kepler and others, so the historians' own example works against them.`], `Liu says Newton built on Kepler's work; she never says Kepler deserves more credit.`);
R1('cid', 1, `Mangrove forests grow along tropical coastlines where fresh water and salt water mix. Their tangled roots slow incoming waves, which helps protect shorelines from erosion during storms. The roots also shelter young fish, crabs, and shrimp, making mangroves important nurseries for coastal sea life.`,
  'main', [`Mangrove forests protect coastlines and provide habitat for young sea animals.`, `Mangrove roots can survive only in fresh water.`, `Storms are destroying most of the world's mangrove forests.`, `Young fish leave mangroves as soon as they hatch.`], 0,
  [`Sentence 2: roots protect shorelines. Sentence 3: roots shelter young animals.`, `The main idea covers both benefits.`], `The text says mangroves grow where fresh and salt water mix, so "only in fresh water" is wrong.`);
R1('cid', 2, `When marine biologists placed underwater microphones near a reef that was being restored, they expected to hear little activity at first. Instead, within a year the recordings were full of snaps, grunts, and croaks from shrimp and fish, a soundscape nearly as lively as that of a healthy reef. What surprised the researchers most was how quickly the new residents had arrived.`,
  `According to the text, what surprised the researchers?`,
  [`That the microphones recorded no fish sounds`, `How quickly animals moved into the restored reef`, `That healthy reefs are quieter than damaged ones`, `That shrimp make louder sounds than fish`], 1,
  [`The last sentence states it directly: "how quickly the new residents had arrived."`, `That matches the second choice.`], `The recordings were full of fish sounds, so the first choice contradicts the text.`);
R1('coe', 2, `In Lena Marsh's novel <i>The Quiet House</i>, the housekeeper, Mrs. Abernathy, is deeply troubled by the sudden departure of the family she has worked for.`,
  `Which quotation from <i>The Quiet House</i> most effectively illustrates the claim?`,
  [`"Mrs. Abernathy sat alone at the kitchen table long after the carriage had gone, her hands trembling, the untouched tea gone cold beside her."`, `"Mrs. Abernathy polished the silver every Tuesday, as she had for thirty years."`, `"The house was very quiet now, and the clocks seemed louder than before."`, `"'At last, a little peace,' Mrs. Abernathy said, smiling as she opened the windows."`], 0,
  [`The claim needs Mrs. Abernathy reacting with distress to the family leaving.`, `Sitting alone after the carriage left, hands trembling, tea forgotten: that shows distress.`], `The quiet house sets a mood, but it doesn't show Mrs. Abernathy's feelings.`);
R1('coe', 2, `${table('Trees in a protected forest', ['Tree', 'Species', 'Estimated age (years)'], [['A', 'Oak', '410'], ['B', 'Cedar', '1,250'], ['C', 'Pine', '780'], ['D', 'Maple', '230']])}A forester explains that older trees usually have thicker, more fire-resistant bark. Based on the table, the tree most likely to survive a ground fire would be ______`,
  'table', [`Tree A, the oak, which is about 410 years old.`, `Tree D, the maple, which is the youngest tree in the table.`, `Tree C, the pine, which is older than the oak.`, `Tree B, the cedar, which is about 1,250 years old.`], 3,
  [`Older means thicker bark, so look for the oldest tree.`, `Tree B, at about 1,250 years, is the oldest.`], `The pine is older than the oak, but not the oldest tree in the table.`);
R1('coe', 3, `In Odile Brand's poem "Winter Station," the speaker has mixed feelings about the town where she grew up.`,
  `Which quotation from "Winter Station" most effectively illustrates the claim?`,
  [`"The trains came twice a day and never stayed."`, `"I curse the narrow streets that held me in, / yet every window there still knows my name."`, `"How I hated the gray sky, the gray stone, the gray faces."`, `"The bakery on the corner sold bread at dawn."`], 1,
  [`Mixed feelings need both a negative and a positive (or warm) feeling.`, `"I curse the narrow streets" (negative) + "every window... still knows my name" (affection).`], `"How I hated..." is strong feeling, but only negative, so it isn't mixed.`);
R1('coe', 3, `${table('Algae pigment in lake mud', ['Approximate year', 'Pigment (µg per gram)'], [['1880', '12'], ['1900', '13'], ['1920', '12'], ['1940', '14'], ['1960', '41'], ['1980', '45']])}Researchers measured a pigment produced by algae in layers of mud from a lake. More pigment means more algae, and large algae blooms reduce the oxygen in deep water. The researchers concluded that deep-water oxygen fell sharply around 1960 but not around 1900.`,
  `Which choice most effectively uses data from the table to support the researchers' conclusion?`,
  [`Pigment concentration was higher in 1980 than in 1960.`, `Pigment concentration fell slightly between 1900 and 1920.`, `Pigment concentration stayed about the same from 1880 to 1940 but nearly tripled by 1960.`, `Pigment concentration was lowest in 1960.`], 2,
  [`The conclusion has two parts: no big change around 1900, a sharp change around 1960.`, `Steady values through 1940, then a jump from 14 to 41, support both parts.`], `1980 > 1960 is true, but it says nothing about 1900, and the conclusion compares the two periods.`);
R1('inf', 2, `Some researchers have proposed that a large meteorite impact caused a sudden drop in global temperatures about 12,900 years ago. A team recently identified a large crater in northern Canada that could have been formed by such an impact. However, the team has not been able to determine when the crater formed. Therefore, ______`,
  'complete', [`the crater must have formed about 12,900 years ago.`, `the drop in temperatures could not have been caused by an impact.`, `the crater is larger than most known impact craters.`, `it remains uncertain whether the crater is connected to the drop in temperatures.`], 3,
  [`To link the crater to an event 12,900 years ago, you need the crater's age.`, `Its age is unknown, so the link can't be confirmed either way.`], `"Could not have been caused by an impact" goes too far; an unknown date doesn't rule anything out.`);
R1('inf', 3, `Many cave-dwelling fish species have lost their eyes. Biologist Sun-Hee Park found that in several unrelated cave fish species, the loss of eyes is accompanied by more taste buds on the head and by better-developed sensors that detect movement in the water. Because eyes require a great deal of energy to maintain, Park concludes that ______`,
  'complete', [`cave fish lost their eyes because they ate less than surface fish.`, `losing eyes may free up energy for senses that are more useful in total darkness.`, `cave fish with eyes are better at detecting water movement.`, `taste buds and eyes cannot develop in the same fish.`], 1,
  [`Eyes cost energy; cave fish without eyes have stronger other senses.`, `So energy saved on eyes may go to senses that work in the dark.`], `"Cannot develop in the same fish" is far too strong; most fish have both eyes and taste buds.`);
R1('bnd', 1, `The exhibit features paintings by Mexican ______ Frida Kahlo, alongside works by her husband, Diego Rivera.`,
  'conv', [`painter,`, `painter:`, `painter`, `painter—`], 2,
  [`"Mexican painter" is a title describing "Frida Kahlo," the name that follows.`, `No punctuation goes between a title like this and the name.`], `A comma would separate the title from the name it belongs to.`);
R1('bnd', 2, `The team's new robot—a machine about the size of a ______ can climb stairs and open doors on its own.`,
  'conv', [`dog—`, `dog,`, `dog;`, `dog`], 0,
  [`The extra information opens with a dash after "robot."`, `It must close with a matching dash.`], `A comma can't close information that opened with a dash.`);
R1('bnd', 3, `The first polio vaccines became widely available in the United States in the late ______ reported cases fell from tens of thousands per year to fewer than one hundred by the mid-1960s.`,
  'conv', [`1950s; as a result,`, `1950s, as a result,`, `1950s as a result`, `1950s, as a result;`], 0,
  [`Both parts are complete sentences, and "as a result" is a transition that begins the second one.`, `Semicolon before it, comma after it.`], `"1950s, as a result," uses only commas between two complete sentences, which is a comma splice.`);
R1('fss', 1, `Engineers built the region's first bridge made entirely from recycled plastic. Officials from other cities soon visited to study ______.`,
  'conv', [`it`, `them`, `those`, `these`], 0,
  [`The pronoun refers to "bridge," which is singular.`, `Singular: "it."`], `"Them" would need a plural noun, but there's only one bridge.`);
R1('fss', 2, `In 1879, after testing many different materials, Thomas Edison's team ______ a filament made of carbonized cotton thread to keep a light bulb glowing for more than thirteen hours.`,
  'conv', [`using`, `to use`, `used`, `having used`], 2,
  [`"Thomas Edison's team" needs a main verb.`, `Only "used" can serve as one.`], `With "using," the sentence never gets a main verb; it becomes a fragment.`);
R1('fss', 3, `Planting native wildflowers along highways, according to several state transportation departments, ______ pollinators and reduces mowing costs.`,
  'conv', [`support`, `are supporting`, `supports`, `have supported`], 2,
  [`The subject is "Planting," one activity, so it's singular. Skip "native wildflowers along highways" and the "according to" phrase.`, `It also has to match "reduces," so "supports."`], `"Support" agrees with "highways" or "departments," which are not the subject.`);
R1('tra', 1, `Copper slowly reacts with oxygen, water, and carbon dioxide in the air. ______ copper roofs gradually develop a green coating called patina.`,
  'trans', [`On the contrary,`, `For example,`, `Previously,`, `As a result,`], 3,
  [`The reaction in sentence 1 causes the green coating in sentence 2.`, `Cause and effect: "As a result."`], `"For example" would make the green roof an example of the reaction, but it's the effect of it.`);
R1('tra', 2, `Ancient Rome's population at its peak is often estimated at around one million people, though some historians consider that figure too high. ______ nearly all historians agree that Rome was among the largest cities of the ancient world.`,
  'trans', [`Still,`, `Therefore,`, `In other words,`, `Second,`], 0,
  [`Sentence 1 admits doubt about the exact number; sentence 2 says historians agree anyway.`, `"Still" means "despite that."`], `"Therefore" would mean the doubt leads to the agreement, which isn't logical.`);
R1('syn', 1, notes(`<i>Frankenstein</i> was first published in 1818.`, `The first edition did not list an author.`, `Many readers assumed it had been written by the poet Percy Bysshe Shelley.`, `It was actually written by Mary Shelley.`, `Her name appeared on the second edition in 1823.`),
  goal(`identify the novel's real author`),
  [`Many readers assumed <i>Frankenstein</i> was written by Percy Bysshe Shelley.`, `<i>Frankenstein</i>, first published without an author's name in 1818, was actually written by Mary Shelley.`, `The first edition of <i>Frankenstein</i> did not list an author.`, `An author's name appeared on the 1823 edition of <i>Frankenstein</i>.`], 1,
  [`The goal is to name the real author.`, `Only one choice says Mary Shelley wrote it.`], `The first choice names an author, but the wrong one: the one readers wrongly assumed.`);
R1('syn', 2, notes(`A thermos keeps drinks hot or cold for hours.`, `It has two walls with a vacuum between them.`, `Heat travels poorly through a vacuum because there are almost no particles to carry it.`, `The inner walls are often coated with a shiny material that reflects heat.`),
  goal(`explain how a thermos keeps drinks hot`),
  [`A thermos keeps drinks hot or cold for hours.`, `The inner walls of a thermos are often shiny.`, `A thermos has two walls separated by a vacuum, which carries heat poorly because it contains almost no particles.`, `Heat travels poorly through a vacuum.`], 2,
  [`"Explain how" needs the mechanism.`, `The third choice connects the thermos's vacuum to why heat can't escape.`], `"Heat travels poorly through a vacuum" is the key fact, but it never connects it to the thermos.`);
R1('syn', 3, notes(`The International Union for Conservation of Nature (IUCN) ranks species by their risk of extinction.`, `Its categories include Least Concern, Vulnerable, Endangered, and Critically Endangered.`, `The axolotl is a salamander native to lakes near Mexico City.`, `The IUCN lists the axolotl as Critically Endangered.`),
  goal(`indicate the axolotl's IUCN category`),
  [`IUCN categories include Least Concern, Vulnerable, Endangered, and Critically Endangered.`, `The axolotl is among the species ranked by the IUCN.`, `The IUCN lists the axolotl, a salamander native to lakes near Mexico City, as Endangered.`, `The IUCN lists the axolotl, a salamander native to lakes near Mexico City, as Critically Endangered.`], 3,
  [`The goal is the axolotl's specific category.`, `The notes say Critically Endangered.`], `"Endangered" names a real category, but not the one the notes give for the axolotl.`);

/* ===================== Reading and Writing: Module 2 pool ===================== */
R2('wic', 1, `The old oak stood at the edge of the meadow, its lowest branches <u>reaching</u> across the stream until they nearly touched the willows on the far bank.`,
  `As used in the text, what does the word "reaching" most nearly mean?`,
  [`extending`, `arriving`, `grabbing`, `achieving`], 0,
  [`Branches stretch across the stream toward the willows.`, `That sense of "reaching" is "extending."`], `"Arriving" doesn't fit: the branches only "nearly" touch the willows.`);
R2('wic', 1, `Because the shipwreck lay in cold, low-oxygen water, its wooden hull was remarkably well preserved, allowing archaeologists to ______ detailed information about how the ship was built.`,
  'wic', [`conceal`, `obtain`, `dispute`, `reserve`], 1,
  [`Good preservation lets archaeologists learn a lot.`, `Getting information is "obtaining" it.`], `"Conceal" is the opposite of what good preservation allows.`);
R2('wic', 2, `Researchers found that people who slept fewer than six hours made decisions more slowly the next day. When sleep was ______, participants hesitated longer before choosing and changed their answers more often.`,
  'wic', [`reduced`, `evaluated`, `extended`, `acquired`], 0,
  [`The first sentence is about sleeping less.`, `"When sleep was reduced" matches that.`], `"Extended" means more sleep, the opposite of the condition in the study.`);
R2('wic', 3, `Although the novel was a bestseller when it appeared in 1925, its place in American literary history is ______ today: it is rarely taught in schools, seldom reprinted, and mentioned in few histories of the period.`,
  'wic', [`enduring`, `contentious`, `tenuous`, `conspicuous`], 2,
  [`After the colon: rarely taught, seldom reprinted, rarely mentioned.`, `A weak, uncertain position is "tenuous."`], `"Contentious" means causing disagreement, but the text describes neglect, not debate.`);
R2('wic', 3, `Because almost no readable written records survive from the ancient city of Harappa, claims about what its residents believed are difficult to ______; any account of their religion relies heavily on guesswork based on small clay seals and figurines.`,
  'wic', [`substantiate`, `imagine`, `summarize`, `adjust`], 0,
  [`Without records, claims rest on guesswork.`, `Claims that can't be backed with evidence are hard to "substantiate."`], `Claims built on guesswork are easy to imagine; the problem is proving them.`);
R2('tsp', 2, `Uncle Desmond loves to tell the story of the blizzard of 1978. In his version, the snow is always deeper than anyone else remembers, and he is always the one who shoveled out the neighbors. <u>If someone points out that the newspapers reported only two feet of snow, he simply waves a hand and says the newspapers never measured his street.</u>`,
  'function', [`It explains why the newspapers reported inaccurate snowfall totals.`, `It reveals that Desmond lived on a different street from his neighbors.`, `It suggests that Desmond has forgotten the details of the blizzard.`, `It shows that Desmond won't let facts get in the way of how he tells his story.`], 3,
  [`Someone offers a fact (two feet of snow); Desmond brushes it aside.`, `The sentence shows him protecting his exaggerated version.`], `The text doesn't say the newspapers were wrong; Desmond just claims they were.`);
R2('tsp', 3, `Several studies have found that voters rarely punish governments for raising taxes. <u>Yet in a number of recent elections, governments that raised taxes lost heavily.</u> Economist Lena Kraus suggests that the earlier studies relied mostly on cases in which tax increases were scheduled to take effect after the next election, so voters had not yet felt them.`,
  'function', [`It offers evidence that supports the studies mentioned in the first sentence.`, `It presents recent events that seem to conflict with earlier findings, a conflict the next sentence tries to explain.`, `It explains why governments chose to delay tax increases.`, `It introduces a disagreement between Kraus and other economists about which taxes are fair.`], 1,
  [`"Yet" signals a conflict with the studies.`, `Kraus then explains the conflict (the earlier cases had delayed taxes).`], `The first choice reverses the relationship: "Yet" introduces a contradiction, not support.`);
R2('tsp', 3, `Many accounts of the Harlem Renaissance focus on writers such as Langston Hughes and Zora Neale Hurston. Historian Marcus Webb argues that this focus leaves out the many Black-owned businesses, from barbershops to insurance companies, that gave artists places to meet, perform, and find supporters. Without this economic foundation, Webb suggests, the movement's famous literature might never have flourished.`,
  'purpose', [`To compare the writing styles of Hughes and Hurston`, `To argue that the Harlem Renaissance was an economic movement rather than an artistic one`, `To explain why Black-owned businesses in Harlem declined`, `To present a historian's view that an overlooked factor was important to a well-known movement`], 3,
  [`Usual focus: writers. Webb: businesses that supported them were left out and mattered.`, `The text presents Webb's view about an overlooked factor.`], `The second choice overstates Webb: he says businesses supported the art, not that the movement wasn't artistic.`);
R2('ctc', 3, twoTexts(`Some critics argue that video games can't be a true storytelling art form because players control the action. A story, they claim, requires an author who decides what happens.`,
  `Game designer Nia Oduya points out that most story-driven games still have authors who write every line of dialogue and design every possible ending; players choose among paths, but every path was written in advance. In her view, someone reading a choose-your-own-adventure book is no less a reader of a story because of the choices she makes.`),
  `Based on the texts, how would Oduya (Text 2) most likely respond to the critics' claim in Text 1?`,
  [`By arguing that story-driven games do have authors who decide what can happen, even though players make choices`, `By agreeing that player choice prevents games from telling stories`, `By arguing that choose-your-own-adventure books are not really stories`, `By claiming that games should not include written dialogue`], 0,
  [`The critics: no author decides what happens, so no story.`, `Oduya: authors write every path in advance, so an author still decides what can happen.`], `Oduya uses choose-your-own-adventure books as an example of stories, so the third choice reverses her point.`);
R2('cid', 2, `From the window of the bus, Imani watched the city wake up: a man rolling up the metal shutter of his bakery, two girls racing each other to the corner, a street sweeper humming as he pushed his broom. She had ridden this route every morning for a year, but today, her last day before moving away, she noticed everything.`,
  `Which choice best describes what happens in the text?`,
  [`A character becomes annoyed by noise on her way to work.`, `A character meets an old friend on a bus.`, `A character watches familiar morning scenes with new attention before a change in her life.`, `A character decides not to move away from the city.`], 2,
  [`Imani watches ordinary scenes she's seen for a year.`, `Today, her last day before moving, she notices everything.`], `The text says she is moving away; nothing suggests she changes her mind.`);
R2('cid', 1, `Architect Amara Diallo designed a school in Burkina Faso with a raised roof that lets hot air escape, keeping classrooms cool without air conditioning. Some engineers, however, have questioned whether the design would work as well in more humid climates, where moving air cools people less effectively.`,
  `According to the text, why have some engineers questioned Diallo's design?`,
  [`They believe it is too expensive to build.`, `They doubt it would work as well in humid climates.`, `They think the roof makes classrooms too dark.`, `They argue that air conditioning is cheaper.`], 1,
  [`The second sentence gives their concern: humid climates.`, `That matches the second choice.`], `Cost is never mentioned in the text.`);
R2('cid', 3, `Many film scholars analyze movies by separating a film's story, the events that happen, from its plot, the order and manner in which those events are shown. Critic Yusuf Adebayo argues that this division, though useful, overlooks the role of sound: a film's music and silences, he contends, shape what viewers believe has happened as much as the images do, and so cannot be treated as mere decoration.`,
  'main', [`Adebayo argues that film music is more important than a film's story.`, `Film scholars disagree about whether the order of events in a film matters.`, `Adebayo argues that a common way of analyzing films leaves out an element that strongly affects how viewers understand them.`, `Adebayo believes that silent films are more powerful than films with sound.`], 2,
  [`Scholars use story vs. plot. Adebayo says this leaves out sound, which shapes understanding.`, `The main idea: a common method misses an important element.`], `The first choice overstates: Adebayo says sound matters as much as images, not more than the story.`);
R2('coe', 2, `${table('Science fair entries by category', ['Category', '2021', '2022', '2023'], [['Engineering', '64', '70', '88'], ['Biology', '92', '85', '81'], ['Chemistry', '40', '42', '45'], ['Earth science', '30', '28', '33']])}A student notes that interest in engineering among the fair's participants has grown quickly, pointing out that ______`,
  'table', [`biology had more entries than engineering in 2021.`, `chemistry entries increased every year.`, `engineering had the most entries of any category in 2022.`, `engineering entries rose from 64 in 2021 to 88 in 2023, a larger increase than in any other category.`], 3,
  [`The claim is about fast growth in engineering.`, `Engineering grew by 24; no other category grew by more than 5.`], `Chemistry did grow every year, but the claim is about engineering.`);
R2('coe', 3, `A student is writing a report on lab-grown corals that are bred to survive warmer water and then planted on damaged reefs. The student asserts that this approach carries risks as well as benefits.`,
  `Which quotation from a marine scientist would best support the student's assertion?`,
  [`"We have planted more than 20,000 heat-tolerant coral fragments over the past five years."`, `"Heat-tolerant corals grow at about the same rate as wild corals."`, `"Heat-tolerant corals could help reefs survive, but if they crowd out wild corals, reefs may lose the genetic variety they need to adapt to future threats."`, `"Reef restoration is a fast-growing field that attracts many young scientists."`], 2,
  [`The assertion has two sides: risks and benefits.`, `Only the third quotation names both a benefit (helping reefs survive) and a risk (losing genetic variety).`], `The first quotation shows the program's scale, but no risk or benefit.`);
R2('coe', 3, `${table('Projected wheat yield (tons per hectare)', ['Climate scenario', 'Without irrigation', 'With irrigation'], [['Current climate', '3.1', '3.6'], ['Moderate warming', '2.8', '3.4'], ['Extreme warming', '1.2', '1.6']])}Agronomist Laila Haddad and colleagues concluded that adding irrigation could more than make up for the yield losses caused by moderate warming but not for those caused by extreme warming.`,
  `Which choice best describes data from the table that support Haddad and colleagues' conclusion?`,
  [`Without irrigation, projected yield is 2.8 tons under moderate warming and 1.2 tons under extreme warming.`, `With irrigation, projected yield under moderate warming (3.4 tons) is higher than today's yield without irrigation (3.1 tons), but with irrigation under extreme warming it is only 1.6 tons.`, `With irrigation, projected yield is higher under moderate warming than under extreme warming.`, `Without irrigation, today's projected yield is 3.1 tons, and with irrigation under moderate warming it is 3.4 tons.`], 1,
  [`Compare irrigated yields under warming with today's yield without irrigation (3.1).`, `Moderate: 3.4 beats 3.1 (losses made up). Extreme: 1.6 falls far short.`], `The last choice proves only the moderate half of the conclusion and leaves out extreme warming.`);
R2('coe', 2, `Historian Kofi Mensah claims that the spread of the bicycle in the 1890s gave many young women in the United States new independence.`,
  `Which finding, if true, would most directly support Mensah's claim?`,
  [`Letters and diaries from the 1890s show young women using bicycles to travel to jobs, visit friends, and attend meetings without a chaperone.`, `Bicycle sales in the United States fell sharply after 1900.`, `Most bicycle manufacturers in the 1890s were owned by men.`, `Early bicycles were expensive and difficult to ride.`], 0,
  [`The claim links bicycles to young women's independence.`, `Women traveling on their own by bicycle is direct evidence.`], `Sales after 1900 are about the bicycle market, not women's independence.`);
R2('coe', 1, `${table('Average reading time (minutes per day)', ['Format', 'Ages 13–17', 'Ages 18–24'], [['Print books', '18', '22'], ['E-readers', '9', '15'], ['Audiobooks', '12', '20']])}A researcher found that in both age groups, readers spent more time with print books than with any other format, noting that among 18- to 24-year-olds, ______`,
  'table', [`audiobooks averaged 12 minutes a day.`, `e-readers averaged more time than audiobooks.`, `print books averaged 18 minutes a day.`, `print books averaged 22 minutes a day, compared with 15 for e-readers and 20 for audiobooks.`], 3,
  [`Use the 18–24 column only.`, `Print 22 beats e-readers 15 and audiobooks 20.`], `"18 minutes" and "12 minutes" come from the 13–17 column.`);
R2('inf', 2, `Several words in the English spoken in parts of Louisiana, such as "lagniappe" (a small extra gift), entered the language through French. Historical records show that much of the region was settled by French speakers in the 1700s. These facts suggest that ______`,
  'complete', [`French speakers in Louisiana adopted many English words.`, `the region's English vocabulary was likely influenced by the French spoken by early settlers.`, `English was spoken in Louisiana before French.`, `the word "lagniappe" is no longer used today.`], 1,
  [`French-derived words + French-speaking early settlers.`, `So local English likely picked up words from that French.`], `The first choice reverses the direction of borrowing.`);
R2('inf', 3, `Ecologists studying a rainforest found that areas that had been selectively logged, where only a few large trees were removed, still supported most of the bird species found in untouched forest. However, species that nest in tree hollows, which form mainly in very old trees, were largely missing from logged areas. If selective logging spreads across the region, ______`,
  'complete', [`all bird species in the region will decline at the same rate.`, `selective logging will increase the number of bird species.`, `hollow-nesting bird species may decline even if most other species remain.`, `hollow-nesting birds will move into younger trees.`], 2,
  [`Most species survive logging, but hollow nesters don't, because logging removes old trees.`, `More logging threatens hollow nesters in particular.`], `"Move into younger trees" assumes something the text doesn't say; hollows form mainly in old trees.`);
R2('bnd', 1, `The colorful murals painted along the canal ______ attract thousands of visitors each year.`,
  'conv', [`walls,`, `walls`, `walls;`, `walls:`], 1,
  [`"The colorful murals painted along the canal walls" is the subject; "attract" is its verb.`, `No punctuation goes between a subject and its verb.`], `A comma here would split the subject from its verb.`);
R2('bnd', 2, `<i>Brown Girl Dreaming</i>, a memoir in verse by Jacqueline ______ won the National Book Award for Young People's Literature in 2014.`,
  'conv', [`Woodson,`, `Woodson`, `Woodson;`, `Woodson, and`], 0,
  [`"A memoir in verse by Jacqueline Woodson" is extra information that opened with a comma.`, `Close it with a matching comma.`], `"Woodson, and" adds a conjunction that leaves the subject without a verb of its own.`);
R2('bnd', 3, `Most stars appear to twinkle when seen from ______ planets usually shine with a steadier light.`,
  'conv', [`Earth, however,`, `Earth however`, `Earth, however;`, `Earth; however,`], 3,
  [`"Most stars appear to twinkle when seen from Earth" and "planets usually shine..." are both complete sentences.`, `"However" starts the second: semicolon before it, comma after it.`], `Commas on both sides of "however" make a comma splice when it sits between two sentences.`);
R2('bnd', 2, `The beeps and whirs that make up the voice of the robot ______ were created by sound designer Ben Burtt.`,
  'conv', [`WALL-E,`, `WALL-E—`, `WALL-E;`, `WALL-E`], 3,
  [`"WALL-E" identifies which robot, so it's essential and takes no commas.`, `It's also followed by the verb "were created," and no punctuation goes before the verb.`], `A comma would separate the long subject from its verb.`);
R2('fss', 1, `In 2021, biologists ______ that some species of sea slug can regrow an entire body from a severed head.`,
  'conv', [`reported`, `reporting`, `to report`, `having reported`], 0,
  [`"Biologists" needs a main verb.`, `"Reported" is the only finite verb.`], `"Reporting" can't be the only verb in a sentence.`);
R2('fss', 2, `Archaeologists found dozens of bronze tools at the site and carefully cleaned ______ before sending them to the museum.`,
  'conv', [`it`, `this`, `that`, `them`], 3,
  [`The pronoun refers to "tools," which is plural.`, `Plural: "them" (which also matches "sending them").`], `"It," "this," and "that" are singular.`);
R2('fss', 2, `The frameworks that guide the city's recycling program ______ on research conducted at three local universities.`,
  'conv', [`is based`, `are based`, `was based`, `has been based`], 1,
  [`The subject is "frameworks," which is plural ("that guide..." describes them).`, `Plural verb: "are based."`], `"Is based" agrees with "program," which is not the subject.`);
R2('fss', 3, `Sculptor Ruth Asawa, ______ viewers to see the inside and the outside of her works at the same time, created hanging forms from looped wire that seem to float in space.`,
  'conv', [`who wants`, `she wanted`, `wanting`, `wants`], 2,
  [`The main verb is "created." The blank begins extra information between commas.`, `A participle, "wanting," forms that kind of phrase.`], `"Wants" would give the sentence a second main verb with no conjunction.`);
R2('tra', 1, `To make paper by hand, workers first soak plant fibers in water and beat them into a pulp. ______ they scoop the pulp onto a screen and press out the water.`,
  'trans', [`Next,`, `For example,`, `Similarly,`, `In contrast,`], 0,
  [`"First" begins a process; this is the following step.`, `"Next" signals the next step.`], `"For example" would make scooping an example of soaking, but it's a separate step.`);
R2('tra', 2, `In 2015, Leah Okoro won a regional poetry slam with a poem about her grandmother's journey from Lagos to Houston. ______ she founded a workshop that helps immigrant teenagers write and perform their own stories.`,
  'trans', [`Instead,`, `For example,`, `Four years later,`, `In other words,`], 2,
  [`The events happen at different times, one after the other.`, `"Four years later" places the second event in time.`], `"Instead" would mean she founded the workshop rather than winning, but she did both.`);
R2('tra', 3, `Researchers expected a new drought-resistant wheat to produce smaller harvests than ordinary wheat in years with normal rainfall. ______ in normal years the two varieties produced nearly identical harvests, while in dry years the new variety produced far more.`,
  'trans', [`Indeed,`, `As expected,`, `Surprisingly, though,`, `Likewise,`], 2,
  [`The expectation was smaller harvests; the result was identical harvests.`, `A result that defies an expectation: "Surprisingly, though."`], `"Indeed" would confirm the expectation, but the results contradict it.`);
R2('syn', 1, notes(`Cirrus clouds form high in the sky, above about 20,000 feet.`, `They are thin and wispy and made of ice crystals.`, `Cumulus clouds usually form lower, often below 6,500 feet.`, `They are puffy and made mostly of water droplets.`),
  goal(`contrast the heights at which the two types of clouds form`),
  [`Cirrus clouds are thin and wispy, while cumulus clouds are puffy.`, `Cumulus clouds are made mostly of water droplets.`, `Cirrus clouds form above about 20,000 feet.`, `Cirrus clouds form above about 20,000 feet, while cumulus clouds often form below 6,500 feet.`], 3,
  [`The goal is a contrast of height.`, `Only the last choice gives both heights.`], `The first choice is a contrast, but of appearance, not height.`);
R2('syn', 2, notes(`Ada Yonath is an Israeli scientist.`, `Venki Ramakrishnan is a British American scientist born in India.`, `Both studied the structure of the ribosome, the part of a cell that makes proteins.`, `They shared the 2009 Nobel Prize in Chemistry with Thomas Steitz.`),
  goal(`emphasize a similarity between Yonath and Ramakrishnan`),
  [`Ada Yonath is an Israeli scientist, and Venki Ramakrishnan was born in India.`, `Both Ada Yonath and Venki Ramakrishnan studied the structure of the ribosome, the part of a cell that makes proteins.`, `Thomas Steitz shared the 2009 Nobel Prize in Chemistry.`, `The ribosome is the part of a cell that makes proteins.`], 1,
  [`A similarity needs something both scientists share.`, `"Both... studied the structure of the ribosome."`], `The first choice gives a difference (their countries), not a similarity.`);
R2('syn', 3, notes(`Many desert animals avoid the daytime heat.`, `The fennec fox hunts at night.`, `The kangaroo rat stays in its burrow during the day.`, `The desert tortoise spends the hottest hours underground.`),
  goal(`make a generalization about how desert animals cope with heat`),
  [`The fennec fox hunts at night.`, `The desert tortoise spends the hottest hours underground, and the kangaroo rat stays in its burrow during the day.`, `Desert tortoises are one kind of desert animal.`, `Many desert animals, such as the fennec fox and the kangaroo rat, avoid the heat by being active at night or staying underground during the day.`], 3,
  [`A generalization speaks about many animals, not one.`, `The last choice makes the general claim and uses examples to support it.`], `The second choice lists two specific animals but never states a general pattern.`);

/* ============================== Math: Module 1 ============================== */
M1('linf', 1, `A book club had 45 members on the first day of the year, and 6 new members joined each week after that. How many members did the club have 5 weeks after the first day of the year?`, ['51', '56', '75', '300'], 2,
  [`New members: \\(6 \\times 5 = 30\\).`, `\\(45 + 30 = 75\\).`], `51 adds only one week's worth (6) of new members.`);
M1('sys', 1, `\\(r = 4\\)<br>\\(s + 6r = 31\\)<br>What is the solution \\((r, s)\\) to the system of equations above?`, ['\\((4, 7)\\)', '\\((7, 4)\\)', '\\((4, 31)\\)', '\\((4, 55)\\)'], 0,
  [`Substitute \\(r = 4\\): \\(s + 24 = 31\\).`, `\\(s = 7\\), so \\((r, s) = (4, 7)\\).`], `\\((7, 4)\\) lists the values in the wrong order; the question asks for \\((r, s)\\).`);
M1('linf', 1, `${table('', ['\\(x\\)', '1', '2', '3', '4'], [['\\(f(x)\\)', '7', '9', '11', '13']])}Which choice best describes the function \\(f\\)?`, ['Decreasing linear', 'Decreasing exponential', 'Increasing exponential', 'Increasing linear'], 3,
  [`As \\(x\\) goes up by 1, \\(f(x)\\) goes up by 2 every time.`, `A constant increase means increasing linear.`], `Exponential functions change by a constant percent, not a constant amount.`);
M1('one', 1, `The ages of the seven players on a team are 15, 17, 16, 18, 15, 19, and 16. What is the range of the ages?`, ['2', '3', '4', '19'], 2,
  [`Range = greatest − least.`, `\\(19 - 15 = 4\\).`], `19 is the greatest age, not the range.`);
M1('lat', 1, `Lines \\(p\\) and \\(q\\) intersect. One of the angles formed measures 128°, and the angle vertical to it measures \\(x°\\). What is the value of \\(x\\)?`, ['52', '64', '128', '232'], 2,
  [`Vertical angles are equal.`, `So \\(x = 128\\).`], `52 is the adjacent (supplementary) angle, not the vertical one.`);
M1('lin2', 1, `The equation \\(h + w = 40\\) represents the number of hours a student spends each week on homework, \\(h\\), and working at a part-time job, \\(w\\). If the student spends 14 hours on homework in a week, how many hours does the student spend working?`, ['14', '26', '40', '54'], 1,
  [`\\(14 + w = 40\\).`, `\\(w = 26\\).`], `54 adds 14 and 40 instead of subtracting.`);
M1('lin1', 1, `If \\(5x - 35 = 15\\), what is the value of \\(x - 7\\)?`, ['3', '10', '15', '50'], 0,
  [`Divide every term by 5: \\(x - 7 = 3\\).`, `That's exactly the expression asked for.`], `10 is \\(x\\), not \\(x - 7\\).`);
M1('samp', 2, `In a random sample of 25 students at a school of 1,200 students, 9 said they bike to school. Based on the sample, about how many students at the school bike to school?`, ['36', '432', '768', '1,191'], 1,
  [`Sample proportion: \\(\\frac{9}{25} = 0.36\\).`, `\\(0.36 \\times 1{,}200 = 432\\).`], `768 is the estimate for students who do NOT bike (64%).`);
M1('ineq', 2, `During a storm, the wind speed in a town ranged from a minimum of 12 miles per hour to a maximum of 45 miles per hour. Which inequality represents every wind speed \\(w\\), in miles per hour, recorded during the storm?`,
  ['\\(w \\le 12\\)', '\\(w \\ge 45\\)', '\\(12 \\le w \\le 45\\)', '\\(w \\le 12\\) or \\(w \\ge 45\\)'], 2,
  [`Every speed is at least the minimum (12) and at most the maximum (45).`, `So \\(12 \\le w \\le 45\\).`], `"\\(w \\le 12\\) or \\(w \\ge 45\\)" describes speeds outside the recorded range.`);
M1('nle', 1, `If \\(2x^2 = 72\\) and \\(x > 0\\), what is the value of \\(x\\)?`, ['6', '18', '36', '\\(6\\sqrt{2}\\)'], 0,
  [`Divide by 2: \\(x^2 = 36\\).`, `\\(x = 6\\).`], `36 is \\(x^2\\); take the square root.`);
M1('eqv', 2, `Which expression is equivalent to \\(4x(3x - 5) - 2x^2\\)?`, ['\\(10x^2 - 20x\\)', '\\(12x^2 - 22x\\)', '\\(10x^2 - 5x\\)', '\\(14x^2 - 20x\\)'], 0,
  [`Distribute: \\(12x^2 - 20x - 2x^2\\).`, `Combine like terms: \\(10x^2 - 20x\\).`], `\\(14x^2 - 20x\\) adds \\(2x^2\\) instead of subtracting it.`);
M1('nle', 2, `\\(y = 3x\\)<br>\\(y = x^2 - 10\\)<br>If \\((x, y)\\) is a solution to the system above and \\(x > 0\\), what is the value of \\(x\\)?`, ['2', '5', '10', '15'], 1,
  [`Set equal: \\(x^2 - 10 = 3x\\), so \\(x^2 - 3x - 10 = 0\\).`, `\\((x - 5)(x + 2) = 0\\). Since \\(x > 0\\), \\(x = 5\\).`], `15 is the value of \\(y\\) when \\(x = 5\\).`,
  { desmos: ['y=3x', 'y=x^2-10'] });
M1('lin2', 2, `A movie theater sells small and large bags of popcorn. The equation \\(4.25x + 6.50y = 382.75\\) represents the theater's popcorn sales, in dollars, on Friday, where \\(x\\) is the number of small bags sold and \\(y\\) is the number of large bags sold. What is the price, in dollars, of one large bag?`, ['$382.75', '$10.75', '$4.25', '$6.50'], 3,
  [`\\(6.50y\\) is the money from large bags, so each large bag costs $6.50.`, `The coefficient of \\(y\\) is the price per large bag.`], `$4.25 is the price of a small bag (the coefficient of \\(x\\)).`);
M1('area', 2, `A right circular cylinder has a diameter of 14 centimeters and a height of 5 centimeters. What is the volume of the cylinder, in cubic centimeters?`, ['\\(35\\pi\\)', '\\(70\\pi\\)', '\\(245\\pi\\)', '\\(980\\pi\\)'], 2,
  [`Radius = half the diameter = 7.`, `\\(V = \\pi(7)^2(5) = 245\\pi\\).`], `\\(980\\pi\\) uses the diameter, 14, as the radius.`);
M1('nlf', 2, `The function \\(f\\) is defined by \\(f(x) = x^2 - 2x\\). The graph of \\(y = f(x) + 5\\) passes through which of the following points?`, ['\\((3, 3)\\)', '\\((3, 8)\\)', '\\((8, 3)\\)', '\\((3, -2)\\)'], 1,
  [`\\(f(3) = 9 - 6 = 3\\).`, `\\(f(3) + 5 = 8\\), so the point is \\((3, 8)\\).`], `\\((3, 3)\\) is on the graph of \\(f\\) itself, before the shift up by 5.`);
M1('rat', 2, `At a summer camp, the ratio of counselors to campers is 1 to 12. If there are \\(c\\) counselors, which expression represents the number of campers?`, ['\\(\\frac{c}{12}\\)', '\\(c + 12\\)', '\\(\\frac{12}{c}\\)', '\\(12c\\)'], 3,
  [`Each counselor goes with 12 campers.`, `\\(c\\) counselors go with \\(12c\\) campers.`], `\\(\\frac{c}{12}\\) gets the ratio upside down: there are more campers than counselors.`);
M1('lin2', 2, `Dev bought \\(y\\) feet of rope to make \\(x\\) dog leashes. The equation \\(y - 6x = 10\\) represents this situation. Which is the best interpretation of 10 in this context?`,
  ['Dev made 10 leashes.', 'Dev bought a total of 10 feet of rope.', 'Each leash uses 10 feet of rope.', 'Dev bought 10 more feet of rope than he used to make the leashes.'], 3,
  [`Rewrite: \\(y = 6x + 10\\). Each leash uses 6 feet, so \\(6x\\) is the rope used.`, `The total bought is 10 feet more than the rope used.`], `Each leash uses 6 feet (the coefficient of \\(x\\)), not 10.`);
M1('nlf', 2, `A right rectangular prism has a height of 6 inches. The length of its base is \\(x\\) inches, which is 4 inches more than the width of its base. Which function \\(V\\) gives the volume of the prism, in cubic inches?`,
  ['\\(V(x) = 6x(x - 4)\\)', '\\(V(x) = 6x(x + 4)\\)', '\\(V(x) = x(x - 4)(x + 6)\\)', '\\(V(x) = 4x(x - 6)\\)'], 0,
  [`Length \\(x\\), width \\(x - 4\\) (the length is 4 more than the width), height 6.`, `\\(V = x(x - 4)(6) = 6x(x - 4)\\).`], `\\(6x(x + 4)\\) makes the width 4 more than the length, the reverse of what's given.`);
M1('pct', 2, `Increasing a number \\(x\\) by 300% gives 96. What is the value of \\(x\\)?`, ['24', '32', '288', '384'], 0,
  [`An increase of 300% multiplies by \\(1 + 3 = 4\\): \\(4x = 96\\).`, `\\(x = 24\\).`], `32 treats "increasing by 300%" as tripling. Increasing by 300% adds 3 times the number to itself.`);
M1('nlf', 3, `The function \\(g\\) is defined by \\(g(x) = (x + 12)(t - x)\\), where \\(t\\) is a constant. The graph of \\(y = g(x)\\) passes through the point \\((20, 0)\\). What is the value of \\(g(0)\\)?`, ['−240', '20', '32', '240'], 3,
  [`\\(g(20) = 0\\) and \\(20 + 12 \\ne 0\\), so \\(t - 20 = 0\\): \\(t = 20\\).`, `\\(g(0) = (12)(20) = 240\\).`], `−240 comes from flipping \\((t - x)\\) to \\((x - t)\\).`);
M1('circ', 3, `The equation \\((x + 3)^2 + (y - 8)^2 = 100\\) defines a circle in the xy-plane. Which of the following could be the x-coordinate of a point on the circle?`, ['−14', '−12', '8', '13'], 1,
  [`Center \\((-3, 8)\\), radius 10.`, `x-coordinates on the circle run from \\(-3 - 10 = -13\\) to \\(-3 + 10 = 7\\). Only −12 is in that range.`], `13 uses a center at \\(x = 3\\). The \\((x + 3)\\) means the center is at \\(x = -3\\).`);
M1('nle', 3, `The function \\(g\\) is defined by \\(g(x) = (x - 1)(x + 3)(x - 6)^2\\). If \\(g(5 - w) = 0\\), where \\(w\\) is a constant, what is the sum of all possible values of \\(w\\)?`, ['3', '4', '11', '16'], 2,
  [`\\(g = 0\\) when the input is 1, −3, or 6. So \\(5 - w = 1\\), \\(-3\\), or 6.`, `\\(w = 4\\), 8, or −1. Sum: \\(4 + 8 - 1 = 11\\).`], `4 is the sum of the zeros of \\(g\\) (1 − 3 + 6), not of the values of \\(w\\).`);

/* ============================ Math: Module 2 pool ============================ */
M2('pct', 1, `What is 15% of 360?`, ['24', '36', '54', '306'], 2,
  [`\\(0.15 \\times 360\\).`, `\\(= 54\\).`], `36 is 10% of 360.`);
M2('linf', 1, `${table('Temperature of a cup of tea', ['Minutes after pouring, \\(t\\)', '0', '5', '10', '15'], [['Temperature (°F)', '180', '165', '150', '135']])}The temperature of the tea decreases at a constant rate. By how many degrees does it decrease each minute?`, ['3', '5', '15', '30'], 0,
  [`Every 5 minutes, the temperature drops 15 degrees.`, `\\(15 \\div 5 = 3\\) degrees per minute.`], `15 is the drop every 5 minutes, not every minute.`);
M2('linf', 1, `The function \\(f\\) is defined by \\(f(x) = 6x - 8\\). What is the value of \\(f(10)\\)?`, ['2', '52', '60', '68'], 1,
  [`\\(6(10) - 8\\).`, `\\(= 52\\).`], `68 adds 8 instead of subtracting it.`);
M2('eqv', 1, `Which expression is equivalent to \\(12a^2b + 18ab\\)?`, ['\\(6ab(2a + 3)\\)', '\\(6a(2ab + 3)\\)', '\\(3ab(4a + 3)\\)', '\\(6ab(2a + 18)\\)'], 0,
  [`The greatest common factor is \\(6ab\\).`, `\\(12a^2b \\div 6ab = 2a\\) and \\(18ab \\div 6ab = 3\\).`], `\\(6a(2ab + 3) = 12a^2b + 18a\\); the \\(b\\) is missing from the second term.`);
M2('linf', 1, `A plant is 4 inches tall and grows 1.5 inches each week. Which equation gives the plant's height \\(h\\), in inches, after \\(w\\) weeks?`, ['\\(h = 1.5 + 4w\\)', '\\(h = 5.5w\\)', '\\(h = 4 + 1.5w\\)', '\\(h = 4w - 1.5\\)'], 2,
  [`Start: 4 inches. Growth: 1.5 per week.`, `\\(h = 4 + 1.5w\\).`], `\\(1.5 + 4w\\) swaps the starting height and the weekly growth.`);
M2('lin1', 1, `If \\(7n = 21\\), what is the value of \\(n + 9\\)?`, ['3', '12', '21', '30'], 1,
  [`\\(n = 3\\).`, `\\(3 + 9 = 12\\).`], `3 is \\(n\\), not \\(n + 9\\).`);
M2('nle', 2, `Which of the following is a solution to \\(k^2 - 3 = 397\\)?`, ['−20', '133', '197', '400'], 0,
  [`Add 3: \\(k^2 = 400\\).`, `\\(k = 20\\) or \\(k = -20\\). Only −20 is a choice.`], `400 is \\(k^2\\), not \\(k\\).`);
M2('lin2', 1, `Line \\(r\\) in the xy-plane has a slope of −2 and passes through the point \\((0, 9)\\). Which equation defines line \\(r\\)?`, ['\\(y = 9x - 2\\)', '\\(y = 2x + 9\\)', '\\(y = -2x - 9\\)', '\\(y = -2x + 9\\)'], 3,
  [`\\((0, 9)\\) is the y-intercept, so \\(b = 9\\).`, `With slope −2: \\(y = -2x + 9\\).`], `\\(y = 9x - 2\\) swaps the slope and the intercept.`);
M2('nlf', 2, `The function \\(h(t) = -16t^2 + 64\\) gives the height, in feet, of a ball \\(t\\) seconds after it is dropped from a ledge. Which is the best interpretation of the positive \\(t\\)-intercept of the graph of \\(h\\)?`,
  ['The ball hits the ground 2 seconds after it is dropped.', 'The ball is dropped from a height of 2 feet.', 'The ball reaches its maximum height after 2 seconds.', 'The ball hits the ground 64 seconds after it is dropped.'], 0,
  [`At the \\(t\\)-intercept, height is 0: \\(-16t^2 + 64 = 0\\), so \\(t^2 = 4\\), \\(t = 2\\).`, `Height 0 means the ball is on the ground, at 2 seconds.`], `64 feet is the starting height (the h-intercept), not a time.`);
M2('nlf', 2, `The function \\(E(v) = 2v^2\\) gives the kinetic energy, in joules, of a 4-kilogram object moving at \\(v\\) meters per second. Which is the best interpretation of \\(E(15) = 450\\)?`,
  ['An object moving at 450 meters per second has 15 joules of kinetic energy.', 'An object moving at 15 meters per second has 450 joules of kinetic energy.', 'An object with a mass of 15 kilograms has 450 joules of kinetic energy.', 'An object gains 450 joules of kinetic energy for every 15 meters per second of speed.'], 1,
  [`The input, 15, is the speed \\(v\\). The output, 450, is the energy.`, `So at 15 m/s the energy is 450 joules.`], `The first choice swaps the input and the output.`);
M2('two', 2, `A line of best fit for a data set is \\(y = 2x + 5\\). For which of the following data points is the actual \\(y\\)-value greater than the \\(y\\)-value predicted by the line?`, ['\\((1, 6)\\)', '\\((4, 12)\\)', '\\((6, 17)\\)', '\\((3, 13)\\)'], 3,
  [`Predictions: \\(x = 1 \\to 7\\), \\(x = 4 \\to 13\\), \\(x = 6 \\to 17\\), \\(x = 3 \\to 11\\).`, `Only \\((3, 13)\\) has an actual value (13) above its prediction (11).`], `\\((6, 17)\\) lands exactly on the line, so its actual value equals the prediction.`);
M2('prob', 2, `A movie theater has 400 customers, each in theater A, B, or C. If a customer is selected at random, the probability that the customer is in theater A is 0.35, and the probability that the customer is in theater B is 0.25. How many customers are in theater C?`, ['0.40', '100', '140', '160'], 3,
  [`Theater A: \\(0.35 \\times 400 = 140\\). Theater B: \\(0.25 \\times 400 = 100\\).`, `Theater C: \\(400 - 140 - 100 = 160\\).`], `0.40 is the probability of theater C, not the number of customers.`);
M2('lin2', 2, `What is the slope of the graph of \\(y = \\frac{1}{4}(12x + 8) + 2x\\) in the xy-plane?`, ['2', '3', '5', '14'], 2,
  [`Distribute: \\(y = 3x + 2 + 2x\\).`, `Combine: \\(y = 5x + 2\\). The slope is 5.`], `3 forgets to add the \\(2x\\) at the end.`);
M2('area', 2, `An open box (with no lid) is shaped like a cube with edge length 12 inches. What is the exterior surface area of the box, in square inches?`, ['144', '576', '720', '864'], 2,
  [`A cube has 6 faces; with no lid, the box has 5.`, `\\(5 \\times 12^2 = 5 \\times 144 = 720\\).`], `864 counts all 6 faces, including the missing lid.`);
M2('one', 2, `A data set has six values: 140, 152, 147, 160, 155, and 150. A seventh value, 98, is added. Which statement about the new data set is true?`,
  ['The mean decreases, and the median decreases.', 'The mean decreases, and the median stays the same.', 'The mean increases, and the median stays the same.', 'Neither the mean nor the median changes.'], 0,
  [`98 is far below the other values, so the mean drops a lot.`, `Old median: \\((150 + 152) \\div 2 = 151\\). New median (4th of 7): 150. It drops slightly.`], `The median moves only a little, but it does move: from 151 to 150.`);
M2('lat', 2, `In triangle \\(RST\\), angle \\(R\\) measures 71°. Which of the following could be the measure of angle \\(S\\)?`, ['108°', '109°', '118°', '180°'], 0,
  [`\\(S + T = 180 - 71 = 109\\), and \\(T\\) must be more than 0.`, `So \\(S < 109\\). Only 108° works.`], `109° would leave 0° for angle \\(T\\), which isn't possible.`);
M2('eqv', 2, `Which expression is equivalent to \\((6x^3 + 5) - (x^3 - 4)\\)?`, ['\\(5x^3 + 1\\)', '\\(5x^3 + 9\\)', '\\(7x^3 + 9\\)', '\\(5x^3 - 9\\)'], 1,
  [`Distribute the minus sign: \\(6x^3 + 5 - x^3 + 4\\).`, `Combine: \\(5x^3 + 9\\).`], `\\(5x^3 + 1\\) forgets that subtracting −4 adds 4.`);
M2('nle', 2, `If \\(5\\sqrt{3x} = 30\\), what is the value of \\(9x\\)?`, ['12', '36', '108', '324'], 2,
  [`Divide by 5: \\(\\sqrt{3x} = 6\\). Square: \\(3x = 36\\).`, `Multiply by 3: \\(9x = 108\\).`], `36 is \\(3x\\), one step short.`);
M2('ineq', 2, `Which point \\((x, y)\\) is a solution to the inequality \\(3x - y > 20\\)?`, ['\\((5, -4)\\)', '\\((8, 5)\\)', '\\((6, -2)\\)', '\\((7, 0)\\)'], 3,
  [`Test \\((7, 0)\\): \\(21 - 0 = 21 > 20\\) ✓.`, `\\((5, -4)\\): 19. \\((8, 5)\\): 19. \\((6, -2)\\): 20, which is not greater than 20.`], `\\((6, -2)\\) gives exactly 20, but the inequality is strict.`);
M2('sys', 2, `\\(2x + 5y = 14\\)<br>\\(4x - 5y = 4\\)<br>If \\((x, y)\\) is the solution to the system above, what is the value of \\(9x\\)?`, ['3', '18', '27', '54'], 2,
  [`Add the equations: \\(6x = 18\\), so \\(x = 3\\).`, `\\(9x = 27\\).`], `3 is \\(x\\), and 18 is \\(6x\\).`);
M2('circ', 3, `Each vertex of a rectangle lies on a circle. The rectangle's diagonal is twice the length of its shortest side, and the rectangle's area is \\(100\\sqrt{3}\\) square units. What is the length of the circle's diameter, in units?`, ['10', '\\(10\\sqrt{3}\\)', '20', '\\(20\\sqrt{3}\\)'], 2,
  [`Let the short side be \\(s\\); the diagonal is \\(2s\\), so the long side is \\(\\sqrt{4s^2 - s^2} = s\\sqrt{3}\\). Area: \\(s^2\\sqrt{3} = 100\\sqrt{3}\\), so \\(s = 10\\).`, `The diagonal of an inscribed rectangle is a diameter: \\(2s = 20\\).`], `\\(10\\sqrt{3}\\) is the rectangle's long side, not the diagonal.`);
M2('area', 2, `Rectangle \\(WXYZ\\) has an area of 45 square units. Each side of rectangle \\(JKLM\\) is 3 times the length of the corresponding side of \\(WXYZ\\). What is the area of \\(JKLM\\), in square units?`, ['135', '405', '1,215', '3,645'], 1,
  [`Scaling lengths by 3 scales area by \\(3^2 = 9\\).`, `\\(45 \\times 9 = 405\\).`], `135 multiplies the area by 3, but both the length and the width triple.`);
M2('eqv', 3, `Which expression is equivalent to \\(\\frac{30b}{m} + 30bm\\), where \\(m > 0\\)?`, ['\\(\\frac{30b(m^2 + 1)}{m}\\)', '\\(\\frac{30b(m + 1)}{m}\\)', '\\(\\frac{60bm}{m}\\)', '\\(\\frac{30b + 30bm}{m}\\)'], 0,
  [`Common denominator: \\(30bm = \\frac{30bm^2}{m}\\).`, `\\(\\frac{30b + 30bm^2}{m} = \\frac{30b(1 + m^2)}{m}\\).`], `\\(\\frac{30b + 30bm}{m}\\) puts \\(30bm\\) over \\(m\\) without multiplying it by \\(m\\) first.`);
M2('nle', 2, `Which of the following equations has no real solutions?`, ['\\(x^2 - 6x + 9 = 0\\)', '\\(2x^2 - 8 = 0\\)', '\\(x^2 + 4x - 5 = 0\\)', '\\(3x^2 - 6x + 7 = 0\\)'], 3,
  [`Check \\(b^2 - 4ac\\): 0, 64, 36, and \\(36 - 84 = -48\\).`, `Only the last discriminant is negative.`], `\\(x^2 - 6x + 9\\) has discriminant 0, which means exactly one solution, not none.`);
M2('nlf', 3, `The function \\(P(t) = 820(1.06)^{\\frac{4t}{3}}\\) models the population of a town \\(t\\) years after 2010. According to the model, the population increases by 6% every \\(n\\) months. What is the value of \\(n\\)?`, ['3', '4', '9', '16'], 2,
  [`The population grows 6% each time the exponent increases by 1: \\(\\frac{4t}{3} = 1\\) when \\(t = \\frac{3}{4}\\) year.`, `\\(\\frac{3}{4} \\times 12 = 9\\) months.`], `16 multiplies 12 by \\(\\frac{4}{3}\\) instead of \\(\\frac{3}{4}\\).`);
M2('circ', 3, `A circle in the xy-plane has its center at \\((2, -3)\\). Line \\(\\ell\\) is tangent to the circle at the point \\((6, 0)\\). Which of the following points lies on line \\(\\ell\\)?`, ['\\((0, 6)\\)', '\\((3, 4)\\)', '\\((9, 4)\\)', '\\((10, 3)\\)'], 1,
  [`The radius to \\((6, 0)\\) has slope \\(\\frac{0 - (-3)}{6 - 2} = \\frac{3}{4}\\). A tangent is perpendicular to it: slope \\(-\\frac{4}{3}\\).`, `Line: \\(y = -\\frac{4}{3}(x - 6)\\). At \\(x = 3\\): \\(y = 4\\). ✓`], `\\((9, 4)\\) lies on a line with slope \\(\\frac{4}{3}\\), which flips the reciprocal but forgets the negative sign.`,
  { desmos: ['y=-\\frac{4}{3}(x-6)'] });
M2('area', 3, `A flat surface is made of two squares placed side by side. The side length of the larger square is 2 times the side length of the smaller square, and the total area of the surface is 180 square meters. Light shines evenly on the surface with a power of 12 watts per square meter. How many watts of light strike the larger square?`, ['432', '1,440', '1,728', '2,160'], 2,
  [`If the small square's area is \\(x\\), the large one's is \\(4x\\): \\(5x = 180\\), so \\(x = 36\\) and the large area is 144.`, `\\(144 \\times 12 = 1{,}728\\) watts.`], `2,160 is the light on the whole surface (\\(180 \\times 12\\)), not just the larger square.`);
M2('nlf', 3, `\\(f(x) = -3(2)^x + 10\\)<br>\\(g(x) = -5(1.5)^x + 4\\)<br>Which of the functions above has a minimum value?`, ['\\(f\\) only', '\\(g\\) only', 'Both \\(f\\) and \\(g\\)', 'Neither \\(f\\) nor \\(g\\)'], 3,
  [`Each is a negative number times a growing exponential, so each keeps decreasing as \\(x\\) increases.`, `A function that decreases without end has no minimum.`], `As \\(x\\) decreases, the functions level off near 10 and 4, but those are upper limits, not minimums.`);

export const TEST2 = list;
