import styled from 'styled-components';
import Button from 'styled/Button';

export default styled(Button)`
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  margin-bottom: ${({ theme }) => theme.global.edgeSize.xxsmall};
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    text-align: left;
  }
`;
