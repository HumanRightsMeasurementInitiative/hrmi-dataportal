import styled from 'styled-components';

export default styled.div`
  padding-right: 35px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.xxlarge}) {
    padding-right: 0;
  }
`;
