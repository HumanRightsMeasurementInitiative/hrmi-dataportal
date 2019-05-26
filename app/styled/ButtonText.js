import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  color: ${({ theme }) => theme.global.colors.dark};
  font-weight: 600;
  font-size: 1em;
  vertical-align: baseline;
  text-decoration: underline;
  text-align: left;
  &:hover{
    color: ${({ theme }) => theme.global.colors.highlight3};
    background-color: transparent;
    text-decoration: underline;
  }
  &:active{
    color: ${({ theme }) => theme.global.colors.highlight3};
    background-color: transparent;
  }
  &:visited{
    color: ${({ theme }) => theme.global.colors.highlight3};
    background-color: transparent;
  }
  &:focus{
    color: ${({ theme }) => theme.global. colors.highlight3};
    box-shadow: none;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    font-size: 1em;
    padding: 0;
  }
`;
