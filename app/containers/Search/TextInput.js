import styled from 'styled-components';
import { TextInput } from 'grommet';

export default styled(TextInput)`
  font-weight: 600;
  font-size: ${({ theme }) => theme.text.small.size};
  &::placeholder {
    color: ${({ theme }) => theme.global.colors.dark};
    font-weight: 400;
    opacity: 0.8;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.medium.size};
  }
`;
