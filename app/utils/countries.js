import { COLUMNS } from 'containers/App/constants';

export const isCountryHighIncome = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1';

export const hasCountryGroup = (country, group) => {
  const groups =
    country[COLUMNS.COUNTRIES.GROUPS] &&
    country[COLUMNS.COUNTRIES.GROUPS].split(',');
  return groups && groups.indexOf(group) > -1;
};

export const hasCountryTreaty = (country, group) => {
  const groups =
    country[COLUMNS.COUNTRIES.TREATIES] &&
    country[COLUMNS.COUNTRIES.TREATIES].split(',');
  return groups && groups.indexOf(group) > -1;
};

export const isCountryOECD = country => hasCountryGroup(country, 'oecd');
