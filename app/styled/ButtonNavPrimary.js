import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  display: block;
  color: ${({ theme, active }) => theme.global.colors[active ? 'dark' : 'secondary' ]};
  padding: 10px 10px;
  font-size: 1em;
  font-weight: 600;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    text-align: center;
    padding: 0px 6px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0px 10px;
    display: inline-block;
    border: none;
    width: auto;
  }
`;
