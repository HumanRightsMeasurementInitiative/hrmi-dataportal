/**
 *
 * ChartContainerTrend
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

import ChartCountryMetricTrend from 'components/ChartCountryMetricTrend';

import { BENCHMARKS, COLUMNS } from 'containers/App/constants';

import getMetricDetails from 'utils/metric-details';

import {
  getStandardSearch,
  getBenchmarkSearch,
  getESRScoresForCountry,
  getCPRScoresForCountry,
  getESRIndicatorScoresForCountry,
  getIndicatorInfo,
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
} from 'containers/App/selectors';

import {
  navigate,
  loadContentIfNeeded,
  loadDataIfNeeded,
  setStandard,
  setBenchmark,
} from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

const getColour = metric => {
  if (metric.metricType === 'dimensions') {
    return metric.key;
  }
  if (metric.metricType === 'rights') {
    return metric.dimension;
  }
  return 'esr';
};
const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];
export function ChartContainerTrend({
  metricCode,
  scores,
  onLoadData,
  benchmark,
  standard,
  maxYearESR,
  maxYearCPR,
  minYearESR,
  minYearCPR,
  theme,
  onSetBenchmark,
  onSetStandard,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);

  const metric = getMetricDetails(metricCode);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const isESR = metric.metricType === 'indicators' || metric.type === 'esr';
  // prettier-ignore
  return (
    <ChartCountryMetricTrend
      color={theme.global.colors[getColour(metric)]}
      colorHint={theme.global.colors[`${getColour(metric)}Dark`]}
      scores={scores}
      percentage={isESR}
      maxValue={isESR ? 100 : 11}
      maxYear={isESR ? maxYearESR : maxYearCPR}
      minYear={isESR ? minYearESR : minYearCPR}
      column={isESR ? currentBenchmark.column : COLUMNS.CPR.MEAN}
      rangeColumns={
        !isESR && {
          upper: COLUMNS.CPR.HI,
          lower: COLUMNS.CPR.LO,
        }
      }
      hasBenchmarkOption={isESR}
      hasStandardOption={
        isESR && metric.metricType !== 'indicators'
      }
      onSetBenchmark={onSetBenchmark}
      onSetStandard={onSetStandard}
      standard={standard}
      benchmark={benchmark}
    />
  );
}

ChartContainerTrend.propTypes = {
  maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  maxYearESR: state => getMaxYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearESR: state => getMinYearESR(state),
  minYearCPR: state => getMinYearCPR(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scores: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'dimensions' || metric.metricType === 'rights') {
      if (metric.type === 'esr') {
        return getESRScoresForCountry(state, {
          countryCode,
          metric,
        });
      }
      return getCPRScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    if (metric.metricType === 'indicators') {
      return getESRIndicatorScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    return false;
  },
  metricInfo: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onCategoryClick: (key, value) => {
      const deleteParams = ['income', 'region', 'assessed'];
      dispatch(
        navigate(
          { pathname: '', search: `?${key}=${value}` },
          {
            replace: false,
            deleteParams: deleteParams.filter(p => p !== key),
            trackEvent: {
              category: 'Data',
              action: 'Country filter (country-metric, tags)',
              value: `${key}/${value}`,
            },
          },
        ),
      );
    },
    onLoadContent: path => {
      if (Array.isArray(path)) {
        path.forEach(p => dispatch(loadContentIfNeeded(p, 'atrisk')));
      } else {
        dispatch(loadContentIfNeeded(path, 'atrisk'));
      }
    },
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerTrend));
