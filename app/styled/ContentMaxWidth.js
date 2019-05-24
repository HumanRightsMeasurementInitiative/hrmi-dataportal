import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  margin: 0 auto;
  width: 100%;
  max-width: 1600px;
  position: relative;
  min-height: auto;
`;

export default props => (
  <Styled
    direction="row"
    {...props}
    align="center"
    pad={{ horizontal: 'large' }}
  />
);
