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
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 3px 10px;
  }
`;
const StyledButton = styled(Button)`
  border-radius: 3px !important;
  padding: 3px 6px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  &:last-child {
    margin-right: 0;
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
