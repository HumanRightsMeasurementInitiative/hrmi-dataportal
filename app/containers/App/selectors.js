/**
 * The global and router state selectors
 */

import { createSelector } from 'reselect';
import { uniq } from 'lodash/array';
import { map } from 'lodash/collection';
import { DEFAULT_LOCALE, appLocales } from 'i18n';
import 'url-search-params-polyfill';

import isInteger from 'utils/is-integer';
import quasiEquals from 'utils/quasi-equals';

import getMetricDetails from 'utils/metric-details';

import {
  hasCountryAttribute,
  hasCountryIncome,
  isCountryHighIncome,
  isCountryOECD,
} from 'utils/countries';

import { initialState } from './reducer';
import {
  SCALES,
  STANDARDS,
  BENCHMARKS,
  REGIONS,
  SUBREGIONS,
  COUNTRY_SORTS,
  INCOME_GROUPS,
  COUNTRY_GROUPS,
  TREATIES,
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  PEOPLE_GROUPS,
  INDICATOR_LOOKBACK,
  AT_RISK_INDICATORS,
  AT_RISK_GROUPS,
  COLUMNS,
  ASSESSED_FILTERS,
  SUBREGIONS_FOR_COMPARISON_CPR,
} from './constants';

// TEMP: move this elsewhere in refactor
function lookback(collection, selectedYear) {
  // reduce for the score for the most recent year for each country (that is not more recent than the selected year, see pre-filter above)
  // we take advantage of the array being pre-sorted by ascending year, and look back at previous item in array to check if it was the same country
  // if not, previous item was the most recent for that country
  // this should be much faster than a reduce which compares each item and iteratively swaps into soFar (as we don't write object to memory each iteration)
  return collection.reduce((soFar, score, i) => {
    // discard first score unless array is length 1
    // in which case test for valid score
    if (i === 0) {
      // is prevScore within 10 years prior of selectedYear
      if (
        collection.length === 1 &&
        parseInt(selectedYear, 10) - parseInt(prevScore.year, 10) <= 10
      ) {
        return soFar.concat(prevScore);
      }
      return soFar;
    }
    // handle last score
    // TODO: if prevScore was a diff country, take both if valid score
    // else only take last score if valid score
    const prevScore = collection[i - 1];
    if (i === collection.length - 1) {
      let toConcat = [];
      if (parseInt(selectedYear, 10) - parseInt(score.year, 10) <= 10) {
        toConcat = toConcat.concat(score);
      }

      if (score.country_code !== prevScore.country_code) {
        // is prevScore within 10 years prior of selectedYear
        if (parseInt(selectedYear, 10) - parseInt(prevScore.year, 10) <= 10) {
          toConcat = toConcat.concat(prevScore);
        }
      }

      return soFar.concat(toConcat);
    }
    // if not last item in array and different country to last iteration
    if (score.country_code !== prevScore.country_code) {
      // is prevScore within 10 years prior of selectedYear
      if (parseInt(selectedYear, 10) - parseInt(prevScore.year, 10) <= 10) {
        return soFar.concat(prevScore);
      }
      return soFar;
    }
    return soFar;
  }, []);
}

// global sub-state
const getGlobal = state => state.global || initialState;

export const getCloseTargetPage = createSelector(
  getGlobal,
  global => global.closeTargetPage,
);
export const getCloseTargetMetric = createSelector(
  getGlobal,
  global => global.closeTargetMetric,
);
export const getCloseTargetCountry = createSelector(
  getGlobal,
  global => global.closeTargetCountry,
);

// get data / content
const getData = createSelector(
  getGlobal,
  global => global.data,
);
export const getESRScores = createSelector(
  getData,
  data => data.esrScores,
);
export const getCPRScores = createSelector(
  getData,
  data => data.cprScores,
);
export const getAuxIndicators = createSelector(
  getData,
  data => data.auxIndicators,
);
export const getESRIndicators = createSelector(
  getData,
  data => data.esrIndicators,
);
export const getESRIndicatorScores = createSelector(
  getData,
  data => data.esrIndicatorScores,
);
export const getAtRiskData = createSelector(
  getData,
  data => data.atRisk,
);
export const getCountries = createSelector(
  getData,
  data => data.countries,
);
export const getCountriesGrammar = createSelector(
  getData,
  data => data.countriesGrammar,
);
export const getFeatured = createSelector(
  getData,
  data => data.featured,
);
export const getSources = createSelector(
  getData,
  data => data.sources,
);

// router sub-state
const getRouter = state => state.router;

export const getRouterLocation = createSelector(
  getRouter,
  routerState => routerState.location,
);
export const getRouterSearchParams = createSelector(
  getRouterLocation,
  location => location && new URLSearchParams(location.search),
);
export const getRouterPath = createSelector(
  getRouterLocation,
  location => location && location.pathname,
);
/**
 * Get the language locale
 */
export const getLocale = createSelector(
  getRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      return splitPath.length > 1 && appLocales.indexOf(splitPath[1]) >= 0
        ? splitPath[1]
        : DEFAULT_LOCALE;
    }
    return DEFAULT_LOCALE;
  },
);

export const getRouterRoute = createSelector(
  getRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      // should result in ["", "en", "page", "about"]
      return splitPath.length > 2 ? splitPath[2] : '';
    }
    return '';
  },
);
export const getRouterMatch = createSelector(
  getRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      // should result in ["", "en", "page", "about"]
      return splitPath.length > 3 ? splitPath[3] : '';
    }
    return '';
  },
);

export const getRawSearch = createSelector(
  getRouterSearchParams,
  search => !!(search.has('raw') && search.get('raw') === '1'),
);

export const getActiveGroupsSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('gactive') ? search.getAll('gactive') : [PEOPLE_GROUPS[0].key],
);

export const getTabSearch = createSelector(
  getRouterSearchParams,
  search => (search.has('tab') ? search.get('tab') : '0'),
);
export const getAtRiskSearch = createSelector(
  getRouterSearchParams,
  search => search.has('atRisk') && search.get('atRisk'),
);

export const getScaleSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('scale') &&
    SCALES.map(s => s.key).indexOf(search.get('scale')) > -1
      ? search.get('scale')
      : SCALES[0].key,
);

export const getBenchmarkSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('pb') &&
    BENCHMARKS.map(s => s.key).indexOf(search.get('pb')) > -1
      ? search.get('pb')
      : BENCHMARKS[0].key,
);
export const getYearESRSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('yesr') && isInteger(search.get('yesr'))
      ? search.get('yesr')
      : false,
);
export const getYearCPRSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('ycpr') && isInteger(search.get('ycpr'))
      ? search.get('ycpr')
      : false,
);

const searchValues = (validValues, search) => {
  const validSearchValues = search.filter(s => validValues.indexOf(s) > -1);
  return validSearchValues.length > 0 && validSearchValues;
};

