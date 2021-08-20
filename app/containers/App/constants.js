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
import arrest from 'images/metrics/arrest.svg';
import assembly from 'images/metrics/assembly.svg';
import deathPenalty from 'images/metrics/death-penalty.svg';
import disappearance from 'images/metrics/disappearance.svg';
import education from 'images/metrics/education.svg';
import expression from 'images/metrics/expression.svg';
import extrajudKilling from 'images/metrics/extrajud-killing.svg';
import food from 'images/metrics/food.svg';
import health from 'images/metrics/health.svg';
import housing from 'images/metrics/housing.svg';
import participation from 'images/metrics/participation.svg';
import torture from 'images/metrics/torture.svg';
import work from 'images/metrics/work.svg';

export const CHECK_COOKIECONSENT = 'hrmi/App/CHECK_COOKIECONSENT';
export const COOKIECONSENT_CHECKED = 'hrmi/App/COOKIECONSENT_CHECKED';
export const SET_COOKIECONSENT = 'hrmi/App/SET_COOKIECONSENT';
export const GA_INITIALISED = 'hrmi/App/GA_INITIALISED';
export const TRACK_EVENT = 'hrmi/App/TRACK_EVENT';
// loading actions
export const LOAD_DATA_IF_NEEDED = 'hrmi/App/LOAD_DATA_IF_NEEDED';
export const LOAD_DATA_SUCCESS = 'hrmi/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'hrmi/App/LOAD_DATA_ERROR';
export const DATA_REQUESTED = 'hrmi/App/DATA_REQUESTED';
export const DATA_READY = 'hrmi/App/DATA_READY';
export const LOAD_CONTENT_IF_NEEDED = 'hrmi/App/LOAD_CONTENT_IF_NEEDED';
export const LOAD_CONTENT_SUCCESS = 'hrmi/App/LOAD_CONTENT_SUCCESS';
export const LOAD_CONTENT_ERROR = 'hrmi/App/LOAD_CONTENT_ERROR';
export const CONTENT_REQUESTED = 'hrmi/App/CONTENT_REQUESTED';
export const CONTENT_READY = 'hrmi/App/CONTENT_READY';

// navigation actions
export const SELECT_COUNTRY = 'hrmi/App/SELECT_COUNTRY';
export const SELECT_METRIC = 'hrmi/App/SELECT_METRIC';
export const SELECT_GROUP = 'hrmi/App/SELECT_GROUP';
export const NAVIGATE = 'hrmi/App/NAVIGATE';
export const SET_SCALE = 'hrmi/App/SET_SCALE';
export const SET_STANDARD = 'hrmi/App/SET_STANDARD';
export const SET_BENCHMARK = 'hrmi/App/SET_BENCHMARK';
export const SET_TAB = 'hrmi/App/SET_TAB';
export const SET_RAW = 'hrmi/App/SET_RAW';
export const TOGGLE_GROUP = 'hrmi/App/TOGGLE_GROUP';
export const HIGHLIGHT_GROUP = 'hrmi/App/HIGHLIGHT_GROUP';

// state actions
export const ASIDE_LAYER = 'hrmi/App/ASIDE_LAYER';
export const HIGHLIGHT_COUNTRY = 'hrmi/App/HIGHLIGHT_COUNTRY';
export const SHOW_WELCOME = 'hrmi/App/SHOW_WELCOME';

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
    POPULATION: 'Population',
    GDP_2011_PPP: 'gdp_per_capita_2011ppp',
    GDP_2017_PPP: 'gdp_per_capita_2017ppp',
    GDP_CURRENT_PPP: 'gdp_per_capita_current_ppp',
    GDP_CURRENT_US: 'gdp_per_capita_current_usd',
  },
  COUNTRIES: {
    CODE: 'country_code',
    HIGH_INCOME: 'high_income_country',
    REGION: 'region_code',
    SUBREGION: 'subregion_code',
    GROUPS: 'group_codes',
    TREATIES: 'treaty_codes',
    STATUS: 'country_status',
    RELATED: 'related_country_code',
    GOV_RESPONDENTS: 'gov_respondents',
  },
  FEATURED: {
    CAT: 'featured_category',
    COUNTRIES: 'country_codes',
  },
  AT_RISK: {
    CODE: 'people_code',
    METRIC_CODE: 'metric_code',
    COUNTRY_CODE: 'country_code',
    COUNT: 'count',
  },
};

