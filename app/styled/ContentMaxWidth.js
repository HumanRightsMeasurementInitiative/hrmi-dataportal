import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth || '1600px'};
  position: relative;
  min-height: auto;
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.large};
  }
`;

export default props => <Styled direction="row" align="center" {...props} />;
