import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  display: block;
  color: ${({ theme }) => theme.global.colors.dark};
  padding: 10px 20px;
  font-size: 1em;
  font-weight: 600;
  text-align: ${({ align }) => align || 'center'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    color: ${({ theme, active }) => theme.global.colors[active ? 'dark' : 'secondary' ]};
    padding: 0px 10px;
    display: inline-block;
    border: none;
    width: auto;
    &:visited {
      color: ${({ theme }) => theme.global.colors.secondary};
    }
    &:hover {
      color: ${({ theme }) => theme.global.colors.dark};
    }
  }
`;
