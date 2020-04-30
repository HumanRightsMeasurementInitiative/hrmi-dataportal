import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.global.colors.white};
  margin: 0px 24px;
  font-size: 1em;
  border-top: 5px solid transparent;
  border-bottom: 5px solid ${({ active }) => (active ? 'white' : 'transparent')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: inline-block;
    height: 44px;
    margin: 0px 10px;
    width: auto;
  }
  &:hover {
    color: ${({ theme }) => theme.global.colors.white};
    border-bottom-color: white;
  }
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
  }
  &:visited {
    color: ${({ theme }) => theme.global.colors.white};
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors.white};
    outline: none;
  }
`;
