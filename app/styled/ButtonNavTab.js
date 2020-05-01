import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.global.colors.white};
  margin: 0px 6px;
  font-size: ${({ theme }) => theme.text.small.size};
  border-top: 5px solid transparent;
  border-bottom: 5px solid ${({ active }) => (active ? 'white' : 'transparent')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin: 0px 10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    margin: 0px 24px;
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
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;
