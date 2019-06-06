import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  border-radius: 999999px;
  color: ${({ theme }) => theme.global.colors['dark-1']};
  background-color: ${({ theme }) => theme.global.colors.highlight};
  padding: 4px 6px;
  margin: ${({ theme }) => theme.global.edgeSize.xxsmall};
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.global.colors['dark-1']};
    background-color: ${({ theme }) => theme.global.colors.highlight2};
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors['dark-1']};
    background-color: ${({ theme }) => theme.global.colors.highlight2};
    outline-color: transparent;
    border-radius: 999999px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 5px 15px;
  }
`;
