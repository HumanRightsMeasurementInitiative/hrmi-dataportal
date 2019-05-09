import styled from 'styled-components';
import { BREAKPOINTS } from 'theme';

const breakpoint = props => {
  if (props.min || props.min === BREAKPOINTS.SMALL) {
    return props.theme.breakpoints[props.min];
  }
  return props.theme.breakpoints[BREAKPOINTS.SMALL];
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
