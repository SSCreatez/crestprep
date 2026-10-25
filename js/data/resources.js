/**
 * resources.js: "Saransh personally recommends!" on every weak spot of a breakdown.
 *
 * For now each skill opens a YouTube search for its topic, so students land on
 * the most-watched walkthroughs (PrepPros, Scalar Learning, and others with real
 * traction). To swap in a specific video later, paste its link into `video` and
 * its name into `videoTitle`; a filled-in `video` always wins over the search.
 * `tip` is an optional one-liner in your own words.
 */
export const RESOURCES = {
  // Information and Ideas
  'central-ideas-and-details': { search: 'digital SAT central ideas and details', video: '', videoTitle: '', tip: '' },
  'command-of-evidence': { search: 'digital SAT command of evidence textual quantitative', video: '', videoTitle: '', tip: '' },
  'inferences': { search: 'digital SAT inferences questions', video: '', videoTitle: '', tip: '' },
  // Craft and Structure
  'words-in-context': { search: 'digital SAT words in context strategy', video: '', videoTitle: '', tip: '' },
  'text-structure-and-purpose': { search: 'digital SAT text structure and purpose', video: '', videoTitle: '', tip: '' },
  'cross-text-connections': { search: 'digital SAT cross-text connections', video: '', videoTitle: '', tip: '' },
  // Expression of Ideas
  'rhetorical-synthesis': { search: 'digital SAT rhetorical synthesis notes questions', video: '', videoTitle: '', tip: '' },
  'transitions': { search: 'digital SAT transitions questions', video: '', videoTitle: '', tip: '' },
  // Standard English Conventions
  'boundaries': { search: 'digital SAT boundaries punctuation semicolon colon', video: '', videoTitle: '', tip: '' },
  'form-structure-and-sense': { search: 'digital SAT form structure and sense grammar', video: '', videoTitle: '', tip: '' },
  // Algebra
  'linear-equations-in-one-variable': { search: 'digital SAT linear equations in one variable', video: '', videoTitle: '', tip: '' },
  'linear-functions': { search: 'digital SAT linear functions', video: '', videoTitle: '', tip: '' },
  'linear-equations-in-two-variables': { search: 'digital SAT linear equations in two variables', video: '', videoTitle: '', tip: '' },
  'systems-of-two-linear-equations-in-two-variables': { search: 'digital SAT systems of linear equations', video: '', videoTitle: '', tip: '' },
  'linear-inequalities-in-one-or-two-variables': { search: 'digital SAT linear inequalities', video: '', videoTitle: '', tip: '' },
  // Advanced Math
  'nonlinear-functions': { search: 'digital SAT nonlinear functions quadratics exponentials', video: '', videoTitle: '', tip: '' },
  'nonlinear-equations-in-one-variable-and-systems-of-equations-in-two-variables': { search: 'digital SAT nonlinear equations and systems', video: '', videoTitle: '', tip: '' },
  'equivalent-expressions': { search: 'digital SAT equivalent expressions', video: '', videoTitle: '', tip: '' },
  // Problem-Solving and Data Analysis
  'ratios-rates-proportional-relationships-and-units': { search: 'digital SAT ratios rates proportions units', video: '', videoTitle: '', tip: '' },
  'percentages': { search: 'digital SAT percentages', video: '', videoTitle: '', tip: '' },
  'one-variable-data-distributions-and-measures-of-center-and-spread': { search: 'digital SAT mean median standard deviation', video: '', videoTitle: '', tip: '' },
  'two-variable-data-models-and-scatterplots': { search: 'digital SAT scatterplots line of best fit', video: '', videoTitle: '', tip: '' },
  'probability-and-conditional-probability': { search: 'digital SAT probability conditional probability', video: '', videoTitle: '', tip: '' },
  'inference-from-sample-statistics-and-margin-of-error': { search: 'digital SAT margin of error sample statistics', video: '', videoTitle: '', tip: '' },
  'evaluating-statistical-claims-observational-studies-and-experiments': { search: 'digital SAT observational studies experiments', video: '', videoTitle: '', tip: '' },
  // Geometry and Trigonometry
  'area-and-volume': { search: 'digital SAT area and volume', video: '', videoTitle: '', tip: '' },
  'lines-angles-and-triangles': { search: 'digital SAT lines angles triangles', video: '', videoTitle: '', tip: '' },
  'right-triangles-and-trigonometry': { search: 'digital SAT right triangles trigonometry', video: '', videoTitle: '', tip: '' },
  'circles': { search: 'digital SAT circles equation', video: '', videoTitle: '', tip: '' },
};

/** The link to show: a specific video if one is saved, otherwise a YouTube search for the topic. */
export function videoFor(skill) {
  const mine = RESOURCES[skill.id] || {};
  if (mine.video) return { url: mine.video, title: mine.videoTitle || `Watch: ${skill.name}`, isSearch: false };
  const query = mine.search || `digital SAT ${skill.name}`;
  return { url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, title: `Top YouTube walkthroughs for ${skill.name}`, isSearch: true };
}
