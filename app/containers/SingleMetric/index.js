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
import { Box, Text } from 'grommet';
import styled from 'styled-components';

import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';
import MainColumn from 'styled/MainColumn';
import Button from 'styled/Button';

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
  getIndicatorInfo,
  getOECDSearch,
} from 'containers/App/selectors';

import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import { BENCHMARKS, COLUMNS, COUNTRY_SORTS } from 'containers/App/constants';
import CountryFilters from 'components/CountryFilters';
import CountrySort from 'components/CountrySort';

import rootMessages from 'messages';
// import messages from './messages';

const Styled = styled(Box)`
  margin: 0 auto;
`;

// prettier-ignore
const CountryButton = styled(Button)`
  text-align: right;
  padding: 3px 0;
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 6px 0;
  }
`;

const BarWrap = styled(Box)``;
// prettier-ignore
const CountryWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;

const DEPENDENCIES = []; // ['countries', 'cprScores', 'esrScores'];
const DEPENDENCIES_INDICATORS = []; // ['countries', 'esrIndicatorScores'];

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
  metricInfo,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, []);
  let column = '';
  let color = '';
  if (metric.type === 'esr' || metric.metricType === 'indicators') {
    const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
    ({ column } = currentBenchmark);
    color = 'esr';
  } else if (metric.type === 'cpr') {
    column = COLUMNS.CPR.MEAN;
    color = metric.metricType === 'rights' ? metric.dimension : metric.key;
  }

  const currentSort = sort || 'score';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;
  const sortedScores = sortScores({
    intl,
    sort: currentSort,
    order: currentSortOrder,
    scores,
    column,
  });
  return (
    <MainColumn>
      <Box direction="row">
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
          options={['score', 'name']}
          order={currentSortOrder}
          onSortSelect={onSortSelect}
          onOrderToggle={onOrderChange}
        />
      </Box>
      <Styled
        pad={{ vertical: 'large', right: 'large' }}
        direction="column"
        fill="horizontal"
      >
        <Box direction="row" align="end" pad={{ bottom: 'xsmall' }}>
          <CountryWrap
            width="150px"
            noBorder
            align="end"
            pad={{ right: 'medium' }}
          >
            <Text size="small" style={{ fontWeight: 600 }}>
              <FormattedMessage {...rootMessages.labels.score} />
            </Text>
          </CountryWrap>
          <BarWrap flex direction="row">
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
          </BarWrap>
        </Box>
        {sortedScores &&
          sortedScores.map(s => {
            const country =
              (metric.type === 'esr' ||
                (metric.metricType === 'indicators' &&
                  metricInfo.standard === 'Core')) &&
              countries.find(c => c.country_code === s.country_code);
            return (
              <Box
                key={s.country_code}
                direction="row"
                align="center"
                border="right"
              >
                <CountryWrap
                  width="150px"
                  align="end"
                  pad={{ right: 'medium' }}
                >
                  <CountryButton
                    onClick={() => onCountryClick(s.country_code, metric.key)}
                  >
                    <FormattedMessage
                      {...rootMessages.countries[s.country_code]}
                    />
                    {country && country.high_income_country === '1' && (
                      <span>
                        {` (${intl.formatMessage(
                          rootMessages.labels.hiCountry,
                        )})`}
                      </span>
                    )}
                  </CountryButton>
                </CountryWrap>
                <BarWrap flex>
                  {(metric.type === 'esr' ||
                    metric.metricType === 'indicators') && (
                    <BarHorizontal
                      omitMinMaxLabels
                      level={3}
                      color={color}
                      value={parseFloat(s[column])}
                      minValue={0}
                      maxValue={100}
                      unit="%"
                      stripes={standard === 'hi'}
                    />
                  )}
                  {metric.type === 'cpr' && (
                    <BarBulletHorizontal
                      omitMinMaxLabels
                      level={2}
                      color={color}
                      value={parseFloat(s[column])}
                      band={{
                        lo: parseFloat(s[COLUMNS.CPR.LO]),
                        hi: parseFloat(s[COLUMNS.CPR.HI]),
                      }}
                      minValue={0}
                      maxValue={10}
                    />
                  )}
                </BarWrap>
              </Box>
            );
          })}
      </Styled>
    </MainColumn>
  );
}

SingleMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
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
  metricInfo: (state, { metric }) => {
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
  countries: state => getCountries(state),
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
    onLoadData: metric => {
      if (metric.metricType === 'indicators') {
        return DEPENDENCIES_INDICATORS.forEach(key =>
          dispatch(loadDataIfNeeded(key)),
        );
      }
      return DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onRemoveFilter: key =>
      dispatch(navigate({}, { replace: false, deleteParams: [key] })),
    onAddFilter: (key, value) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
          },
        ),
      ),
    onSortSelect: value =>
      dispatch(
        navigate(
          { search: `?sort=${value}` },
          {
            replace: false,
          },
        ),
      ),
    onOrderChange: value =>
      dispatch(
        navigate(
          { search: `?dir=${value}` },
          {
            replace: false,
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
