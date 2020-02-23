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
  getRawSearch,
  getActiveGroupsSearch,
} from 'containers/App/selectors';

import {
  navigate,
  loadContentIfNeeded,
  loadDataIfNeeded,
  setStandard,
  setBenchmark,
  setRaw,
  toggleGroup,
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
const getRefs = (benchmark, isIndicator, raw = false, indicatorInfo) => {
  if (isIndicator && raw && indicatorInfo) {
    return [
      {
        value: parseFloat(indicatorInfo[COLUMNS.ESR.RAW_REF_MIN]),
        style: 'solid',
        key: 'min',
      },
      {
        refColumn: COLUMNS.ESR.RAW_REF,
        style: 'dotted',
        key: 'adjusted',
      },
      {
        value: parseFloat(indicatorInfo[COLUMNS.ESR.RAW_REF_BEST]),
        style: 'solid',
        key: 'best',
      },
    ];
  }
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        refColumn: isIndicator
          ? benchmark.refIndicatorColumn
          : benchmark.refColumn,
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};

const getTrendColumn = (isESR, currentBenchmark, raw) => {
  if (isESR && raw) return COLUMNS.ESR.RAW;
  if (isESR && !raw) return currentBenchmark.column;
  return COLUMNS.CPR.MEAN;
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
  raw,
  onRawChange,
  onGroupToggle,
  activeGroups,
  metricInfo,
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
      column={getTrendColumn(
        isESR,
        currentBenchmark,
        metric.metricType === 'indicators' && raw
      )}
      rangeColumns={
        !isESR && {
          upper: COLUMNS.CPR.HI,
          lower: COLUMNS.CPR.LO,
        }
      }
      benchmarkRefs={
        isESR && getRefs(
          currentBenchmark,
          metric.metricType === 'indicators',
          raw,
          metricInfo,
        )
      }
      hasBenchmarkOption={isESR}
      hasStandardOption={
        isESR && metric.metricType !== 'indicators'
      }
      onSetBenchmark={onSetBenchmark}
      onSetStandard={onSetStandard}
      standard={standard}
      benchmark={benchmark}
      metric={metric}
      hasRawOption={
        isESR && metric.metricType === 'indicators'
      }
      raw={raw}
      onRawChange={onRawChange}
      groupsActive={activeGroups}
      onGroupToggle={onGroupToggle}
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
  metricInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  theme: PropTypes.object,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  onGroupToggle: PropTypes.func,
  activeGroups: PropTypes.array,
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
  raw: state => getRawSearch(state),
  activeGroups: state => getActiveGroupsSearch(state),
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
    onRawChange: value => {
      dispatch(setRaw(value));
    },
    onGroupToggle: groups => {
      dispatch(toggleGroup(groups));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerTrend));
