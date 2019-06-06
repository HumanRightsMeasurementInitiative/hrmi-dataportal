import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  width: 100%;
  position: relative;
  padding-bottom: ${props => (props.header ? '40px' : 0)};
  margin-bottom: ${props => (props.header ? '-30px' : 0)};
  border-bottom: ${props => (props.header ? '1px solid' : 0)};
  border-color: ${props =>
    props.header ? props.theme.global.colors['light-3'] : 'transparent'};
  padding-top: ${props => (props.header ? '10px' : 0)};
  min-height: ${props => (props.header ? '120px' : 'auto')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: ${props => (props.header ? '25px' : 0)};
    min-height: ${props => (props.header ? '140px' : 'auto')};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-top: ${props => (props.header ? '25px' : 0)};
    min-height: ${props => (props.header ? '160px' : 'auto')};
  }
`;

export default props => (
  <Styled responsive={false} direction="row" {...props} />
);
