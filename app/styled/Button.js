import styled from 'styled-components';

// prettier-ignore
export default styled.button`
  display: inline-block;
  padding: 4px 8px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')} !important;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  user-select: none;
  background-image: none;
  border: none;
  border-radius: 0;
  color: ${({ theme }) => theme.global.colors['dark-1']};
  background-color: transparent;
  text-decoration: none;
  &:hover {
    color: ${({ theme, hoverColor }) =>
    theme.global.colors[hoverColor || 'highlight3']};
    background-color: transparent;
  }
  &:active {
    /* color: ${({ theme }) => theme.global.colors.highlight3}; */
    background-color: transparent;
  }
  &:visited {
    /* color: ${({ theme }) => theme.global.colors.highlight3}; */
    background-color: transparent;
  }
  &:focus {
    /* color: ${({ theme }) => theme.global.colors.highlight3}; */
    box-shadow: none;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    font-size: 16px;
    line-height: 20px;
    padding: 6px 12px;
  }
`;