export const getRegionSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('region') &&
    searchValues(REGIONS.values, search.getAll('region')),
);
export const getSubregionSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('subregion') &&
    searchValues(SUBREGIONS.values, search.getAll('subregion')),
);
export const getAssessedSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('assessed') &&
    searchValues(ASSESSED_FILTERS.values, search.getAll('assessed')),
);
export const getIncomeSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('income') &&
    searchValues(INCOME_GROUPS.values.map(s => s.key), search.getAll('income')),
);
export const getCountryGroupSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('cgroup') &&
    searchValues(COUNTRY_GROUPS.values, search.getAll('cgroup')),
);
export const getTreatySearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('treaty') &&
    searchValues(TREATIES.values, search.getAll('treaty')),
);

const getHasChartSettingFilters = createSelector(
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  (region, subregion, income, cgroup, treaty) =>
    region || subregion || income || cgroup || treaty,
);
export const getSortSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('sort') &&
    Object.keys(COUNTRY_SORTS).indexOf(search.get('sort')) > -1 &&
    search.get('sort'),
);
export const getSortOrderSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('dir') &&
    ['asc', 'desc'].indexOf(search.get('dir')) > -1 &&
    search.get('dir'),
);

// return featured countries in order as determined in "featured" data table
export const getFeaturedCountries = createSelector(
  getFeatured,
  getCountries,
  (featured, countries) => {
    if (!featured || !countries) {
      return null;
    }
    return featured.reduce((featuredFountries, featuredCat) => {
      if (featuredCat[COLUMNS.FEATURED.COUNTRIES]) {
        return featuredFountries.concat(
          featuredCat[COLUMNS.FEATURED.COUNTRIES]
            .split(',')
            .reduce((catCountries, countryCode) => {
              const country = countries.find(
                c => c[COLUMNS.COUNTRIES.CODE] === countryCode,
              );
              return [
                ...catCountries,
                {
                  ...country,
                  featured: featuredCat[COLUMNS.FEATURED.CAT],
                },
              ];
            }, []),
        );
      }
      return countries;
    }, []);
  },
);

// data / content
export const getContent = createSelector(
  getGlobal,
  global => global.content,
);
export const getContentByKey = createSelector(
  (state, key) => key,
  getContent,
  (key, content) => content[key],
);
export const getDataByKey = createSelector(
  (state, key) => key,
  getData,
  (key, data) => data[key],
);

const getContentRequested = createSelector(
  getGlobal,
  global => global.contentRequested,
);

const getDataRequested = createSelector(
  getGlobal,
  global => global.dataRequested,
);
const getContentReady = createSelector(
  getGlobal,
  global => global.contentReady,
);

const getDataReady = createSelector(
  getGlobal,
  global => global.dataReady,
);
// requested data / content
export const getDataRequestedByKey = createSelector(
  (state, key) => key,
  getDataRequested,
  (key, requested) => requested[key],
);
export const getContentRequestedByKey = createSelector(
  (state, key) => key,
  getContentRequested,
  (key, requested) => requested[key],
);
// requested data / content
export const getDataReadyByKey = createSelector(
  (state, key) => key,
  getDataReady,
  (key, ready) => ready[key],
);
export const getContentReadyByKey = createSelector(
  (state, key) => key,
  getContentReady,
  (key, ready) => ready[key],
);

// helper functions
// TERRIBLE PERFORMANCE ON EDGE AND IE11
// const sortByNumber = (data, column, asc = true) => {
//   const reverse = asc ? 1 : -1;
//   return data.sort(
//     (a, b) =>
//       reverse * (parseInt(a[column], 10) < parseInt(b[column], 10) ? 1 : -1),
//   );
// };

// prettier-ignore
const calcMaxYear = scores =>
  scores &&
  scores.length > 0 &&
  scores.reduce(
    (max, s) => (parseInt(s.year, 10) > max ? parseInt(s.year, 10) : max),
    0,
  ).toString();

// prettier-ignore
const calcMinYear = scores =>
  scores &&
  scores.length > 0 &&
  scores.reduce(
    (min, s) => (parseInt(s.year, 10) < min ? parseInt(s.year, 10) : min),
    9999,
  ).toString();

export const getMaxYearESR = createSelector(
  getESRScores,
  scores => calcMaxYear(scores),
);
export const getMinYearESR = createSelector(
  getESRScores,
  scores => calcMinYear(scores),
);
export const getMaxYearCPR = createSelector(
  getCPRScores,
  scores => calcMaxYear(scores),
);
export const getMinYearCPR = createSelector(
  getCPRScores,
  scores => calcMinYear(scores),
);
export const getMaxYearAtRisk = createSelector(
  getAtRiskData,
  data => calcMaxYear(data),
);
export const getMinYearAtRisk = createSelector(
  getAtRiskData,
  data => calcMinYear(data),
);
export const getESRYear = createSelector(
  getYearESRSearch,
  getMaxYearESR,
  (searchYear, maxYear) => parseInt(searchYear || maxYear, 10),
);
export const getCPRYear = createSelector(
  getYearCPRSearch,
  getMaxYearCPR,
  (searchYear, maxYear) => parseInt(searchYear || maxYear, 10),
);

// get data by code
export const getCountry = createSelector(
  (store, code) => code,
  getCountries,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
);
// get data by code
export const getCountryGrammar = createSelector(
  (store, code) => code,
  getCountriesGrammar,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
);

// N.B. moved down here to use getCountry
export const getStandardSearch = createSelector(
  getRouterSearchParams,
  getCountry,
  (search, country) => {
    // TODO: not an ideal solution to get the default AS per country if no query param supplied, but workable
    const noCode = country
      ? STANDARDS.find(s => country.high_income_country === s.hiValue).key
      : STANDARDS[0].key;
    return search.has('as') &&
      STANDARDS.map(s => s.key).indexOf(search.get('as')) > -1
      ? search.get('as')
      : noCode;
  },
);

export const getCountriesFiltered = createSelector(
  getCountries,
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  (countries, region, subregion, income, cgroup, treaty) =>
    countries &&
    countries
      .filter(c => !region || region.indexOf(c[COLUMNS.COUNTRIES.REGION]) > -1)
      .filter(
        c =>
          !subregion || subregion.indexOf(c[COLUMNS.COUNTRIES.SUBREGION]) > -1,
      )
      .filter(
        c =>
          !cgroup || hasCountryAttribute(c, cgroup, COLUMNS.COUNTRIES.GROUPS),
      )
      .filter(
        c =>
          !treaty || hasCountryAttribute(c, treaty, COLUMNS.COUNTRIES.TREATIES),
      )
      .filter(c => !income || hasCountryIncome(c, income)),
);

// single metric
export const getIndicatorInfo = createSelector(
  (state, metricCode) => metricCode,
  getESRIndicators,
  (metricCode, indicators) =>
    indicators && indicators.find(i => i.metric_code === metricCode),
);

