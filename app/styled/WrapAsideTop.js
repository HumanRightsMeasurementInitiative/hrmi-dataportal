import styled from 'styled-components';

export default styled.div`
  padding-right: 35px;
  @media (min-width: ${({ theme }) => theme.breakpoints.xxlarge}) {
    padding-right: 0;
  }
`;
