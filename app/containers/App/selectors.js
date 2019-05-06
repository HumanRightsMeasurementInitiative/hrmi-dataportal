/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectGlobal = state => state.global || initialState;

const getGlobalRequested = state => state.global.dataRequested;

const selectRouter = state => state.router;

export const selectDataRequestedAt = createSelector(
  getGlobalRequested,
  (state, { key }) => key,
  (requested, key) => requested[key],
);

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
