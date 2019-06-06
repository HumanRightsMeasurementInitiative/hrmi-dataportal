import styled from 'styled-components';

const breakpoint = props => {
  if (props.min || props.min === 'small') {
    return props.theme.breakpointsMin[props.min];
  }
  return props.theme.breakpointsMin.medium;
};

/**
 * @component
 * Responsive style: Hidden when viewport wider than given breakpoint as defined in theme.
 * (See also /styles/Visible)
 *
 */
export default styled.span`
  @media (min-width: ${props => breakpoint(props)}) {
    display: none;
  }
`;
