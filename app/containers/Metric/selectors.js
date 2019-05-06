import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the metric state domain
 */

const selectMetricDomain = state => state.metric || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Metric
 */

const makeSelectMetric = () =>
  createSelector(
    selectMetricDomain,
    substate => substate,
  );

export default makeSelectMetric;
export { selectMetricDomain };
