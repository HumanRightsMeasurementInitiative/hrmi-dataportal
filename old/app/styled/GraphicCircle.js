import styled from 'styled-components';

export default styled.div`
  opacity: 0.8;
  border-radius: 99999px;
  background-color: ${({ theme, color }) =>
    color ? theme.global.colors[color] : 'red'};
  width: ${({ size }) => size || '50px'};
  height: ${({ size }) => size || '50px'};
`;
