import styled from 'styled-components';
import Button from './Button';

// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.white};
  background-color: ${({ theme }) => theme.global.colors.dark};
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme, disabled }) => theme.global.colors[disabled ? 'dark' : 'buttonPrimaryHover']};
}
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme }) => theme.global.colors.buttonPrimaryHover};
}
  &:visited {
    color: ${({ theme }) => theme.global.colors.white};
    background-color:
    ${({ theme }) => theme.global.colors.buttonPrimaryHover};
}
`;
