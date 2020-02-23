import styled from 'styled-components';
import Label from './Label';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled(Label)`
  top: ${({ bottom }) => (bottom ? 103 : 50)}%;
  left: 100%;
  padding-left: ${({ rotate }) => (rotate ? 6 : 4)}px;
  transform: translateY(-50%)
    ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;
