import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)`
  width: 100%;
  position: relative;
  min-height: 100vh;
  border-right: 1px solid;
  border-color: ${props => props.theme.global.colors['light-3']};
`;

export default props => (
  <Styled
    direction="column"
    pad={{ right: 'medium', bottom: 'xlarge' }}
    {...props}
  />
);
