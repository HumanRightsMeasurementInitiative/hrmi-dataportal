import { COLUMNS, INCOME_GROUPS } from 'containers/App/constants';

export const isCountryHighIncome = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1';

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
