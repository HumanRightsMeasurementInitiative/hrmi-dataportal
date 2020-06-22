import styled from 'styled-components';

export default styled.div`
  width: 100%;
  max-width: 300px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: 50px;
    padding-left: 50px;
    max-width: 500px;
  }
`;
