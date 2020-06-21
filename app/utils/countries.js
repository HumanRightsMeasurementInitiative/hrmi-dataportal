import { COLUMNS, INCOME_GROUPS } from 'containers/App/constants';
import rootMessages from 'messages';

export const isCountryHighIncome = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1';
export const hasCountryGovRespondents = country =>
  country[COLUMNS.COUNTRIES.GOV_RESPONDENTS] === '1';

export const hasCountryAttribute = (country, values, column) => {
  const countryValues = country[column] && country[column].split(',');
  return (
    countryValues &&
    values &&
    values.reduce((memo, v) => memo && countryValues.indexOf(v) > -1, true)
  );
};

export const hasCountryIncome = (country, incomeKeys) => {
  const incomeValues = incomeKeys.reduce((memo, incomeKey) => {
    const group = INCOME_GROUPS.values.find(i => i.key === incomeKey);
    return group ? memo.concat(group.value) : memo;
  }, []);
  const countryIncome = country[COLUMNS.COUNTRIES.HIGH_INCOME].toString();
  return incomeValues.indexOf(countryIncome) > -1;
};

export const isCountryOECD = country =>
  hasCountryAttribute(country, ['oecd'], COLUMNS.COUNTRIES.GROUPS);

export const isCountryFeatured = (country, filter, featuredCountries) => {
  const featured = featuredCountries.reduce(
    (memo, c) =>
      c[COLUMNS.FEATURED.COUNTRIES].indexOf(country[COLUMNS.COUNTRIES.CODE]) >
      -1
        ? [c[COLUMNS.FEATURED.CAT], ...memo]
        : memo,
    [],
  );
  return featured.length > 0 && ['any', ...featured].indexOf(filter[0]) > -1;
};

export const getCountryLabel = (
  intl,
  country,
  showHILabel = true,
  showGovRespondentsLabel = true,
) => {
  if (!country) return '';

  let label = '';
  if (rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]]) {
    label = intl.formatMessage(
      rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]],
    );
  } else {
    console.log(
      'Country code not in language files:',
      country[COLUMNS.COUNTRIES.CODE],
    );
    label = country[COLUMNS.COUNTRIES.CODE];
  }
  if (showHILabel && isCountryHighIncome(country)) {
    label = `${label}${intl.formatMessage(rootMessages.labels.hiCountryWrap, {
      hiLabel: intl.formatMessage(rootMessages.labels.hiCountry),
    })}`;
  }
  if (showGovRespondentsLabel && hasCountryGovRespondents(country)) {
    label = `${label} <sup>${intl.formatMessage(
      rootMessages.labels.govResponseCountry,
    )}</sup>`;
  }
  return label;
};
