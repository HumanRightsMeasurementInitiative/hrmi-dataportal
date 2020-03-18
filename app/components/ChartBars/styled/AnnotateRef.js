import styled from 'styled-components';

// /* position: ${({ type }) => (relative ? 'relative' : 'absolute')}; */
export default styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transform: ${({ type }) => (type === 'diamond' ? 'rotate(45deg)' : '')};
  margin: ${({ type }) => (type === 'diamond' ? '-22px -9px 0 0' : 0)};
`;
