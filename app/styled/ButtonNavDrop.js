import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  display: block;
  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    display: inline-block;
    height: 44px;
  }
  padding: 5px 10px;
  font-size: 1em;
  color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'white' ]};
  background-color: ${({ theme, active }) => active ? theme.global.colors['light-3'] : 'transparent' };
  &:hover {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'white' ]};
    background-color: ${({ theme, active }) => theme.global.colors[active ? 'light-3' : 'dark-3' ]};
  }
  &:active {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'white' ]};
    background-color: ${({ theme, active }) => theme.global.colors[active ? 'light-3' : 'dark-3' ]};
  }
  &:visited {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'white' ]};
    background-color: ${({ theme, active }) => theme.global.colors[active ? 'light-3' : 'dark-3' ]};
  }
  &:focus {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'white' ]};
    background-color: ${({ theme, active }) => theme.global.colors[active ? 'light-3' : 'dark-3' ]};
    outline: none;
  }
`;
