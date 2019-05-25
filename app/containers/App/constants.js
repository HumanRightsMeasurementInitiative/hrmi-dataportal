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

// loading actions
export const LOAD_DATA_IF_NEEDED = 'hrmi/App/LOAD_DATA_IF_NEEDED';
export const LOAD_DATA_SUCCESS = 'hrmi/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'hrmi/App/LOAD_DATA_ERROR';
export const DATA_READY = 'hrmi/App/DATA_READY';
export const LOAD_CONTENT_IF_NEEDED = 'hrmi/App/LOAD_CONTENT_IF_NEEDED';
export const LOAD_CONTENT_SUCCESS = 'hrmi/App/LOAD_CONTENT_SUCCESS';
export const LOAD_CONTENT_ERROR = 'hrmi/App/LOAD_CONTENT_ERROR';
export const CONTENT_READY = 'hrmi/App/CONTENT_READY';

// navigation actions
export const SELECT_COUNTRY = 'hrmi/App/SELECT_COUNTRY';
export const SELECT_METRIC = 'hrmi/App/SELECT_METRIC';
export const NAVIGATE = 'hrmi/App/NAVIGATE';
export const SET_SCALE = 'hrmi/App/SET_SCALE';
export const SET_STANDARD = 'hrmi/App/SET_STANDARD';
export const SET_BENCHMARK = 'hrmi/App/SET_BENCHMARK';
export const SET_TAB = 'hrmi/App/SET_TAB';
export const SET_MODALTAB = 'hrmi/App/SET_MODALTAB';

export const COLUMNS = {
  CPR: {
    MEAN: 'mean',
    LO: 'lobound_10',
    HI: 'upbound_90',
  },
  ESR: {
    SCORE_ADJUSTED: 'score_wrt_immediate_duty',
    SCORE_BEST: 'score_wrt_global_best',
    SCORE_DUTY_BEST: 'average_immediate_duty_wrt_global_best',
    INDICATOR_SCORE_DUTY_BEST: 'immediate_duty_wrt_global_best',
    PENALTY: 'penalty',
    RAW: 'value',
    RAW_REF: 'immediate_duty',
    RAW_REF_MIN: 'natural_minimum',
    RAW_REF_BEST: 'global_best_all',
    RAW_REF_BEST_MALE: 'global_best_male',
    RAW_REF_BEST_FEMALE: 'global_best_female',
  },
  AUX: {
    POPULATION: 'population',
    GDP: 'gdp_per_capita_2011ppp',
  },
  COUNTRIES: {
    HIGH_INCOME: 'high_income_country',
    OECD: 'OECD_country',
    REGION: 'region_code',
  },
};

export const LANGUAGES = {
  short: {
    en: 'EN',
    es: 'ES',
    pt: 'PT',
    fr: 'FR',
  },
  long: {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
  },
};

// URLs for external resources loaded on request
export const DATA_URL = '//hrmi-dataportal-data.unfolddata.com/data';
export const PAGES_URL = '//hrmi-dataportal-content.unfolddata.com/';

export const PAGES = ['about', 'methodology'];

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

// export const COUNTRY_SORTS = ['name', 'score', 'assessment'];
export const COUNTRY_SORTS = {
  name: {
    order: 'asc',
  },
  score: {
    order: 'desc',
  },
  assessment: {
    order: 'desc',
  },
};

export const REGIONS = [
  'americas',
  'east-asia-pacific',
  'europe-central-asia',
  'middle-east-north-africa',
  'south-asia',
  'sub-saharan-africa',
];

export const ASSESSED_FILTERS = ['all', 'cpr-all', 'esr-all', 'some'];

// column: 'high_income_country',
export const INCOME_GROUPS = [
  {
    key: 'hi',
    value: '1',
    standard: 'hi',
  },
  {
    key: 'lmi',
    value: '0',
    standard: 'core',
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
    column: COLUMNS.ESR.SCORE_ADJUSTED,
  },
  {
    key: 'best',
    column: COLUMNS.ESR.SCORE_BEST,
    refColumn: COLUMNS.ESR.SCORE_DUTY_BEST,
    refIndicatorColumn: COLUMNS.ESR.INDICATOR_SCORE_DUTY_BEST,
  },
];

export const PEOPLE_GROUPS = [
  {
    key: 'all',
    code: 'All',
  },
  {
    key: 'male',
    code: 'Male',
  },
  {
    key: 'female',
    code: 'Female',
  },
];

export const METRIC_TYPES = ['dimensions', 'rights', 'indicators'];

export const RIGHTS_TYPES = ['cpr', 'esr'];

// d: dimensions, r: rights
export const SCALES = [
  {
    key: 'd',
    type: 'dimensions',
  },
  {
    key: 'r',
    type: 'rights',
  },
];

export const DIMENSIONS = [
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
  {
    key: 'esr',
    code: 'SER_Average',
    type: 'esr',
    resource: 'esrScores',
  },
];

export const RIGHTS = [
  {
    key: 'arrest',
    code: 'arrest',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'assembly',
    code: 'assem',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'disappearance',
    code: 'disap',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'death-penalty',
    code: 'dpex',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    aggregate: 'execution',
  },
  {
    key: 'execution',
    code: 'execution',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'extrajud-killing',
    code: 'exkill',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    aggregate: 'execution',
  },
  {
    key: 'expression',
    code: 'express',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'participation',
    code: 'polpart',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'torture',
    code: 'tort',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'education',
    code: 'Education',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'food',
    code: 'Food',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'health',
    code: 'Health',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'housing',
    code: 'Housing',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'work',
    code: 'Work',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
  },
];

export const AT_RISK_INDICATORS = [
  {
    right: 'arrest',
    code: 'arrest_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'assembly',
    code: 'assem_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'disappearance',
    code: 'disap_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'execution',
    subright: 'death-penalty',
    code: 'dpex_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'execution',
    subright: 'extrajud-killing',
    code: 'exkill_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'expression',
    code: 'express_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'participation',
    code: 'polpart_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'torture',
    code: 'tort_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'education',
    code: 'educ_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'food',
    code: 'food_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'health',
    code: 'health_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'housing',
    code: 'house_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'work',
    subright: 'job',
    code: 'job_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'work',
    subright: 'jobcond',
    code: 'jobcond_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'work',
    subright: 'union',
    code: 'union_atrisk',
    resource: 'atRisk',
  },
];

export const INDICATOR_LOOKBACK = 10;

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
    code: 'NotLTUnemployed',
    right: 'work',
    resource: 'esrIndicatorScores',
  },
];
