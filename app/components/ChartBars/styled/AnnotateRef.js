import styled, { css } from 'styled-components';

const getRotation = rotation => `rotate(${rotation}deg)`;

export default styled.div`
  position: absolute;
  top: ${({ above }) => (above ? 'auto' : '100%')};
  left: ${({ above, relative, left }) => {
    if (relative && left) return `${left}%`;
    return above ? 'auto' : '100%';
  }};
  right: ${({ above, relative }) => {
    if (relative) return 'auto';
    return above ? '-2px' : 'auto';
  }};
  border-right: 1px solid;
  border-color: ${({ above }) => (above ? 'black' : 'transparent')};
  padding-left: 0px;
  padding-right: ${({ above }) => (above ? 5 : 0)}px;
  transform: ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
  margin: ${({ margin }) => margin || 0};
  ${({ align, relative }) =>
    align === 'right' &&
    relative &&
    css`
      transform: translateX(-100%);
    `}
`;
