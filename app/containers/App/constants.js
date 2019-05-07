/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_DATA_IF_NEEDED = 'hrmi/App/LOAD_DATA_IF_NEEDED';
export const LOAD_DATA_SUCCESS = 'hrmi/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'hrmi/App/LOAD_DATA_ERROR';
export const DATA_REQUESTED = 'hrmi/App/DATA_REQUESTED';
export const DATA_READY = 'hrmi/App/DATA_READY';
export const SELECT_COUNTRY = 'hrmi/App/SELECT_COUNTRY';

// URLs for external resources loaded on request
export const DATA_URL = '//hrmi-dataportal-data.unfolddata.com/data';
export const PAGES_URL = '//hrmi-dataportal-content.unfolddata.com/';

// countries: country lookup table
// esrIndicators: ESR indicator lookup table
// atRisk: CPR survey people at risk data
// auxIndicators: auciliary indicators
// cprScores: CPR survey intensity data
// esrScores: ESR aggregate scores
// esrIndicatorScores: ESR indicator scores
// esrIndicatorsRaw: ESR indicator raw data
export const DATA_RESOURCES = [
  {
    key: 'countries',
    file: 'countries.csv',
  },
  {
    key: 'esrIndicators',
    file: 'esr-indicators.csv',
  },
  {
    key: 'atRisk',
    file: 'people-at-risk.csv',
  },
  {
    key: 'auxIndicators',
    file: 'auxiliary-indicators.csv',
  },
  {
    key: 'cprScores',
    file: 'cpr-scores.csv',
  },
  {
    key: 'esrScores',
    file: 'esr-scores.csv',
  },
  {
    key: 'esrIndicatorScores',
    file: 'esr-indicator-scores.csv',
  },
];

export const PAGES = [
  {
    key: 'about',
    file: 'about.html',
  },
  {
    key: 'methodology',
    file: 'methodology.html',
  },
];

export const REGIONS = [
  'americas',
  'east-asia-pacific',
  'europe-central-asia',
  'middle-east-north-africa',
  'south-asia',
  'sub-saharan-africa',
];

export const METRIC_TYPES = ['cpr', 'esr'];

// d: dimensions, r: rights
export const SCALES = ['d', 'r'];

export const DIMENSIONS = [
  {
    key: 'esr',
    code: 'SER_Average',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'empowerment',
    code: 'empower',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'physint',
    code: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
];

export const RIGHTS = [
  {
    key: 'arrest',
    code: 'arrest',
    dimension: 'physint',
    resource: 'cprScores',
  },
  {
    key: 'assembly',
    code: 'assem',
    dimension: 'empowerment',
    resource: 'cprScores',
  },
  {
    key: 'disappearance',
    code: 'disap',
    dimension: 'physint',
    resource: 'cprScores',
  },
  {
    key: 'death-penalty',
    code: 'dpex',
    dimension: 'physint',
    resource: 'cprScores',
    aggregate: 'execution',
  },
  {
    key: 'execution',
    code: 'execution',
    dimension: 'physint',
    resource: 'cprScores',
  },
  {
    key: 'extrajud-killing',
    code: 'exkill',
    dimension: 'physint',
    resource: 'cprScores',
    aggregate: 'execution',
  },
  {
    key: 'expression',
    code: 'express',
    dimension: 'empowerment',
    resource: 'cprScores',
  },
  {
    key: 'participation',
    code: 'polpart',
    dimension: 'empowerment',
    resource: 'cprScores',
  },
  {
    key: 'torture',
    code: 'tort',
    dimension: 'physint',
    resource: 'cprScores',
  },
  {
    key: 'education',
    code: 'Education',
    dimension: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'food',
    code: 'Food',
    dimension: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'health',
    code: 'Health',
    dimension: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'housing',
    code: 'Housing',
    dimension: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'work',
    code: 'Work',
    dimension: 'esr',
    resource: 'esrScores',
  },
];

export const INDICATORS = [
  {
    key: 'net-primary',
    code: 'AdjNetPrim',
    right: 'education',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'sec-enrol',
    code: 'NetSecEnrol',
    right: 'education',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'pisa-science',
    code: 'PISAscience',
    right: 'education',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'pisa-math',
    code: 'PISAmath',
    right: 'education',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'pisa-reading',
    code: 'PISAreading',
    right: 'education',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'not-stunted',
    code: 'NotStunted',
    right: 'food',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'food-security',
    code: 'FoodSecure',
    right: 'food',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'survival-65',
    code: 'SurvivalTo65',
    right: 'health',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'under-5-survival',
    code: 'U5Survival',
    right: 'health',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'contraception',
    code: 'Contraception',
    right: 'health',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'birth-weight',
    code: 'NotLowBirWt',
    right: 'health',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'water-in-home',
    code: 'WaterInHome',
    right: 'housing',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'basic-sanitation',
    code: 'BasicSanitation',
    right: 'housing',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'safe-sanitation',
    code: 'SafeSanitation',
    right: 'housing',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'affordable-housing',
    code: 'AffordableHousing',
    right: 'housing',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'relative-poverty',
    code: 'NotRelPoor',
    right: 'work',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'absolute-poverty',
    code: 'NotAbsPoor',
    right: 'work',
    resource: 'esrIndicatorScores',
  },
  {
    key: 'longterm-unemployment',
    code: 'NotLTunemployed',
    right: 'work',
    resource: 'esrIndicatorScores',
  },
];

export const STANDARDS = [
  {
    key: 'core',
    code: 'Core',
  },
  {
    key: 'hi',
    code: 'HiY',
  },
];

export const BENCHMARKS = [
  {
    key: 'adjusted',
    column: 'score_wrt_immediate_duty',
  },
  {
    key: 'best',
    column: 'score_wrt_global_best',
  },
];
