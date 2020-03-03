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
// import { Paragraph, Box } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';

import { BENCHMARKS, GRADES, COLUMNS } from 'containers/App/constants';

import {
  getIndicatorsForCountryAndRight,
  getCountry,
  getCountryGrammar,
  getStandardSearch,
  getBenchmarkSearch,
  getDimensionAverages,
  getDependenciesReady,
  getRightsForCountry,
  getESRScoreForCountry,
  // getAuxIndicatorsForCountry,
  // getLatestCountryCurrentGDP,
  // getLatestCountry2011PPPGDP,
  // getESRYear,
  // getCPRYear,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';
import saga from 'containers/App/saga';

import ChartBars from 'components/ChartBars';

import { useInjectSaga } from 'utils/injectSaga';
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

// const getDimensionLabel = (score, intl) =>
//   intl.formatMessage(rootMessages.dimensions[score.key]);
//
const prepareData = ({
  indicators,
  currentBenchmark,
  standard,
  onClick,
  intl,
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
    onClick: () => onClick(i.key),
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
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const currentStandard = STANDARDS.find(s => s.key === standard);

  return (
    <div>
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
            onClick: () => onMetricClick(metricCode),
          },
        ]}
        currentBenchmark={currentBenchmark}
        standard={standard}
        labelColor="esrDark"
        padVertical="xsmall"
        grades={GRADES.esr}
        gradeLabels={false}
        level={1}
        commonLabel="Right to"
        listHeader
        metric={getMetricDetails(metricCode)}
      />
      <ChartBars
        data={prepareData({
          indicators,
          currentBenchmark,
          standard,
          onClick: onMetricClick,
          intl,
        })}
        currentBenchmark={currentBenchmark}
        standard={standard}
        commonLabel="Indicators"
        labelColor="esrDark"
        grades={GRADES.esr}
        listHeader
      />
    </div>
  );
}

ChartContainerCountryIndicators.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  metricCode: PropTypes.string.isRequired,
  dataReady: PropTypes.bool,
  right: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
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
  dimensionAverages: state => getDimensionAverages(state),
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