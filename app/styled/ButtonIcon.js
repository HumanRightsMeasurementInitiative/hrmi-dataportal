import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.white};
  background-color: ${({ theme, subtle }) =>
    subtle ? 'transparent' : theme.global.colors.dark};
  border-radius: 100%;
  width: 30px;
  height: 30px;
  text-align: center;
  padding: ${({ small }) => (small ? 2 : 0)}px;
  box-shadow: ${({ float }) => float ? '0 0 3px 1px rgba(0, 0, 0, 0.15)' : ''};
  &:hover{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, subtle }) => subtle ? 'transparent' : theme.global.colors['dark-1']};
  }
  &:active{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, subtle }) => subtle ? 'transparent' : theme.global.colors.dark};
  }
  &:visited{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors.dark};
  }
  &:focus{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, subtle }) => subtle ? 'transparent' : theme.global.colors['dark-1']};
    box-shadow: none;
    border-radius: 100%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: ${({ small }) => (small ? 2 : 0)}px;
  }
`;
