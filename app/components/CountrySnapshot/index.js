/**
 *
 * CountrySnapshot
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Heading } from 'grommet';

import ChartCountrySummary from 'components/ChartCountrySummary';
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

function CountrySnapshot({
  dimensions,
  rights,
  scale,
  benchmark,
  standard,
  country,
  countryGrammar,
  intl,
  esrYear,
  cprYear,
  dataReady,
  hasAside,
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
          <ChartCountrySummary
            scale={scale}
            dimensions={dimensions}
            rights={rights}
            benchmark={benchmark}
            standard={standard}
            esrYear={esrYear}
            cprYear={cprYear}
          />
        </>
      )}
    </MainColumn>
  );
}
CountrySnapshot.propTypes = {
  countryTitle: PropTypes.string,
  hasAside: PropTypes.bool,
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
  dataReady: PropTypes.bool,
};

export default injectIntl(CountrySnapshot);
