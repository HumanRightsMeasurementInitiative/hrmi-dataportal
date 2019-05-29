import styled from 'styled-components';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled.div`
  position: absolute;
  top: ${({ above }) => (above ? 'auto' : '100%')};
  bottom: ${({ above }) => (above ? '100%' : 'auto')};
  left: ${({ above }) => (above ? 'auto' : '100%')};
  right: ${({ above }) => (above ? '-1px' : 'auto')};
  padding-left: 0px;
  transform: ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
  margin: ${({ margin }) => margin || 0};
`;
