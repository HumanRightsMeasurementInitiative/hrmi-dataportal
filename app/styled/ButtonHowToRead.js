import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  border-radius: 3px;
  color: ${({ theme }) => theme.global.colors.text.light};
  background-color: ${({ theme }) => theme.global.colors['light-3']};
  padding: 1px 6px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  font-weight: 600;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${({ theme }) => theme.global.colors.text.light};
    background-color: ${({ theme }) => theme.global.colors['light-5']};
  }
  &:focus {
    background-color: ${({ theme }) => theme.global.colors['light-5']};
    outline-color: transparent;
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 1px 10px;
  }
`;
