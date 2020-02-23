import styled, { css } from 'styled-components';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled.div`
  position: absolute;
  top: ${({ above }) => (above ? 'auto' : '100%')};
  bottom: ${({ above }) => (above ? '100%' : 'auto')};
  left: ${({ above, relative, left }) => {
    if (relative && left) return `${left}%`;
    return above ? 'auto' : '100%';
  }};
  right: ${({ above, relative }) => {
    if (relative) return 'auto';
    return above ? '-1px' : 'auto';
  }};
  padding-left: 0px;
  transform: ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
  margin: ${({ margin }) => margin || 0};
  ${({ align, relative }) =>
    align === 'right' &&
    relative &&
    css`
      transform: translateX(-100%);
    `}
`;
