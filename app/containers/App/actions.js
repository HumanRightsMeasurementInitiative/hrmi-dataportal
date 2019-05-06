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
  SELECT_COUNTRY,
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

export function selectCountry(code) {
  return {
    type: SELECT_COUNTRY,
    code,
  };
}
