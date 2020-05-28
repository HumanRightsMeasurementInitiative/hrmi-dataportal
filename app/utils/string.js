import { toLower as loCase, deburr } from 'lodash/string';
import { reduce } from 'lodash/collection';

/* eslint-disable no-useless-escape */
const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
const sanitise = str => loCase(deburr(str)).replace(invalid, '');

export const lowerCase = str => loCase(str);
export const upperCaseFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

export const cleanupSearchTarget = str => loCase(deburr(str));

// match multiple words, incl substrings
export const regExMultipleWords = str =>
  reduce(sanitise(str).split(' '), (words, s) => `${words}(?=.*${s})`, '');

// match multiple words, requires starting
export const regExMultipleWordsMatchStart = str =>
  reduce(sanitise(str).split(' '), (words, s) => `${words}(?=.*\\b${s})`, '');

export const truncateText = (text, limit = 6, keepWords = true) => {
  if (text.length > limit) {
    if (!keepWords) {
      return `${text.substring(0, limit)}\u2026`;
    }
    const words = text.split(' ');
    let truncated = '';
    while (truncated.length <= limit) {
      const word = words.shift();
      truncated = truncated.length > 0 ? `${truncated} ${word}` : word;
    }
    // check if really truncated (not a given as we accept full words)
    return text.length > truncated.length ? `${truncated}\u2026` : text;
  }
  return text;
};

export const startsWith = (str, searchString) =>
  str.substr(0, searchString.length) === searchString;

const VOWEL_REGEX =
  '^[aieouAIEOUàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕäëïöüÄËÏÖÜ].*';

export const startsWithVowel = str => !!str.match(VOWEL_REGEX);
