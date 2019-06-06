import styled from 'styled-components';

const breakpoint = props => {
  if (props.min || props.min === 'small') {
    return props.theme.breakpointsMin[props.min];
  }
  return props.theme.breakpointsMin.medium;
};

/**
 * @component
 * Responsive style: Only visible when viewport wider than given breakpoint as defined in theme
 * (See also /styles/Hidden)
 *
 */
export default styled.span`
  display: none;
  @media (min-width: ${props => breakpoint(props)}) {
    display: inline;
  }
`;
