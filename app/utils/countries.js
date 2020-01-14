import {
  COLUMNS,
  INCOME_GROUPS,
  ASSESSED_FILTERS,
  REGIONS,
  SUBREGIONS,
  COUNTRY_GROUPS,
  TREATIES,
} from 'containers/App/constants';

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
    if (filter === 'cgroup') {
      const values = c[COLUMNS.COUNTRIES.GROUPS];
      if (!values) {
        return memo;
      }
      const newValues = values.split(',').reduce((m, value) => {
        if (COUNTRY_GROUPS.indexOf(value) === -1 || memo.indexOf(value) > -1) {
          return m;
        }
        return [value, ...m];
      }, []);
      return [...newValues, ...memo];
    }
    if (filter === 'treaty') {
      const values = c[COLUMNS.COUNTRIES.TREATIES];
      if (!values) {
        return memo;
      }
      const newValues = values.split(',').reduce((m, value) => {
        if (TREATIES.indexOf(value) === -1 || memo.indexOf(value) > -1) {
          return m;
        }
        return [value, ...m];
      }, []);
      return [...newValues, ...memo];
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
