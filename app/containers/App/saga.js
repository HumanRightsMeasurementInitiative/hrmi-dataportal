import { takeEvery, takeLatest, select, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { csvParse } from 'd3-dsv';
import extend from 'lodash/extend';
import 'whatwg-fetch';

import quasiEquals from 'utils/quasi-equals';

import { DEFAULT_LOCALE } from 'i18n';

// import dataRequest from 'utils/data-request';
import {
  getLocale,
  getRouterLocation,
  getRouterPath,
  getRouterSearchParams,
  getCountry,
  getStandardSearch,
  getDataByKey,
  getContentByKey,
  getDataRequestedByKey,
  getContentRequestedByKey,
} from './selectors';

import {
  dataRequested,
  contentRequested,
  dataLoaded,
  dataLoadingError,
  contentLoaded,
  contentLoadingError,
  loadContentIfNeeded,
} from './actions';
import {
  LOAD_DATA_IF_NEEDED,
  DATA_URL,
  DATA_RESOURCES,
  LOAD_CONTENT_IF_NEEDED,
  PAGES,
  PAGES_URL,
  SELECT_COUNTRY,
  SELECT_METRIC,
  NAVIGATE,
  STANDARDS,
  INCOME_GROUPS,
  SET_SCALE,
  SET_STANDARD,
  SET_BENCHMARK,
  SET_TAB,
  SET_MODALTAB,
} from './constants';

const MAX_LOAD_ATTEMPTS = 5;

/**
 * Generator function. Function for restarting sagas multiple times before giving up and calling the error handler.
 * - following https://codeburst.io/try-again-more-redux-saga-patterns-bfbc3ffcdc
 *
 * @param {function} generator the saga generator to be restarted
 * @param {function} handleError the error handler after X unsuccessful tries
 * @param {integer} maxTries the maximum number of tries
 */
const autoRestart = (generator, handleError, maxTries = MAX_LOAD_ATTEMPTS) =>
  function* autoRestarting(...args) {
    let n = 0;
    while (n < maxTries) {
      n += 1;
      try {
        yield call(generator, ...args);
        break;
      } catch (err) {
        if (n >= maxTries) {
          yield handleError(err, ...args);
        }
      }
    }
  };

export function* loadDataSaga({ key }) {
  const resourceIndex = DATA_RESOURCES.map(r => r.key).indexOf(key);
  if (resourceIndex > -1) {
    // requestedSelector returns the times that entities where fetched from the API
    const requestedAt = yield select(getDataRequestedByKey, key);
    const ready = yield select(getDataByKey, key);
    // If haven't loaded yet, do so now.
    if (!requestedAt && !ready) {
      const url = `${DATA_URL}/${DATA_RESOURCES[resourceIndex].file}`;
      try {
        // First record that we are requesting
        yield put(dataRequested(key, Date.now()));
        const response = yield fetch(url);
        const responseOk = yield response.ok;
        if (responseOk && typeof response.text === 'function') {
          const responseBody = yield response.text();
          if (responseBody) {
            yield put(dataLoaded(key, csvParse(responseBody), Date.now()));
          } else {
            yield put(dataRequested(key, false));
            throw new Error(response.statusText);
          }
        } else {
          yield put(dataRequested(key, false));
          throw new Error(response.statusText);
        }
      } catch (err) {
        yield put(dataRequested(key, false));
        // throw error
        throw new Error(err);
      }
    }
  }
}
// key expected to include full path, for at risk data metric/country
export function* loadContentSaga({ key, contentType = 'page', locale }) {
  const pageIndex = PAGES.indexOf(key);
  if (pageIndex > -1 || contentType === 'atrisk') {
    const requestedAt = yield select(getContentRequestedByKey, key);
    const ready = yield select(getContentByKey, key);
    // If haven't loaded yet, do so now.
    if (!requestedAt && !ready) {
      const requestLocale = yield locale || select(getLocale);
      const url = `${PAGES_URL}${requestLocale}/${key}/`;
      try {
        // First record that we are requesting
        yield put(contentRequested(key, Date.now()));
        const response = yield fetch(url);
        const responseOk = yield response.ok;
        if (responseOk && typeof response.text === 'function') {
          const responseBody = yield response.text();
          if (responseBody) {
            yield put(
              contentLoaded(key, responseBody, Date.now(), requestLocale),
            );
          } else {
            yield put(contentRequested(key, false));
            throw new Error(response.statusText);
          }
        } else if (
          quasiEquals(response.status, 404) &&
          contentType === 'atrisk' &&
          requestLocale !== DEFAULT_LOCALE
        ) {
          yield put(contentRequested(key, false));
          yield put(loadContentIfNeeded(key, 'atrisk', DEFAULT_LOCALE));
        } else {
          yield put(contentRequested(key, false));
          throw new Error(response.statusText);
        }
      } catch (err) {
        // throw error
        yield put(contentRequested(key, false));
        throw new Error(err);
      }
    }
  }
}

/**
 * Generator function. Load data error handler:
 * - Record load error
 *
 * @param {object} payload {key: data set key}
 */
function* loadDataErrorHandler(err, { key }) {
  yield put(dataLoadingError(key, err));
}
function* loadContentErrorHandler(err, { key }) {
  yield put(contentLoadingError(key, err));
}

export function* selectCountrySaga({ code }) {
  // figure out country group and default standard
  const country = yield select(getCountry, code);
  const group =
    country &&
    INCOME_GROUPS.find(g => quasiEquals(country.high_income_country, g.value));
  const countryDefaultStandard =
    group && STANDARDS.find(s => s.key === group.standard);

  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  searchParams.delete('tab');

  // change to default standard if not already
  const currentStandard = yield select(getStandardSearch);
  if (countryDefaultStandard.key !== currentStandard) {
    yield searchParams.set('as', countryDefaultStandard.key);
  }

  // navigate to country and default standard
  const requestLocale = yield select(getLocale);

  const newSearch = searchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';

  yield put(push(`/${requestLocale}/country/${code}${search}`));
}

export function* setScaleSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('scale', value);

  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(push(`${path}?${searchParams.toString()}`));
}

