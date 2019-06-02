import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import ButtonText from 'styled/ButtonText';
import messages from './messages';

const Styled = styled.div`
  font-size: ${({ theme }) => theme.text.small.size};
  line-height: ${({ theme }) => theme.text.small.height};
  margin: 1em 0;
`;

function MethodologyLink({ onClick }) {
  return (
    <Styled>
      <ButtonText onClick={() => onClick()}>
        <FormattedMessage {...messages.methodology} />
      </ButtonText>
    </Styled>
  );
}

MethodologyLink.propTypes = {
  onClick: PropTypes.func,
};
export default MethodologyLink;
