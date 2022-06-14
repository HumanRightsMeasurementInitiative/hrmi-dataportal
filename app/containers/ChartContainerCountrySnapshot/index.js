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

import {
  COLUMNS,
  BENCHMARKS,
  STANDARDS,
  SUBREGIONS_FOR_COMPARISON_CPR,
  SUBREGIONS_CPR_COMPLETE,
} from 'containers/App/constants';
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
  getReferenceScores,
  getLocale,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';
import AboutCountryContainer from 'containers/AboutCountryContainer';

import ChartHeader from 'components/ChartHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import ChartCountrySnapshot from 'components/ChartCountrySnapshot';
import NarrativeESRStandardHint from 'components/CountryNarrative/NarrativeESRStandardHint';
import NarrativeESR from 'components/CountryNarrative/NarrativeESR';
import NarrativeESRCompAssessment from 'components/CountryNarrative/NarrativeESRCompAssessment';
import NarrativeCPR from 'components/CountryNarrative/NarrativeCPR';
import NarrativeCPRCompAssessment from 'components/CountryNarrative/NarrativeCPRCompAssessment';
import Source from 'components/Source';

import ButtonTextIcon from 'styled/ButtonTextIcon';
import Hint from 'styled/Hint';

import { getRightsScoresForDimension } from 'utils/scores';
import { getMessageGrammar } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';

import TabCountryBehindTheNumbers from '../../components/TabCountryBehindTheNumbers';

const Styled = styled.div`
  margin-bottom: 35px;
  @media print {
    position: relative;
    padding-left: ${({ theme }) => theme.global.edgeSize.large};
    padding-right: ${({ theme }) => theme.global.edgeSize.large};
  }
`;

const RemoveFromPDFWrapper = styled.div`
  @media print {
    display: none;
  }
`;

const AddToPDFWrapper = styled.div`
  display: none;
  @media print {
    display: initial;
    h3 {
      font-size: 16px;
      margin-top: 22px;
    }
  }
`;

