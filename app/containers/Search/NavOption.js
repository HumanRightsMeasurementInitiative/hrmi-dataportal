import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

const OptionButton = props => <Button plain {...props} />;

export default styled(OptionButton)`
  border-top: 1px solid;
  border-bottom: ${({ special }) => (special ? '1px solid' : '0')};
  border-color: ${({ theme }) => theme.global.colors['light-4']};
  padding: 10px 0;
  font-weight: ${({ special }) => (special ? '600' : '400')};
  &:last-child {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.global.colors['light-4']};
  }
`;
