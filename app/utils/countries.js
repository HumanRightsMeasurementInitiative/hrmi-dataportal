import {
  COLUMNS,
  INCOME_GROUPS,
  ASSESSED_FILTERS,
  REGIONS,
  SUBREGIONS,
} from 'containers/App/constants';

export const isCountryHighIncome = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1';

export const isCountryOECD = country => {
  const groups = country[COLUMNS.COUNTRIES.GROUPS].split(',');
  return groups.indexOf('oecd') > -1;
};

const getCountryFilterValues = (countries, filter) =>
  countries.reduce((memo, c) => {
    if (filter === 'region') {
      const value = c[COLUMNS.COUNTRIES.REGION];
      if (memo.indexOf(value) > -1 || REGIONS.indexOf(value) === -1) {
        return memo;
      }
      return [value, ...memo];
    }
    if (filter === 'subregion') {
      const value = c[COLUMNS.COUNTRIES.SUBREGION];
      if (memo.indexOf(value) > -1 || SUBREGIONS.indexOf(value) === -1) {
        return memo;
      }
      return [value, ...memo];
    }
    if (filter === 'income') {
      const valueRaw = c[COLUMNS.COUNTRIES.HIGH_INCOME];
      const group = INCOME_GROUPS.find(i => i.value === valueRaw);
      const value = group && group.key;
      if (!value || memo.indexOf(value) > -1) {
        return memo;
      }
      return [value, ...memo];
    }
    if (filter === 'assessed') {
      return ASSESSED_FILTERS;
    }
    return [];
  }, []);

export const getFilterOptionValues = (countries, filterGroups) =>
  filterGroups.reduce((memo, g) => {
    const values = getCountryFilterValues(countries, g);
    return {
      [g]: values,
      ...memo,
    };
  }, {});
