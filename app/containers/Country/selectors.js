import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the country state domain
 */

const selectCountryDomain = state => state.country || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Country
 */

const makeSelectCountry = () =>
  createSelector(
    selectCountryDomain,
    substate => substate,
  );

export default makeSelectCountry;
export { selectCountryDomain };
