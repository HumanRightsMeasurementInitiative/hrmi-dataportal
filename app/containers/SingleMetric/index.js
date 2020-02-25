/**
 *
 * SingleMetric
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import Source from 'components/Source';
import MainColumn from 'styled/MainColumn';
import Hint from 'styled/Hint';

import { sortScores } from 'utils/scores';
import { getFilterOptionValues, areAnyFiltersSet } from 'utils/filters';

import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getESRRightScores,
  getCPRRightScores,
  getBenchmarkSearch,
  getIndicatorScores,
  getStandardSearch,
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  getFeaturedSearch,
  getSortSearch,
  getSortOrderSearch,
  getCountries,
  getDependenciesReady,
  getAuxIndicatorsLatest,
  getFeaturedValues,
  getFeatured,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import {
  BENCHMARKS,
  COLUMNS,
  COUNTRY_SORTS,
  COUNTRY_FILTERS,
} from 'containers/App/constants';
import ChartSettingFilters from 'components/ChartSettingFilters';
import ChartSettingSort from 'components/ChartSettingSort';
import LoadingIndicator from 'components/LoadingIndicator';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
// import messages from './messages';

import Score from './Score';
import ListHeader from './ListHeader';

const Styled = styled(Box)`
  margin: 0 auto;
`;

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicators',
  'esrIndicatorScores',
  'auxIndicators',
  'featured',
];

const SORT_OPTIONS = ['score', 'name', 'population', 'gdp'];

export function SingleMetric({
  onLoadData,
  metric,
  scores,
  benchmark,
  standard,
  regionFilterValue,
  subregionFilterValue,
  incomeFilterValue,
  countryGroupFilterValue,
  treatyFilterValue,
  featuredFilterValue,
  onRemoveFilter,
  onAddFilter,
  sort,
  sortOrder,
  intl,
  onSortSelect,
  onOrderChange,
  countries,
  dataReady,
  hasAside,
  auxIndicators,
  featuredValues,
  featuredCountries,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const currentSort = sort || 'score';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;

  // prettier-ignore
  const countriesForScores = scores
    ? scores.map(s =>
      countries.find(c => c.country_code === s.country_code),
    )
    : [];

  const filterValues = getFilterOptionValues(
    countriesForScores,
    COUNTRY_FILTERS,
    // check if any filters are already set -
    // if not we can just return all specified options
    areAnyFiltersSet(COUNTRY_FILTERS, {
      regionFilterValue,
      subregionFilterValue,
      incomeFilterValue,
      countryGroupFilterValue,
      treatyFilterValue,
      featuredFilterValue,
    }),
    null,
    null,
    featuredValues,
    featuredCountries,
  );

  const { sorted, other } = sortScores({
    intl,
    sort: currentSort,
    order: currentSortOrder,
    scores,
    auxIndicators,
    column: metric.type === 'cpr' ? COLUMNS.CPR.MEAN : currentBenchmark.column,
  });
  const hasResults =
    dataReady && ((sorted && sorted.length > 0) || (other && other.length > 0));
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <MainColumn hasAside={hasAside}>
          <Box
            direction="row"
            justify="between"
            align={isMinSize(size, 'medium') ? 'center' : 'start'}
            margin={{ vertical: isMinSize(size, 'medium') ? '0' : 'small' }}
          >
            <ChartSettingFilters
              regionFilterValue={regionFilterValue}
              subregionFilterValue={subregionFilterValue}
              onRemoveFilter={onRemoveFilter}
              onAddFilter={onAddFilter}
              incomeFilterValue={incomeFilterValue}
              countryGroupFilterValue={countryGroupFilterValue}
              treatyFilterValue={treatyFilterValue}
              featuredFilterValue={featuredFilterValue}
              filterValues={filterValues}
            />
            <ChartSettingSort
              sort={currentSort}
              options={SORT_OPTIONS}
              order={currentSortOrder}
              onSortSelect={onSortSelect}
              onOrderToggle={onOrderChange}
            />
          </Box>
          {!dataReady && <LoadingIndicator />}
          {!hasResults && dataReady && (
            <Hint italic>
              <FormattedMessage {...rootMessages.hints.noResults} />
            </Hint>
          )}
          {hasResults && sorted && sorted.length > 0 && (
            <Styled
              pad={{
                vertical: 'large',
                right: isMinSize(size, 'medium') ? 'xlarge' : 'medium',
              }}
              direction="column"
              fill="horizontal"
            >
              <ListHeader metric={metric} benchmark={benchmark} />
              {sorted.map(s => (
                <Score
                  key={s.country_code}
                  score={s}
                  country={countries.find(
                    c => c.country_code === s.country_code,
                  )}
                  metric={metric}
                  standard={standard}
                  currentBenchmark={currentBenchmark}
                />
              ))}
            </Styled>
          )}
          {hasResults && other && other.length > 0 && (
            <Styled
              margin={{ top: 'medium' }}
              pad={{
                right: isMinSize(size, 'medium') ? 'xlarge' : 'medium',
              }}
              direction="column"
              fill="horizontal"
              border="top"
            >
              <Box direction="row" margin={{ top: 'small', bottom: 'medium' }}>
                <Hint italic>
                  <FormattedMessage {...rootMessages.hints.noSortData} />
                </Hint>
              </Box>
              {other.map(s => (
                <Score
                  key={s.country_code}
                  score={s}
                  country={countries.find(
                    c => c.country_code === s.country_code,
                  )}
                  metric={metric}
                  standard={standard}
                  currentBenchmark={currentBenchmark}
                />
              ))}
            </Styled>
          )}
          {hasResults && <Source />}
        </MainColumn>
      )}
    </ResponsiveContext.Consumer>
  );
}

SingleMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  hasAside: PropTypes.bool,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onAddFilter: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countryGroupFilterValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  treatyFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  dataReady: PropTypes.bool,
  featuredValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  scores: (state, { metric }) => {
    if (metric.metricType === 'dimensions') {
      return metric.type === 'esr'
        ? getESRDimensionScores(state)
        : getCPRDimensionScores(state, metric.key);
    }
    if (metric.metricType === 'rights') {
      return metric.type === 'esr'
        ? getESRRightScores(state, metric.key)
        : getCPRRightScores(state, metric.key);
    }
    if (metric.metricType === 'indicators') {
      return getIndicatorScores(state, metric.key);
    }
    return false;
  },
  countries: state => getCountries(state),
  auxIndicators: state => getAuxIndicatorsLatest(state),
  benchmark: state => getBenchmarkSearch(state),
  standard: state => getStandardSearch(state),
  regionFilterValue: state => getRegionSearch(state),
  subregionFilterValue: state => getSubregionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  countryGroupFilterValue: state => getCountryGroupSearch(state),
  treatyFilterValue: state => getTreatySearch(state),
  featuredFilterValue: state => getFeaturedSearch(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
  featuredValues: state => getFeaturedValues(state),
  featuredCountries: state => getFeatured(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onRemoveFilter: (key, value) =>
      dispatch(
        navigate(
          {},
          {
            replace: false,
            deleteParams: [
              {
                key,
                value,
              },
            ],
            trackEvent: {
              category: 'Data',
              action: 'Remove country filter (Metric)',
              value: key,
            },
          },
        ),
      ),
    onAddFilter: (key, value) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
            multiple: true,
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Metric)',
              value: `${key}/${value}`,
            },
          },
        ),
      ),
    onSortSelect: value =>
      dispatch(
        navigate(
          { search: `?sort=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Sort countries (Metric)',
              value,
            },
          },
        ),
      ),
    onOrderChange: value =>
      dispatch(
        navigate(
          { search: `?dir=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Country sort order (Metric)',
              value,
            },
          },
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SingleMetric));
