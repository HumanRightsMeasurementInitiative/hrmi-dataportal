/*
 * App Actions
 *
 *
 */

import {
  LOAD_DATA_IF_NEEDED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  DATA_REQUESTED,
  DATA_READY,
  LOAD_CONTENT_IF_NEEDED,
  LOAD_CONTENT_SUCCESS,
  LOAD_CONTENT_ERROR,
  CONTENT_REQUESTED,
  CONTENT_READY,
  SELECT_COUNTRY,
  SELECT_METRIC,
  NAVIGATE,
} from './constants';

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

export function dataLoadingError(error, key) {
  return {
    type: LOAD_DATA_ERROR,
    error,
    key,
  };
}

export function dataRequested(key, time) {
  return {
    type: DATA_REQUESTED,
    key,
    time,
  };
}

export function dataReady(key, time) {
  return {
    type: DATA_READY,
    key,
    time,
  };
}
export function loadContentIfNeeded(key) {
  return {
    type: LOAD_CONTENT_IF_NEEDED,
    key,
  };
}

export function contentLoaded(key, content, time) {
  return {
    type: LOAD_CONTENT_SUCCESS,
    content,
    key,
    time,
  };
}

export function contentLoadingError(error, key) {
  return {
    type: LOAD_CONTENT_ERROR,
    error,
    key,
  };
}

export function contentRequested(key, time) {
  return {
    type: CONTENT_REQUESTED,
    key,
    time,
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
