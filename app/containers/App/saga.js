import { takeEvery, takeLatest, select, put, call } from 'redux-saga/effects';
import { push, replace, LOCATION_CHANGE } from 'connected-react-router';
import { csvParse } from 'd3-dsv';
import extend from 'lodash/extend';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import 'whatwg-fetch';
import 'url-search-params-polyfill';

import quasiEquals from 'utils/quasi-equals';
import { disableAnalytics } from 'utils/analytics';

import { DEFAULT_LOCALE } from 'i18n';

// import dataRequest from 'utils/data-request';
import {
  getLocale,
  getRouterLocation,
  getRouterPath,
  getRouterSearchParams,
  getCountry,
  getStandardSearch,
  getContentReadyByKey,
  getDataReadyByKey,
  getDataRequestedByKey,
  getContentRequestedByKey,
  getGAStatus,
} from './selectors';

import {
  dataRequested,
  contentRequested,
  dataLoaded,
  dataLoadingError,
  contentLoaded,
  contentLoadingError,
  loadContentIfNeeded,
  cookieConsentChecked,
  checkCookieConsent,
  setGAinitialised,
  trackEvent,
  setAsideLayer,
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
  SELECT_GROUP,
  NAVIGATE,
  STANDARDS,
  INCOME_GROUPS,
  SET_SCALE,
  SET_STANDARD,
  SET_BENCHMARK,
  SET_TAB,
  SET_RAW,
  CHECK_COOKIECONSENT,
  COOKIECONSENT_NAME,
  SET_COOKIECONSENT,
  COOKIECONSENT_CHECKED,
  GA_PROPERTY_ID,
  TRACK_EVENT,
  TOGGLE_GROUP,
  PATHS,
  HIGHLIGHT_GROUP,
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
    const ready = yield select(getDataReadyByKey, key);
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
  const pageIndex = Object.values(PAGES)
    .map(page => page.key)
    .indexOf(key);
  if (pageIndex > -1 || contentType === 'atrisk') {
    const requestedAt = yield select(getContentRequestedByKey, key);
    const ready = yield select(getContentReadyByKey, key);
    // If haven't loaded yet, do so now.
    if (!requestedAt && !ready) {
      const requestLocale = yield locale || select(getLocale);
      // TEMP: testing airtable for atrisk content
      if (contentType === 'atrisk') {
        const airtableRes = yield fetch(
          process.env.NODE_ENV === 'production'
            ? '/airtable'
            : 'http://localhost:5001/hrmi-dataportal-staging/us-central1/airtable',
        );
        const airtableData = yield airtableRes.json();
        const splitKey = key.split('/');

        // TEMP: move this to constants
        // TODO: not complete
        const airtableRightsMap = {
          arrest: 'Arbitrary Arrest',
          disappearance: 'Disappearance',
          'death-penalty': 'Death Penalty',
          'extrajud-killing': 'Extrajudicial Killing',
          torture: 'Torture and Ill-treatment',
          assembly: 'Assembly and Association',
          expression: 'Opinion and Expression',
          participation: 'Political Participation',
          education: 'Education',
          food: 'Food',
          health: 'Health',
          housing: 'Housing',
          work: 'Work',
        };

        const countryData = airtableData.data.find(
          d => d.fields.ISO === splitKey[1],
        );
        const keyData = countryData.fields[airtableRightsMap[splitKey[0]]];

        yield put(contentLoaded(key, keyData, Date.now(), requestLocale));
      } else {
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
}

/**
 * Generator function. Load data error handler:
 * - Record load error
 *
 * @param {object} payload {key: data set key}
 */
function* loadDataErrorHandler(err, { key }) {
  yield put(dataLoadingError(err, key));
}
function* loadContentErrorHandler(err, { key }) {
  yield put(contentLoadingError(err, key));
}

export function* selectCountrySaga({ code, tab, atRisk }) {
  // figure out country group and default standard
  const country = yield select(getCountry, code);
  const group =
    country &&
    INCOME_GROUPS.values.find(g =>
      quasiEquals(country.high_income_country, g.value),
    );
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
  if (tab) {
    yield searchParams.set('tab', tab);
  }
  if (atRisk) {
    yield searchParams.set('atRisk', atRisk);
  }

  // navigate to country and default standard
  const requestLocale = yield select(getLocale);

  const newSearch = searchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';

  yield put(
    trackEvent({
      category: 'Content',
      action: 'Select country',
      value: code,
    }),
  );
  yield put(setAsideLayer(null));
  yield put(push(`/${requestLocale}/${PATHS.COUNTRY}/${code}${search}`));
}

const getScaleValue = value => {
  if (value === 'r') return 'rights';
  if (value === 'd') return 'dimensions';
  return value;
};

export function* setScaleSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('scale', value);

  yield put(
    trackEvent({
      category: 'Setting',
      action: 'Change scale',
      value: getScaleValue(value),
    }),
  );
  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(replace(`${path}?${searchParams.toString()}`));
}

export function* setStandardSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('as', value);

  yield put(
    trackEvent({
      category: 'Setting',
      action: 'Change standard',
      value,
    }),
  );
  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(replace(`${path}?${searchParams.toString()}`));
}
export function* highlightGroupSaga({ code }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  if (code) {
    yield searchParams.set('atRisk', code);
  } else {
    searchParams.delete('atRisk');
  }

  yield put(
    trackEvent({
      category: 'Setting',
      action: 'Change at risk group highlight',
      value: code,
    }),
  );
  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(replace(`${path}?${searchParams.toString()}`));
}

export function* setBenchmarkSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('pb', value);

  yield put(
    trackEvent({
      category: 'Setting',
      action: 'Change benchmark',
      value,
    }),
  );
  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(replace(`${path}?${searchParams.toString()}`));
}
export function* setRawSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('raw', value ? '1' : '0');

  const path = yield select(getRouterPath);
  yield put(
    trackEvent({
      category: 'Setting',
      action: 'Change raw',
      value,
    }),
  );
  yield put(push(`${path}?${searchParams.toString()}`));
}

