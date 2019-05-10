/**
 * The global and router state selectors
 */

import { createSelector } from 'reselect';

import { DEFAULT_LOCALE, appLocales } from 'i18n';
import isInteger from 'utils/is-integer';
import quasiEquals from 'utils/quasi-equals';

import { initialState } from './reducer';
import {
  SCALES,
  STANDARDS,
  BENCHMARKS,
  REGIONS,
  COUNTRY_SORTS,
  INCOME_GROUPS,
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  PEOPLE_GROUPS,
} from './constants';

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
export const getRegionSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('region') && REGIONS.indexOf(search.get('region')) > -1
      ? search.get('region')
      : false,
);
export const getIncomeSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('income') &&
    INCOME_GROUPS.map(s => s.key).indexOf(search.get('income')) > -1
      ? search.get('income')
      : false,
);
export const getGroupSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('group') &&
    PEOPLE_GROUPS.map(s => s.key).indexOf(search.get('group')) > -1
      ? search.get('group')
      : PEOPLE_GROUPS[0].key,
);
export const getSortSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('sort') && COUNTRY_SORTS.indexOf(search.get('sort')) > -1
      ? search.get('sort')
      : COUNTRY_SORTS[0],
);
export const getSortOrderSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('dir') && ['asc', 'desc'].indexOf(search.get('dir')) > -1
      ? search.get('dir')
      : 'asc',
);

// global sub-state
const getGlobal = state => state.global || initialState;

const getData = createSelector(
  getGlobal,
  global => global.data,
);

const getDataRequested = createSelector(
  getGlobal,
  global => global.dataRequested,
);

export const getDataRequestedByKey = createSelector(
  (state, key) => key,
  getDataRequested,
  (key, requested) => requested[key],
);

const getContent = createSelector(
  getGlobal,
  global => global.content,
);

const getContentRequested = createSelector(
  getGlobal,
  global => global.contentRequested,
);

export const getContentRequestedByKey = createSelector(
  (state, key) => key,
  getContentRequested,
  (key, requested) => requested[key],
);
export const getContentByKey = createSelector(
  (state, key) => key,
  getContent,
  (key, content) => content[key],
);

