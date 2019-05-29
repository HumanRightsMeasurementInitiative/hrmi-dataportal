import styled from 'styled-components';
import Label from './Label';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled(Label)`
  top: ${({ rotate }) => (rotate ? 50 : 50)}%;
  right: 100%;
  padding-right: ${({ rotate }) => (rotate ? 6 : 4)}px;
  transform: translateY(-50%)
    ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;