// single dimension, multiple countries, single year that looks back to up to previous 10 years for a score
export const getESRDimensionScores = createSelector(
  (state, selectedYear) => selectedYear,
  getESRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getStandardSearch,
  getESRYear,
  (
    selectedYear,
    scores,
    countries,
    hasChartSettingFilters,
    standardSearch,
    year,
  ) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const dimension = DIMENSIONS.find(d => d.key === 'esr');

    // get scores for all years for multiple countries, single dimension
    // const allYearsScores =
    //   standard &&
    //   dimension &&
    //   scores &&
    //   countries &&
    //   scores.filter(
    //     s =>
    //       s.standard === standard.code &&
    //       s.metric_code === dimension.code &&
    //       (selectedYear ? s.year <= selectedYear : quasiEquals(s.year, year)) &&
    //       (!hasChartSettingFilters ||
    //         countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    //   );
    // if (!allYearsScores) return false;

    // return lookback(allYearsScores, selectedYear);

    return (
      standard &&
      dimension &&
      scores &&
      countries &&
      scores.filter(
        s =>
          s.standard === standard.code &&
          s.metric_code === dimension.code &&
          (selectedYear
            ? quasiEquals(s.year, selectedYear)
            : quasiEquals(s.year, year)) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);

export const getCPRDimensionScores = createSelector(
  (state, metric) => metric,
  (state, metric, selectedYear) => selectedYear,
  getCPRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getCPRYear,
  (metric, selectedYear, scores, countries, hasChartSettingFilters, year) => {
    // make sure a metric is set
    const dimension = !!metric && DIMENSIONS.find(d => d.key === metric);

    // get scores for all years for multiple countries, single dimension
    // const allYearsScores =
    //   dimension &&
    //   scores &&
    //   countries &&
    //   scores.filter(
    //     s =>
    //       s.metric_code === dimension.code &&
    //       (selectedYear ? s.year <= selectedYear : quasiEquals(s.year, year)) &&
    //       (!hasChartSettingFilters ||
    //         countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    //   );
    // if (!allYearsScores) return false;

    // return lookback(allYearsScores, selectedYear);

    return (
      dimension &&
      scores &&
      countries &&
      scores.filter(
        s =>
          s.metric_code === dimension.code &&
          (selectedYear
            ? quasiEquals(s.year, selectedYear)
            : quasiEquals(s.year, year)) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);

// single right, multiple countries, single year
export const getESRRightScores = createSelector(
  (state, metric) => metric,
  (state, metric, selectedYear) => selectedYear,
  getESRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getStandardSearch,
  getESRYear,
  (
    metric,
    selectedYear,
    scores,
    countries,
    hasChartSettingFilters,
    standardSearch,
    year,
  ) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const group = PEOPLE_GROUPS[0];
    const right = !!metric && RIGHTS.find(d => d.key === metric);

    // const allYearsScores =
    //   scores &&
    //   countries &&
    //   right &&
    //   scores.filter(
    //     s =>
    //       s.group === group.code &&
    //       s.standard === standard.code &&
    //       s.metric_code === right.code &&
    //       (selectedYear ? s.year <= selectedYear : quasiEquals(s.year, year)) &&
    //       (!hasChartSettingFilters ||
    //         countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    //   );
    // if (!allYearsScores) return false;

    // return lookback(allYearsScores, selectedYear);

    return (
      scores &&
      countries &&
      right &&
      scores.filter(
        s =>
          s.group === group.code &&
          s.standard === standard.code &&
          s.metric_code === right.code &&
          (selectedYear
            ? quasiEquals(s.year, selectedYear)
            : quasiEquals(s.year, year)) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);

// single right, multiple countries, single year
export const getCPRRightScores = createSelector(
  (state, metric) => metric,
  (state, metric, selectedYear) => selectedYear,
  getCPRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getCPRYear,
  (metric, selectedYear, scores, countries, hasChartSettingFilters, year) => {
    const right = !!metric && RIGHTS.find(d => d.key === metric);

    // const allYearsScores =
    //   scores &&
    //   countries &&
    //   right &&
    //   scores.filter(
    //     s =>
    //       s.metric_code === right.code &&
    //       (selectedYear ? s.year <= selectedYear : quasiEquals(s.year, year)) &&
    //       (!hasChartSettingFilters ||
    //         countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    //   );
    // if (!allYearsScores) return false;

    // return lookback(allYearsScores, selectedYear);

    return (
      scores &&
      countries &&
      right &&
      scores.filter(
        s =>
          s.metric_code === right.code &&
          (selectedYear
            ? quasiEquals(s.year, selectedYear)
            : quasiEquals(s.year, year)) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);
// single indicator, multiple countries, single year
export const getIndicatorScores = createSelector(
  (state, metric) => metric,
  (state, metric, selectedYear) => selectedYear,
  getESRIndicatorScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getESRYear,
  (metric, selectedYear, scores, countries, hasChartSettingFilters, year) => {
    if (scores && countries) {
      const indicator = metric && INDICATORS.find(d => d.key === metric);
      const group = PEOPLE_GROUPS[0];
      if (indicator) {
        // first filter by group, metric, countries
        const filteredScores = scores.filter(
          s =>
            s.group === group.code &&
            s.metric_code === indicator.code &&
            (selectedYear
              ? s.year <= selectedYear
              : quasiEquals(s.year, year)) &&
            (!hasChartSettingFilters ||
              countries.map(c => c.country_code).indexOf(s.country_code) > -1),
        );
        // then get the most recent year for each country
        // figure out most recent data by country
        // const countryYears = filteredScores.reduce((memo, s) => {
        //   const result = memo;
        //   const country = s.country_code;
        //   if (
        //     typeof result[country] === 'undefined' ||
        //     (parseInt(s.year, 10) > result[country] &&
        //       parseInt(s.year, 10) <= year)
        //   ) {
        //     result[country] = parseInt(s.year, 10);
        //   }
        //   return result;
        // }, {});
        // console.log({ group, indicator, filteredScores, countryYears })
        // // finally filter by year or most recent year
        // const filteredYear = filteredScores.filter(s =>
        //   selectedYear
        //     ? quasiEquals(s.year, selectedYear)
        //     : quasiEquals(s.year, year) ||
        //       quasiEquals(s.year, countryYears[s.country_code]),
        // );
        // return filteredYear;

        return lookback(filteredScores, selectedYear);
      }
      return [];
    }
    return false;
  },
);

// single metric, single country, multipleYears

export const getCPRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metric }) => metric,
  getCPRScores,
  (countryCode, metric, scores) =>
    scores &&
    scores.filter(
      s => s.country_code === countryCode && s.metric_code === metric.code,
    ),
);

export const getHasCountryCPR = createSelector(
  (state, countryCode) => countryCode,
  getCPRScores,
  (countryCode, scores) =>
    scores && !!scores.find(s => s.country_code === countryCode),
);

export const getESRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metric }) => metric,
  getESRScores,
  getStandardSearch,
  (countryCode, metric, scores, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    return (
      scores &&
      scores.filter(
        s =>
          s.country_code === countryCode &&
          s.metric_code === metric.code &&
          s.standard === standard.code,
      )
    );
  },
);

export const getESRScoreForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getESRScores,
  getESRYear,
  getStandardSearch,
  (countryCode, metricCode, scores, esrYear, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const right = RIGHTS.find(r => r.key === metricCode);
    return (
      countryCode &&
      scores &&
      scores.find(
        s =>
          s.country_code === countryCode &&
          s.metric_code === right.code &&
          s.standard === standard.code &&
          s.group === 'All' &&
          quasiEquals(s.year, esrYear),
      )
    );
  },
);

export const getESRIndicatorScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getESRIndicatorScores,
  (countryCode, metricCode, scores) =>
    scores &&
    scores.filter(
      s => s.country_code === countryCode && s.metric_code === metricCode,
    ),
);

export const getSingleIndicatorScoresForCountry = createSelector(
  (state, { dateRange }) => dateRange,
  (state, { groups }) => groups,
  getESRIndicatorScoresForCountry, // all scores for a country and metric
  getESRYear,
  (dateRange, groups, scores, esrYear) => {
    if (!scores) return null;
    // the group codes
    const filterGroups = PEOPLE_GROUPS.filter(g =>
      groups ? groups.indexOf(g.key) : g.key === 'all',
    );
    // the years
    const filterRange = dateRange || {
      min: esrYear,
      max: esrYear,
    };

    const scoresByGroup = filterGroups.reduce((memo, group) => {
      const data = [];
      const groupCode = group.code;
      const scoresAll = groupCode
        ? scores.filter(s => s.group === groupCode)
        : scores;
      const scoresSorted = scoresAll.sort((a, b) =>
        parseInt(a.year, 10) > parseInt(b.year, 10) ? 1 : -1,
      );
      /* eslint-disable no-plusplus */
      for (
        let y = parseInt(filterRange.min, 10);
        y <= parseInt(filterRange.max, 10);
        y++
      ) {
        const score = scoresSorted.reduce((m, s) => {
          const scoreYear = parseInt(s.year, 10);
          if (scoreYear === y) return s;
          if (scoreYear < y && scoreYear >= y - INDICATOR_LOOKBACK) {
            return s;
          }
          return m;
        }, null);
        // check if already present
        if (score) {
          const containsScore = data.find(
            d => d.year === score.year && d.group === score.group,
          );
          if (!containsScore) data.push(score);
        }
      }
      if (data.length === 0) {
        return memo;
      }
      return {
        ...memo,
        [group.key]: data,
      };
    }, {});
    return Object.keys(scoresByGroup).reduce(
      (memo, group) => [...memo, ...scoresByGroup[group]],
      [],
    );
  },
);

export const getAlternativeIndicatorCountrySources = createSelector(
  getSingleIndicatorScoresForCountry,
  getSources,
  (scores, sources) => {
    if (!scores || !sources) return null;
    return scores.reduce((memo, score) => {
      if (score.source_code && score.source_code.trim() !== '') {
        const hasSource = memo.find(m => m.source_code === score.source_code);
        if (!hasSource) {
          const source = sources.find(s => s.source_code === score.source_code);
          if (source) {
            return [...memo, { ...source, ...score }];
          }
          return memo;
        }
        return memo;
      }
      return memo;
    }, []);
  },
);

// single country
// single country, all dimensions, single year
export const getDimensionScoresForCountry = createSelector(
  (state, country) => country,
  getESRScores,
  getCPRScores,
  getESRYear,
  getCPRYear,
  (country, esrScores, cprScores, esrYear, cprYear) => {
    const esr = DIMENSIONS.find(d => d.key === 'esr');
    const cprs = DIMENSIONS.filter(d => d.type === 'cpr').map(d => d.code);
    return (
      country &&
      esrScores &&
      cprScores && {
        esr: esrScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, esrYear) &&
            s.metric_code === esr.code,
        ),
        cpr: cprScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, cprYear) &&
            cprs.indexOf(s.metric_code) > -1,
        ),
      }
    );
  },
);