export const getCountries = createSelector(
  getData,
  data => data.countries,
);
export const getCountry = createSelector(
  (store, code) => code,
  getCountries,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
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

const sortByNumber = (data, column, asc = true) => {
  const reverse = asc ? 1 : -1;
  return data.sort(
    (a, b) =>
      reverse * (parseInt(a[column], 10) < parseInt(b[column], 10) ? 1 : -1),
  );
};
const calcMaxYear = scores =>
  scores && scores.length > 0 && sortByNumber(scores, 'year')[0].year;
const calcMinYear = scores =>
  scores && scores.length > 0 && sortByNumber(scores, 'year', false)[0].year;

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

export const getCountriesFiltered = createSelector(
  getCountries,
  getRegionSearch,
  getIncomeSearch,
  (countries, region, income) =>
    countries &&
    countries
      .filter(c => !region || c.region_code === region)
      .filter(
        c =>
          !income ||
          (INCOME_GROUPS.find(i => i.key === income) &&
            quasiEquals(
              c.high_income_country,
              INCOME_GROUPS.find(i => i.key === income).value,
            )),
      ),
);

const getESRYear = createSelector(
  getYearESRSearch,
  getMaxYearESR,
  (searchYear, maxYear) => parseInt(searchYear || maxYear, 10),
);
const getCPRYear = createSelector(
  getYearCPRSearch,
  getMaxYearCPR,
  (searchYear, maxYear) => parseInt(searchYear || maxYear, 10),
);

// single metric
// single dimension, multiple countries, single year
export const getESRDimensionScores = createSelector(
  (state, metric) => metric,
  getESRScores,
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
  getStandardSearch,
  getESRYear,
  (metric, scores, countries, region, income, standard, year) =>
    scores &&
    countries &&
    scores.filter(
      s =>
        STANDARDS.find(as => as.key === standard) &&
        DIMENSIONS.find(d => d.key === 'esr') &&
        s.standard === STANDARDS.find(as => as.key === standard).code &&
        s.metric_code === DIMENSIONS.find(d => d.key === 'esr').code &&
        parseInt(s.year, 10) === year &&
        (!(region || income) ||
          countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    ),
);

export const getCPRDimensionScores = createSelector(
  (state, metric) => metric,
  getCPRScores,
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
  getCPRYear,
  (metric, scores, countries, region, income, year) =>
    scores &&
    countries &&
    scores.filter(
      s =>
        !!metric && // make sure a metric is set
        DIMENSIONS.find(d => d.key === metric) &&
        s.metric_code === DIMENSIONS.find(d => d.key === metric).code &&
        parseInt(s.year, 10) === year &&
        (!(region || income) ||
          countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    ),
);

// single right, multiple countries, single year
export const getESRRightScores = createSelector(
  (state, metric) => metric,
  getESRScores,
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
  getStandardSearch,
  getGroupSearch,
  getESRYear,
  (metric, scores, countries, region, income, standard, group, year) =>
    scores &&
    countries &&
    scores.filter(
      s =>
        !!metric &&
        RIGHTS.find(d => d.key === metric) &&
        s.group === PEOPLE_GROUPS.find(g => g.key === group).code &&
        s.standard === STANDARDS.find(as => as.key === standard).code &&
        s.metric_code === RIGHTS.find(d => d.key === metric).code &&
        parseInt(s.year, 10) === year &&
        (!(region || income) ||
          countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    ),
);

// single right, multiple countries, single year
export const getCPRRightScores = createSelector(
  (state, metric) => metric,
  getCPRScores,
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
  getCPRYear,
  (metric, scores, countries, region, income, year) =>
    scores &&
    countries &&
    scores.filter(
      s =>
        !!metric && // make sure a metric is set
        RIGHTS.find(d => d.key === metric) &&
        s.metric_code === RIGHTS.find(d => d.key === metric).code &&
        parseInt(s.year, 10) === year &&
        (!(region || income) ||
          countries.map(c => c.country_code).indexOf(s.country_code) > -1),
    ),
);
// single indicator, multiple countries, single year
export const getIndicatorScores = createSelector(
  (state, metric) => metric,
  getESRIndicatorScores,
  getCountriesFiltered,
  getRegionSearch,
  getIncomeSearch,
  getGroupSearch,
  getESRYear,
  (metric, scores, countries, region, income, group, year) => {
    if (scores && countries) {
      if (metric && INDICATORS.find(d => d.key === metric)) {
        // first filter by group, metric, countries
        const filtered = scores.filter(
          s =>
            s.group === PEOPLE_GROUPS.find(g => g.key === group).code &&
            s.metric_code === INDICATORS.find(d => d.key === metric).code &&
            (!(region || income) ||
              countries.map(c => c.country_code).indexOf(s.country_code) > -1),
        );
        // then get the most recent year for each country
        // figure out most recent data by country
        const countryYears = filtered.reduce((memo, s) => {
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
        const filteredYear = filtered.filter(
          s =>
            parseInt(s.year, 10) === year ||
            parseInt(s.year, 10) === countryYears[s.country_code],
        );
        return filteredYear;
      }
      return [];
    }
    return false;
  },
);

// single country
// single country, all dimensions, single year
export const getDimensionsForCountry = createSelector(
  (state, country) => country,
  getESRScores,
  getCPRScores,
  getStandardSearch,
  getESRYear,
  getCPRYear,
  (country, esrScores, cprScores, standard, esrYear, cprYear) =>
    country &&
    esrScores &&
    cprScores && {
      esr: esrScores.filter(
        s =>
          s.country_code === country &&
          parseInt(s.year, 10) === esrYear &&
          s.standard === STANDARDS.find(as => as.key === standard).code &&
          s.metric_code === DIMENSIONS.find(d => d.key === 'esr').code,
      ),
      cpr: cprScores.filter(
        s =>
          s.country_code === country &&
          parseInt(s.year, 10) === cprYear &&
          DIMENSIONS.filter(d => d.type === 'cpr')
            .map(d => d.code)
            .indexOf(s.metric_code) > -1,
      ),
    },
);

// single country, all rights, single year
export const getRightsForCountry = createSelector(
  (state, country) => country,
  getESRScores,
  getCPRScores,
  getStandardSearch,
  getGroupSearch,
  getESRYear,
  getCPRYear,
  (country, esrScores, cprScores, standard, group, esrYear, cprYear) =>
    country &&
    esrScores &&
    cprScores && {
      esr: esrScores.filter(
        s =>
          s.country_code === country &&
          parseInt(s.year, 10) === esrYear &&
          s.group === PEOPLE_GROUPS.find(g => g.key === group).code &&
          s.standard === STANDARDS.find(as => as.key === standard).code &&
          RIGHTS.filter(d => d.type === 'esr')
            .map(d => d.code)
            .indexOf(s.metric_code) > -1,
      ),
      cpr: cprScores.filter(
        s =>
          s.country_code === country &&
          parseInt(s.year, 10) === cprYear &&
          RIGHTS.filter(d => d.type === 'cpr')
            .map(d => d.code)
            .indexOf(s.metric_code) > -1,
      ),
    },
);
// single country, all indicators, single year
export const getIndicatorsForCountry = createSelector(
  (state, country) => country,
  getESRIndicatorScores,
  getGroupSearch,
  getESRYear,
  (country, scores, group, year) => {
    if (scores && country) {
      // first filter by group
      const filtered = scores.filter(
        s =>
          s.country_code === country &&
          s.group === PEOPLE_GROUPS.find(g => g.key === group).code,
      );
      // then get the most recent year for each metric
      // figure out most recent data by metric
      const metricYears = filtered.reduce((memo, s) => {
        const result = memo;
        const metric = s.metric_code;
        if (
          typeof result[metric] === 'undefined' ||
          (parseInt(s.year, 10) > result[metric] &&
            parseInt(s.year, 10) <= year)
        ) {
          result[metric] = parseInt(s.year, 10);
        }
        return result;
      }, {});
      // finally filter by year or most recent year
      const filteredYear = filtered.filter(
        s =>
          parseInt(s.year, 10) === year ||
          parseInt(s.year, 10) === metricYears[s.metric_code],
      );
      return filteredYear;
    }
    return false;
  },
);

// at risk
// single country, single right, single year
export const getPeople = () => null;
