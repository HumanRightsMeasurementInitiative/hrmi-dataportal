import styled from 'styled-components';
import Button from 'styled/Button';

// prettier-ignore
export default styled(Button)`
  text-align: left;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.global.colors.border.light };
  color: ${({ theme, active }) => active ? theme.global.colors['dark-4'] : theme.global.colors['dark-1']};
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 18px;
  &:last-child {
    border-bottom: 1px solid
      ${({ theme, noBorderLast }) => noBorderLast
    ? 'transparent'
    : theme.global.colors.border.light};
  }
  &:hover {
    color: ${({ theme, active }) => (active ? theme.global.colors['dark-4'] : theme.global.colors['dark-1'])};
    box-shadow: ${({ active }) => active || 'inset 0 0 4px 0 rgba(0, 138, 211, 0.55)'};
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 4px 16px;
  }
`;
