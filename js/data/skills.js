/**
 * skills.js: the eight Digital SAT skill domains (College Board's official groups).
 * Every question is tagged with one of these, which is how Progress and the
 * study calendar know your weakest areas.
 */
export const SECTION_LABEL = { math: 'Math', rw: 'Reading & Writing' };

export const SKILLS = {
  algebra:             { label: 'Algebra',                       section: 'math' },
  advanced_math:       { label: 'Advanced Math',                 section: 'math' },
  problem_solving:     { label: 'Problem-Solving & Data',        section: 'math' },
  geometry_trig:       { label: 'Geometry & Trigonometry',       section: 'math' },
  information_ideas:   { label: 'Information & Ideas',           section: 'rw' },
  craft_structure:     { label: 'Craft & Structure',             section: 'rw' },
  expression_of_ideas: { label: 'Expression of Ideas',           section: 'rw' },
  standard_english:    { label: 'Standard English Conventions',  section: 'rw' },
};

export const skillsIn = (section) => Object.keys(SKILLS).filter((key) => SKILLS[key].section === section);

export const DIFFICULTY_LABEL = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
