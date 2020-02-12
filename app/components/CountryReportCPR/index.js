/**
 *
 * CountryReportCPR
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Heading } from 'grommet';

import CountryNarrative from 'components/CountryNarrative';
import LoadingIndicator from 'components/LoadingIndicator';
import MainColumn from 'styled/MainColumn';

import { getMessageGrammar } from 'utils/narrative';

import messages from './messages';

// prettier-ignore
const StyledHeading = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
`;

function CountryReportCPR({
  dimensions,
  rights,
  country,
  countryGrammar,
  onMetricClick,
  intl,
  atRiskData,
  onAtRiskClick,
  reference,
  cprYear,
  dataReady,
  hasAside,
  trackEvent,
}) {
  return (
    <MainColumn hasAside={hasAside}>
      {!dataReady && <LoadingIndicator />}
      {dataReady && (
        <>
          <StyledHeading responsive={false} level={2}>
            <FormattedMessage
              {...messages.title}
              values={getMessageGrammar(
                intl,
                country.country_code,
                country.region_code,
                countryGrammar,
              )}
            />
          </StyledHeading>
          <CountryNarrative
            type="cpr"
            dimensions={dimensions}
            rights={rights}
            country={country}
            countryGrammar={countryGrammar}
            onMetricClick={onMetricClick}
            atRiskData={atRiskData}
            onAtRiskClick={onAtRiskClick}
            reference={reference}
            cprYear={cprYear}
            trackEvent={trackEvent}
          />
        </>
      )}
    </MainColumn>
  );
}

CountryReportCPR.propTypes = {
  countryTitle: PropTypes.string,
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  trackEvent: PropTypes.func,
  hasAside: PropTypes.bool,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  cprYear: PropTypes.number,
  dataReady: PropTypes.bool,
};

export default injectIntl(CountryReportCPR);
