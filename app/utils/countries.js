import { COLUMNS } from 'containers/App/constants';

export const isCountryHighIncome = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1';

export const isCountryOECD = country => {
  const groups = country[COLUMNS.COUNTRIES.GROUPS].split(',');
  return groups.indexOf('oecd') > -1;
};
