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
import { Box, Text, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import Source from 'components/Source';
import Bar from 'components/Bars/Bar';
import BarBullet from 'components/Bars/BarBullet';
import AnnotateBenchmark from 'components/Bars/AnnotateBenchmark';
import AnnotateBetter from 'components/AnnotateBetterWorse';
import MainColumn from 'styled/MainColumn';
import Hint from 'styled/Hint';

import { sortScores } from 'utils/scores';

import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getESRRightScores,
  getCPRRightScores,
  getBenchmarkSearch,
  getIndicatorScores,
  getStandardSearch,
  getRegionSearch,
  getIncomeSearch,
  getSortSearch,
  getSortOrderSearch,
  getCountries,
  getOECDSearch,
  getDependenciesReady,
  getAuxIndicatorsLatest,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import { BENCHMARKS, COLUMNS, COUNTRY_SORTS } from 'containers/App/constants';
import CountryFilters from 'components/CountryFilters';
import CountrySort from 'components/CountrySort';
import LoadingIndicator from 'components/LoadingIndicator';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
// import messages from './messages';

import CountryButton from './CountryButton';

const Styled = styled(Box)`
  margin: 0 auto;
`;

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.small};
  right: ${({ theme }) => theme.global.edgeSize.medium};
  top: -2px;
`;

// prettier-ignore
const StyledScoreText = styled(Text)`
  padding: 0 5px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 8px;
  }
`;

const BarWrap = styled(Box)``;
// prettier-ignore
const CountryWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicators',
  'esrIndicatorScores',
];

const getESRDimensionValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};
const getCPRDimensionValue = score =>
  score && parseFloat(score[COLUMNS.CPR.MEAN]);

const getDimensionRefs = (score, benchmark, metricType) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col =
      metricType === 'indicators'
        ? benchmark.refIndicatorColumn
        : benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

const SORT_OPTIONS = ['score', 'name', 'population', 'gdp'];

export function SingleMetric({
  onLoadData,
  metric,
  scores,
  benchmark,
  standard,
  regionFilterValue,
  incomeFilterValue,
  oecdFilterValue,
  onRemoveFilter,
  onAddFilter,
  sort,
  sortOrder,
  intl,
  onSortSelect,
  onOrderChange,
  onCountryClick,
  countries,
  dataReady,
  hasAside,
  auxIndicators,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const currentSort = sort || 'score';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;
  const sortedScores = sortScores({
    intl,
    sort: currentSort,
    order: currentSortOrder,
    scores,
    auxIndicators,
    column: metric.type === 'cpr' ? COLUMNS.CPR.MEAN : currentBenchmark.column,
  });
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
            <CountryFilters
              regionFilterValue={regionFilterValue}
              onRemoveFilter={onRemoveFilter}
              onAddFilter={onAddFilter}
              incomeFilterValue={incomeFilterValue}
              oecdFilterValue={oecdFilterValue}
              filterGroups={['income', 'region', 'oecd']}
            />
            <CountrySort
              sort={currentSort}
              options={SORT_OPTIONS}
              order={currentSortOrder}
              onSortSelect={onSortSelect}
              onOrderToggle={onOrderChange}
            />
          </Box>
          {!dataReady && <LoadingIndicator />}
          {dataReady && sortedScores && sortedScores.length === 0 && (
            <Hint italic>
              <FormattedMessage {...rootMessages.hints.noResults} />
            </Hint>
          )}
          {dataReady && sortedScores && sortedScores.length > 0 && (
            <Styled
              pad={{
                vertical: 'large',
                right: isMinSize(size, 'medium') ? 'xlarge' : 'medium',
              }}
              direction="column"
              fill="horizontal"
            >
              <Box direction="row" align="end" pad={{ bottom: 'xsmall' }}>
                <CountryWrap
                  width={isMinSize(size, 'medium') ? '160px' : '80px'}
                  noBorder
                  align="end"
                  pad={{ right: 'small' }}
                  flex={{ shrink: 0 }}
                >
                  <StyledScoreText size="small" style={{ fontWeight: 600 }}>
                    <FormattedMessage {...rootMessages.labels.score} />
                  </StyledScoreText>
                </CountryWrap>
                <BarWrap
                  flex
                  direction="row"
                  style={{ position: 'relative' }}
                  align="center"
                >
                  <Text size="small" style={{ transform: 'translateX(-50%)' }}>
                    0
                  </Text>
                  <Text
                    size="small"
                    margin={{ left: 'auto' }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    {metric.type === 'esr' || metric.metricType === 'indicators'
                      ? '100%'
                      : '10'}
                  </Text>
                  <WrapAnnotateBetter>
                    <AnnotateBetter />
                  </WrapAnnotateBetter>
                  {metric.type === 'esr' && (
                    <AnnotateBenchmark
                      benchmarkKey={benchmark}
                      above
                      margin="0 2px"
                    />
                  )}
                </BarWrap>
              </Box>
              {sortedScores &&
                sortedScores.map(s => {
                  const country = countries.find(
                    c => c.country_code === s.country_code,
                  );
                  return (
                    <Box
                      key={s.country_code}
                      direction="row"
                      align="center"
                      border="right"
                    >
                      <CountryWrap
                        width={isMinSize(size, 'medium') ? '160px' : '80px'}
                        align="end"
                        flex={{ shrink: 0 }}
                        pad={{ right: 'small' }}
                      >
                        {country && (
                          <CountryButton
                            onCountryClick={() =>
                              onCountryClick(s.country_code, metric.key)
                            }
                            country={country}
                            metric={metric}
                          />
                        )}
                      </CountryWrap>
                      <BarWrap flex>
                        {(metric.type === 'esr' ||
                          metric.metricType === 'indicators') && (
                          <Bar
                            showLabels={false}
                            level={2}
                            data={{
                              color: 'esr',
                              refValues: getDimensionRefs(
                                s,
                                currentBenchmark,
                                metric.metricType,
                              ),
                              value: getESRDimensionValue(s, currentBenchmark),
                              maxValue: 100,
                              unit: '%',
                              stripes: standard === 'hi',
                            }}
                            scoreOnHover="top"
                          />
                        )}
                        {metric.type === 'cpr' && (
                          <BarBullet
                            // color = metric.metricType === 'rights' ? metric.dimension : metric.key;
                            level={2}
                            showLabels={false}
                            data={{
                              color: metric.dimension || metric.key,
                              value: getCPRDimensionValue(s),
                              maxValue: 10,
                              unit: '',
                              band: getBand(s),
                            }}
                            scoreOnHover="top"
                            bandOnHover="top"
                          />
                        )}
                      </BarWrap>
                    </Box>
                  );
                })}
              <Source />
            </Styled>
          )}
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
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  oecdFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  onCountryClick: PropTypes.func,
  dataReady: PropTypes.bool,
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
  incomeFilterValue: state => getIncomeSearch(state),
  oecdFilterValue: state => getOECDSearch(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onRemoveFilter: key =>
      dispatch(
        navigate(
          {},
          {
            replace: false,
            deleteParams: [key],
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
    onCountryClick: (country, metric, tab = 0) =>
      dispatch(
        navigate(
          {
            pathname: `/metric/${metric}/${country}`,
            search: `?mtab=${tab}`,
          },
          {
            replace: false,
            trackEvent: {
              category: 'Modal',
              action: 'Metric-country',
              value: `${metric}/${country}/${tab}`,
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
