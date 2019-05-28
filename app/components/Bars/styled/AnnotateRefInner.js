import styled from 'styled-components';

export default styled.div`
  position: absolute;
  min-width: 70px;
  top: 14px;
  left: -1px;
  text-align: left;
  display: table;
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
