/*
 * App Actions
 *
 *
 */

import {
  LOAD_DATA_IF_NEEDED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  DATA_READY,
  DATA_REQUESTED,
  LOAD_CONTENT_IF_NEEDED,
  LOAD_CONTENT_SUCCESS,
  LOAD_CONTENT_ERROR,
  CONTENT_READY,
  CONTENT_REQUESTED,
  SELECT_COUNTRY,
  SELECT_METRIC,
  NAVIGATE,
  SET_SCALE,
  SET_STANDARD,
  SET_BENCHMARK,
  SET_TAB,
  SET_MODALTAB,
  OPEN_HOW_TO,
  HIGHLIGHT_COUNTRY,
  SHOW_WELCOME,
  CHECK_COOKIECONSENT,
  COOKIECONSENT_CHECKED,
  SET_COOKIECONSENT,
  GA_INITIALISED,
  TRACK_EVENT,
} from './constants';

export function checkCookieConsent() {
  return {
    type: CHECK_COOKIECONSENT,
  };
}
export function setCookieConsent(status) {
  return {
    type: SET_COOKIECONSENT,
    status,
  };
}
export function cookieConsentChecked(status) {
  return {
    type: COOKIECONSENT_CHECKED,
    status,
  };
}
export function setGAinitialised(status) {
  return {
    type: GA_INITIALISED,
    status,
  };
}
export function trackEvent(gaEvent) {
  return {
    type: TRACK_EVENT,
    gaEvent,
  };
}
/**
 * Load the data, this action starts the request saga
 *
 */
export function loadDataIfNeeded(key) {
  return {
    type: LOAD_DATA_IF_NEEDED,
    key,
  };
}

export function dataLoaded(key, data, time) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
    key,
    time,
  };
}

export function dataRequested(key, time) {
  return {
    type: DATA_REQUESTED,
    key,
    time,
  };
}

export function dataLoadingError(error, key) {
  return {
    type: LOAD_DATA_ERROR,
    error,
    key,
  };
}

export function dataReady(key, time) {
  return {
    type: DATA_READY,
    key,
    time,
  };
}
export function loadContentIfNeeded(key, contentType, locale) {
  return {
    type: LOAD_CONTENT_IF_NEEDED,
    key,
    contentType,
    locale,
  };
}
export function contentRequested(key, time) {
  return {
    type: CONTENT_REQUESTED,
    key,
    time,
  };
}
export function contentLoaded(key, content, time, locale) {
  return {
    type: LOAD_CONTENT_SUCCESS,
    content,
    key,
    time,
    locale,
  };
}

export function contentLoadingError(error, key) {
  return {
    type: LOAD_CONTENT_ERROR,
    error,
    key,
  };
}

export function contentReady(key, time) {
  return {
    type: CONTENT_READY,
    key,
    time,
  };
}

export function selectCountry(code) {
  return {
    type: SELECT_COUNTRY,
    code,
  };
}
export function selectMetric(code) {
  return {
    type: SELECT_METRIC,
    code,
  };
}
export function setScale(value) {
  return {
    type: SET_SCALE,
    value,
  };
}
export function setStandard(value) {
  return {
    type: SET_STANDARD,
    value,
  };
}
export function setBenchmark(value) {
  return {
    type: SET_BENCHMARK,
    value,
  };
}
export function setTab(value) {
  return {
    type: SET_TAB,
    value,
  };
}
export function setModalTab(value) {
  return {
    type: SET_MODALTAB,
    value,
  };
}

/**
 * navigate to new location
 * @param {object} location new location
 * @param {object} args navigation arguments
 * @return {object} `{type: action id, location: new location, args: navigation arguments}`
 */
export function navigate(location, args) {
  return {
    type: NAVIGATE,
    location,
    args,
  };
}
export function openHowToRead(args) {
  return {
    type: OPEN_HOW_TO,
    layer: args,
  };
}
export function highlightCountry(country) {
  return {
    type: HIGHLIGHT_COUNTRY,
    country,
  };
}
export function showWelcome(show = true) {
  return {
    type: SHOW_WELCOME,
    show,
  };
}
