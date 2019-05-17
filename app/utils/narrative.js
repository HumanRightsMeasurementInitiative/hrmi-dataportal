import roundScore from './round-score';

const contriesNeedArticle = {
  en: [
    'GBR',
    'BHS', // 'The' should actually be capitalised
    'CYM',
    'TCA',
    'USA',
    'VCT',
    'VGB',
    'VIR',
    'MHL',
    'MNP',
    'PHL',
    'SLB',
    'CHI',
    'CZE',
    'FRO',
    'RUS',
    'NLD',
    'SVK',
    'ARE',
    'SYR',
    'MDV',
    'CAF',
    'COD',
    'COG',
    'SYC',
  ],
  fr: [],
  es: [],
  pt: [],
};

const countriesArePlural = {
  en: [
    'BHS',
    'BRB',
    'CYM',
    'TCA',
    'USA',
    'VCT',
    'VGB',
    'VIR',
    'MHL',
    'MNP',
    'PHL',
    'SLB',
    'CHI',
    'FRO',
    'ARE',
    'MDV',
    'SYC',
  ],
  fr: [],
  es: [],
  pt: [],
};

export const needsArticle = (locale, code) =>
  contriesNeedArticle[locale].indexOf(code) > -1;
export const isPlural = (locale, code) =>
  countriesArePlural[locale].indexOf(code) > -1;

const regionsNeedArticle = {
  en: ['americas', 'middle-east-north-africa'],
  fr: [],
  es: [],
  pt: [],
};

export const needsArticleRegion = (locale, code) =>
  regionsNeedArticle[locale].indexOf(code) > -1;

const CPR_SCORE_RANGES = [
  {
    range: 'a',
    min: 0,
    max: 6,
  },
  {
    range: 'b',
    min: 6,
    max: 8,
  },
  {
    range: 'c',
    min: 8,
    max: 10,
  },
];

const ESR_SCORE_RANGES = [
  {
    range: 'a',
    min: 0,
    max: 70,
  },
  {
    range: 'b',
    min: 70,
    max: 80,
  },
  {
    range: 'c',
    min: 80,
    max: 98,
  },
  {
    range: 'd',
    min: 98,
    max: 99.9,
  },
];

export const getCPRScoreRange = value => {
  const rvalue = roundScore(value);
  const range = CPR_SCORE_RANGES.find(r => rvalue >= r.min && rvalue < r.max);
  return range && range.range;
};
export const getESRScoreRange = value => {
  const rvalue = roundScore(value);
  const range = ESR_SCORE_RANGES.find(r => rvalue >= r.min && rvalue < r.max);
  return range && range.range;
};
export const compareRange = ({ lo, hi, reference }) => {
  if (lo > reference) return 'a'; // better than average
  if (hi < reference) return 'b'; // worse than average
  return 'c'; // close to average
};
