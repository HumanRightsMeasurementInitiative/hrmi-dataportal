import { uniq } from 'lodash';

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
    featuredFilterValue,
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
      (filter === 'treaty' && !!treatyFilterValue) ||
      (filter === 'featured' && !!featuredFilterValue),
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
const addCountryFeatured = (values, countryCode, featuredCountries) => {
  const featured = featuredCountries.reduce(
    (memo, c) =>
      c[COLUMNS.FEATURED.COUNTRIES].indexOf(countryCode) > -1
        ? [c[COLUMNS.FEATURED.CAT], ...memo]
        : memo,
    [],
  );
  if (featured.length > 0) {
    return uniq(['any', ...featured, ...values]);
  }
  return values;
  // return [value, ...values];
};
const getCountryFilterValues = (
  countries,
  filter,
  standard,
  scoresAllCountries,
  featuredValues,
  featuredCountries,
) => {
  if (filter === 'region') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttribute(
            memo,
            country,
            COLUMNS.COUNTRIES.REGION,
            REGIONS.values,
          ),
        [],
      )
      .sort((a, b) =>
        REGIONS.values.indexOf(a) > REGIONS.values.indexOf(b) ? 1 : -1,
      );
  }
  if (filter === 'subregion') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttribute(
            memo,
            country,
            COLUMNS.COUNTRIES.SUBREGION,
            SUBREGIONS.values,
          ),
        [],
      )
      .sort((a, b) =>
        SUBREGIONS.values.indexOf(a) > SUBREGIONS.values.indexOf(b) ? 1 : -1,
      );
  }
  if (filter === 'income') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttributeLookup(
            memo,
            country,
            COLUMNS.COUNTRIES.HIGH_INCOME,
            INCOME_GROUPS.values,
          ),
        [],
      )
      .sort((a, b) => {
        const keys = INCOME_GROUPS.values.map(g => g.key);
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
            COUNTRY_GROUPS.values,
          ),
        [],
      )
      .sort((a, b) =>
        COUNTRY_GROUPS.values.indexOf(a) > COUNTRY_GROUPS.values.indexOf(b)
          ? 1
          : -1,
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
            TREATIES.values,
          ),
        [],
      )
      .sort((a, b) =>
        TREATIES.values.indexOf(a) > TREATIES.values.indexOf(b) ? 1 : -1,
      );
  }
  if (filter === 'assessed' && standard && scoresAllCountries) {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAssessed(memo, country, standard, scoresAllCountries),
        [],
      )
      .sort((a, b) =>
        ASSESSED_FILTERS.values.indexOf(a) > ASSESSED_FILTERS.values.indexOf(b)
          ? 1
          : -1,
      );
  }
  if (filter === 'featured' && scoresAllCountries) {
    return countries
      .reduce((memo, country) => {
        if (memo.length === featuredValues.length) return memo;
        return addCountryFeatured(
          memo,
          country[COLUMNS.COUNTRIES.CODE],
          featuredCountries,
        );
      }, [])
      .sort((a, b) =>
        featuredValues.indexOf(a) > featuredValues.indexOf(b) ? 1 : -1,
      );
  }
  return [];
};
const getAllCountryFilterValues = (filter, featuredValues) => {
  if (filter === 'region') {
    return REGIONS.values;
  }
  if (filter === 'subregion') {
    return SUBREGIONS.values;
  }
  if (filter === 'income') {
    return INCOME_GROUPS.values.map(g => g.key);
  }
  if (filter === 'cgroup') {
    return COUNTRY_GROUPS.values;
  }
  if (filter === 'treaty') {
    return TREATIES.values;
  }
  if (filter === 'assessed') {
    return ASSESSED_FILTERS.values;
  }
  if (filter === 'featured') {
    return featuredValues;
  }
  return [];
};

export const getFilterOptionValues = (
  countries,
  filterGroups,
  anyFilterSet = true,
  standard,
  scoresAllCountries,
  featuredValues,
  featuredCountries,
) =>
  filterGroups.reduce((memo, filter) => {
    // prettier-ignore
    const values = anyFilterSet
      ? getCountryFilterValues(
        countries,
        filter,
        standard,
        scoresAllCountries,
        featuredValues,
        featuredCountries,
      )
      : getAllCountryFilterValues(filter, featuredValues);
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
  if (filter[0] === 'all') {
    // true if we have all dimension scores for current standard
    return hasAllScores(countryScores, standard);
  }
  if (filter[0] === 'cpr-all') {
    // true if we have a cpr dimension score
    return hasAllCPRScores(countryScores);
  }
  if (filter[0] === 'esr-all') {
    // true if we have an esr dimension score for current standard
    return hasAllESRScores(countryScores, standard);
  }
  if (filter[0] === 'some') {
    // true if we have any rights score for any standard
    return hasSomeScores(countryScores);
  }
  return true;
};
