import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Paragraph } from 'grommet';
import { COLUMNS } from 'containers/App/constants';
import styled from 'styled-components';
import { getMessageGrammar } from 'utils/narrative';

import messages from './messages';

const StyledPara = styled(Paragraph)`
  margin-top: 40px;
  font-style: italic;
`;

function NarrativeCPRGovRespondents ({ countryGrammar, country, intl }) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country[COLUMNS.COUNTRIES.CODE],
      country[COLUMNS.COUNTRIES.REGION],
      countryGrammar,
    ),
  };
  return (
    <StyledPara>
      <FormattedMessage
        {...messages.cpr.govRespondents}
        values={messageValues}
      />
    </StyledPara>
  );
}

NarrativeCPRGovRespondents.propTypes = {
  countryGrammar: PropTypes.object,
  country: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRGovRespondents);
