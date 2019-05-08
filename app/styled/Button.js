import styled from 'styled-components';

/**
 * @component
 * Basic unstyled button (also including several resets for leaky data.govt styles)
 *
 */
export default styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  font: inherit;
  display: inline;
  color: ${props => props.theme.colors.black};
  border-radius: 0;
  line-height: 1.15;
  font-size: ${props => props.theme.sizes[1]};
  &:hover {
    color: ${props => props.theme.colors.hover};
    background-color: transparent;
    opacity: 1;
  }
  &:active {
    color: ${props => props.theme.colors.hover};
    background-color: transparent;
  }
  &:visited {
    color: ${props => props.theme.colors.hover};
    background-color: transparent;
    opacity: 1;
  }
  &:focus {
    color: ${props => props.theme.colors.hover};
    box-shadow: none;
    border-radius: 0;
  }
`;
