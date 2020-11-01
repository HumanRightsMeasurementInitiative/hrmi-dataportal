import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { truncateText } from 'utils/string';
import ButtonText from 'styled/ButtonText';

import messages from './messages';

const Styled = styled.div``;
const MoreWrap = styled.div`
  text-align: left;
`;
const TextWrap = styled.div``;
const StyledButtonText = styled(ButtonText)`
  font-size: 14px;
  line-height: 18px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 16px;
    line-height: 21px;
  }
`;

const LIMIT = 180;

function ReadMore ({ message }) {
  const [more, setMore] = useState(false);
  const text = more ? message : truncateText(message, LIMIT);
  return (
    <Styled>
      <TextWrap>{text}</TextWrap>
      {(more || text.length !== message.length) && (
        <MoreWrap>
          <StyledButtonText onClick={() => setMore(!more)}>
            <FormattedMessage {...messages[more ? 'less' : 'more']} />
          </StyledButtonText>
        </MoreWrap>
      )}
    </Styled>
  );
}

ReadMore.propTypes = {
  message: PropTypes.string,
};

export default ReadMore;
