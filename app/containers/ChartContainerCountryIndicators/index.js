/**
 *
 * ChartContainerCountryIndicators
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
import { Box } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';

import { BENCHMARKS, GRADES, COLUMNS } from 'containers/App/constants';

import {
  getIndicatorsForCountryAndRight,
  getCountry,
  getCountryGrammar,
  getStandardSearch,
  getBenchmarkSearch,
  getDependenciesReady,
  getRightsForCountry,
  getESRScoreForCountry,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import ChartBars from 'components/ChartBars';
import Source from 'components/Source';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

const DEPENDENCIES = ['esrScores', 'esrIndicators', 'esrIndicatorScores'];

const getRightValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};

const getRightRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refColumn;
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

const getMetricLabel = (metricCode, intl) =>
  intl.formatMessage(rootMessages['rights-xshort'][metricCode]);

const getIndicatorLabel = (metricCode, intl) =>
  intl.formatMessage(rootMessages.indicators[metricCode]);

const prepareData = ({
  indicators,
  currentBenchmark,
  standard,
  onClick,
  intl,
  activeCode,
}) =>
  // prettier-ignore
  indicators.map(i => ({
    color: 'esr',
    value: getRightValue(i.score, currentBenchmark),
    maxValue: 100,
    unit: '%',
    stripes: standard === 'hi',
    key: i.key,
    label: getIndicatorLabel(i.key, intl),
    onClick: () => onClick(i.key, 'esr'),
    active: activeCode === i.key,
  }));

export function ChartContainerCountryIndicators({
  metricCode,
  onLoadData,
  // country,
  // dimensionCode,
  right,
  indicators,
  standard,
  benchmark,
  dataReady,
  intl,
  onMetricClick,
  activeCode,
  metricSelector,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const currentStandard = STANDARDS.find(s => s.key === standard);

  return (
    <div>
      <Box margin={{ bottom: 'small' }}>
        {metricSelector}
        <ChartBars
          data={[
            {
              color: 'esr',
              refValues: getRightRefs(right, currentBenchmark),
              value: getRightValue(right, currentBenchmark),
              maxValue: 100,
              unit: '%',
              stripes: standard === 'hi',
              key: metricCode,
              label: getMetricLabel(metricCode, intl),
              onClick: () => onMetricClick(metricCode, 'esr'),
              active: activeCode === metricCode,
            },
          ]}
          currentBenchmark={currentBenchmark}
          standard={standard}
          labelColor="esrDark"
          padVertical="xsmall"
          grades={GRADES.esr}
          gradeLabels={false}
          level={1}
          commonLabel={intl.formatMessage(
            rootMessages.charts.rightsColumnLabel.esr,
          )}
          listHeader
          metric={getMetricDetails(metricCode)}
          scoresAside
        />
        <ChartBars
          scoresAside
          data={prepareData({
            indicators,
            currentBenchmark,
            standard,
            onClick: onMetricClick,
            intl,
            activeCode,
          })}
          currentBenchmark={currentBenchmark}
          standard={standard}
          commonLabel={intl.formatMessage(
            rootMessages.charts.indicatorsColumnLabel,
          )}
          labelColor="esrDark"
          grades={GRADES.esr}
          listHeader
        />
      </Box>
      <Box margin={{ bottom: 'large' }}>
        <Source />
      </Box>
    </div>
  );
}

ChartContainerCountryIndicators.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  metricCode: PropTypes.string.isRequired,
  activeCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  right: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
  metricSelector: PropTypes.node,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  indicators: (state, { countryCode, metricCode }) =>
    getIndicatorsForCountryAndRight(state, countryCode, { metricCode }),
  right: (state, { countryCode, metricCode }) =>
    getESRScoreForCountry(state, { countryCode, metricCode }),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  rights: (state, { countryCode }) => getRightsForCountry(state, countryCode),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(
  withTheme(injectIntl(ChartContainerCountryIndicators)),
);
