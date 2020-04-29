import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  border-radius: 99999px;
  color: ${({ theme }) => theme.global.colors.dark};
  background-color:
    ${({ theme, hasWhiteBG = true }) => hasWhiteBG
    ? theme.global.colors.buttonSecondaryOnWhite
    : theme.global.colors.buttonSecondary
};
  &:hover {
    background-color:
    ${({ theme, hasWhiteBG = true, disabled }) => {
    if (disabled) {
      return hasWhiteBG
        ? theme.global.colors.buttonSecondaryOnWhite
        : theme.global.colors.buttonSecondary;
    }
    return hasWhiteBG
      ? theme.global.colors.buttonSecondaryOnWhiteHover
      : theme.global.colors.buttonSecondaryHover;
  }
};
  }
  &:active {
    background-color:
    ${({ theme, hasWhiteBG = true }) => hasWhiteBG
    ? theme.global.colors.buttonSecondaryOnWhiteHover
    : theme.global.colors.buttonSecondaryHover
};
  }
  &:visited {
    background-color:
    ${({ theme, hasWhiteBG = true }) => hasWhiteBG
    ? theme.global.colors.buttonSecondaryOnWhiteHover
    : theme.global.colors.buttonSecondaryHover
};
  }
  &:focus {
    box-shadow: none;
    border-radius: 99999px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    line-height: ${({ theme }) => theme.text.medium.height};
    padding: 4px 16px;
  }
`;
