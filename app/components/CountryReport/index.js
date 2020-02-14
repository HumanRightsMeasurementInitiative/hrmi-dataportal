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

// import { Heading } from 'grommet';

import LoadingIndicator from 'components/LoadingIndicator';
import MainColumn from 'styled/MainColumn';
import SectionContainer from 'styled/SectionContainer';

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

// dimensions,
// rights,
// benchmark,
// standard,
// indicators,
// country,
// countryGrammar,
// onMetricClick,
// intl,
// atRiskData,
// onAtRiskClick,
// reference,
// esrYear,
// trackEvent,

function CountryReport({ dataReady, hasAside, type }) {
  return (
    <MainColumn hasAside={hasAside}>
      {!dataReady && <LoadingIndicator />}
      {dataReady && type === 'esr' && (
        <>
          <SectionContainer>ESR Summary Chart</SectionContainer>
          <SectionContainer>
            ESR Narrative & Comparative Assessment
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
          </SectionContainer>
          <SectionContainer>Empowerment Summary Chart</SectionContainer>
          <SectionContainer>
            Empowerment Narrative & Comparative Assessment
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
  // countryTitle: PropTypes.string,
  // onMetricClick: PropTypes.func,
  // onAtRiskClick: PropTypes.func,
  // trackEvent: PropTypes.func,
  // reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // intl: intlShape.isRequired,
  // esrYear: PropTypes.number,
  dataReady: PropTypes.bool,
  type: PropTypes.string,
};

// export default injectIntl(CountryReport);
export default CountryReport;
