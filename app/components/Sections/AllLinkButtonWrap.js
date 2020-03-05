import styled from 'styled-components';

export default styled.div`
  position: absolute;
  right: 0;
  top: ${({ theme }) => theme.global.edgeSize.ml};
  right: ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    right: ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    right: ${({ theme }) => theme.global.edgeSize.xlarge};
  }
`;
