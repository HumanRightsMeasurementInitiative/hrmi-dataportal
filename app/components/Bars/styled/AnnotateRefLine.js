import styled, { css } from 'styled-components';
// prettier-ignore
export default styled.div`
  position: absolute;
  display: block;
  width: 1px;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  ${({ above }) =>
    above
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
      `}
`;
