import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
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
    background-color: transparent;
    text-decoration: underline;
  }
  &:active{
    background-color: transparent;
  }
  &:visited{
    background-color: transparent;
  }
  &:focus{
    box-shadow: none;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 1em;
    padding: 0;
  }
`;
