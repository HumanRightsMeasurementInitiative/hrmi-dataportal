/**
 *
 * CountryReportESR
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

function CountryReportESR({
  dimensions,
  rights,
  benchmark,
  standard,
  indicators,
  country,
  countryGrammar,
  onMetricClick,
  intl,
  atRiskData,
  onAtRiskClick,
  reference,
  esrYear,
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
            type="esr"
            dimensions={dimensions}
            rights={rights}
            indicators={indicators}
            country={country}
            countryGrammar={countryGrammar}
            benchmark={benchmark}
            standard={standard}
            onMetricClick={onMetricClick}
            atRiskData={atRiskData}
            onAtRiskClick={onAtRiskClick}
            reference={reference}
            esrYear={esrYear}
            trackEvent={trackEvent}
          />
        </>
      )}
    </MainColumn>
  );
}

CountryReportESR.propTypes = {
  countryTitle: PropTypes.string,
  onMetricClick: PropTypes.func,
  onAtRiskClick: PropTypes.func,
  trackEvent: PropTypes.func,
  hasAside: PropTypes.bool,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  esrYear: PropTypes.number,
  dataReady: PropTypes.bool,
};

export default injectIntl(CountryReportESR);
