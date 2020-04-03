import styled from 'styled-components';

export default styled.div`
  font-size: ${({ theme }) => theme.text.small.size};
  line-height: ${({ theme }) => theme.text.small.height};
  margin: 1em 0;
`;