export const LANGUAGES = {
  short: {
    en: 'EN',
    es: 'ES',
    pt: 'PT',
    fr: 'FR',
    zh: 'ZH',
  },
  long: {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
    zh: '中文',
  },
};

// URLs for external resources loaded on request
export const DATA_URL = '//data-store.humanrightsmeasurement.org/data';
export const PAGES_URL = '//content-store.humanrightsmeasurement.org/v3_3/';

export const PAGES = {
  about: {
    key: 'about',
    primary: true,
  },
  methodology: {
    key: 'methodology',
    primary: true,
  },
  download: {
    key: 'download',
    primary: true,
    url: 'https://humanrightsmeasurement.org/download-the-dataset/',
  },
};

export const PATHS = {
  HOME: '',
  METRICS: 'metrics',
  METRIC: 'metric',
  COUNTRIES: 'countries',
  COUNTRY: 'country',
  PAGE: 'page',
  GROUPS: 'groups',
  GROUP: 'group',
};
export const IMAGE_PATH =
  '//content-store.humanrightsmeasurement.org/assets/uploads';

export const XPATHS = {
  home: {
    en: '//humanrightsmeasurement.org',
    fr: '//humanrightsmeasurement.org/fr',
    es: '//humanrightsmeasurement.org/es',
    pt: '//humanrightsmeasurement.org/pt-pt',
    zh: '//humanrightsmeasurement.org/zh/',
  },
  contact: {
    en: '//humanrightsmeasurement.org/about-hrmi/contact-hrmi/',
    fr: '//humanrightsmeasurement.org/fr/a-propos-de-hrmi/contactez-hrmi/',
    es: '//humanrightsmeasurement.org/es/sobre-hrmi/contactar-con-hrmi/',
    pt:
      '//humanrightsmeasurement.org/pt-pt/about-hrmi/entre-em-contato-com-hrmi/',
    zh: '//humanrightsmeasurement.org/zh/about-hrmi/%e8%81%94%e7%b3%bbhrmi/',
  },
  download: {
    en: 'https://humanrightsmeasurement.org/download-the-dataset/',
    es: 'https://humanrightsmeasurement.org/es/descarga-de-contenido/',
    pt:
      'https://humanrightsmeasurement.org/pt-pt/descarregue-o-conjunto-de-dados/',
    fr:
      'https://humanrightsmeasurement.org/fr/telechargez-lensemble-de-donnees/',
    zh:
      'https://humanrightsmeasurement.org/zh/%e4%b8%8b%e8%bd%bd%e6%95%b0%e6%8d%ae%e9%9b%86/',
  },
};

export const FAQS = {
  COUNTRY_SNAPSHOT: [
    'where',
    'how',
    'scale',
    'year',
    'benchmarks',
    'standards',
    'grades',
  ],
  COUNTRY_ESR: [
    'where',
    'how',
    'difference',
    'why',
    'benchmarks',
    'standards',
    'grades',
  ],
  COUNTRY_CPR: ['where', 'how', 'grades', 'uncertainty'],
  COUNTRY_PACIFIC: ['whereViolence'],
  ESR_DIMENSION: ['measureDimensionESR', 'benchmarks', 'standards'],
  ESR_RIGHT: ['why', 'measureRightESR', 'benchmarks', 'standards'],
  ESR_INDICATOR: ['measureIndicators', 'benchmarks', 'standards'],
  CPR_DIMENSION: ['measureDimensionCPR', 'uncertainty'],
  CPR_RIGHT: ['measureRightCPR', 'uncertainty'],
};

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
    file: 'countries_v3-1.csv',
  },
  {
    key: 'countriesGrammar',
    file: 'countries_grammar_v3.csv',
  },
  {
    key: 'esrIndicators',
    file: 'esr-indicators_2021.csv',
  },
  {
    key: 'atRisk',
    file: 'people-at-risk_v3-3.csv',
  },
  {
    key: 'auxIndicators',
    file: 'auxiliary-indicators_2021.csv',
  },
  {
    key: 'cprScores',
    file: 'cpr-scores_v3-3.csv',
  },
  {
    key: 'esrScores',
    file: 'esr-scores_2021.csv',
  },
  {
    key: 'esrIndicatorScores',
    file: 'esr-indicator-scores_2021.csv',
  },
  {
    key: 'featured',
    file: 'featured_v3.csv',
  },
  {
    key: 'sources',
    file: 'sources_2021.csv',
  },
  {
    key: 'pacific',
    file: 'pm-formatted.csv',
  },
];