const BreakBefore = styled(Box)`
  @media print {
    position: ${({ shouldBreak }) => (shouldBreak ? 'relative' : 'initial')};
    break-before: ${({ shouldBreak }) => (shouldBreak ? 'page' : 'initial')};
    margin-top: ${({ shouldBreak }) => (shouldBreak ? '-150px' : '0px')};
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
  activeCode,
  locale,
}) {
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
    .some(s => !!s.score);
  let comparativeScoreESR;
  let comparativeRightsESR;
  if (dimensions.esr && dimensions.esr.score) {
    comparativeScoreESR = dimensions.esr.score[currentBenchmark.column];
    comparativeRightsESR = 'all';
  }
  if (dimensions.esr && dimensions.esr.scoreSome) {
    comparativeScoreESR = dimensions.esr.scoreSome[currentBenchmark.column];
    comparativeRightsESR = dimensions.esr.scoreSome.metric;
  }
  const hasSomePhysintScore = Object.values(rights).some(
    s => s.dimension === 'physint' && !!s.score,
  );
  const hasSomeEmpowermentScore = Object.values(rights).some(
    s => s.dimension === 'empowerment' && !!s.score,
  );
  const esrData = dimensions.esr.score;
  const physIntData = dimensions.physint.score;

  return (
    <Styled>
      <ChartHeader
        title={intl.formatMessage(
          messages.title,
          getMessageGrammar(intl, countryCode, null, countryGrammar),
        )}
        tools={{
          howToReadConfig: {
            key: 'tab-snapshot',
            chart: 'Snapshot',
          },
          settingsConfig: {
            key: 'tab-snapshot',
            showStandard: true,
            showBenchmark: true,
          },
          behindTheNumbersConfig:
            countryCode === 'CHN'
              ? {
                  key: 'all',
                }
              : null,
        }}
        displayInPDF={false}
        countryCode={countryCode}
        locale={locale}
      />
      <RemoveFromPDFWrapper>
        <NarrativeESRStandardHint
          country={country}
          standard={standard}
          countryGrammar={countryGrammar}
        />
      </RemoveFromPDFWrapper>
      <div margin={{ bottom: 'large' }}>
        {/* Quality of Life */}
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
          grammar={getMessageGrammar(intl, countryCode, null, countryGrammar)}
          activeCode={activeCode}
        />
        <AddToPDFWrapper>
          <Box margin={{ bottom: 'medium' }}>
            <NarrativeESR
              dimensionScore={dimensions.esr.score}
              country={country}
              countryGrammar={countryGrammar}
              standard={standard}
              short
              benchmark={benchmark}
              showNoData={false}
            />
            <NarrativeESRCompAssessment
              country={country}
              countryGrammar={countryGrammar}
              comparativeScore={parseFloat(comparativeScoreESR)}
              comparativeRights={comparativeRightsESR}
              groupAverageScore={
                dimensionAverages &&
                dimensionAverages.esr &&
                dimensionAverages.esr.average &&
                dimensionAverages.esr.average[benchmark]
              }
              benchmark={currentBenchmark}
            />
          </Box>
        </AddToPDFWrapper>
        {/* Safety from the State */}
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
          grammar={getMessageGrammar(intl, countryCode, null, countryGrammar)}
          activeCode={activeCode}
        />
        <AddToPDFWrapper>
          <BreakBefore margin={{ bottom: 'medium' }} shouldBreak={physIntData}>
            <Box margin={{ bottom: 'medium' }}>
              <NarrativeCPR
                dimensionKey="physint"
                score={dimensions.physint.score}
                country={country}
                countryGrammar={countryGrammar}
                showNoData={false}
              />
              <NarrativeCPRCompAssessment
                dimensionKey="physint"
                score={dimensions.physint.score}
                someRights={hasSomePhysintScore}
                hadSurvey={
                  hasSomePhysintScore ||
                  hasSomeEmpowermentScore ||
                  SUBREGIONS_CPR_COMPLETE.indexOf(
                    country[COLUMNS.COUNTRIES.SUBREGION],
                  ) > -1
                }
                country={country}
                countryGrammar={countryGrammar}
                referenceScore={
                  dimensionAverages &&
                  dimensionAverages.physint &&
                  dimensionAverages.physint.average
                }
                referenceCount={
                  dimensionAverages &&
                  dimensionAverages.physint &&
                  dimensionAverages.physint.count
                }
                comparativeGroup={
                  SUBREGIONS_FOR_COMPARISON_CPR.indexOf(
                    country.subregion_code,
                  ) > -1
                    ? 'subregion'
                    : 'all'
                }
              />
            </Box>
          </BreakBefore>
        </AddToPDFWrapper>
        {/* Empowerment */}
        <BreakBefore margin={{ bottom: 'medium' }} shouldBreak={!physIntData}>
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
            grammar={getMessageGrammar(intl, countryCode, null, countryGrammar)}
            activeCode={activeCode}
          />
        </BreakBefore>
        <AddToPDFWrapper>
          <Box margin={{ bottom: 'medium' }}>
            <NarrativeCPR
              dimensionKey="empowerment"
              score={dimensions.empowerment.score}
              country={country}
              countryGrammar={countryGrammar}
              showNoData={false}
            />
            <NarrativeCPRCompAssessment
              dimensionKey="empowerment"
              score={dimensions.empowerment.score}
              someRights={hasSomeEmpowermentScore}
              hadSurvey={
                hasSomePhysintScore ||
                hasSomeEmpowermentScore ||
                SUBREGIONS_CPR_COMPLETE.indexOf(
                  country[COLUMNS.COUNTRIES.SUBREGION],
                ) > -1
              }
              country={country}
              countryGrammar={countryGrammar}
              referenceScore={
                dimensionAverages &&
                dimensionAverages.empowerment &&
                dimensionAverages.empowerment.average
              }
              referenceCount={
                dimensionAverages &&
                dimensionAverages.empowerment &&
                dimensionAverages.empowerment.count
              }
              comparativeGroup={
                SUBREGIONS_FOR_COMPARISON_CPR.indexOf(country.subregion_code) >
                -1
                  ? 'subregion'
                  : 'all'
              }
            />
          </Box>
        </AddToPDFWrapper>
        <RemoveFromPDFWrapper>
          <Source />
        </RemoveFromPDFWrapper>
      </div>
      <RemoveFromPDFWrapper>
        <Box margin={{ bottom: 'medium' }}>
          <Heading level={4} margin={{ bottom: 'small' }}>
            <FormattedMessage {...rootMessages.dimensions.esr} />
          </Heading>
          <NarrativeESRStandardHint
            country={country}
            standard={standard}
            countryGrammar={countryGrammar}
          />
          <NarrativeESR
            dimensionScore={dimensions.esr.score}
            country={country}
            countryGrammar={countryGrammar}
            standard={standard}
            short
            benchmark={benchmark}
            showNoData={false}
          />
          <NarrativeESRCompAssessment
            country={country}
            countryGrammar={countryGrammar}
            comparativeScore={parseFloat(comparativeScoreESR)}
            comparativeRights={comparativeRightsESR}
            groupAverageScore={
              dimensionAverages &&
              dimensionAverages.esr &&
              dimensionAverages.esr.average &&
              dimensionAverages.esr.average[benchmark]
            }
            benchmark={currentBenchmark}
          />
          {comparativeScoreESR && (
            <Paragraph>
              <Hint italic>
                <FormattedMessage {...rootMessages.hints.settings} />
              </Hint>
            </Paragraph>
          )}
          {hasSomeIndicatorScores && (
            <Paragraph>
              <ButtonTextIcon
                onClick={() => goToTab('report-esr')}
                label={<FormattedMessage {...messages.exploreDetails} />}
                hasIcon
              />
            </Paragraph>
          )}
        </Box>
      </RemoveFromPDFWrapper>
      <RemoveFromPDFWrapper>
        <Box margin={{ bottom: 'medium' }}>
          <Heading level={4} margin={{ bottom: 'small' }}>
            <FormattedMessage {...rootMessages.dimensions.physint} />
          </Heading>
          <NarrativeCPR
            dimensionKey="physint"
            score={dimensions.physint.score}
            country={country}
            countryGrammar={countryGrammar}
            showNoData={false}
          />
          <NarrativeCPRCompAssessment
            dimensionKey="physint"
            score={dimensions.physint.score}
            someRights={hasSomePhysintScore}
            hadSurvey={
              hasSomePhysintScore ||
              hasSomeEmpowermentScore ||
              SUBREGIONS_CPR_COMPLETE.indexOf(
                country[COLUMNS.COUNTRIES.SUBREGION],
              ) > -1
            }
            country={country}
            countryGrammar={countryGrammar}
            referenceScore={
              dimensionAverages &&
              dimensionAverages.physint &&
              dimensionAverages.physint.average
            }
            referenceCount={
              dimensionAverages &&
              dimensionAverages.physint &&
              dimensionAverages.physint.count
            }
            comparativeGroup={
              SUBREGIONS_FOR_COMPARISON_CPR.indexOf(country.subregion_code) > -1
                ? 'subregion'
                : 'all'
            }
          />
          {hasSomePhysintScore && (
            <Paragraph>
              <ButtonTextIcon
                onClick={() => goToTab('report-physint')}
                label={<FormattedMessage {...messages.exploreDetails} />}
                hasIcon
              />
            </Paragraph>
          )}
        </Box>
      </RemoveFromPDFWrapper>
      <RemoveFromPDFWrapper>
        <Box margin={{ bottom: 'medium' }}>
          <Heading level={4} margin={{ bottom: 'small' }}>
            <FormattedMessage {...rootMessages.dimensions.empowerment} />
          </Heading>
          <NarrativeCPR
            dimensionKey="empowerment"
            score={dimensions.empowerment.score}
            country={country}
            countryGrammar={countryGrammar}
            showNoData={false}
          />
          <NarrativeCPRCompAssessment
            dimensionKey="empowerment"
            score={dimensions.empowerment.score}
            someRights={hasSomeEmpowermentScore}
            hadSurvey={
              hasSomePhysintScore ||
              hasSomeEmpowermentScore ||
              SUBREGIONS_CPR_COMPLETE.indexOf(
                country[COLUMNS.COUNTRIES.SUBREGION],
              ) > -1
            }
            country={country}
            countryGrammar={countryGrammar}
            referenceScore={
              dimensionAverages &&
              dimensionAverages.empowerment &&
              dimensionAverages.empowerment.average
            }
            referenceCount={
              dimensionAverages &&
              dimensionAverages.empowerment &&
              dimensionAverages.empowerment.count
            }
            comparativeGroup={
              SUBREGIONS_FOR_COMPARISON_CPR.indexOf(country.subregion_code) > -1
                ? 'subregion'
                : 'all'
            }
          />
          {hasSomeEmpowermentScore && (
            <Paragraph>
              <ButtonTextIcon
                onClick={() => goToTab('report-empowerment')}
                label={<FormattedMessage {...messages.exploreDetails} />}
                hasIcon
              />
            </Paragraph>
          )}
        </Box>
      </RemoveFromPDFWrapper>
      <AddToPDFWrapper>
        <AboutCountryContainer
          countryCode={countryCode}
          onCategoryClick={() => {}}
          showFAQs={false}
        />
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: '-50px' }}>
          <FormattedMessage {...rootMessages.pdf.explore} />
        </p>
      </AddToPDFWrapper>
      {countryCode === 'CHN' && (
        <AddToPDFWrapper>{TabCountryBehindTheNumbers}</AddToPDFWrapper>
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
  activeCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  locale: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  standard: (state, { countryCode }) => getStandardSearch(state, countryCode),
  benchmark: state => getBenchmarkSearch(state),
  indicators: (state, { countryCode }) =>
    getIndicatorsForCountry(state, countryCode),
  rights: (state, { countryCode }) => getRightsForCountry(state, countryCode),
  dimensions: (state, { countryCode }) =>
    getDimensionsForCountry(state, countryCode),
  esrYear: state => getESRYear(state),
  cprYear: state => getCPRYear(state),
  dimensionAverages: (state, { countryCode }) =>
    getReferenceScores(state, countryCode),
  locale: state => getLocale(state),
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
