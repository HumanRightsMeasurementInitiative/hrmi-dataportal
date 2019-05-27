import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from './messages';

const Styled = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.global.colors['dark-4']};
  margin-top: 1em;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

function Source({ center = false }) {
  return (
    <Styled center={center}>
      <div>
        <FormattedMessage {...messages.source} />
      </div>
    </Styled>
  );
}

Source.propTypes = {
  intl: intlShape.isRequired,
  center: PropTypes.bool,
};

export default injectIntl(Source);
