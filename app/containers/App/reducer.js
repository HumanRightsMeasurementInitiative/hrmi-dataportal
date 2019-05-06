/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import {
  DATA_RESOURCES,
  PAGES,
  DATA_REQUESTED,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
} from './constants';

// import produce from 'immer';

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
  content: PAGES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record request time
  contentRequested: PAGES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  // record return time
  contentReady: PAGES.reduce((memo, resource) => {
    memo[resource.key] = false;
    return memo;
  }, {}),
  /* eslint-enable no-param-reassign */
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
    }
  });

export default appReducer;