// single country, all rights, single year
export const getRightScoresForCountry = createSelector(
  (state, country) => country,
  getESRScores,
  getCPRScores,
  getESRYear,
  getCPRYear,
  (country, esrScores, cprScores, esrYear, cprYear) => {
    const rightsESR = RIGHTS.filter(d => d.type === 'esr').map(d => d.code);
    const rightsCPR = RIGHTS.filter(d => d.type === 'cpr').map(d => d.code);
    return (
      country &&
      esrScores &&
      cprScores && {
        esr: esrScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, esrYear) &&
            rightsESR.indexOf(s.metric_code) > -1,
        ),
        cpr: cprScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, cprYear) &&
            rightsCPR.indexOf(s.metric_code) > -1,
        ),
      }
    );
  },
);

// single country, all indicators, single year
export const getIndicatorScoresForCountry = createSelector(
  (state, country) => country,
  getESRIndicatorScores,
  getESRIndicators, // ForStandard,
  getESRYear,
  (country, scores, indicators, year) => {
    if (scores && country && indicators) {
      // first filter by country
      const filteredByCountry = scores.filter(s => s.country_code === country);
      // filter by standard
      // const filteredByStandard = filteredByCountry.filter(s =>
      //   indicators.find(i => i.metric_code === s.metric_code),
      // );
      // then get the most recent year for each metric
      // figure out most recent data by metric
      const metricYears = filteredByCountry.reduce((memo, s) => {
        const result = memo;
        const metric = s.metric_code;
        if (
          parseInt(s.year, 10) >= year - INDICATOR_LOOKBACK &&
          (typeof memo[metric] === 'undefined' ||
            (parseInt(s.year, 10) > result[metric] &&
              parseInt(s.year, 10) <= year))
        ) {
          result[metric] = parseInt(s.year, 10);
        }
        return result;
      }, {});
      // filter by year or most recent year
      const filteredByYear = filteredByCountry.filter(
        s =>
          quasiEquals(s.year, year) ||
          quasiEquals(s.year, metricYears[s.metric_code]),
      );
      return filteredByYear;
    }
    return false;
  },
);

export const getIndicatorsForCountry = createSelector(
  getIndicatorScoresForCountry,
  getESRIndicators,
  getStandardSearch,
  (scores, indicators, standard) => {
    const standardCode = STANDARDS.find(as => as.key === standard).code;
    return (
      scores &&
      indicators &&
      INDICATORS.reduce((memo, i) => {
        const details = indicators.find(id => id.metric_code === i.code);
        if (details.standard === 'Both' || details.standard === standardCode) {
          return {
            ...memo,
            [i.key]: {
              score: scores.find(
                s =>
                  s.metric_code === i.code && s.group === PEOPLE_GROUPS[0].code,
              ),
              details,
              ...i,
            },
          };
        }
        return memo;
      }, {})
    );
  },
);

export const getIndicatorsForOtherStandardForCountry = createSelector(
  getIndicatorScoresForCountry,
  getESRIndicators,
  getStandardSearch,
  (scores, indicators, standard) => {
    const standardCode = STANDARDS.find(as => as.key !== standard).code;
    return (
      scores &&
      indicators &&
      INDICATORS.reduce((memo, i) => {
        const details = indicators.find(id => id.metric_code === i.code);
        if (details.standard === 'Both' || details.standard === standardCode) {
          return {
            ...memo,
            [i.key]: {
              score: scores.find(
                s =>
                  s.metric_code === i.code && s.group === PEOPLE_GROUPS[0].code,
              ),
              details,
              ...i,
            },
          };
        }
        return memo;
      }, {})
    );
  },
);

