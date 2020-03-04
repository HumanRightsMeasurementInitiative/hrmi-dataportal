import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  display: block;
  width: 100%;
  text-align: center;
  color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'dark-3' ]};
  padding: 0px 10px;
  font-size: 1em;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['light-4']};
  font-weight: 600;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
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
