import styled from 'styled-components';

export default styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: 50px;
    padding-left: 50px;
  }
`;
