import styled from 'styled-components';

// /* position: ${({ type }) => (relative ? 'relative' : 'absolute')}; */
export default styled.div`
  position: absolute;
  right: 0;
  bottom: 100%;
  transform: ${({ isRotated }) => (isRotated ? 'rotate(45deg)' : '')};
  margin: ${({ type }) => (type === 'icon' ? '-22px -9px 0 0' : 0)};
`;
