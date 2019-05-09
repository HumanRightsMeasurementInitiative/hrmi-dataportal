import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the overview state domain
 */

const selectOverviewDomain = state => state.overview || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Overview
 */

const makeSelectOverview = () =>
  createSelector(
    selectOverviewDomain,
    substate => substate,
  );

export default makeSelectOverview;
export { selectOverviewDomain };
