import roundScore from './round-score';

const ARTICLES_DEFAULT = {
  en: 0,
  fr: 1,
  es: 0,
  pt: 1,
};

export const needsArticle = (locale, countryGrammar) => {
  if (ARTICLES_DEFAULT[locale] === 0) {
    return countryGrammar[`${locale}_article`] === '1';
  }
  return countryGrammar[`${locale}_article`] !== '0';
};

export const isFeminine = (locale, countryGrammar) =>
  countryGrammar[`${locale}_feminine`] === '1';

export const isPlural = (locale, countryGrammar) =>
  countryGrammar[`${locale}_plural`] === '1';

export const genderNumber = (locale, countryGrammar) => {
  if (isFeminine(locale, countryGrammar)) {
    if (isPlural(locale, countryGrammar)) {
      return 'fp';
    }
    return 'f';
  }
  if (isPlural(locale, countryGrammar)) {
    return 'mp';
  }
  return 'm';
};

const regionsNeedArticle = {
  en: ['americas', 'middle-east-north-africa'],
  fr: ['americas'],
  es: ['americas'],
  pt: ['americas'],
};
const regionsArePlural = {
  en: [
    'americas',
    'east-asia-pacific',
    'europe-central-asia',
    'middle-east-north-africa',
  ],
  fr: [
    'americas',
    'east-asia-pacific',
    'europe-central-asia',
    'middle-east-north-africa',
  ],
  es: [
    'americas',
    'east-asia-pacific',
    'europe-central-asia',
    'middle-east-north-africa',
  ],
  pt: [
    'americas',
    'east-asia-pacific',
    'europe-central-asia',
    'middle-east-north-africa',
  ],
};
const regionsAreFeminine = {
  en: [],
  fr: [
    'americas',
    'sub-saharan-africa',
    'south-asia',
    'europe-central-asia',
    'east-asia-pacific',
  ],
  es: ['americas', 'sub-saharan-africa', 'south-asia', 'europe-central-asia'],
  pt: ['americas', 'sub-saharan-africa', 'south-asia', 'europe-central-asia'],
};

export const needsArticleRegion = (locale, code) =>
  regionsNeedArticle[locale].indexOf(code) > -1;
export const isPluralRegion = (locale, code) =>
  regionsArePlural[locale].indexOf(code) > -1;
export const isFeminineRegion = (locale, code) =>
  regionsAreFeminine[locale].indexOf(code) > -1;

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
