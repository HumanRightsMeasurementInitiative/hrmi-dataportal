import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import ButtonPrimary from './ButtonPrimary';

// prettier-ignore
const StyledPrimary = styled(ButtonPrimary)`
  border-radius: 3px !important;
  padding: 3px 6px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  margin-bottom: ${({ stacked }) => stacked ? '6px' : 0};
  background-color: ${({ theme, color }) => theme.global.colors[color || 'dark']};
  &:last-child {
    margin-right: ${({ stacked, theme }) => stacked ? theme.global.edgeSize.xsmall : 0};
  }
  &:hover {
    background-color:
    ${({ theme, multi }) => theme.global.colors[multi ? 'buttonSecondaryOnWhite' : 'buttonPrimaryHover']};
    color:
    ${({ theme, multi }) => theme.global.colors[multi ? 'dark' : 'white']};
}
  &:active {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, color }) => theme.global.colors[color || 'dark']};
}
  &:focus {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, color }) => theme.global.colors[color || 'dark']};
}
  &:visited {
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme, color }) => theme.global.colors[color || 'dark']};
}
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 3px 10px;
  }
`;
// prettier-ignore
const StyledButton = styled(Button)`
  border-radius: 3px !important;
  padding: 3px 6px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  margin-bottom: ${({ stacked }) => (stacked ? '6px' : 0)};
  &:last-child {
    margin-right: ${({ stacked, theme }) =>
    stacked ? theme.global.edgeSize.xsmall : 0};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 3px 10px;
  }
`;

function ButtonToggleSetting(props) {
  if (props.active) {
    return <StyledPrimary {...props} />;
  }
  return <StyledButton {...props} />;
}

ButtonToggleSetting.propTypes = {
  active: PropTypes.bool,
};

export default ButtonToggleSetting;
