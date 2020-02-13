import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  width: 100%;
  position: relative;
  padding-bottom: 40px;
  border-bottom: 1px solid;
  border-top: 0;
  border-color: ${props =>
    props.border ? props.theme.global.colors['light-3'] : 'transparent'};
  padding-top: 10px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: 25px;
  }
`;

export default props => <Styled responsive={false} {...props} />;
