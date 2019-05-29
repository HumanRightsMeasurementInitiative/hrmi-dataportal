import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Text } from 'grommet';
import styled from 'styled-components';
import rootMessages from 'messages';

const Styled = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  right: ${({ theme }) => theme.global.edgeSize.large};
  bottom: 0;
  margin-top: -4px;
`;

const Label = styled.div`
  position: absolute;
  top: 0;
  margin: 0 5px;
  padding: 0 12px;
  display: table;
  height: 20px;
  &:after {
    content: '';
    position: absolute;
    top: 7px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
`;

const Better = styled(Label)`
  right: 0;
  text-align: right;
  &:after {
    right: 0;
    border-left: 7px solid ${({ theme }) => theme.global.colors['dark-4']};
  }
`;
const Worse = styled(Label)`
  left: 0;
  text-align: left;
  &:after {
    left: 0;
    border-right: 7px solid ${({ theme }) => theme.global.colors['dark-4']};
  }
`;

const AnnotateBetterInner = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 12px;
`;

function AnnotateBetter() {
  return (
    <Styled>
      <AnnotateBetterInner>
        <Worse>
          <Text size="xsmall">
            <FormattedMessage {...rootMessages.labels.worse} />
          </Text>
        </Worse>
        <Better>
          <Text size="xsmall">
            <FormattedMessage {...rootMessages.labels.better} />
          </Text>
        </Better>
      </AnnotateBetterInner>
    </Styled>
  );
}

export default AnnotateBetter;
