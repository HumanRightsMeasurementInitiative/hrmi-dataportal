import styled from 'styled-components';
import ButtonPlain from 'styled/ButtonPlain';

// prettier-ignore
export default styled(ButtonPlain)`
  text-align: left;
  padding: 2px 10px;
  display: block;
  width: 100%;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  border-top: 1px solid ${({ theme }) => theme.global.colors.border.light };
  border-left: 4px solid transparent;
  font-size: ${({ theme }) => theme.text.xsmall.size};
  &:last-child {
    border-bottom: 1px solid
      ${({ theme, noBorderLast }) => noBorderLast
    ? 'transparent'
    : theme.global.colors.border.light};
  }
  &:hover {
    border-left: 4px solid ${({ theme, disabled }) => (disabled ? 'transparent' : theme.global.colors.dark)};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 4px 16px 4px 12px;
    font-size: ${({ theme }) => theme.text.medium.size};
  }
`;
