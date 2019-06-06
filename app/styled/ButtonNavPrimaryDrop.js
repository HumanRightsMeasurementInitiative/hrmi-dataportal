import styled from 'styled-components';
import ButtonNavPrimary from './ButtonNavPrimary';
// prettier-ignore
export default styled(ButtonNavPrimary)`
  border-bottom: 1px solid;
  color: ${({ theme }) => theme.global.colors.white};
  border-color: ${({ theme }) => theme.global.colors['light-4']};
  background-color: ${({ theme, active }) => active ? theme.global.colors['dark-3'] : 'transparent' };
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:visited {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
`;
