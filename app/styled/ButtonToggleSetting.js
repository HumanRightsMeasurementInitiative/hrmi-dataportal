import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  border-radius: 3px;
  color: ${({ theme, active }) =>
    active ? theme.global.colors.white : theme.global.colors.text.light};
  background-color: ${({ theme, active, color }) => {
    if (active) {
      return color || theme.global.colors.dark;
    }
    return theme.global.colors['light-3'];
  }};
  padding: 3px 6px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${({ theme, active }) =>
    active ? theme.global.colors.white : theme.global.colors.text.light};
    background-color: ${({ theme, active }) =>
    active ? theme.global.colors['dark-3'] : theme.global.colors['light-5']};
  }
  &:focus {
    background-color: ${({ theme, active, color }) => {
    if (active) {
      return color || theme.global.colors['dark-2'];
    }
    return theme.global.colors['light-5'];
  }};
    outline-color: transparent;
    border-radius: 3px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 3px 10px;
  }
`;
