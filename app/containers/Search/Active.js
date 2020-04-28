import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-left: 5px solid;
  border-color: ${({ color, theme }) => theme.global.colors[color]};
`;
