/**
 *
 * ChartContainerCountryDimension
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

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

import { loadDataIfNeeded } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

export function ChartContainerCountryDimension({
  countryCode,
  type,
  onLoadData,
}) {
  console.log(type);
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);
  return (
    <div>
      <div>TODO: Dimension Summary Chart for {countryCode} </div>
      <div>TODO: Dimension Narrative</div>
    </div>
  );
  // const metric = getMetricDetails(metricCode);
  // const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const isESR = metric.metricType === 'indicators' || metric.type === 'esr';
  // // prettier-ignore
  // return (
  //   <NarrativeESR
  //     dimensionScore={dimensions.esr && dimensions.esr.score}
  //     country={country}
  //     countryGrammar={countryGrammar}
  //     someData={hasSomeIndicatorScores}
  //   />
  //   {dimensions.esr && reference && reference.esr && (
  //     <Paragraph>
  //       <NarrativeESRCompAssessment
  //         country={country}
  //         countryGrammar={countryGrammar}
  //         dimensionScore={dimensions.esr && dimensions.esr.score}
  //         rightsAverageScore={scoreESR}
  //         referenceScore={reference.esr[standard].average[benchmark]}
  //         referenceCount={reference.esr[standard].count}
  //         benchmark={currentBenchmark}
  //         some={rightsESRScoreCount < rightsESR.length}
  //         one={rightsESRScoreCount === 1}
  //       />
  //     </Paragraph>
  //   )}
  // );
}

ChartContainerCountryDimension.propTypes = {
  countryCode: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onLoadData: PropTypes.func.isRequired,
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
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerCountryDimension));
