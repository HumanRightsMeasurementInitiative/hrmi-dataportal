import styled from 'styled-components';
import Button from 'styled/Button';

export default styled(Button)`
  border-radius: 99999px;
  background-color: ${({ theme }) => theme.global.colors['light-3']};
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 3px 8px;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  font-size: ${({ theme }) => theme.text.xsmall.size};
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
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 5px 16px 5px 12px;
    font-size: ${({ theme }) => theme.text.medium.size};
  }
`;
