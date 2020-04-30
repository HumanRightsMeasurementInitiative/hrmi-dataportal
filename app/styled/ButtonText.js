import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  color: ${({ theme, inverse }) => theme.global.colors[inverse ? 'white' : 'dark']};
  font-weight: 600;
  font-size: 1em;
  vertical-align: baseline;
  text-decoration: underline;
  text-align: left;
  &:hover{
    color: ${({ theme, inverse }) => theme.global.colors[inverse ? 'white' : 'dark']};
    background-color: transparent;
    text-decoration: underline;
    opacity: 0.8;
  }
  &:active{
    color: ${({ theme, inverse }) => theme.global.colors[inverse ? 'white' : 'dark']};
    background-color: transparent;
  }
  &:visited{
    color: ${({ theme, inverse }) => theme.global.colors[inverse ? 'white' : 'dark']};
    background-color: transparent;
  }
  &:focus{
    color: ${({ theme, inverse }) => theme.global.colors[inverse ? 'white' : 'dark']};
    box-shadow: none;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 1em;
    padding: 0;
  }
`;
