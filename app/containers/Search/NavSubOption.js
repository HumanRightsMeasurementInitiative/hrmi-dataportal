import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

const OptionButton = React.forwardRef((props, ref) => (
  <Button plain {...props} ref={ref} />
));
// prettier-ignore
export default styled(OptionButton)`
  border-top: 1px solid ${({ theme }) => theme.global.colors.border.light};
  border-bottom: 1px solid transparent;
  padding: 8px 24px;
  position: relative;
  background: transparent;
  border-left: 4px solid
    ${({ theme, active }) =>
    active ? theme.global.colors.dark : 'transparent'};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.global.colors.border.light};
  }
  &:hover {
    border-left: 4px solid ${({ theme }) => theme.global.colors.dark};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 10px 16px 10px 36px;
  }
`;
