import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  position: relative;
  padding-bottom: 40px;
  border-bottom: 1px solid;
  border-top: 0;
  border-color: ${props =>
    props.border ? props.theme.global.colors['light-3'] : 'transparent'};
  padding-top: 10px;
  overflow-x: hidden;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: 25px;
  }
`;

export default props => <Styled responsive={false} {...props} />;
