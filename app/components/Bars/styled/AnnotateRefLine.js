import styled from 'styled-components';

export default styled.div`
  position: absolute;
  width: 1px;
  height: 10px;
  top: 0;
  left: 1px;
  display: block;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  margin: 3px 0;
`;
