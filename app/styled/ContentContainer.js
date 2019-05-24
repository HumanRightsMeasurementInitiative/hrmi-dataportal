import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  width: 100%;
  position: relative;
  padding-top: ${props => (props.header ? '25px' : 0)};
  min-height: ${props => (props.header ? '140px' : 'auto')};
  padding-bottom: ${props => (props.header ? '25px' : 0)};
  margin-bottom: ${props => (props.header ? '-25px' : 0)};
  border-bottom: ${props => (props.header ? '1px solid' : 0)};
`;

export default props => <Styled direction="row" {...props} />;
