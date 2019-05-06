import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the page state domain
 */

const selectPageDomain = state => state.page || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Page
 */

const makeSelectPage = () =>
  createSelector(
    selectPageDomain,
    substate => substate,
  );

export default makeSelectPage;
export { selectPageDomain };
