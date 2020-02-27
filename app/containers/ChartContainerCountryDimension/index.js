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
import { Paragraph } from 'grommet';

// import getMetricDetails from 'utils/metric-details';

import {
  getDimensionsForCountry,
  getIndicatorsForCountry,
  getCountry,
  getCountryGrammar,
  getStandardSearch,
  getBenchmarkSearch,
  getDimensionAverages,
  getDependenciesReady,
  // getRightsForCountry,
  // getAuxIndicatorsForCountry,
  // getLatestCountryCurrentGDP,
  // getLatestCountry2011PPPGDP,
  // getESRYear,
  // getCPRYear,
} from 'containers/App/selectors';

import { STANDARDS, BENCHMARKS } from 'containers/App/constants';
import { loadDataIfNeeded } from 'containers/App/actions';
import saga from 'containers/App/saga';
import NarrativeESR from 'components/CountryNarrative/NarrativeESR';
import NarrativeESRStandardHint from 'components/CountryNarrative/NarrativeESRStandardHint';
import NarrativeESRCompAssessment from 'components/CountryNarrative/NarrativeESRCompAssessment';
import NarrativeCPR from 'components/CountryNarrative/NarrativeCPR';
import NarrativeCPRCompAssessment from 'components/CountryNarrative/NarrativeCPRCompAssessment';
// import NarrativeAtRisk from 'components/CountryNarrative/NarrativeAtRisk';

import { useInjectSaga } from 'utils/injectSaga';

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

export function ChartContainerCountryDimension({
  countryCode,
  type,
  onLoadData,
  country,
  dimensions,
  dimensionCode,
  dimensionAverages,
  countryGrammar,
  indicators,
  standard,
  benchmark,
  dataReady,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const currentStandard = STANDARDS.find(s => s.key === standard);
  const hasSomeIndicatorScores = Object.values(indicators)
    .filter(s => {
      if (!s.details) return false;
      return (
        s.details.standard === 'Both' ||
        s.details.standard === currentStandard.code
      );
    })
    .reduce((m, s) => m || !!s.score, false);

  const dimension = dimensions[dimensionCode];
  const reference = dimensionAverages[dimensionCode];

  return (
    <div>
      <div>TODO: Dimension Summary Chart for {countryCode} </div>
      <div>
        {type === 'esr' && dimension && (
          <>
            <NarrativeESRStandardHint country={country} standard={standard} />
            <NarrativeESR
              dimensionScore={dimension.score}
              country={country}
              countryGrammar={countryGrammar}
              someData={hasSomeIndicatorScores}
              standard={standard}
            />
            <Paragraph>
              <NarrativeESRCompAssessment
                country={country}
                countryGrammar={countryGrammar}
                dimensionScore={dimension && dimension.score}
                referenceScore={reference[standard].average[benchmark]}
                referenceCount={reference[standard].count}
                benchmark={currentBenchmark}
              />
            </Paragraph>
          </>
        )}
        {type === 'cpr' && dimension && (
          <>
            <NarrativeCPR
              dimensionKey={dimensionCode}
              score={dimension.score}
              country={country}
              countryGrammar={countryGrammar}
            />
            <Paragraph>
              <NarrativeCPRCompAssessment
                dimensionKey={dimensionCode}
                score={dimension.score}
                country={country}
                countryGrammar={countryGrammar}
                referenceScore={reference.average}
                referenceCount={reference.count}
                start
              />
            </Paragraph>
          </>
        )}
      </div>
    </div>
  );
  // rightsAverageScore={scoreESR}
  // some={rightsESRScoreCount < rightsESR.length}
  // one={rightsESRScoreCount === 1}
  // // prettier-ignore
  // if (type === 'esr') {
  //   return (
  //     {dimensions.esr && reference && reference.esr && (
  //     )}
  //   );
  // }
  // return null;
}

ChartContainerCountryDimension.propTypes = {
  dimensionCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadData: PropTypes.func.isRequired,
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  dimensionAverages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // onTrackEvent: PropTypes.func.isRequired,
  // onCategoryClick: PropTypes.func,
  // activeTab: PropTypes.number,
  // onMetricClick: PropTypes.func,
  // onAtRiskClick: PropTypes.func,
  // onCloseMetricOverlay: PropTypes.func,
  // match: PropTypes.object,
  // atRisk: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // esrYear: PropTypes.number,
  // cprYear: PropTypes.number,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  indicators: (state, { countryCode }) =>
    getIndicatorsForCountry(state, countryCode),
  // rights: (state, { countryCode }) => getRightsForCountry(state, countryCode),
  dimensions: (state, { countryCode }) =>
    getDimensionsForCountry(state, countryCode),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  dimensionAverages: state => getDimensionAverages(state),
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
