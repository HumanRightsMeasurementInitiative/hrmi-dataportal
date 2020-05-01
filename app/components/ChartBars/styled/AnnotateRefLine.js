import styled from 'styled-components';
// prettier-ignore
export default styled.div`
  position: absolute;
  display: block;
  width: 1px;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  top: ${({ offsetTop }) => (offsetTop ? 7 : 5)}px;
  }};;
  bottom: 0;
  right: -1px;
`;