export function* setStandardSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('as', value);

  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(push(`${path}?${searchParams.toString()}`));
}

export function* setBenchmarkSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('pb', value);

  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(push(`${path}?${searchParams.toString()}`));
}
export function* setTabSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('tab', value);

  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(push(`${path}?${searchParams.toString()}`));
}
export function* setModalTabSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('mtab', value);

  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(push(`${path}?${searchParams.toString()}`));
}

export function* selectMetricSaga({ code }) {
  const requestLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  const currentSearchParams = new URLSearchParams(currentLocation.search);
  currentSearchParams.delete('tab');
  const newSearch = currentSearchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';
  yield put(push(`/${requestLocale}/metric/${code}${search}`));
}

// location can either be string or object { pathname, search}
export function* navigateSaga({ location, args }) {
  // default args
  const xArgs = extend(
    {
      needsLocale: true,
      replace: true,
      deleteParams: false,
      keepTab: false,
    },
    args || {},
  );
  const requestLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  const currentSearchParams = new URLSearchParams(currentLocation.search);

  // the new pathname
  let newPathname;
  // the new search (URLSearchParams object)
  let newSearchParams;

  // if location is string
  // use as pathname and keep old search
  // note: location path is expected not to contain the locale
  if (typeof location === 'string') {
    newPathname = xArgs.needsLocale ? `/${requestLocale}` : '/';
    if (location !== '') {
      newPathname += `/${location}`;
    }
    newSearchParams = currentSearchParams;
  }

  // if location is object, use pathname and replace or extend search
  // location path is expected not to contain the locale
  else if (typeof location === 'object') {
    // figure out new pathname or keep old one
    if (typeof location.pathname !== 'undefined') {
      newPathname = xArgs.needsLocale
        ? `/${requestLocale}${location.pathname}`
        : location.pathname;
    } else {
      newPathname = currentLocation.pathname;
    }

    // figure out new search or keep old search
    if (typeof location.search !== 'undefined') {
      newSearchParams = new URLSearchParams(location.search);
      // optionally keep old params
      if (!xArgs.replace) {
        newSearchParams.forEach((value, key) =>
          currentSearchParams.set(key, value),
        );
        newSearchParams = currentSearchParams;
      }
    } else {
      newSearchParams = currentSearchParams;
    }
  }

  // clean up search params
  if (!xArgs.keepTab) {
    newSearchParams.delete('tab');
  }
  if (xArgs.deleteParams) {
    xArgs.deleteParams.forEach(p => newSearchParams.delete(p));
  }
  // convert to string and append if necessary
  const newSearch = newSearchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';
  yield put(push(`${newPathname}${search}`));
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(
    LOAD_DATA_IF_NEEDED,
    autoRestart(loadDataSaga, loadDataErrorHandler, MAX_LOAD_ATTEMPTS),
  );
  yield takeLatest(
    LOAD_CONTENT_IF_NEEDED,
    autoRestart(loadContentSaga, loadContentErrorHandler, MAX_LOAD_ATTEMPTS),
  );
  yield takeLatest(SELECT_COUNTRY, selectCountrySaga);
  yield takeLatest(SELECT_METRIC, selectMetricSaga);
  yield takeLatest(SET_SCALE, setScaleSaga);
  yield takeLatest(SET_STANDARD, setStandardSaga);
  yield takeLatest(SET_BENCHMARK, setBenchmarkSaga);
  yield takeLatest(SET_TAB, setTabSaga);
  yield takeLatest(SET_MODALTAB, setModalTabSaga);
  yield takeLatest(NAVIGATE, navigateSaga);
}