// single country, all indicators, single year
export const getIndicatorsForCountryAndRight = createSelector(
  (state, country, { metricCode }) => metricCode,
  getIndicatorsForCountry,
  (metricCode, indicators) => {
    if (metricCode && indicators) {
      // first filter by country
      return Object.values(indicators).filter(i => i.right === metricCode);
    }
    return false;
  },
);
// TODO: clean this up
export const getIndicatorsForOtherStandardForCountryAndRight = createSelector(
  (state, country, { metricCode }) => metricCode,
  getIndicatorsForOtherStandardForCountry,
  (metricCode, indicators) => {
    if (metricCode && indicators) {
      // first filter by country
      return Object.values(indicators).filter(i => i.right === metricCode);
    }
    return false;
  },
);

export const getDimensionsForCountry = createSelector(
  getDimensionScoresForCountry,
  getRightScoresForCountry,
  getIndicatorScoresForCountry,
  getESRIndicators,
  getStandardSearch,
  (scores, rightScores, indicatorScores, indicators, standard) => {
    const standardCode = STANDARDS.find(as => as.key === standard).code;
    return (
      scores &&
      rightScores &&
      indicatorScores &&
      indicators &&
      DIMENSIONS.reduce((memo, d) => {
        if (d.type === 'cpr') {
          return {
            [d.key]: {
              score: scores.cpr.find(s => s.metric_code === d.code),
              ...d,
            },
            ...memo,
          };
        }
        // esr
        const score = scores.esr.find(s => s.standard === standardCode);
        if (score) {
          return {
            [d.key]: {
              score,
              ...d,
            },
            ...memo,
          };
        }
        // without dimension score
        const indicatorsStandard = indicators
          .filter(i => i.standard === 'Both' || i.standard === standardCode)
          .map(i => i.metric_code);
        const indicatorsAlternate = indicators
          .filter(i => i.standard !== 'Both' && i.standard !== standardCode)
          .map(i => i.metric_code);

        const rightsScoresStandardAll =
          rightScores.esr &&
          rightScores.esr.filter(
            s => s.standard === standardCode && s.group === 'All',
          );
        const rightsScoresSum =
          rightsScoresStandardAll &&
          rightsScoresStandardAll.reduce((sum, s) => {
            if (!sum) {
              const metric = RIGHTS.find(r =>
                quasiEquals(r.code, s.metric_code),
              );
              return {
                ...s,
                metric: metric.key,
              };
            }
            const sSum = sum;
            BENCHMARKS.forEach(b => {
              sSum[b.column] =
                parseFloat(sum[b.column]) + parseFloat(s[b.column]);
            });
            return {
              ...sSum,
              metric: 'some',
              metric_code: '',
            };
          }, null);
        // prettier-ignore
        const rightsScoresAvg =
          rightsScoresStandardAll.length > 1
            ? BENCHMARKS.reduce((avg, b) => ({
              ...avg,
              [b.column]: avg[b.column] / rightsScoresStandardAll.length
            }), rightsScoresSum)
            : rightsScoresSum;
        return {
          [d.key]: {
            score: false,
            scoreSome: rightsScoresAvg,
            hasScoreAlternate: scores.esr.some(
              s => s.standard !== standardCode,
            ),
            hasScoreRights: rightScores.esr.some(
              s => s.standard === standardCode,
            ),
            hasScoreRightsAlternate: rightScores.esr.some(
              s => s.standard !== standardCode,
            ),
            hasScoreIndicators: indicatorScores.some(
              s => indicatorsStandard.indexOf(s.metric_code) > -1,
            ),
            hasScoreIndicatorsAlternate: indicatorScores.some(
              s => indicatorsAlternate.indexOf(s.metric_code) > -1,
            ),
            ...d,
          },
          ...memo,
        };
      }, {})
    );
  },
);

export const getRightsForCountry = createSelector(
  getRightScoresForCountry,
  getIndicatorScoresForCountry,
  getESRIndicators,
  getStandardSearch,
  (scores, indicatorScores, indicators, standard) => {
    const standardCode = STANDARDS.find(as => as.key === standard).code;
    return (
      scores &&
      indicatorScores &&
      indicators &&
      RIGHTS.reduce((memo, r) => {
        if (r.type === 'cpr') {
          return {
            [r.key]: {
              score: scores.cpr.find(s => s.metric_code === r.code),
              ...r,
            },
            ...memo,
          };
        }
        // esr
        const score = scores.esr.find(
          s =>
            s.standard === standardCode &&
            s.metric_code === r.code &&
            s.group === PEOPLE_GROUPS[0].code,
        );
        if (score) {
          return {
            [r.key]: {
              score,
              ...r,
            },
            ...memo,
          };
        }
        // without dimension score
        // get indicator definitions (to know right relationship)
        const indicatorDetailsRight = INDICATORS.filter(
          i => i.right === r.key,
        ).map(i => i.code);
        // get indicator look up info (to know standard info)
        const indicatorsRight = indicators.filter(
          i => indicatorDetailsRight.indexOf(i.metric_code) > -1,
        );
        const indicatorsStandard = indicatorsRight
          .filter(i => i.standard === 'Both' || i.standard === standardCode)
          .map(i => i.metric_code);
        const indicatorsAlternate = indicatorsRight
          .filter(i => i.standard !== 'Both' && i.standard !== standardCode)
          .map(i => i.metric_code);

        return {
          [r.key]: {
            score: false,
            hasScoreAlternate: !!scores.esr.find(
              s => s.standard !== standardCode && s.metric_code === r.code,
            ),
            hasScoreIndicators: !!indicatorScores.find(
              s => indicatorsStandard.indexOf(s.metric_code) > -1,
            ),
            hasScoreIndicatorsAlternate: !!indicatorScores.find(
              s => indicatorsAlternate.indexOf(s.metric_code) > -1,
            ),
            ...r,
          },
          ...memo,
        };
      }, {})
    );
  },
);

// at risk
const atRiskScores = (data, rightKey, includeSubright = false) => {
  const indicators = AT_RISK_INDICATORS.filter(
    i => i.right === rightKey || (includeSubright && i.subright === rightKey),
  );
  const atRiskCodes = AT_RISK_GROUPS.map(g => g.code);
  return indicators.reduce(
    (m, i) => ({
      ...m,
      [i.code]: {
        ...i,
        scores: data.filter(
          d =>
            d.metric_code === i.code &&
            atRiskCodes.indexOf(d.people_code) > -1 &&
            parseInt(d.count, 10) > 0,
        ),
      },
    }),
    {},
  );
};

