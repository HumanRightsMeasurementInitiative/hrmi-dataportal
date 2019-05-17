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
export const needsArticleEN = code => needsArticle('en', code);
export const isPlural = (locale, code) =>
  countriesArePlural[locale].indexOf(code) > -1;
export const isPluralEN = code => isPlural('en', code);

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

export const getCPRScoreRange = value => {
  const range = CPR_SCORE_RANGES.find(r => value > r.min && value <= r.max);
  return range && range.range;
};
