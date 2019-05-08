import { takeEvery, takeLatest, select, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { csvParse } from 'd3-dsv';
// import extend from 'lodash/extend';
import 'whatwg-fetch';

// import dataRequest from 'utils/data-request';
import {
  getLocale,
  getRouterLocation,
  getDataRequestedByKey,
  getContentRequestedByKey,
} from './selectors';
import {
  dataRequested,
  dataLoaded,
  dataLoadingError,
  contentRequested,
  contentLoaded,
  contentLoadingError,
} from './actions';
import {
  LOAD_DATA_IF_NEEDED,
  DATA_URL,
  DATA_RESOURCES,
  LOAD_CONTENT_IF_NEEDED,
  PAGES,
  PAGES_URL,
  SELECT_COUNTRY,
  NAVIGATE,
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
    const url = `${DATA_URL}/${DATA_RESOURCES[resourceIndex].file}`;
    // requestedSelector returns the times that entities where fetched from the API
    const requestedAt = yield select(getDataRequestedByKey, key);
    // If haven't requested yet, do so now.
    if (!requestedAt) {
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
            throw new Error(response.statusText);
          }
        } else {
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
export function* loadContentSaga({ key }) {
  const pageIndex = PAGES.indexOf(key);
  if (pageIndex > -1) {
    const locale = yield select(getLocale);
    const url = `${PAGES_URL}/${locale}/${key}/`;
    // requestedSelector returns the times that entities where fetched from the API
    const requestedAt = yield select(getContentRequestedByKey, key);
    // If haven't requested yet, do so now.
    if (!requestedAt) {
      try {
        // First record that we are requesting
        yield put(contentRequested(key, Date.now()));
        const response = yield fetch(url);
        const responseOk = yield response.ok;
        if (responseOk && typeof response.text === 'function') {
          const responseBody = yield response.text();
          if (responseBody) {
            yield put(contentLoaded(key, responseBody, Date.now()));
          } else {
            throw new Error(response.statusText);
          }
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        yield put(contentRequested(key, false));
        // throw error
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
  const currentLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  yield put(push(`/${currentLocale}/country/${code}${currentLocation.search}`));
}
export function* navigateSaga({ location }) {
  // default args
  // const xArgs = extend({ replaceSearch: true }, args || {});

  // update path: replace or keep if not provided
  let path = '';
  if (typeof location === 'string' && location !== '') {
    path += `/${location}`;
  } else if (typeof location.path !== 'undefined') {
    path += `/${location.path}`;
  }

  const currentLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);

  yield put(push(`/${currentLocale}${path}${currentLocation.search}`));
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(
    LOAD_DATA_IF_NEEDED,
    autoRestart(loadDataSaga, loadDataErrorHandler, MAX_LOAD_ATTEMPTS),
  );
  yield takeEvery(
    LOAD_CONTENT_IF_NEEDED,
    autoRestart(loadContentSaga, loadContentErrorHandler, MAX_LOAD_ATTEMPTS),
  );
  yield takeLatest(SELECT_COUNTRY, selectCountrySaga);
  yield takeLatest(NAVIGATE, navigateSaga);
}
