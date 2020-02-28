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
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Paragraph, Heading } from 'grommet';
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
import ChartTools from 'containers/ChartTools';
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

import messages from './messages';

const Styled = styled.div`
  position: relative;
  margin-top: 35px;
`;
const ChartToolWrapper = styled.div`
  position: relative;
  right: 0px;
  top: 4px;
  text-align: right;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    position: absolute;
    right: ${({ theme }) => theme.global.edgeSize.medium};
    top: 0;
  }
`;

// prettier-ignore
const StyledHeading = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  margin-top: 0;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
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
      <StyledHeading responsive={false} level={2}>
        <FormattedMessage
          {...messages.title}
          values={getMessageGrammar(intl, countryCode, null, countryGrammar)}
        />
      </StyledHeading>
      <ChartToolWrapper>
        <ChartTools
          howToReadConfig={{
            key: 'tab-snapshot',
            chart: 'Bar',
          }}
          settingsConfig={{
            key: 'tab-snapshot',
            showStandard: true,
            showBenchmark: true,
          }}
        />
      </ChartToolWrapper>
      <NarrativeESRStandardHint country={country} standard={standard} />
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
      {dimensions.physint.score && (
        <ChartCountrySnapshot
          type="cpr"
          dimensionCode="physint"
          dimensionScore={getDimensionScore('cpr', dimensions.physint)}
          rights={getRightsScoresForDimension(rights, 'physint')}
          year={cprYear}
          maxValue={10}
          onMetricClick={onMetricClick}
        />
      )}
      {dimensions.empowerment.score && (
        <ChartCountrySnapshot
          type="cpr"
          dimensionCode="empowerment"
          dimensionScore={getDimensionScore('cpr', dimensions.empowerment)}
          rights={getRightsScoresForDimension(rights, 'empowerment')}
          year={cprYear}
          maxValue={10}
          onMetricClick={onMetricClick}
        />
      )}
      <Source />
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
        <ButtonText onClick={() => goToTab('report-esr')}>
          Explore details
        </ButtonText>
      </Paragraph>
      <NarrativeCPR
        dimensionKey="empowerment"
        score={dimensions.empowerment.score}
        country={country}
        countryGrammar={countryGrammar}
      />
      {dimensions.empowerment.score && (
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
          <ButtonText onClick={() => goToTab('report-empowerment')}>
            Explore details
          </ButtonText>
        </Paragraph>
      )}
      <NarrativeCPR
        dimensionKey="physint"
        score={dimensions.physint.score}
        country={country}
        countryGrammar={countryGrammar}
      />
      {dimensions.physint.score && (
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
          <ButtonText onClick={() => goToTab('report-physint')}>
            Explore details
          </ButtonText>
        </Paragraph>
      )}
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
