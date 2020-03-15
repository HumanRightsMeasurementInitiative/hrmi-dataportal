import styled from 'styled-components';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled.div`
  position: ${({ relative }) => (relative ? 'relative' : 'absolute')};
  right: ${({ relative, rotate }) => {
    if (rotate) {
      return '-20px';
    }
    return relative ? 'auto' : '0';
  }};
  bottom: ${({ rotate }) => {
    if (rotate) {
      return '30px';
    }
    return 'auto';
  }};
  border-right: 1px solid;
  border-color: ${({ hasBorder }) => (hasBorder ? 'black' : 'transparent')};
  padding-left: 0px;
  padding-right: ${({ offsetTop }) => (offsetTop ? 0 : '5px')};
  transform: ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
  margin: ${({ margin }) => margin || 0};
`;
