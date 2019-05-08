// vendor
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';
// styles
import Button from 'styled/Button';

/**
 * @component
 * Header menu link
 *
 */
export default styled(Button)`
  display: inline-block;
  padding: 3px 10px;
  margin: 0 4px;
  text-align: center;
  font-size: 0.8em;
  font-weight: 600;
  max-width: 65px;
  border: 0;
  ${props =>
    props.active &&
    css`
      color: ${props.theme.colors.hover};
      &:hover {
        cursor: auto;
      }
    `}
  @media (min-width: ${props => props.theme.breakpoints[BREAKPOINTS.SMALL]}) {
    font-size: 0.9em;
    min-width: 100px;
    max-width: none;
    padding: 7px 20px;
  }
  &:hover{
    color: ${props => props.theme.colors.hover};
  }
  &:focus{
    outline: 0;
    color: ${props => props.theme.colors.hover};
  }
  &:active{
    color: ${props => props.theme.colors.hover};
  }
  &:active:hover{
    cursor: auto;
  }
`;
