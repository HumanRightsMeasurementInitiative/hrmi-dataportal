import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  display: block;
  width: 100%;
  text-align: left;
  color: ${({ theme, active }) => theme.global.colors[active ? 'dark-2' : 'white' ]};
  padding: 10px 24px;
  font-size: 1em;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['light-4']};
  background-color: ${({ theme, active }) => active ? theme.global.colors['light-3'] : 'transparent' };
  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    display: inline-block;
    height: 44px;
    padding: 5px 10px;
    border: none;
    text-align: center;
    width: auto;
  }
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
