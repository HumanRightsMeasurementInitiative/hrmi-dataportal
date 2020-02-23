import styled from 'styled-components';

export default styled.div`
  position: absolute;
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  display: table;
  text-align: center;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  width: auto;
  white-space: nowrap;
`;
