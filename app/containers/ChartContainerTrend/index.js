/**
 *
 * ChartContainerTrend
 *
 */

import { Box } from 'grommet';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

import { BENCHMARKS, COLUMNS } from 'containers/App/constants';
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
  loadDataIfNeeded,
  setStandard,
  setBenchmark,
  setRaw,
  toggleGroup,
} from 'containers/App/actions';

import ChartCountryMetricTrend from 'components/ChartCountryMetricTrend';
import ChartMetricTrend from 'components/ChartMetricTrend';
import getMetricDetails from 'utils/metric-details';
import ChartCountryMetricSmallMultiples from '../../components/ChartCountryMetricSmallMultiples';

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
      // {
      //   value: parseFloat(indicatorInfo[COLUMNS.ESR.RAW_REF_MIN]),
      //   style: 'solid',
      //   key: 'min',
      // },
      // {
      //   value: parseFloat(indicatorInfo[COLUMNS.ESR.RAW_REF_BEST]),
      //   style: 'solid',
      //   key: 'best',
      // },
      {
        refColumn: COLUMNS.ESR.RAW_REF,
        style: 'dotted',
        key: 'adjusted',
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
  metricSelector,
  metrics,
  allMetricsScores,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  const [highlightYear, setYear] = useState(null);

  const metric = getMetricDetails(metricCode);
  console.log({ metric });
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const isESR = metric.metricType === 'indicators' || metric.type === 'esr';

  let groupsActive = null;
  if (
    metric.metricType === 'rights' &&
    metric.hasGroups &&
    metric.hasGroups.indexOf(standard) > -1
  ) {
    groupsActive = activeGroups;
  }
  if (metric.metricType === 'indicators' && metric.hasGroups) {
    groupsActive = activeGroups;
  }

  console.log('other', { metrics });

  if (metric.type === 'esr') {
    // prettier-ignore
    return (
      <div>
        {metricSelector}
        <ChartCountryMetricTrend
          color={getColour(metric)}
          colorCode={theme.global.colors[getColour(metric)]}
          colorHint={`${getColour(metric)}Dark`}
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
          rangeValues={
            isESR &&
            metric.metricType === 'indicators' &&
            raw &&
            {
              lower: parseFloat(metricInfo[COLUMNS.ESR.RAW_REF_MIN]),
              upper: parseFloat(metricInfo[COLUMNS.ESR.RAW_REF_BEST]),
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
          hasRawOption={false}
          raw={raw}
          onRawChange={onRawChange}
          groupsActive={groupsActive}
          onGroupToggle={onGroupToggle}
        />
      </div>
    );
  }
  return (
    <Box direction="row" wrap>
      {metrics.map(m => (
        <ChartMetricTrend
          scores={{
            // country: right.scores,
            country: allMetricsScores[m.key].reduce(
              (soFar, dataForYear) => ({
              mean: { ...soFar.mean, [dataForYear.year]: { score: dataForYear.mean } },
              lobound_10: { ...soFar.lobound_10, [dataForYear.year]: { score: dataForYear.lobound_10 } },
              upbound_90: { ...soFar.upbound_90, [dataForYear.year]: { score: dataForYear.upbound_90 } },
            }),
              {},
            ),
            // regions: regionRight.scores,
          }}
          // regionScores={regionScores}
          // maxYear={maxYearESR}
          // minYear={minYearESR}
          // maxValue={TYPES.esr.max}
          maxValue={isESR ? 100 : 11}
          maxYear={isESR ? maxYearESR : maxYearCPR}
          minYear={isESR ? minYearESR : minYearCPR}
          benchmark={benchmark}
          // metric={getMetricDetails(right.key)}
          metric={getMetricDetails(m.key)}
          mode="multi-country"
          // onSelectMetric={() => onSelectMetric(right.key)}
          // onSelectPage={onSelectPage}
          // currentRegion={
          //   country[COLUMNS.COUNTRIES.UN_REGION]
          // }
          setHighlightYear={setYear}
          highlightYear={highlightYear}
        />
      ))}
    </Box>
  );

  // <ChartCountryMetricSmallMultiples
  //   color={getColour(metric)}
  //   colorCode={theme.global.colors[getColour(metric)]}
  //   colorHint={`${getColour(metric)}Dark`}
  //   scores={scores}
  //   percentage={isESR}
  //   maxValue={isESR ? 100 : 11}
  //   maxYear={isESR ? maxYearESR : maxYearCPR}
  //   minYear={isESR ? minYearESR : minYearCPR}
  //   column={getTrendColumn(
  //     isESR,
  //     currentBenchmark,
  //     metric.metricType === 'indicators' && raw
  //   )}
  //   rangeColumns={
  //     !isESR && {
  //       upper: COLUMNS.CPR.HI,
  //       lower: COLUMNS.CPR.LO,
  //     }
  //   }
  //   rangeValues={
  //     isESR &&
  //     metric.metricType === 'indicators' &&
  //     raw &&
  //     {
  //       lower: parseFloat(metricInfo[COLUMNS.ESR.RAW_REF_MIN]),
  //       upper: parseFloat(metricInfo[COLUMNS.ESR.RAW_REF_BEST]),
  //     }
  //   }
  //   benchmarkRefs={
  //     isESR && getRefs(
  //       currentBenchmark,
  //       metric.metricType === 'indicators',
  //       raw,
  //       metricInfo,
  //     )
  //   }
  //   hasBenchmarkOption={isESR}
  //   hasStandardOption={
  //     isESR && metric.metricType !== 'indicators'
  //   }
  //   onSetBenchmark={onSetBenchmark}
  //   onSetStandard={onSetStandard}
  //   standard={standard}
  //   benchmark={benchmark}
  //   metric={metric}
  //   hasRawOption={false}
  //   raw={raw}
  //   onRawChange={onRawChange}
  //   groupsActive={groupsActive}
  //   onGroupToggle={onGroupToggle}
  // />
  //   ))
  // }
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
  metricSelector: PropTypes.node,
  metrics: PropTypes.array,
  allMetricsScores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  maxYearESR: state => getMaxYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearESR: state => getMinYearESR(state),
  minYearCPR: state => getMinYearCPR(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scores: (state, { countryCode, metricCode, metrics }) => {
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
        metricCode: metric.code,
      });
    }
    return false;
  },
  allMetricsScores: (state, { countryCode, metricCode, metrics }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'dimensions' && metric.type === 'cpr') {
      return metrics.reduce(
        (soFar, m) => ({
        ...soFar,
        [m.key]: getCPRScoresForCountry(state, {
          countryCode,
          metric: m,
        }),
      }),
        {},
      );
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