export const COUNTRY_SORTS = {
  name: {
    order: 'asc',
  },
  score: {
    order: 'desc',
  },
  assessment: {
    order: 'desc',
    data: 'scores',
  },
  gdp: {
    order: 'desc',
    data: 'aux',
    column: COLUMNS.AUX.GDP_2017_PPP,
  },
  population: {
    order: 'desc',
    data: 'aux',
    column: COLUMNS.AUX.POPULATION,
  },
};

export const REGIONS = {
  values: [
    'americas',
    'middle-east-north-africa',
    'sub-saharan-africa',
    'europe-central-asia',
    'south-asia',
    'east-asia-pacific',
  ],
};
export const SUBREGIONS = {
  values: [
    'middle-east',
    'north-africa',
    'europe',
    'central-asia',
    'east-asia',
    'pacific',
  ],
};
export const COUNTRY_GROUPS = {
  values: ['oecd', 'not-oecd', 'asean', 'oic'],
  multiple: true,
};

export const TREATIES = {
  values: ['iccpr', 'icescr'],
  multiple: true,
};

export const ASSESSED_FILTERS = {
  values: ['all', 'cpr-all', 'esr-all', 'some'],
};

// column: 'high_income_country',
export const INCOME_GROUPS = {
  values: [
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
  ],
};

export const COUNTRY_FILTERS = {
  ALL: ['income', 'region', 'assessed', 'subregion', 'treaty', 'cgroup'],
  SINGLE_METRIC: ['income', 'region', 'subregion', 'treaty', 'cgroup'],
};

export const STANDARDS = [
  {
    key: 'core',
    code: 'Core',
    hiValue: '0',
  },
  {
    key: 'hi',
    code: 'HiY',
    hiValue: '1',
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
    color: 'allPeople',
  },
  {
    key: 'female',
    code: 'Female',
    breakdown: 'sex',
    color: 'female',
  },
  {
    key: 'male',
    code: 'Male',
    breakdown: 'sex',
    color: 'male',
  },
];

export const METRIC_TYPES = ['dimensions', 'rights', 'indicators'];

export const RIGHTS_TYPES = ['esr', 'cpr'];

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

export const GRADES = {
  esr: [
    {
      class: 'poor',
      min: 0,
    },
    {
      class: 'bad',
      min: 75,
    },
    {
      class: 'fair',
      min: 85,
    },
    {
      class: 'good',
      min: 95,
    },
  ],
  cpr: [
    {
      class: 'poor',
      min: 0,
    },
    {
      class: 'bad',
      min: 35,
    },
    {
      class: 'fair',
      min: 60,
    },
    {
      class: 'good',
      min: 80,
    },
  ],
};

export const SUBREGIONS_CPR_COMPLETE = ['pacific'];
export const SUBREGIONS_FOR_COMPARISON_CPR = ['pacific'];

export const DIMENSIONS = [
  {
    key: 'esr',
    code: 'SER_Average',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'physint',
    code: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'empowerment',
    code: 'empower',
    type: 'cpr',
    resource: 'cprScores',
  },
];

export const RIGHTS = [
  {
    key: 'education',
    code: 'Education',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    hasGroups: ['core', 'hi'], // for standards
    icon: education,
  },
  {
    key: 'food',
    code: 'Food',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    hasGroups: ['core'],
    icon: food,
  },
  {
    key: 'health',
    code: 'Health',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: health,
  },
  {
    key: 'housing',
    code: 'Housing',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: housing,
  },
  {
    key: 'work',
    code: 'Work',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: work,
  },
  {
    key: 'arrest',
    code: 'arrest',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: arrest,
  },
  {
    key: 'disappearance',
    code: 'disap',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: disappearance,
  },
  {
    key: 'death-penalty',
    code: 'dpex',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: deathPenalty,
  },
  {
    key: 'extrajud-killing',
    code: 'exkill',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: extrajudKilling,
  },
  {
    key: 'torture',
    code: 'tort',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: torture,
  },
  {
    key: 'assembly',
    code: 'assem',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
    icon: assembly,
  },
  {
    key: 'expression',
    code: 'express',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
    icon: expression,
  },
  {
    key: 'participation',
    code: 'polpart',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
    icon: participation,
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
    right: 'death-penalty',
    code: 'dpex_atrisk',
    resource: 'atRisk',
  },
  {
    right: 'extrajud-killing',
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
    code: 'job_atrisk',
    resource: 'atRisk',
  },
];

