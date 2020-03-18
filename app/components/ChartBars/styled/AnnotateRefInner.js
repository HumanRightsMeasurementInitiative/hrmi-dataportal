import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  text-align: right;
  top: ${({ offsetTop }) => (offsetTop ? '-16px' : 0)};
  right: ${({ offsetTop }) => (offsetTop ? 0 : '4px')};
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
