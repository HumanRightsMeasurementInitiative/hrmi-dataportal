import styled, { css } from 'styled-components';

// prettier-ignore
export default styled.div`
  position: ${({ above }) => (above ? 'relative' : 'absolute')};
  ${({ above }) =>
    above
      ? css`
        bottom: 10px;
        right: -8px;        
      `
      : css`
        min-width: 70px;
        top: 14px;
        left: -1px;
        text-align: left;
        display: table;
      `}
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