// single country, multiple rights, single year
export const getPeopleAtRiskForCountryYear = createSelector(
  (state, { country }) => country,
  getAtRiskData,
  getMaxYearAtRisk,
  (countryCode, data, year) => {
    if (!data) return null;
    const countryData = data.filter(
      d => d.country_code === countryCode && quasiEquals(d.year, year),
    );
    return countryData && countryData.length > 0 && countryData;
  },
);
export const getPeopleAtRiskForCountry = createSelector(
  getPeopleAtRiskForCountryYear,
  data =>
    data &&
    DIMENSIONS.map(dim => ({
      // prettier-ignore
      rights: RIGHTS.reduce(
        (memo, r) =>
          typeof r.aggregate !== 'undefined' || r.dimension !== dim.key
            ? memo
            : {
              ...memo,
              [r.key]: {
                ...r,
                atRiskData: atRiskScores(data, r.key),
              },
            },
        {},
      ),
      ...dim,
    })),
);

export const getPeopleAtRisk = createSelector(
  (state, { metric }) => getMetricDetails(metric),
  getPeopleAtRiskForCountryYear,
  (metric, data) => {
    if (!data) return false;
    if (metric.metricType === 'rights') {
      return atRiskScores(data, metric.key, true);
    }
    if (metric.metricType === 'dimensions') {
      // prettier-ignore
      return RIGHTS.reduce(
        (memo, r) =>
          typeof r.aggregate !== 'undefined' || r.dimension !== metric.key
            ? memo
            : {
              ...memo,
              [r.key]: {
                ...r,
                atRiskData: atRiskScores(data, r.key),
              },
            },
        {},
      );
      // return atRiskScores(data, right.key, country, year, true);
    }
    return false;
  },
);

export const getPeopleAtRiskCountryNo = createSelector(
  getAtRiskData,
  data => {
    if (!data) return 0;
    const year = calcMaxYear(data);
    const countries = data
      .filter(d => quasiEquals(d.year, year))
      .map(d => d[COLUMNS.AT_RISK.COUNTRY_CODE]);
    return countries ? uniq(countries).length : 0;
  },
);

export const getPeopleAtRiskForGroup = createSelector(
  (state, { group }) => group,
  getAtRiskData,
  (group, data) => {
    if (!data) return null;
    const year = calcMaxYear(data);
    const groupData = data
      .filter(d => quasiEquals(d.year, year))
      .filter(d => quasiEquals(d[COLUMNS.AT_RISK.CODE], group))
      .filter(d => parseInt(d[COLUMNS.AT_RISK.COUNT], 10) > 0)
      .map(d => d[COLUMNS.AT_RISK.COUNTRY_CODE]);
    return uniq(groupData);
  },
);

export const getCountryFromRouter = createSelector(
  getRouterMatch,
  getCountries,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
);

const filterScoresByYear = (year, scores) =>
  !!scores && scores.filter(s => quasiEquals(s.year, year));

export const getESRScoresForYear = createSelector(
  getESRYear,
  getESRScores,
  (year, scores) => filterScoresByYear(year, scores),
);
export const getCPRScoresForYear = createSelector(
  getCPRYear,
  getCPRScores,
  (year, scores) => filterScoresByYear(year, scores),
);
// get one score per country per metric, for most recent year with lookback
// for lookback function, must sort collection by metric, country, year in that order of precedence
export const getESRScoresForYearWithLookback = createSelector(
  getESRYear,
  getESRScores,
  (year, scores) => !!scores && lookback(scores, year),
);
export const getCPRScoresForYearWithLookback = createSelector(
  getCPRYear,
  getCPRScores,
  (year, scores) => !!scores && lookback(scores, year),
);

// export const getESRDimensionScoresForYear = createSelector(
//   getESRYear,
//   getESRScores,
//   (year, scores) => {
//     const dimension = DIMENSIONS.find(d => d.key === 'esr');
//     return (
//       dimension &&
//       scores &&
//       scores.filter(
//         s => s.metric_code === dimension.code && quasiEquals(s.year, year),
//       )
//     );
//   },
// );

// export const getCPRDimensionScoresForYear = createSelector(
//   getCPRYear,
//   getCPRScores,
//   (year, scores) => {
//     const dimensions = DIMENSIONS.filter(d => d.type === 'cpr');
//     return (
//       dimensions &&
//       scores &&
//       dimensions.reduce(
//         (m, d) => ({
//           ...m,
//           [d.key]: scores.filter(
//             s => s.metric_code === d.code && quasiEquals(s.year, year),
//           ),
//         }),
//         {},
//       )
//     );
//   },
// );

// esr: average of countries in same region, if high income country use ALL high income average best calculate for both standards and benchmarks
// cpr: average mean score of other countries worldwide, if high income oecd country only use HI OECD average

const esrScoreAdder = (stats, referenceCountry, scores, metrics) => {
  // look up country score
  const referenceScores = scores.filter(
    s =>
      s.country_code === referenceCountry.country_code &&
      metrics.map(m => m.code).indexOf(s.metric_code) > -1,
  );
  if (!referenceScores || referenceScores.length === 0) {
    return stats;
  }
  let referenceAverage;
  if (referenceScores.length === 1) {
    [referenceAverage] = referenceScores;
  } else {
    // rights averages
    const rightsSum = referenceScores.reduce(
      (sumR, s) => ({
        [COLUMNS.ESR.SCORE_ADJUSTED]:
          sumR[COLUMNS.ESR.SCORE_ADJUSTED] +
          parseFloat(s[COLUMNS.ESR.SCORE_ADJUSTED]),
        [COLUMNS.ESR.SCORE_BEST]:
          sumR[COLUMNS.ESR.SCORE_BEST] + parseFloat(s[COLUMNS.ESR.SCORE_BEST]),
      }),
      {
        [COLUMNS.ESR.SCORE_ADJUSTED]: 0,
        [COLUMNS.ESR.SCORE_BEST]: 0,
      },
    );
    referenceAverage = {
      [COLUMNS.ESR.SCORE_ADJUSTED]:
        rightsSum[COLUMNS.ESR.SCORE_ADJUSTED] / referenceScores.length,
      [COLUMNS.ESR.SCORE_BEST]:
        rightsSum[COLUMNS.ESR.SCORE_BEST] / referenceScores.length,
    };
  }
  // sums by benchmark & count
  return {
    sumAdjusted:
      stats.sumAdjusted +
      parseFloat(referenceAverage[COLUMNS.ESR.SCORE_ADJUSTED]),
    sumBest:
      stats.sumBest + parseFloat(referenceAverage[COLUMNS.ESR.SCORE_BEST]),
    count: stats.count + 1,
  };
};
const cprScoreAdder = (stats, referenceCountry, scores, dimension) => {
  // look up country score
  const referenceScore = scores.find(
    s =>
      s.country_code === referenceCountry.country_code &&
      dimension === s.metric_code,
  );
  if (!referenceScore) {
    return stats;
  }
  // sums by benchmark & count
  return {
    sum: stats.sum + parseFloat(referenceScore[COLUMNS.CPR.MEAN]),
    count: stats.count + 1,
  };
};

