import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: ${props => (props.paddingTop ? '30px' : 0)};
  min-height: auto;
`;

export default props => (
  <Styled
    pad={{
      horizontal: 'medium',
    }}
    direction="row"
    {...props}
  />
);
