import styled, { css } from 'styled-components';
// prettier-ignore
export default styled.div`
  position: absolute;
  display: block;
  width: 1px;
  border-right: ${({ horizontal }) => horizontal ? 0 : 1}px solid;
  border-top: ${({ horizontal }) => horizontal ? 1 : 0}px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  ${({ above, relative, align, horizontal }) => {
    if (relative) return css`
      bottom: 2px;
      height: 3px;
      left: ${align === 'right' ? 'auto' : '-1px'};
      right: ${align === 'right' ? '-1px' : 'auto'};
    `;
    if (horizontal) {
      return css`
        border-right: 0;
        top: 5px;
        right: 2px;
        height: 1px;
        width: 10px;
      `;
    }
    return above
      ? css`
        bottom: 2px;
        right: -1px;
        height: 6px;
      `
      : css`
        height: 10px;
        margin: 3px 0;
        top: 0;
        left: 1px;
        text-align: left;
      `;
  }}
`;
