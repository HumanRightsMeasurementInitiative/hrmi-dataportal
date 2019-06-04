import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 100%;
  margin-top: ${({ padAnnotationAbove }) => (padAnnotationAbove ? 20 : 0)}px;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin-top: 0px;
  }
`;
