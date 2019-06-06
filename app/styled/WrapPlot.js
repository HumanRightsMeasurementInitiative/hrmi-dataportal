import styled from 'styled-components';

export default styled.div`
  @media (min-width: ${props => props.theme.breakpoints.large}) {
    padding-right: 50px;
    padding-left: 50px;
  }
`;
