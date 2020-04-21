/**
 * The global and router state selectors
 */

import { createSelector } from 'reselect';
import { uniq } from 'lodash/array';
import { DEFAULT_LOCALE, appLocales } from 'i18n';
import isInteger from 'utils/is-integer';
import quasiEquals from 'utils/quasi-equals';

import getMetricDetails from 'utils/metric-details';

import {
  hasCountryAttribute,
  hasCountryIncome,
  isCountryHighIncome,
  isCountryOECD,
  isCountryFeatured,
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
  SUBREGIONS_FOR_COMPARISON,
} from './constants';

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
export const getScaleSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('scale') &&
    SCALES.map(s => s.key).indexOf(search.get('scale')) > -1
      ? search.get('scale')
      : SCALES[0].key,
);
export const getStandardSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('as') && STANDARDS.map(s => s.key).indexOf(search.get('as')) > -1
      ? search.get('as')
      : STANDARDS[0].key,
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
export const getFeaturedValues = createSelector(
  getFeatured,
  featured =>
    featured && ['any'].concat(featured.map(f => f[COLUMNS.FEATURED.CAT])),
);

export const getFeaturedSearch = createSelector(
  getFeaturedValues,
  getRouterSearchParams,
  (featuredValues, search) =>
    search.has('featured') &&
    featuredValues &&
    searchValues(featuredValues, search.getAll('featured')),
);
const getHasChartSettingFilters = createSelector(
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  getFeaturedSearch,
  (region, subregion, income, cgroup, treaty, featured) =>
    region || subregion || income || cgroup || treaty || featured,
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

export const getCountriesFeatured = createSelector(
  getFeatured,
  getCountries,
  (featured, countries) => {
    if (!featured || !countries) {
      return null;
    }
    return countries.map(country => ({
      ...country,
      featured: featured.reduce((memo2, cat) => {
        if (
          cat[COLUMNS.FEATURED.COUNTRIES].indexOf(
            country[COLUMNS.COUNTRIES.CODE],
          ) > -1
        ) {
          return `${memo2}${memo2 === '' ? '' : ','}${
            cat[COLUMNS.FEATURED.CAT]
          }`;
        }
        return memo2;
      }, ''),
    }));
  },
);
export const getCountriesFeaturedOnly = createSelector(
  getCountriesFeatured,
  countries =>
    countries &&
    countries.filter(country => country.featured && country.featured !== ''),
);

// data / content
const getContent = createSelector(
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

export const getCountriesFiltered = createSelector(
  getCountries,
  getFeatured,
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  getFeaturedSearch,
  (
    countries,
    featuredCountries,
    region,
    subregion,
    income,
    cgroup,
    treaty,
    featured,
  ) =>
    countries &&
    featuredCountries &&
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
      .filter(c => !income || hasCountryIncome(c, income))
      .filter(
        c => !featured || isCountryFeatured(c, featured, featuredCountries),
      ),
);

// single metric
export const getIndicatorInfo = createSelector(
  (state, metricCode) => metricCode,
  getESRIndicators,
  (metricCode, indicators) =>
    indicators && indicators.find(i => i.metric_code === metricCode),
);

// single dimension, multiple countries, single year
export const getESRDimensionScores = createSelector(
  getESRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getStandardSearch,
  getESRYear,
  (scores, countries, hasChartSettingFilters, standardSearch, year) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const dimension = DIMENSIONS.find(d => d.key === 'esr');
    return (
      standard &&
      dimension &&
      scores &&
      countries &&
      scores.filter(
        s =>
          s.standard === standard.code &&
          s.metric_code === dimension.code &&
          quasiEquals(s.year, year) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);

export const getCPRDimensionScores = createSelector(
  (state, metric) => metric,
  getCPRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getCPRYear,
  (metric, scores, countries, hasChartSettingFilters, year) => {
    // make sure a metric is set
    const dimension = !!metric && DIMENSIONS.find(d => d.key === metric);
    return (
      dimension &&
      scores &&
      countries &&
      scores.filter(
        s =>
          s.metric_code === dimension.code &&
          quasiEquals(s.year, year) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);

// single right, multiple countries, single year
export const getESRRightScores = createSelector(
  (state, metric) => metric,
  getESRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getStandardSearch,
  getESRYear,
  (metric, scores, countries, hasChartSettingFilters, standardSearch, year) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const group = PEOPLE_GROUPS[0];
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    return (
      scores &&
      countries &&
      right &&
      scores.filter(
        s =>
          s.group === group.code &&
          s.standard === standard.code &&
          s.metric_code === right.code &&
          quasiEquals(s.year, year) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);

// single right, multiple countries, single year
export const getCPRRightScores = createSelector(
  (state, metric) => metric,
  getCPRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getCPRYear,
  (metric, scores, countries, hasChartSettingFilters, year) => {
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    return (
      scores &&
      countries &&
      right &&
      scores.filter(
        s =>
          s.metric_code === right.code &&
          quasiEquals(s.year, year) &&
          (!hasChartSettingFilters ||
            countries.map(c => c.country_code).indexOf(s.country_code) > -1),
      )
    );
  },
);
// single indicator, multiple countries, single year
export const getIndicatorScores = createSelector(
  (state, metric) => metric,
  getESRIndicatorScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getESRYear,
  (metric, scores, countries, hasChartSettingFilters, year) => {
    if (scores && countries) {
      const indicator = metric && INDICATORS.find(d => d.key === metric);
      const group = PEOPLE_GROUPS[0];
      if (indicator) {
        // first filter by group, metric, countries
        const filteredScores = scores.filter(
          s =>
            s.group === group.code &&
            s.metric_code === indicator.code &&
            (!hasChartSettingFilters ||
              countries.map(c => c.country_code).indexOf(s.country_code) > -1),
        );
        // then get the most recent year for each country
        // figure out most recent data by country
        const countryYears = filteredScores.reduce((memo, s) => {
          const result = memo;
          const country = s.country_code;
          if (
            typeof result[country] === 'undefined' ||
            (parseInt(s.year, 10) > result[country] &&
              parseInt(s.year, 10) <= year)
          ) {
            result[country] = parseInt(s.year, 10);
          }
          return result;
        }, {});
        // finally filter by year or most recent year
        const filteredYear = filteredScores.filter(
          s =>
            quasiEquals(s.year, year) ||
            quasiEquals(s.year, countryYears[s.country_code]),
        );
        return filteredYear;
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
          quasiEquals(s.year, esrYear),
      )
    );
  },
);

export const getESRIndicatorScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metric }) => metric,
  getESRIndicatorScores,
  (countryCode, metric, scores) =>
    scores &&
    scores.filter(
      s => s.country_code === countryCode && s.metric_code === metric.code,
    ),
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
            [i.key]: {
              score: scores.find(
                s =>
                  s.metric_code === i.code && s.group === PEOPLE_GROUPS[0].code,
              ),
              details,
              ...i,
            },
            ...memo,
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
const atRiskScores = (
  data,
  rightKey,
  countryCode,
  year,
  includeSubright = false,
) => {
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
            quasiEquals(d.year, year) &&
            d.country_code === countryCode &&
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
export const getPeopleAtRiskForCountry = createSelector(
  (state, { country }) => country,
  getAtRiskData,
  getCPRYear,
  (country, data, year) =>
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
                atRiskData: atRiskScores(data, r.key, country, year),
              },
            },
        {},
      ),
      ...dim,
    })),
);

export const getPeopleAtRisk = createSelector(
  (state, { country }) => country,
  (state, { metric }) => getMetricDetails(metric),
  getAtRiskData,
  getMaxYearAtRisk,
  (country, metric, data, year) => {
    if (!data) return false;
    if (metric.metricType === 'rights') {
      return atRiskScores(data, metric.key, country, year, true);
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
                atRiskData: atRiskScores(data, r.key, country, year),
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

export const getESRDimensionScoresForYear = createSelector(
  getESRYear,
  getESRScores,
  (year, scores) => {
    const dimension = DIMENSIONS.find(d => d.key === 'esr');
    return (
      dimension &&
      scores &&
      scores.filter(
        s => s.metric_code === dimension.code && quasiEquals(s.year, year),
      )
    );
  },
);

export const getCPRDimensionScoresForYear = createSelector(
  getCPRYear,
  getCPRScores,
  (year, scores) => {
    const dimensions = DIMENSIONS.filter(d => d.type === 'cpr');
    return (
      dimensions &&
      scores &&
      dimensions.reduce(
        (m, d) => ({
          ...m,
          [d.key]: scores.filter(
            s => s.metric_code === d.code && quasiEquals(s.year, year),
          ),
        }),
        {},
      )
    );
  },
);

// esr: average of countries in same region, if high income country use ALL high income average best calculate for both standards and benchmarks
// cpr: average mean score of other countries worldwide, if high income oecd country only use HI OECD average

const esrScoreAdder = (sum, referenceCountry, scores, metrics) => {
  // look up country score
  const referenceScores = scores.filter(
    s =>
      s.country_code === referenceCountry.country_code &&
      metrics.map(m => m.code).indexOf(s.metric_code) > -1,
  );
  if (!referenceScores || referenceScores.length === 0) {
    return sum;
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
      sum.sumAdjusted +
      parseFloat(referenceAverage[COLUMNS.ESR.SCORE_ADJUSTED]),
    sumBest: sum.sumBest + parseFloat(referenceAverage[COLUMNS.ESR.SCORE_BEST]),
    count: sum.count + 1,
  };
};

const cprScoreAdder = (sum, referenceCountry, scores) => {
  const score = scores.find(
    s => s.country_code === referenceCountry.country_code,
  );
  // prettier-ignore
  return score
    ? {
      sum: sum.sum + parseFloat(score[COLUMNS.CPR.MEAN]),
      count: sum.count + 1,
    }
    : sum;
};

export const getReferenceScores = createSelector(
  getCountryFromRouter,
  getCountries,
  getStandardSearch,
  getESRScoresForYear,
  getCPRDimensionScoresForYear,
  (country, countries, standard, esrScores, cprDimScores) => {
    if (!country || !countries || !esrScores || !cprDimScores) return false;

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
        } else if (
          SUBREGIONS_FOR_COMPARISON.indexOf(country.subregion_code) > -1
        ) {
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
    let referenceCountriesCPR;
    if (isCountryHighIncome(country) && isCountryOECD(country)) {
      referenceCountriesCPR = countries.filter(
        c => isCountryHighIncome(c) && isCountryOECD(country),
      );
    } else {
      referenceCountriesCPR = countries.filter(
        c => c.country_code !== country.country_code,
      );
    }
    const cprDimensions = DIMENSIONS.filter(d => d.type === 'cpr');
    const cprSums = cprDimensions.reduce(
      (dimSums, d) => ({
        ...dimSums,
        [d.key]: referenceCountriesCPR.reduce(
          (sum, referenceCountry) =>
            cprScoreAdder(sum, referenceCountry, cprDimScores[d.key]),
          {
            sum: 0,
            count: 0,
          },
        ),
      }),
      {},
    );
    const cprAverages = cprDimensions.reduce(
      (m, d) => ({
        ...m,
        [d.key]: {
          ...cprSums[d.key],
          average: cprSums[d.key].sum / cprSums[d.key].count,
        },
      }),
      {},
    );

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

// aux indicators
// all countries
export const getAuxIndicatorsLatest = createSelector(
  getMaxYearESR,
  getAuxIndicators,
  (year, scores) => filterScoresByYear(year, scores),
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
export const getLatestCountry2011PPPGDP = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.GDP_2011_PPP])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.GDP_2011_PPP],
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

export const getCookieConsent = createSelector(
  getGlobal,
  global => global.cookieConsent,
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
