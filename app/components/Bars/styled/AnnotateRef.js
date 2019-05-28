import styled from 'styled-components';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled.div`
  position: absolute;
  top: 100%;
  left: 100%;
  padding-left: 0px;
  transform: ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
  margin: ${({ multiple }) => (multiple ? 0 : 1)}px;
`;
