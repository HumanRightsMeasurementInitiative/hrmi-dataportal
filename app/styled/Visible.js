import styled from 'styled-components';
import { BREAKPOINTS } from 'containers/App/constants';

const breakpoint = props => {
  if (props.min || props.min === BREAKPOINTS.SMALL) {
    return props.theme.breakpoints[props.min];
  }
  return props.theme.breakpoints[BREAKPOINTS.SMALL];
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
