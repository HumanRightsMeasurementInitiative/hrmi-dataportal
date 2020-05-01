import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

// border-color: ${props =>
//   props.header ? props.theme.global.colors['light-3'] : 'transparent'};
const Styled = styled(Box)`
  width: 100%;
  position: relative;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    min-height: ${props => (props.header ? '160px' : 'auto')};
  }
`;

export default props => (
  <Styled responsive={false} direction="row" {...props} />
);
