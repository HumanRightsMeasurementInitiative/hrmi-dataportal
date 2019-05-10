/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';

import { CHANGE_LOCALE } from 'containers/LanguageProvider/constants';
import {
  DATA_RESOURCES,
  PAGES,
  DATA_REQUESTED,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  CONTENT_REQUESTED,
  LOAD_CONTENT_ERROR,
  LOAD_CONTENT_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  /* eslint-disable no-param-reassign */
  // the data
  data: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record request time
  dataRequested: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record return time
  dataReady: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  content: PAGES.reduce((memo, key) => {
    memo[key] = false;
    return memo;
  }, {}),
  // record request time
  contentRequested: PAGES.reduce((memo, key) => {
    memo[key] = false;
    return memo;
  }, {}),
  // record return time
  contentReady: PAGES.reduce((memo, key) => {
    memo[key] = false;
    return memo;
  }, {}),
  // the last location to go back to when closing routes
  closeTarget: {
    pathname: '',
    search: '',
    hash: '',
  },
  /* eslint-enable no-param-reassign */
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOCATION_CHANGE:
        if (action.payload.location.pathname.indexOf('page') === -1) {
          draft.closeTarget = action.payload.location;
        }
        break;
      case DATA_REQUESTED:
        draft.dataRequested[action.key] = action.time;
        break;
      case LOAD_DATA_SUCCESS:
        draft.data[action.key] = action.data;
        draft.dataReady[action.key] = action.time;
        break;
      case LOAD_DATA_ERROR:
        draft.dataRequested[action.key] = false;
        break;
      case CONTENT_REQUESTED:
        draft.contentRequested[action.key] = action.time;
        break;
      case LOAD_CONTENT_SUCCESS:
        draft.content[action.key] = action.content;
        draft.contentReady[action.key] = action.time;
        break;
      case LOAD_CONTENT_ERROR:
        draft.contentRequested[action.key] = false;
        break;
      case CHANGE_LOCALE:
        draft.content = initialState.content;
        draft.contentReady = initialState.contentReady;
        draft.contentRequested = initialState.contentRequested;
        break;
    }
  });

export default appReducer;
