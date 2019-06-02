import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.white};
  background-color: ${({ theme, subtle }) =>
    theme.global.colors[subtle ? 'white' : 'dark']};
  border-radius: 100%;
  width: ${({ small }) => (small ? 30 : 50)}px;
  height: ${({ small }) => (small ? 30 : 50)}px;
  text-align: center;
  padding: 0;
  box-shadow: ${({ float }) => float ? '0 0 3px 1px rgba(0, 0, 0, 0.15)' : ''};
  &:hover{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, subtle }) => theme.global.colors[subtle ? 'light-2' : 'dark-1']};
  }
  &:active{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, subtle }) => theme.global.colors[subtle ? 'light-1' : 'dark']};
  }
  &:visited{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors.dark};
  }
  &:focus{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, subtle }) => theme.global.colors[subtle ? 'light-1' : 'dark-1']};
    box-shadow: none;
    border-radius: 100%;
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 0;
  }
`;
