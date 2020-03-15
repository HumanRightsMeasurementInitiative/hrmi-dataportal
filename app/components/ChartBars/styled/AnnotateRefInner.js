import styled, { css } from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  text-align: right;
  ${({ relative, horizontal, offsetTop }) => {
    if (horizontal) return css`
      bottom: 3px;
      left: -15px;
      width: auto;
      white-space: nowrap;
    `;
    if (relative) return css`
      bottom: 2px;
      width: auto;
      white-space: nowrap;
    `;
    if (offsetTop) return css`
      bottom: 17px;
      right: 0;
    `;
    return css`
      bottom: 2px;
      right: -1px;
    `;
  }}
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
