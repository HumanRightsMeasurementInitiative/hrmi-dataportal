import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import rootMessages from 'messages';

const Styled = styled.div`
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0.5;
  @keyframes pulsate {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

/**
 * Simple text loader
 *
 * @return {Component} Loading
 *
 */
const Loading = () => (
  <Styled>
    <FormattedMessage {...rootMessages.labels.loading} />
  </Styled>
);

export default Loading;
