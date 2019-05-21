import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: ${({ theme, top }) => (top ? 0 : theme.navTop)};
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: auto;
`;
