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

import ChartContainerCountrySnapshot from 'containers/ChartContainerCountrySnapshot';
import LoadingIndicator from 'components/LoadingIndicator';

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

function CountrySnapshot({ countryCode, countryGrammar, intl, dataReady }) {
  if (!dataReady) return <LoadingIndicator />;
  return (
    <>
      <StyledHeading responsive={false} level={2}>
        <FormattedMessage
          {...messages.title}
          values={getMessageGrammar(intl, countryCode, null, countryGrammar)}
        />
      </StyledHeading>
      <ChartContainerCountrySnapshot countryCode={countryCode} />
    </>
  );
}
CountrySnapshot.propTypes = {
  hasAside: PropTypes.bool,
  countryCode: PropTypes.string.isRequired,
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
  dataReady: PropTypes.bool,
};

export default injectIntl(CountrySnapshot);
