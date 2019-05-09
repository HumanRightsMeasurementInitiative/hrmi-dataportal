// vendor
import styled, { css } from 'styled-components';
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
  color: ${props => props.theme.colors.white};
  ${props =>
    props.active &&
    css`
      color: ${props.theme.colors.hoverLight};
      &:hover {
        cursor: auto;
      }
    `}
  @media (min-width: ${props => props.theme.global.breakpoints.small.value}px) {
    font-size: 0.9em;
    min-width: 100px;
    max-width: none;
    padding: 7px 20px;
  }
  &:hover{
    color: ${props => props.theme.colors.hoverLight};
  }
  &:focus{
    outline: 0;
    color: ${props => props.theme.colors.hoverLight};
  }
  &:active{
    color: ${props => props.theme.colors.hoverLight};
  }
  &:active:hover{
    cursor: auto;
  }
`;