export const getReferenceScores = createSelector(
  getCountryFromRouter,
  getCountries,
  getStandardSearch,
  getESRScoresForYearWithLookback,
  getCPRScoresForYearWithLookback,
  (country, countries, standard, esrScores, cprScores) => {
    if (!country || !countries || !esrScores || !cprScores) return false;

    // esr data
    // 1. check if our country even has any dim or rights scores
    let esrAverages;
    const currentStandard = STANDARDS.find(s => s.key === standard);
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');

    const countryScores = esrScores.filter(
      s =>
        s.country_code === country.country_code &&
        s.standard === currentStandard.code &&
        s.group === group.code,
    );
    if (countryScores && countryScores.length > 0) {
      const dimension = DIMENSIONS.find(d => d.key === 'esr');
      const countryDimScore = countryScores.find(
        s => s.metric_code === dimension.code,
      );
      const hasCountryDimScore = !!countryDimScore;
      // check rights scores if no dim score present
      let countryRightsScores;
      let hasCountryRightsScores;
      let countryMetrics;
      if (hasCountryDimScore) {
        countryMetrics = [dimension];
      } else {
        countryRightsScores = countryScores.filter(
          s => s.metric_code !== dimension.code,
        );
        countryMetrics = countryRightsScores
          .map(s => RIGHTS.find(r => r.code === s.metric_code))
          .filter(s => !!s);
        hasCountryRightsScores =
          countryRightsScores && countryRightsScores.length > 0;
      }
      // 2. get reference countries if scores present
      if (hasCountryDimScore || hasCountryRightsScores) {
        // these are the countries that we are comparing our country to
        // if country high income country then compare with all other HI
        // if not, compare with region/subregion
        let referenceCountriesESR;
        if (isCountryHighIncome(country)) {
          // use high income countries for comparison
          referenceCountriesESR = countries.filter(
            c =>
              isCountryHighIncome(c) && c.country_code !== country.country_code,
          );
        } else if (country.subregion_code.trim() !== '') {
          // use countries from same subregion
          referenceCountriesESR = countries.filter(
            c =>
              c.subregion_code === country.subregion_code &&
              c.country_code !== country.country_code,
          );
        } else {
          // use countries from region
          referenceCountriesESR = countries.filter(
            c =>
              c.region_code === country.region_code &&
              c.country_code !== country.country_code,
          );
        }
        // 3. calculate average score of reference countries
        const esrSums = referenceCountriesESR.reduce(
          (sum, referenceCountry) =>
            esrScoreAdder(sum, referenceCountry, esrScores, countryMetrics),
          {
            sumAdjusted: 0,
            sumBest: 0,
            count: 0,
          },
        );
        // prettier-ignore
        esrAverages = esrSums
          ? {
            ...esrSums,
            average: {
              adjusted: esrSums.sumAdjusted / esrSums.count,
              best: esrSums.sumBest / esrSums.count,
            },
            countryMetrics,
          }
          : null;
      }
    }

    // CPR
    let cprAverages;
    const countryScoresCPR = cprScores.filter(
      s => s.country_code === country.country_code,
    );
    if (countryScoresCPR && countryScoresCPR.length > 0) {
      const cprDimensions = DIMENSIONS.filter(d => d.type === 'cpr');
      cprAverages = cprDimensions.reduce((averages, dimension) => {
        const countryDimScore = countryScoresCPR.find(
          s => s.metric_code === dimension.code,
        );
        const hasCountryDimScore = !!countryDimScore;
        // 2. get reference countries if scores present
        if (hasCountryDimScore) {
          // these are the countries that we are comparing our country to
          // if country high income AND OECD country then
          //   compare it with all other HI AND OECD countries
          // if not, compare with region/subregion
          let referenceCountries;
          if (isCountryHighIncome(country) && isCountryOECD(country)) {
            referenceCountries = countries.filter(
              c => isCountryHighIncome(c) && isCountryOECD(c),
            );
          } else if (
            SUBREGIONS_FOR_COMPARISON_CPR.indexOf(country.subregion_code) > -1
          ) {
            // use countries from same subregion
            referenceCountries = countries.filter(
              c =>
                c.subregion_code === country.subregion_code &&
                c.country_code !== country.country_code,
            );
          } else {
            // use other countries
            referenceCountries = countries.filter(
              c => c.country_code !== country.country_code,
            );
          }
          // 3. calculate average score of reference countries
          const dimSums = referenceCountries.reduce(
            (sum, referenceCountry) =>
              cprScoreAdder(sum, referenceCountry, cprScores, dimension.code),
            {
              sum: 0,
              count: 0,
            },
          );
          return {
            ...averages,
            [dimension.key]: {
              ...dimSums,
              average: dimSums.sum / dimSums.count,
            },
          };
        }
        return averages;
      }, {});
    }
    return {
      esr: esrAverages,
      ...cprAverages,
    };
  },
);

// All countries
const scoresByCountry = scores =>
  !!scores &&
  scores.reduce((memo, score) => {
    const metricR = RIGHTS.find(r => r.code === score.metric_code);
    const metricD = DIMENSIONS.find(d => d.code === score.metric_code);
    const metric = metricR || metricD;
    if (!metric) return memo;
    const memoCountry = memo[score.country_code];
    if (memoCountry) {
      const memoCountryMetric = memoCountry[metric.key];
      if (memoCountryMetric) {
        return {
          ...memo,
          [score.country_code]: {
            ...memoCountry,
            [metric.key]: [...memoCountryMetric, score],
          },
        };
      }
      return {
        ...memo,
        [score.country_code]: {
          ...memoCountry,
          [metric.key]: [score],
        },
      };
    }
    return {
      ...memo,
      [score.country_code]: {
        [metric.key]: [score],
      },
    };
  }, {});

// TODO refactor for better IE/Edge performance
const indicatorScoresByCountry = (year, scores) =>
  !!scores &&
  scores.reduce((memo, score) => {
    // ignore all outdated scores
    if (parseInt(score.year, 10) < year - INDICATOR_LOOKBACK) return memo;
    const metric = INDICATORS.find(i => i.code === score.metric_code);
    if (!metric) return memo;
    // add to list of country scores if already present
    const memoCountry = memo[score.country_code];
    if (memoCountry) {
      const memoCountryMetric = memoCountry[metric.key];
      if (memoCountryMetric) {
        // replace group score with newer score if already present
        const memoCountryMetricGroup = memoCountryMetric.find(
          i => i.group === score.group,
        );
        if (
          memoCountryMetricGroup &&
          parseInt(memoCountryMetricGroup.year, 10) < parseInt(score.year, 10)
        ) {
          return {
            ...memo,
            [score.country_code]: {
              ...memoCountry,
              [metric.key]: memoCountryMetric.reduce(
                (mm, i) => (i.group === score.group ? mm : [...mm, i]),
                [score],
              ),
            },
          };
        }
        // if not yet score present for group remember score
        return {
          ...memo,
          [score.country_code]: {
            ...memoCountry,
            [metric.key]: [...memoCountryMetric, score],
          },
        };
      }
      // else remember score for indicator
      return {
        ...memo,
        [score.country_code]: {
          ...memoCountry,
          [metric.key]: [score],
        },
      };
    }
    // else add country and remember score for indicator
    return {
      ...memo,
      [score.country_code]: {
        [metric.key]: [score],
      },
    };
  }, {});

export const getESRScoresByCountry = createSelector(
  getESRScoresForYear,
  scores => scoresByCountry(scores, 'esr'),
);

