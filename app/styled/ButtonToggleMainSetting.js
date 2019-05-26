import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  border-radius: 99999px;
  background-color: ${({ theme, active }) =>
    active ? theme.global.colors.highlight : theme.global.colors.white};
  padding: 10px 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  min-width: 120px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${({ theme }) => theme.global.colors['dark-1']};
    background-color: ${({ theme, active }) =>
    active ? theme.global.colors.highlight : theme.global.colors['light-2']};
  }
  &:focus {
    border-radius: 99999px;
    background-color: ${({ theme, active }) =>
    active ? theme.global.colors.highlight : theme.global.colors['light-2']};
  box-shadow: 0px 2px 10px rgba(0,0,0,0.40);
    outline-color: transparent;
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 10px 20px;
  }
`;