export function* toggleGroupSaga({ values }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  searchParams.delete('gactive');
  values.forEach(g => searchParams.append('gactive', g));
  const path = yield select(getRouterPath);
  yield put(
    trackEvent({
      category: 'Setting',
      action: 'Toggle groups',
      value: values.toString(),
    }),
  );
  yield put(push(`${path}?${searchParams.toString()}`));
}
export function* setTabSaga({ value }) {
  // get URL search params
  const searchParams = yield select(getRouterSearchParams);
  yield searchParams.set('tab', value);

  // navigate to country and default standard
  const path = yield select(getRouterPath);
  yield put(
    trackEvent({
      category: 'Content',
      action: 'Change tab',
      value,
    }),
  );
  yield put(setAsideLayer(null));
  yield put(push(`${path}?${searchParams.toString()}`));
}

export function* selectMetricSaga({ code }) {
  const requestLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  const currentSearchParams = new URLSearchParams(currentLocation.search);
  currentSearchParams.delete('tab');
  const newSearch = currentSearchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';
  yield put(
    trackEvent({
      category: 'Content',
      action: 'Select metric',
      value: code,
    }),
  );
  yield put(setAsideLayer(null));
  yield put(push(`/${requestLocale}/${PATHS.METRIC}/${code}${search}`));
}
export function* selectGroupSaga({ code }) {
  const requestLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  const currentSearchParams = new URLSearchParams(currentLocation.search);
  currentSearchParams.delete('tab');
  const newSearch = currentSearchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';
  yield put(
    trackEvent({
      category: 'Content',
      action: 'Select group',
      value: code,
    }),
  );
  yield put(push(`/${requestLocale}/${PATHS.GROUP}/${code}${search}`));
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
      trackEvent: false,
      multiple: false,
    },
    args || {},
  );
  const requestLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  const currentSearchParams = new URLSearchParams(currentLocation.search);

  // the new pathname
  let newPathname;
  // the new search (URLSearchParams object)
  let newSearchParams = currentSearchParams;

  // clean up search params
  if (xArgs.deleteParams) {
    newSearchParams = xArgs.deleteParams.reduce((memoParams, p) => {
      // delete only specific value when key & value are present
      if (p.key) {
        if (p.value) {
          const params = new URLSearchParams();
          memoParams.forEach((value, key) => {
            // only keep those that are not deleted
            if (p.key !== key || p.value !== value) {
              params.append(key, value);
            }
          });
          return params;
        }
        memoParams.delete(p.key);
      } else {
        memoParams.delete(p);
      }
      return memoParams;
    }, currentSearchParams);
  }
  if (!xArgs.keepTab) {
    newSearchParams.delete('tab');
  }

  // if location is string
  // use as pathname and keep old search
  // note: location path is expected not to contain the locale
  if (typeof location === 'string') {
    newPathname = xArgs.needsLocale ? `/${requestLocale}` : '/';
    if (location !== '') {
      newPathname += `/${location}`;
    }
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
      // optionally keep old params
      if (!xArgs.replace) {
        const searchParams = new URLSearchParams(location.search);
        searchParams.forEach((value, key) =>
          xArgs.multiple
            ? newSearchParams.append(key, value)
            : newSearchParams.set(key, value),
        );
      } else {
        newSearchParams = new URLSearchParams(location.search);
      }
    }
  }

  if (xArgs.trackEvent) {
    yield put(trackEvent(xArgs.trackEvent));
  }
  // convert to string and append if necessary
  const newSearch = newSearchParams.toString();
  const search = newSearch.length > 0 ? `?${newSearch}` : '';
  if (newPathname !== currentLocation.pathname) {
    yield put(setAsideLayer(null));
  }
  yield put(push(`${newPathname}${search}`));
}

