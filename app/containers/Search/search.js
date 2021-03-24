import {
  cleanupSearchTarget,
  startsWith,
  regExMultipleWords,
  lowerCase,
} from 'utils/string';

import rootMessages from 'messages';

export const filterCountries = (countries, search, intl) =>
  countries &&
  countries
    .map(country => ({
      code: country.country_code,
      label: rootMessages.countries[country.country_code]
        ? intl.formatMessage(rootMessages.countries[country.country_code])
        : country.country_code,
      ...country,
    }))
    .filter(country => filterCountry(country, search));

export const prepCountries = (countries, search, intl) =>
  countries &&
  countries
    .map(country => ({
      code: country.country_code,
      label: rootMessages.countries[country.country_code]
        ? intl.formatMessage(rootMessages.countries[country.country_code])
        : country.country_code,
    }))
    .filter(country => filterCountry(country, search))
    .sort((a, b) => (a.label < b.label ? -1 : 1));

export const prepGroups = (groups, search, intl) =>
  groups &&
  groups
    .map(group => ({
      code: group.key,
      // prettier-ignore
      label: rootMessages['people-at-risk'][group.key]
        ? intl.formatMessage(
          rootMessages['people-at-risk'][group.key],
        )
        : group.key
    }))
    .filter(group => filterGroup(group, search));

export const prepMetrics = (metrics, metricType, search, intl) =>
  metrics &&
  metrics
    .map(m => ({
      code: m.key,
      label: intl.formatMessage(rootMessages[metricType][m.key]),
      sub: rootMessages[metricType][`${m.key}-sub`]
        ? intl.formatMessage(rootMessages[metricType][`${m.key}-sub`])
        : null,
      right: m.right,
    }))
    .filter(m => filterMetric(m, search));

export const filterCountry = (country, search) => {
  if (!search || search.length < 2) return true;
  try {
    const regex = new RegExp(regExMultipleWords(search), 'i');
    return (
      startsWith(lowerCase(country.code), lowerCase(search)) ||
      regex.test(cleanupSearchTarget(country.label))
    );
  } catch (e) {
    return true;
  }
};

export const filterMetric = (m, search) => {
  if (!search || search.length < 2) return true;
  try {
    const regex = new RegExp(regExMultipleWords(search), 'i');
    return regex.test(cleanupSearchTarget(m.label));
  } catch (e) {
    return true;
  }
};
export const filterGroup = (g, search) => {
  if (!search || search.length < 2) return true;
  try {
    const regex = new RegExp(regExMultipleWords(search), 'i');
    return regex.test(cleanupSearchTarget(g.label));
  } catch (e) {
    return true;
  }
};
