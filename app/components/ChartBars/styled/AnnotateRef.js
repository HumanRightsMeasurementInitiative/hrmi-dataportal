import styled from 'styled-components';

// /* position: ${({ type }) => (relative ? 'relative' : 'absolute')}; */
export default styled.div`
  position: absolute;
  right: 0;
  bottom: 100%;
  transform: ${({ isRotated }) => (isRotated ? 'rotate(45deg)' : '')};
  margin: ${({ type, isRotated }) =>
    /* eslint-disable */
    isRotated
      ? '-36px -27px 0 0'
      : type === 'htr'
        ? '0px'
        : '-36px -27px -16px 0'};
    /* eslint-enable */
`;