export function* checkCookieConsentSaga() {
  const consentStatus = Cookies.get(COOKIECONSENT_NAME);
  // console.log('Checking for cookie consent. Current status: ', consentStatus);
  yield disableAnalytics(consentStatus !== 'true');
  yield put(cookieConsentChecked(consentStatus));
}
export function* setCookieConsentSaga({ status }) {
  Cookies.set(COOKIECONSENT_NAME, status, { expires: 365, sameSite: 'strict' });
  yield put(checkCookieConsent());
}
// status = consentStatus
export function* initialiseAnalyticsSaga({ status }) {
  // console.log('Initialise Google Analytics?', status);
  if (status === 'true') {
    const initialisedGA = yield select(getGAStatus);
    // console.log('Already initialised? ', initialisedGA);
    if (!initialisedGA) {
      ReactGA.initialize(GA_PROPERTY_ID, { debug: false, titleCase: false });
      ReactGA.set({ anonymizeIp: true });
      yield put(setGAinitialised(true));
      const initialPage = yield select(getRouterPath);
      const currentLocation = yield select(getRouterLocation);
      ReactGA.pageview(initialPage);
      yield put(
        trackEvent({
          category: 'Analytics',
          action: `GA initialised`,
          label: `${currentLocation.pathname}${currentLocation.search}`,
        }),
      );
    }
  } else if (status === 'false') {
    Cookies.remove('_ga', { path: '/', domain: window.location.hostname });
    Cookies.remove('_gat', { path: '/', domain: window.location.hostname });
    Cookies.remove('_gid', { path: '/', domain: window.location.hostname });
  }
}

export function* trackPageviewSaga({ payload }) {
  const initialisedGA = yield select(getGAStatus);
  const consentStatus = Cookies.get(COOKIECONSENT_NAME);
  if (consentStatus === 'true' && initialisedGA && !payload.isFirstRendering) {
    ReactGA.pageview(`${payload.location.pathname}${payload.location.search}`);
  }
}

export function* trackEventSaga({ gaEvent }) {
  const initialisedGA = yield select(getGAStatus);
  const currentLocation = yield select(getRouterLocation);
  const consentStatus = Cookies.get(COOKIECONSENT_NAME);
  if (consentStatus === 'true' && initialisedGA) {
    ReactGA.event({
      category: gaEvent.category,
      action:
        typeof gaEvent.value !== 'undefined'
          ? `${gaEvent.action} | ${gaEvent.value}`
          : gaEvent.action || 'NO ACTION DEFINED',
      label: `${currentLocation.pathname}${currentLocation.search}`,
    });
  }
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
  yield takeLatest(SELECT_METRIC, selectMetricSaga);
  yield takeLatest(SELECT_GROUP, selectGroupSaga);
  yield takeLatest(SET_SCALE, setScaleSaga);
  yield takeLatest(SET_STANDARD, setStandardSaga);
  yield takeLatest(SET_BENCHMARK, setBenchmarkSaga);
  yield takeLatest(SET_TAB, setTabSaga);
  yield takeLatest(SET_RAW, setRawSaga);
  yield takeLatest(TOGGLE_GROUP, toggleGroupSaga);
  yield takeLatest(HIGHLIGHT_GROUP, highlightGroupSaga);
  yield takeLatest(NAVIGATE, navigateSaga);
  yield takeLatest(CHECK_COOKIECONSENT, checkCookieConsentSaga);
  yield takeLatest(SET_COOKIECONSENT, setCookieConsentSaga);
  yield takeLatest(COOKIECONSENT_CHECKED, initialiseAnalyticsSaga);
  yield takeLatest(LOCATION_CHANGE, trackPageviewSaga);
  yield takeLatest(TRACK_EVENT, trackEventSaga);
}