export const INDICATOR_LOOKBACK = 10;

export const INDICATORS = [
  {
    key: 'net-primary',
    code: 'NetPrimEnrol',
    right: 'education',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'sec-enrol',
    code: 'NetSecEnrol',
    right: 'education',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'pisa-math',
    code: 'PISAmath',
    right: 'education',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'pisa-reading',
    code: 'PISAreading',
    right: 'education',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'pisa-science',
    code: 'PISAscience',
    right: 'education',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'not-stunted',
    code: 'NotStunted',
    right: 'food',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'food-security',
    code: 'FoodSecure',
    right: 'food',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'under-5-survival',
    code: 'U5Survival',
    right: 'health',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'adult-survival',
    code: 'AdultSurvival',
    right: 'health',
    resource: 'esrIndicatorScores',
    hasGroups: true,
  },
  {
    key: 'contraception',
    code: 'Contraception',
    right: 'health',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'birth-weight',
    code: 'NotLowBirWt',
    right: 'health',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'water-in-home',
    code: 'WaterInHome',
    right: 'housing',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'basic-sanitation',
    code: 'BasicSanitation',
    right: 'housing',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'affordable-housing',
    code: 'AffordHouse',
    right: 'housing',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'safe-sanitation',
    code: 'SafeSanitation',
    right: 'housing',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'relative-poverty',
    code: 'NotRelPoor',
    right: 'work',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'absolute-poverty',
    code: 'NotAbsPoor',
    right: 'work',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
  {
    key: 'longterm-unemployment',
    code: 'NotLTUnemploy',
    right: 'work',
    resource: 'esrIndicatorScores',
    hasGroups: false,
  },
];

export const AT_RISK_GROUPS = [
  { key: '1', code: '1' },
  { key: '2', code: '2' },
  { key: '3', code: '3' },
  { key: '4', code: '4' },
  { key: '5', code: '5' },
  { key: '6', code: '6' },
  { key: '7', code: '7' },
  { key: '8', code: '8' },
  { key: '9', code: '9' },
  { key: '10', code: '10' },
  { key: '11', code: '11' },
  { key: '12', code: '12' },
  { key: '13', code: '13' },
  { key: '14', code: '14' },
  { key: '15', code: '15' },
  { key: '16', code: '16' },
  { key: '17', code: '17' },
  { key: '18', code: '18' },
  { key: '19', code: '19' },
  { key: '20', code: '20' },
  { key: '21', code: '21' },
  { key: '22', code: '22' },
  { key: '23', code: '23' },
  { key: '24', code: '24' },
  { key: '25', code: '25' },
  { key: '26', code: '26' },
  { key: '27', code: '27' },
  { key: '28', code: '28' },
  { key: '29', code: '29' },
  { key: '30', code: '30' },
  { key: '32', code: '32' },
  { key: '33', code: '33' },
  { key: '34', code: '34' },
  { key: '35', code: '35' },
  { key: '36', code: '36' },
  { key: '37', code: '37' },
  { key: '38', code: '38' },
  { key: '39', code: '39' },
  { key: '31', code: '31' }, // other
];

export const COOKIECONSENT_NAME = 'hrmi-dataportal-cookie-consent-status';
export const GA_PROPERTY_ID = 'UA-103815452-2';

export const INTRO_IMAGES = [
  // `${IMAGE_PATH}/intro_1.png`,
  `${IMAGE_PATH}/intro_2.png`,
  `${IMAGE_PATH}/intro_3.png`,
  `${IMAGE_PATH}/intro_4.png`,
  `${IMAGE_PATH}/intro_5.png`,
  `${IMAGE_PATH}/intro_6.png`,
  `${IMAGE_PATH}/intro_7.png`,
  `${IMAGE_PATH}/intro_8.png`,
];
