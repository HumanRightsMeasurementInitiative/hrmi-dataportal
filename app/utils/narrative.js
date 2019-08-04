import rootMessages from 'messages';
import roundScore from './round-score';
import { startsWithVowel, upperCaseFirst } from './string';

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

export const getCountryWithArticle = (locale, countryGrammar, countryLabel) => {
  if (!needsArticle(locale, countryGrammar)) {
    return countryLabel;
  }
  if (locale === 'en') {
    return `the ${countryLabel}`;
  }
  if (locale === 'fr') {
    if (isPlural(locale, countryGrammar)) {
      return `les ${countryLabel}`;
    }
    if (startsWithVowel(countryLabel)) {
      return `l'${countryLabel}`;
    }
    if (isFeminine(locale, countryGrammar)) {
      return `la ${countryLabel}`;
    }
    return `le ${countryLabel}`;
  }
  if (locale === 'es') {
    // TODO
    return countryLabel;
  }
  if (locale === 'pt') {
    // TODO
    return countryLabel;
  }
  return countryLabel;
};

export const getCountryOf = (locale, countryGrammar, countryLabel) => {
  if (locale === 'en') {
    if (needsArticle(locale, countryGrammar)) {
      return `for the ${countryLabel}`;
    }
    return `for ${countryLabel}`;
  }
  if (locale === 'fr') {
    if (needsArticle(locale, countryGrammar)) {
      if (isPlural(locale, countryGrammar)) {
        return `des ${countryLabel}`;
      }
      if (startsWithVowel(countryLabel)) {
        return `de l'${countryLabel}`;
      }
      if (isFeminine(locale, countryGrammar)) {
        return `de la ${countryLabel}`;
      }
      return `du ${countryLabel}`;
    }
    return `de ${countryLabel}`;
  }
  if (locale === 'es') {
    // TODO
    return countryLabel;
  }
  if (locale === 'pt') {
    // TODO
    return countryLabel;
  }
  return countryLabel;
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

export const getRegionWithArticle = (locale, regionCode, regionLabel) => {
  if (!needsArticleRegion(locale, regionCode)) {
    return regionLabel;
  }
  if (locale === 'en') {
    return `the ${regionLabel}`;
  }
  if (locale === 'fr') {
    if (isPluralRegion(locale, regionCode)) {
      return `les ${regionLabel}`;
    }
    if (startsWithVowel(regionLabel)) {
      return `l'${regionLabel}`;
    }
    if (isFeminine(locale, regionCode)) {
      return `la ${regionLabel}`;
    }
    return `le ${regionLabel}`;
  }
  if (locale === 'es') {
    // TODO
    return regionLabel;
  }
  if (locale === 'pt') {
    // TODO
    return regionLabel;
  }
  return regionLabel;
};

// TODO
export const getRegionIn = (locale, regionCode, regionLabel) => regionLabel;

export const getMessageGrammar = (
  intl,
  countryCode,
  regionCode,
  countryGrammar,
) => {
  const { locale } = intl;
  const countryLabel = intl.formatMessage(rootMessages.countries[countryCode]);
  const regionLabel = intl.formatMessage(rootMessages.regions[regionCode]);
  const countryWithArticle = getCountryWithArticle(
    locale,
    countryGrammar,
    countryLabel,
  );
  return {
    country: countryLabel,
    countryWithArticle,
    countryWithArticleCap: upperCaseFirst(countryWithArticle),
    needsArticle: needsArticle(locale, countryGrammar),
    isPlural: isPlural(locale, countryGrammar),
    genderNumber: genderNumber(locale, countryGrammar),
    countryOf: getCountryOf(locale, countryGrammar, countryLabel),
    region: regionLabel,
    regionWithArticle: getRegionWithArticle(locale, regionCode, regionLabel),
    needsArticleRegion: needsArticleRegion(intl.locale, regionCode),
  };
};

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
