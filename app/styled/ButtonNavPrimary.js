import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  display: block;
  color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'dark-3' ]};
  padding: 10px 10px;
  font-size: 1em;
  font-weight: 600;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    text-align: center;
    padding: 0px 10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: inline-block;
    border: none;
    width: auto;
  }
  &:hover {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'dark-3' ]};
  }
  &:active {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'dark-3' ]};
  }
  &:visited {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'dark-3' ]};
  }
  &:focus {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'dark-3' ]};
    outline: none;
  }
`;
