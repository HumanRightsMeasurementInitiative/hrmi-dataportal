import styled from 'styled-components';
import Button from 'styled/Button';

// prettier-ignore
export default styled(Button)`
  border-radius: 99999px;
  background-color: ${({ theme }) => theme.global.colors['light-3']};
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 6px 12px;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  &:hover {
    color: ${({ theme }) => theme.global.colors.dark};
    background-color: ${({ theme }) => theme.global.colors['light-4']};
  }
  &:focus {
    border-radius: 99999px;
    outline-color: transparent;
    color: ${({ theme }) => theme.global.colors.dark};
    background-color: ${({ theme }) => theme.global.colors['light-4']};
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 6px 16px;
  }
`;
