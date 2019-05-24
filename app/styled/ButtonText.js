import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  padding: 0 4px;
  font-size: inherit;
  line-height: inherit;
  color: ${({ theme }) => theme.global.colors['dark-1']};
  font-weight: 600;
  text-decoration: underline;
  &:hover{
    color: ${({ theme }) => theme.global.colors.highlight3};
    background-color: transparent;
  }
  &:active{
    color: ${({ theme }) => theme.global.colors.highlight3};
    background-color: transparent;
  }
  &:visited{
    color: ${({ theme }) => theme.global.colors.highlight3};
    background-color: transparent;
  }
  &:focus{
    color: ${({ theme }) => theme.global. colors.highlight3};
    box-shadow: none;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    font-size: 1em;
    padding: 6px 12px;
  }
`;
