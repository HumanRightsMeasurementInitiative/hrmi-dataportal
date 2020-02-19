/**
 *
 * CountryReport
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import { injectIntl, intlShape } from 'react-intl';

import { Paragraph } from 'grommet';
import { BENCHMARKS, STANDARDS } from 'containers/App/constants';

import NarrativeCPR from 'components/CountryNarrative/NarrativeCPR';
import NarrativeESR from 'components/CountryNarrative/NarrativeESR';
import NarrativeCPRCompAssessment from 'components/CountryNarrative/NarrativeCPRCompAssessment';
import NarrativeESRCompAssessment from 'components/CountryNarrative/NarrativeESRCompAssessment';
import LoadingIndicator from 'components/LoadingIndicator';
import MainColumn from 'styled/MainColumn';
import SectionContainer from 'styled/SectionContainer';

import { hasCPR, getRightsScoresForDimension } from 'utils/scores';
// import { getMessageGrammar } from 'utils/narrative';
//
// import messages from './messages';
//
// // prettier-ignore
// const StyledHeading = styled(Heading)`
//   font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
//   line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//     font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
//     line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
//   }
// `;

function CountryReport({
  dataReady,
  hasAside,
  type,
  dimensions,
  rights,
  benchmark,
  standard,
  indicators,
  country,
  countryGrammar,
  // onMetricClick,
  // atRiskData,
  // onAtRiskClick,
  reference,
  // esrYear,
  // cprYear,
  // trackEvent,
}) {
  const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const hasSomeIndicatorScores =
    type === 'esr' &&
    indicators &&
    Object.values(indicators)
      .filter(s => {
        if (!s.details) return false;
        return (
          s.details.standard === 'Both' ||
          s.details.standard === currentStandard.code
        );
      })
      .reduce((m, s) => m || !!s.score, false);

  const rightsESR =
    type === 'esr' && getRightsScoresForDimension(rights, 'esr');

  const rightsESRScoreCount =
    rightsESR &&
    Object.values(rightsESR).reduce((m, s) => (s.score ? m + 1 : m), 0);

  let scoreESR;
  if (rightsESRScoreCount > 0 && rightsESRScoreCount < rightsESR.length) {
    scoreESR =
      rightsESR.reduce(
        (m, s) =>
          s.score ? m + parseFloat(s.score[currentBenchmark.column]) : m,
        0,
      ) / rightsESRScoreCount;
  }

  return (
    <MainColumn hasAside={hasAside}>
      {!dataReady && <LoadingIndicator />}
      {dataReady && type === 'esr' && (
        <>
          <SectionContainer>ESR Summary Chart</SectionContainer>
          <SectionContainer>
            ESR Narrative & Comparative Assessment
            <NarrativeESR
              dimensionScore={dimensions.esr && dimensions.esr.score}
              country={country}
              countryGrammar={countryGrammar}
              someData={hasSomeIndicatorScores}
            />
            {dimensions.esr && reference && reference.esr && (
              <Paragraph>
                <NarrativeESRCompAssessment
                  country={country}
                  countryGrammar={countryGrammar}
                  dimensionScore={dimensions.esr && dimensions.esr.score}
                  rightsAverageScore={scoreESR}
                  referenceScore={reference.esr[standard].average[benchmark]}
                  referenceCount={reference.esr[standard].count}
                  benchmark={currentBenchmark}
                  some={rightsESRScoreCount < rightsESR.length}
                  one={rightsESRScoreCount === 1}
                />
              </Paragraph>
            )}
          </SectionContainer>
          <SectionContainer>Indicators by right</SectionContainer>
          <SectionContainer>Rights and indicators by sex</SectionContainer>
          <SectionContainer>
            Category, rights & indicators over time
          </SectionContainer>
          <SectionContainer>
            People at risk word cloud and narrative
          </SectionContainer>
        </>
      )}
      {dataReady && type === 'cpr' && (
        <>
          <SectionContainer>Safety Summary Chart</SectionContainer>
          <SectionContainer>
            Safety Narrative & Comparative Assessment
            <NarrativeCPR
              dimensionKey="physint"
              score={dimensions.physint && dimensions.physint.score}
              country={country}
              countryGrammar={countryGrammar}
            />
            {hasCPR(dimensions) && reference.physint && (
              <Paragraph>
                <NarrativeCPRCompAssessment
                  dimensionKey="physint"
                  score={dimensions.physint && dimensions.physint.score}
                  country={country}
                  countryGrammar={countryGrammar}
                  referenceScore={reference.physint.average}
                  referenceCount={reference.physint.count}
                />
              </Paragraph>
            )}
          </SectionContainer>
          <SectionContainer>Empowerment Summary Chart</SectionContainer>
          <SectionContainer>
            Empowerment Narrative & Comparative Assessment
            <NarrativeCPR
              dimensionKey="empowerment"
              score={dimensions.empowerment && dimensions.empowerment.score}
              country={country}
              countryGrammar={countryGrammar}
            />
            {hasCPR(dimensions) && reference.empowerment && (
              <Paragraph>
                <NarrativeCPRCompAssessment
                  dimensionKey="empowerment"
                  score={dimensions.empowerment && dimensions.empowerment.score}
                  country={country}
                  countryGrammar={countryGrammar}
                  referenceScore={reference.empowerment.average}
                  referenceCount={reference.empowerment.count}
                  start
                />
              </Paragraph>
            )}
          </SectionContainer>
          <SectionContainer>
            People at risk word cloud and narrative
          </SectionContainer>
        </>
      )}
    </MainColumn>
  );
}

CountryReport.propTypes = {
  hasAside: PropTypes.bool,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  type: PropTypes.string,
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // onMetricClick: PropTypes.func,
  // onAtRiskClick: PropTypes.func,
  // trackEvent: PropTypes.func,
  // atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // esrYear: PropTypes.number,
  // cprYear: PropTypes.number,
};

// export default injectIntl(CountryReport);
export default CountryReport;
