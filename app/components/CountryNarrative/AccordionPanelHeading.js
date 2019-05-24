import React from 'react';
import styled, { css } from 'styled-components';
import { Heading } from 'grommet';

const Styled = styled(Heading)`
  ${props =>
    props.level === 4 &&
    css`
      font-size: 18px;
    `}
  ${props =>
    props.level === 6 &&
    css`
      font-weight: 600;
    `}
`;

export default function(props) {
  return <Styled margin={{ vertical: '2px', right: 'small' }} {...props} />;
}
