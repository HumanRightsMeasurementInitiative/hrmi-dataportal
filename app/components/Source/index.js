import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Hint from 'styled/Hint';

import messages from './messages';

const Styled = styled(Hint)`
  max-width: ${({ maxWidth }) => maxWidth};
  font-size: 12px;
  line-height: 16px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 14px;
    line-height: 20px;
  }
`;

function Source({ center = false, maxWidth = 'none' }) {
  return (
    <Styled center={center} maxWidth={maxWidth}>
      <div>
        <FormattedMessage {...messages.source} />
      </div>
    </Styled>
  );
}

Source.propTypes = {
  intl: intlShape.isRequired,
  maxWidth: PropTypes.string,
  center: PropTypes.bool,
};

export default injectIntl(Source);
