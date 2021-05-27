import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  padding: 2px;
  margin-top: ${({ vertical }) => vertical === 'bottom' ? 5 : 0}px;
  margin-bottom: ${({ vertical }) => vertical === 'top' ? 5 : 0}px;
  width: auto;
  text-align: ${({ horizontal }) => horizontal === 'left' ? 'right' : 'left'};
`;
