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
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  DATA_REQUESTED,
  LOAD_CONTENT_ERROR,
  LOAD_CONTENT_SUCCESS,
  CONTENT_REQUESTED,
  OPEN_HOW_TO,
  COOKIECONSENT_CHECKED,
  GA_INITIALISED,
} from './constants';

// The initial state of the App
export const initialState = {
  cookieConsent: '',
  gaInitiliased: false,
  loading: false,
  error: false,
  howToRead: false,
  /* eslint-disable no-param-reassign */
  // the data
  data: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record return time
  dataReady: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record request time
  dataRequested: DATA_RESOURCES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  contentRequested: PAGES.reduce((memo, page) => {
    memo[page.key] = false;
    return memo;
  }, {}),
  content: PAGES.reduce((memo, page) => {
    memo[page.key] = false;
    return memo;
  }, {}),
  // record return time
  contentReady: PAGES.reduce((memo, page) => {
    memo[page.key] = false;
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
        draft.howToRead = false;
        break;
      case DATA_REQUESTED:
        draft.dataRequested[action.key] = action.time;
        break;
      case LOAD_DATA_SUCCESS:
        draft.data[action.key] = action.data;
        draft.dataReady[action.key] = action.time;
        break;
      case LOAD_DATA_ERROR:
        console.log('Error loading data... giving up!', action.key);
        draft.dataRequested[action.key] = action.time;
        break;
      case CONTENT_REQUESTED:
        draft.contentRequested[action.key] = action.time;
        break;
      case LOAD_CONTENT_SUCCESS:
        draft.content[action.key] = {
          locale: action.locale,
          content: action.content,
        };
        draft.contentReady[action.key] = action.time;
        break;
      case LOAD_CONTENT_ERROR:
        console.log('Error loading content... giving up!', action.key);
        draft.contentRequested[action.key] = action.time;
        break;
      case CHANGE_LOCALE:
        draft.content = initialState.content;
        draft.contentReady = initialState.contentReady;
        draft.contentRequested = initialState.contentRequested;
        break;
      case OPEN_HOW_TO:
        draft.howToRead = action.layer;
        break;
      case COOKIECONSENT_CHECKED:
        draft.cookieConsent = action.status;
        break;
      case GA_INITIALISED:
        draft.gaInitiliased = action.status;
        break;
    }
  });

export default appReducer;
