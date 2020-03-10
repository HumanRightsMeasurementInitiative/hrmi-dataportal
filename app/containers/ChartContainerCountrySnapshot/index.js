/**
 *
 * ChartContainerCountrySnapshot
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph, Box, Heading } from 'grommet';
import styled from 'styled-components';

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

import ChartHeader from 'components/ChartHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import ChartCountrySnapshot from 'components/ChartCountrySnapshot';
import NarrativeESRStandardHint from 'components/CountryNarrative/NarrativeESRStandardHint';
import NarrativeESR from 'components/CountryNarrative/NarrativeESR';
import NarrativeESRCompAssessment from 'components/CountryNarrative/NarrativeESRCompAssessment';
import NarrativeCPR from 'components/CountryNarrative/NarrativeCPR';
import NarrativeCPRCompAssessment from 'components/CountryNarrative/NarrativeCPRCompAssessment';
import Source from 'components/Source';

import ButtonText from 'styled/ButtonText';

import { useInjectSaga } from 'utils/injectSaga';
import { getRightsScoresForDimension } from 'utils/scores';

import { getMessageGrammar } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  margin-bottom: 35px;
`;

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

export function ChartContainerCountrySnapshot({
  onLoadData,
  dataReady,
  rights,
  benchmark,
  standard,
  esrYear,
  cprYear,
  dimensions,
  country,
  countryCode,
  countryGrammar,
  indicators,
  dimensionAverages,
  intl,
  goToTab,
  onMetricClick,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);
  if (!dataReady) return <LoadingIndicator />;
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
    <Styled>
      <ChartHeader
        title={intl.formatMessage(
          messages.title,
          getMessageGrammar(intl, countryCode, null, countryGrammar),
        )}
      />
      <NarrativeESRStandardHint country={country} standard={standard} />
      <Box margin={{ bottom: 'large' }}>
        <ChartCountrySnapshot
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
          onMetricClick={onMetricClick}
        />
        <ChartCountrySnapshot
          type="cpr"
          dimensionCode="physint"
          dimensionScore={
            dimensions.physint.score &&
            getDimensionScore('cpr', dimensions.physint)
          }
          rights={getRightsScoresForDimension(rights, 'physint')}
          year={cprYear}
          maxValue={10}
          onMetricClick={onMetricClick}
        />
        <ChartCountrySnapshot
          type="cpr"
          dimensionCode="empowerment"
          dimensionScore={
            dimensions.empowerment.score &&
            getDimensionScore('cpr', dimensions.empowerment)
          }
          rights={getRightsScoresForDimension(rights, 'empowerment')}
          year={cprYear}
          maxValue={10}
          onMetricClick={onMetricClick}
        />
        <Source />
      </Box>
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={4}>
          <FormattedMessage {...rootMessages.dimensions.esr} />
        </Heading>
        <NarrativeESRStandardHint country={country} standard={standard} />
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
              dimensionAverages &&
              dimensionAverages.esr[standard].average[benchmark]
            }
            referenceCount={
              dimensionAverages && dimensionAverages.esr[standard].count
            }
            benchmark={currentBenchmark}
          />
        </Paragraph>
        <Paragraph>
          <ButtonText onClick={() => goToTab('report-esr')}>
            Explore details
          </ButtonText>
        </Paragraph>
      </Box>
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={4}>
          <FormattedMessage {...rootMessages.dimensions.physint} />
        </Heading>
        <NarrativeCPR
          dimensionKey="physint"
          score={dimensions.physint.score}
          country={country}
          countryGrammar={countryGrammar}
        />
        {dimensions.physint.score && (
          <>
            <Paragraph>
              <NarrativeCPRCompAssessment
                dimensionKey="physint"
                score={dimensions.physint.score}
                country={country}
                countryGrammar={countryGrammar}
                referenceScore={
                  dimensionAverages && dimensionAverages.physint.average
                }
                referenceCount={
                  dimensionAverages && dimensionAverages.physint.count
                }
                start
              />
            </Paragraph>
            <Paragraph>
              <ButtonText onClick={() => goToTab('report-physint')}>
                Explore details
              </ButtonText>
            </Paragraph>
          </>
        )}
      </Box>
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={4}>
          <FormattedMessage {...rootMessages.dimensions.empowerment} />
        </Heading>
        <NarrativeCPR
          dimensionKey="empowerment"
          score={dimensions.empowerment.score}
          country={country}
          countryGrammar={countryGrammar}
        />
        {dimensions.empowerment.score && (
          <>
            <Paragraph>
              <NarrativeCPRCompAssessment
                dimensionKey="empowerment"
                score={dimensions.empowerment.score}
                country={country}
                countryGrammar={countryGrammar}
                referenceScore={
                  dimensionAverages && dimensionAverages.empowerment.average
                }
                referenceCount={
                  dimensionAverages && dimensionAverages.empowerment.count
                }
                start
              />
            </Paragraph>
            <Paragraph>
              <ButtonText onClick={() => goToTab('report-empowerment')}>
                Explore details
              </ButtonText>
            </Paragraph>
          </>
        )}
      </Box>
    </Styled>
  );
}

ChartContainerCountrySnapshot.propTypes = {
  countryCode: PropTypes.string.isRequired,
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadData: PropTypes.func.isRequired,
  goToTab: PropTypes.func,
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
  intl: intlShape.isRequired,
  onMetricClick: PropTypes.func,
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

export default compose(withConnect)(injectIntl(ChartContainerCountrySnapshot));
