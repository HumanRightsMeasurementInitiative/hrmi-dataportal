import { COLUMNS, INCOME_GROUPS } from 'containers/App/constants';

export const isCountryHighIncome = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1';

export const hasCountryGroup = (country, group) => {
  const groups =
    country[COLUMNS.COUNTRIES.GROUPS] &&
    country[COLUMNS.COUNTRIES.GROUPS].split(',');
  console.log(groups);
  return (
    groups &&
    group &&
    group.reduce((memo, g) => {
      console.log(memo, g, group);
      return memo && groups.indexOf(g) > -1;
    }, true)
  );
};

export const hasCountryTreaty = (country, group) => {
  const groups =
    country[COLUMNS.COUNTRIES.TREATIES] &&
    country[COLUMNS.COUNTRIES.TREATIES].split(',');
  return (
    groups && groups.reduce((memo, g) => memo || group.indexOf(g) > -1, false)
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

export const isCountryOECD = country => hasCountryGroup(country, 'oecd');
