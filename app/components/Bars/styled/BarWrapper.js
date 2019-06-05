import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin-top: 0px;
  }
`;
