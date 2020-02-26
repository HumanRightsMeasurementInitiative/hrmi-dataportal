/**
 *
 * ChartContainerCountrySummary
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Paragraph } from 'grommet';

import { COLUMNS, BENCHMARKS, STANDARDS } from 'containers/App/constants';
import {
  getStandardSearch,
  getBenchmarkSearch,
  getRightsForCountry,
  getDependenciesReady,
  getESRYear,
  getCPRYear,
  getDimensionsForCountry,
  getIndicatorsForCountry,
  getCountry,
  getCountryGrammar,
  getDimensionAverages,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';
import saga from 'containers/App/saga';
import ChartCountrySummary from 'components/ChartCountrySummary';
import NarrativeESR from 'components/CountryNarrative/NarrativeESR';
import NarrativeESRCompAssessment from 'components/CountryNarrative/NarrativeESRCompAssessment';
import NarrativeCPR from 'components/CountryNarrative/NarrativeCPR';
import NarrativeCPRCompAssessment from 'components/CountryNarrative/NarrativeCPRCompAssessment';
import Source from 'components/Source';
import ButtonToggleMainSetting from 'styled/ButtonToggleMainSetting';

// import NarrativeAtRisk from 'components/CountryNarrative/NarrativeAtRisk';

import { useInjectSaga } from 'utils/injectSaga';
import { getRightsScoresForDimension } from 'utils/scores';

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

const getDimensionScore = (type, data, benchmark) => {
  if (type === 'cpr' && data.score) {
    return parseFloat(data.score[COLUMNS.CPR.MEAN]);
  }
  if (type === 'esr' && data.score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(data.score[col]);
  }
  return false;
};

export function ChartContainerCountrySummary({
  onLoadData,
  dataReady,
  rights,
  benchmark,
  standard,
  esrYear,
  cprYear,
  dimensions,
  country,
  countryGrammar,
  indicators,
  dimensionAverages,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);
  const [showNarrative, setShowNarrative] = useState(false);

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
  return (
    <div>
      <ChartCountrySummary
        type="esr"
        dimensionCode="esr"
        dimensionScore={getDimensionScore(
          'esr',
          dimensions.esr,
          currentBenchmark,
        )}
        rights={getRightsScoresForDimension(rights, 'esr')}
        currentBenchmark={currentBenchmark}
        standard={standard}
        year={esrYear}
        maxValue={100}
      />
      {showNarrative && (
        <>
          <NarrativeESR
            dimensionScore={dimensions.esr.score}
            country={country}
            countryGrammar={countryGrammar}
            someData={hasSomeIndicatorScores}
            standard={standard}
            short
            benchmark={benchmark}
          />
          <Paragraph>
            <NarrativeESRCompAssessment
              country={country}
              countryGrammar={countryGrammar}
              dimensionScore={dimensions.esr && dimensions.esr.score}
              referenceScore={
                dimensionAverages.esr[standard].average[benchmark]
              }
              referenceCount={dimensionAverages.esr[standard].count}
              benchmark={currentBenchmark}
            />
          </Paragraph>
        </>
      )}
      <ChartCountrySummary
        type="cpr"
        dimensionCode="empowerment"
        dimensionScore={getDimensionScore('cpr', dimensions.empowerment)}
        rights={getRightsScoresForDimension(rights, 'empowerment')}
        year={cprYear}
        maxValue={10}
      />
      {showNarrative && (
        <>
          <NarrativeCPR
            dimensionKey="empowerment"
            score={dimensions.empowerment.score}
            country={country}
            countryGrammar={countryGrammar}
          />
          <Paragraph>
            <NarrativeCPRCompAssessment
              dimensionKey="empowerment"
              score={dimensions.empowerment.score}
              country={country}
              countryGrammar={countryGrammar}
              referenceScore={dimensionAverages.empowerment.average}
              referenceCount={dimensionAverages.empowerment.count}
              start
            />
          </Paragraph>
        </>
      )}
      <ChartCountrySummary
        type="cpr"
        dimensionCode="physint"
        dimensionScore={getDimensionScore('cpr', dimensions.physint)}
        rights={getRightsScoresForDimension(rights, 'physint')}
        year={cprYear}
        maxValue={10}
      />
      {showNarrative && (
        <>
          <NarrativeCPR
            dimensionKey="physint"
            score={dimensions.physint.score}
            country={country}
            countryGrammar={countryGrammar}
          />
          <Paragraph>
            <NarrativeCPRCompAssessment
              dimensionKey="physint"
              score={dimensions.physint.score}
              country={country}
              countryGrammar={countryGrammar}
              referenceScore={dimensionAverages.physint.average}
              referenceCount={dimensionAverages.physint.count}
              start
            />
          </Paragraph>
        </>
      )}
      <Source />
      <div>
        {!showNarrative && (
          <ButtonToggleMainSetting
            active
            onClick={() => {
              setShowNarrative(true);
            }}
          >
            Show Narrative
          </ButtonToggleMainSetting>
        )}
        {showNarrative && (
          <ButtonToggleMainSetting
            active
            onClick={() => {
              setShowNarrative(false);
            }}
          >
            Hide Narrative
          </ButtonToggleMainSetting>
        )}
      </div>
    </div>
  );
}

ChartContainerCountrySummary.propTypes = {
  // countryCode: PropTypes.string.isRequired,
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadData: PropTypes.func.isRequired,
  dataReady: PropTypes.bool,
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensionAverages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  indicators: (state, { countryCode }) =>
    getIndicatorsForCountry(state, countryCode),
  rights: (state, { countryCode }) => getRightsForCountry(state, countryCode),
  dimensions: (state, { countryCode }) =>
    getDimensionsForCountry(state, countryCode),
  esrYear: state => getESRYear(state),
  cprYear: state => getCPRYear(state),
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

export default compose(withConnect)(ChartContainerCountrySummary);
