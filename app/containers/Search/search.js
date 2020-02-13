import {
  cleanupSearchTarget,
  startsWith,
  regExMultipleWords,
} from 'utils/string';

import rootMessages from 'messages';

export const prepCountries = (countries, search, intl) => {
  const regex = new RegExp(regExMultipleWords(search), 'i');
  return (
    countries &&
    countries
      .map(country => ({
        code: country.country_code,
        label: rootMessages.countries[country.country_code]
          ? intl.formatMessage(rootMessages.countries[country.country_code])
          : country.country_code,
      }))
      .filter(country => filterCountry(country, search, regex))
      .sort((a, b) => (a.label < b.label ? -1 : 1))
  );
};
export const prepMetrics = (metrics, metricType, search, intl) => {
  const regex = new RegExp(regExMultipleWords(search), 'i');
  return (
    metrics &&
    metrics
      .map(m => ({
        code: m.key,
        label: intl.formatMessage(rootMessages[metricType][m.key]),
      }))
      .filter(m => filterMetric(m, search, regex))
  );
};

export const filterCountry = (country, search, regex) => {
  if (!search || search.length < 2) return true;
  try {
    return (
      startsWith(cleanupSearchTarget(country.code), search) ||
      regex.test(cleanupSearchTarget(country.label))
    );
  } catch (e) {
    return true;
  }
};

export const filterMetric = (m, search, regex) => {
  if (!search || search.length < 2) return true;
  try {
    return regex.test(cleanupSearchTarget(m.label));
  } catch (e) {
    return true;
  }
};
