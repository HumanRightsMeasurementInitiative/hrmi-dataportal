/**
 * The global and router state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { METRIC_TYPES, SCALES, STANDARDS, BENCHMARKS } from './constants';
import { DEFAULT_LOCALE, appLocales } from '../../i18n';

// router sub-state
const getRouter = state => state.router;

export const getRouterLocation = createSelector(
  getRouter,
  routerState => routerState.location,
);

/**
 * Get the language locale
 */
export const getLocale = createSelector(
  getRouterLocation,
  location => {
    if (location && location.pathname) {
      const splitPath = location.pathname.split('/');
      return splitPath.length > 1 && appLocales.indexOf(splitPath[1]) >= 0
        ? splitPath[1]
        : DEFAULT_LOCALE;
    }
    return DEFAULT_LOCALE;
  },
);

export const getRouterSearchParams = createSelector(
  getRouterLocation,
  location =>
    location && location.search ? new URLSearchParams(location.search) : {},
);

export const getScale = createSelector(
  getRouterSearchParams,
  search =>
    search.has('scale') && SCALES.indexOf(search.get('scale')) > -1
      ? search.get('scale')
      : SCALES[0],
);
export const getStandard = createSelector(
  getRouterSearchParams,
  search =>
    search.has('as') && STANDARDS.map(s => s.key).indexOf(search.get('as')) > -1
      ? search.get('as')
      : STANDARDS[0].key,
);
export const getBenchmark = createSelector(
  getRouterSearchParams,
  search =>
    search.has('pb') &&
    BENCHMARKS.map(s => s.key).indexOf(search.get('pb')) > -1
      ? search.get('pb')
      : BENCHMARKS[0].key,
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
  getDataRequested,
  (requested, key) => requested[key],
);

export const getCountries = createSelector(
  getData,
  data => data.countries,
);

// fake selector
export const getMetricTypes = () => METRIC_TYPES;

// single metric
// single dimension, multiple countries, single year
export const getDimensionScores = () => null;
// single right, multiple countries, single year
export const getRightScores = () => null;
// single indicator, multiple countries, single year
export const getIndicatorScores = () => null;

// single country
// single country, all dimensions, single year
export const getDimensionsForCountry = () => null;
// single country, all dimensions, single year
export const getRightsForCountry = () => null;
// single country, all dimensions, single year
export const getIndicatorsForCountry = () => null;

// at risk
// single country, single right, single year
export const getPeople = () => null;
