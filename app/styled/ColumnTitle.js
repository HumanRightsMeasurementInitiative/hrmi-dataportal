import React from 'react';
import styled from 'styled-components';
import { Text } from 'grommet';

const Styled = styled(Text)`
  font-weight: ${props => props.theme.columnHeader.fontWeight};
  display: block;
  padding-bottom: 1px;
  border-bottom: 2px solid transparent;
`;

export default props => (
  <Styled
    margin={{
      horizontal: 'none',
      vertical: 'none',
    }}
    {...props}
  />
);
