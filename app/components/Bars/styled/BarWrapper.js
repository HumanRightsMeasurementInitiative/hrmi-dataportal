import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: 0px;
  }
`;