export const getCPRScoresByCountry = createSelector(
  getCPRScoresForYear,
  scores => scoresByCountry(scores, 'cpr'),
);

// NOTE not currently used due to bad performance
export const getIndicatorScoresByCountry = createSelector(
  getESRYear,
  getESRIndicatorScores,
  (year, scores) => indicatorScoresByCountry(year, scores),
);

export const getScoresByCountry = createSelector(
  getESRScoresByCountry,
  getCPRScoresByCountry,
  // getIndicatorScoresByCountry,
  // (esr, cpr, indicators) => ({
  (esr, cpr) => ({
    esr,
    cpr,
    // indicators,
  }),
);

export const getNumberCountriesWithScores = createSelector(
  getCountries,
  getESRScoresByCountry,
  getCPRScoresByCountry,
  (countries, esr, cpr) => {
    if (!countries || !esr || !cpr) return 0;
    const countriesWithRightsScores = countries.filter(
      c =>
        Object.keys(cpr).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1 ||
        Object.keys(esr).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1,
    );
    return countriesWithRightsScores.length;
  },
);

// aux indicators
// all countries data for latest year any data is available
// could introduce lookback period to include data from previous year if current not available
export const getAuxIndicatorsLatest = createSelector(
  getAuxIndicators,
  getCountries,
  (values, countries) => {
    if (!values || !countries) return null;
    const latestYearsPerAttribute = map(COLUMNS.AUX, column => {
      const attrValues = values.filter(
        val => val[column] && val[column] !== '',
      );
      return {
        col: column,
        year: calcMaxYear(attrValues),
      };
    });
    return countries.map(c =>
      latestYearsPerAttribute.reduce(
        (countryData, attribute) => {
          const value = values.find(
            val =>
              val.country_code === countryData.country_code &&
              val.year === attribute.year,
          );
          // prettier-ignore
          return value
            ? {
              ...countryData,
              [attribute.col]: value[attribute.col],
              [`${attribute.col}-year`]: attribute.year,
            } : countryData;
        },
        { country_code: c.country_code },
      ),
    );
    // console.log(countries)
    // return filterScoresByYear(2016, values);
  },
);
// single country, single year
export const getAuxIndicatorsForCountry = createSelector(
  (state, country) => country,
  getAuxIndicators,
  getMaxYearESR,
  (country, data, year) =>
    data &&
    data.find(d => d.country_code === country && quasiEquals(d.year, year)),
);
export const getLatestCountryCurrentGDP = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.GDP_CURRENT_US])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.GDP_CURRENT_US],
        year: sorted[0].year,
      };
    }
    return false;
  },
);
export const getLatestCountry2017PPPGDP = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.GDP_2017_PPP])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.GDP_2017_PPP],
        year: sorted[0].year,
      };
    }
    return false;
  },
);
export const getLatestCountryPopulation = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.POPULATION])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.POPULATION],
        year: sorted[0].year,
      };
    }
    return false;
  },
);
export const getHowToRead = createSelector(
  getGlobal,
  global => global.howToRead,
);
export const getSettingsLayer = createSelector(
  getGlobal,
  global => global.settings,
);
export const getAsideLayer = createSelector(
  getGlobal,
  global => global.asideLayer,
);
export const getAsideLayerActiveCode = createSelector(
  getAsideLayer,
  asideLayer => asideLayer && asideLayer.code,
);

export const getCookieConsent = createSelector(
  getGlobal,
  global => global.cookieConsent,
);
export const getCookieConsentApp = createSelector(
  getGlobal,
  global => global.cookieConsentApp,
);
export const getCookieConsentChecked = createSelector(
  getGlobal,
  global => global.cookieConsentChecked,
);
export const getGAStatus = createSelector(
  getGlobal,
  global => global.gaInitiliased,
);

export const getDependenciesReady = createSelector(
  (state, dependencies) => dependencies,
  getDataReady,
  (dependencies, data) => dependencies.reduce((m, d) => !!data[d] && m, true),
);

export const getHasCountryESRIndicatorScores = createSelector(
  getIndicatorScoresForCountry,
  getESRIndicators,
  getStandardSearch,
  (countryScores, indicators, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const otherStandard = STANDARDS.find(as => as.key !== standardSearch);
    return {
      some: countryScores && countryScores.length > 0,
      standard:
        countryScores &&
        indicators &&
        countryScores.filter(s => {
          const details = indicators.find(i => i.metric_code === s.metric_code);
          return (
            details.standard === 'Both' || details.standard === standard.code
          );
        }).length > 0,
      otherStandard:
        countryScores &&
        indicators &&
        countryScores.filter(s => {
          const details = indicators.find(i => i.metric_code === s.metric_code);
          return (
            details.standard === 'Both' ||
            details.standard === otherStandard.code
          );
        }).length > 0,
    };
  },
);

export const getHasCountryESRScores = createSelector(
  (state, countryCode) => countryCode,
  getESRScores,
  getESRYear,
  getStandardSearch,
  (countryCode, scores, year, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const otherStandard = STANDARDS.find(as => as.key !== standardSearch);
    const countryScores =
      scores &&
      scores.filter(
        s => s.country_code === countryCode && quasiEquals(s.year, year),
      );
    return {
      some: countryScores && countryScores.length > 0,
      standard:
        countryScores &&
        countryScores.filter(s => s.standard === standard.code).length > 0,
      otherStandard:
        countryScores &&
        countryScores.filter(s => s.standard === otherStandard.code).length > 0,
    };
  },
);

export const getPacificScores = createSelector(
  getData,
  data => data.pacific,
);

export const getMinYearPacific = createSelector(
  getPacificScores,
  scores => calcMinYear(scores),
);

export const getMaxYearPacific = createSelector(
  getPacificScores,
  scores => calcMaxYear(scores),
);

export const getPacificScoresForCountry = createSelector(
  (state, countryCode) => countryCode,
  getPacificScores,
  (countryCode, scores) =>
    scores && scores.filter(s => s.country_code === countryCode),
);

export const getLatestPacificScores = createSelector(
  getMaxYearPacific,
  getPacificScores,
  (maxYear, scores) =>
    scores && scores.filter(s => quasiEquals(s.year, maxYear)),
);

export const getLatestPacificScoresForCountry = createSelector(
  getMaxYearPacific,
  getPacificScoresForCountry,
  (maxYear, scores) => {
    const minYear = calcMinYear(scores);
    let year = maxYear;
    let sc = null;
    do {
      sc = scores && scores.filter(s => quasiEquals(s.year, year));
      year--;
    } while ((!sc || sc.length === 0) && year >= minYear);
    return sc;
  },
);

export const getPacificScoresByMetric = createSelector(
  (state, metricCode) => metricCode,
  getPacificScores,
  (metricCode, scores) =>
    scores && scores.filter(s => s.metric_code === metricCode),
);

export const getPacificScoresByMetricByYear = createSelector(
  (state, metricCode, year) => year,
  getPacificScoresByMetric,
  (year, scores) => scores && scores.filter(s => quasiEquals(s.year, year)),
);
