import {
  COLUMNS,
  INCOME_GROUPS,
  REGIONS,
  SUBREGIONS,
  COUNTRY_GROUPS,
  TREATIES,
  ASSESSED_FILTERS,
} from 'containers/App/constants';

import {
  getScoresForCountry,
  hasAllScores,
  hasAllCPRScores,
  hasAllESRScores,
  hasSomeScores,
} from 'utils/scores';

export const areAnyFiltersSet = (
  filterGroups,
  {
    regionFilterValue,
    subregionFilterValue,
    incomeFilterValue,
    assessedFilterValue,
    countryGroupFilterValue,
    treatyFilterValue,
  },
) =>
  filterGroups.reduce(
    (memo, filter) =>
      memo ||
      (filter === 'income' && !!incomeFilterValue) ||
      (filter === 'region' && !!regionFilterValue) ||
      (filter === 'subregion' && !!subregionFilterValue) ||
      (filter === 'assessed' && !!assessedFilterValue) ||
      (filter === 'cgroup' && !!countryGroupFilterValue) ||
      (filter === 'treaty' && !!treatyFilterValue),
    false,
  );

const addCountryAttribute = (values, country, attribute, validValues) => {
  const value = country[attribute];
  // do not add if already present or invalid
  if (
    !value ||
    values.indexOf(value) > -1 ||
    validValues.indexOf(value) === -1
  ) {
    return values;
  }
  return [value, ...values];
};

const addCountryAttributeMulti = (values, country, attribute, validValues) => {
  const value = country[attribute];
  if (!value) {
    return values;
  }
  const newValues = value.split(',').reduce((memo, v) => {
    // do not add if already present or invalid
    if (validValues.indexOf(v) === -1 || values.indexOf(v) > -1) {
      return memo;
    }
    return [v, ...memo];
  }, []);
  return [...newValues, ...values];
};
const addCountryAttributeLookup = (values, country, attribute, validValues) => {
  let value = country[attribute];
  if (!value) {
    return values;
  }
  const group = validValues.find(i => i.value === value);
  value = group && group.key;
  // do not add if already present or invalid
  if (values.indexOf(value) > -1 || !value) {
    return values;
  }
  return [value, ...values];
};

const addCountryAssessed = (values, country, standard, scoresAllCountries) => {
  const countryScores = getScoresForCountry(
    country.country_code,
    scoresAllCountries,
  );
  const hasCPR = hasAllCPRScores(countryScores);
  const hasESR = hasAllESRScores(countryScores, standard);
  let value;
  if (hasCPR && hasESR) {
    value = 'all';
  } else if (hasCPR) {
    value = 'cpr-all';
  } else if (hasESR) {
    value = 'esr-all';
  } else if (hasSomeScores(countryScores)) {
    value = 'some';
  }
  if (!value || values.indexOf(value) > -1) {
    return values;
  }
  return [value, ...values];
};
const getCountryFilterValues = (
  countries,
  filter,
  standard,
  scoresAllCountries,
) => {
  if (filter === 'region') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttribute(memo, country, COLUMNS.COUNTRIES.REGION, REGIONS),
        [],
      )
      .sort((a, b) => (REGIONS.indexOf(a) > REGIONS.indexOf(b) ? 1 : -1));
  }
  if (filter === 'subregion') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttribute(
            memo,
            country,
            COLUMNS.COUNTRIES.SUBREGION,
            SUBREGIONS,
          ),
        [],
      )
      .sort((a, b) => (SUBREGIONS.indexOf(a) > SUBREGIONS.indexOf(b) ? 1 : -1));
  }
  if (filter === 'income') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttributeLookup(
            memo,
            country,
            COLUMNS.COUNTRIES.HIGH_INCOME,
            INCOME_GROUPS,
          ),
        [],
      )
      .sort((a, b) => {
        const keys = INCOME_GROUPS.map(g => g.key);
        return keys.indexOf(a) > keys.indexOf(b) ? 1 : -1;
      });
  }
  if (filter === 'cgroup') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttributeMulti(
            memo,
            country,
            COLUMNS.COUNTRIES.GROUPS,
            COUNTRY_GROUPS,
          ),
        [],
      )
      .sort((a, b) =>
        COUNTRY_GROUPS.indexOf(a) > COUNTRY_GROUPS.indexOf(b) ? 1 : -1,
      );
  }
  if (filter === 'treaty') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttributeMulti(
            memo,
            country,
            COLUMNS.COUNTRIES.TREATIES,
            TREATIES,
          ),
        [],
      )
      .sort((a, b) => (TREATIES.indexOf(a) > TREATIES.indexOf(b) ? 1 : -1));
  }
  if (filter === 'assessed' && standard && scoresAllCountries) {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAssessed(memo, country, standard, scoresAllCountries),
        [],
      )
      .sort((a, b) =>
        ASSESSED_FILTERS.indexOf(a) > ASSESSED_FILTERS.indexOf(b) ? 1 : -1,
      );
  }
  return [];
};
const getAllCountryFilterValues = filter => {
  if (filter === 'region') {
    return REGIONS;
  }
  if (filter === 'subregion') {
    return SUBREGIONS;
  }
  if (filter === 'income') {
    return INCOME_GROUPS.map(g => g.key);
  }
  if (filter === 'cgroup') {
    return COUNTRY_GROUPS;
  }
  if (filter === 'treaty') {
    return TREATIES;
  }
  if (filter === 'assessed') {
    return ASSESSED_FILTERS;
  }
  return [];
};

export const getFilterOptionValues = (
  countries,
  filterGroups,
  anyFilterSet = true,
  standard,
  scoresAllCountries,
) =>
  filterGroups.reduce((memo, filter) => {
    const values = anyFilterSet
      ? getCountryFilterValues(countries, filter, standard, scoresAllCountries)
      : getAllCountryFilterValues(filter);
    return {
      [filter]: values,
      ...memo,
    };
  }, {});

export const filterByAssessment = (
  country,
  scoresAllCountries,
  filter,
  standard,
) => {
  const countryScores = getScoresForCountry(
    country.country_code,
    scoresAllCountries,
  );
  if (filter === 'all') {
    // true if we have all dimension scores for current standard
    return hasAllScores(countryScores, standard);
  }
  if (filter === 'cpr-all') {
    // true if we have a cpr dimension score
    return hasAllCPRScores(countryScores);
  }
  if (filter === 'esr-all') {
    // true if we have an esr dimension score for current standard
    return hasAllESRScores(countryScores, standard);
  }
  if (filter === 'some') {
    // true if we have any rights score for any standard
    return hasSomeScores(countryScores);
  }
  return true;
};
