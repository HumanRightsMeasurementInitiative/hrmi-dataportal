import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';

// prettier-ignore
const Styled = styled(Button)`
  border-radius: 999999px;
  color: ${({ theme }) => theme.global.colors.white};
  background-color: ${({ theme }) => theme.global.colors.buttonPrimary};
  padding: 4px 6px;
  margin: ${({ theme }) => theme.global.edgeSize.xxsmall};
  font-weight: 600;
  border-radius: 0;
  border: 0;
  &:hover {
    border: 0;
    box-shadow: none;
    background-color: ${({ theme }) => theme.global.colors.dark};
  }
  &:focus {
    background-color: ${({ theme }) => theme.global.colors.dark};
    outline-color: transparent;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 5px 15px;
  }
`;

export function ButtonPrimary({ onClick, label, ...props }) {
  return (
    <Styled
      label={label}
      a11Title={label}
      onClick={onClick}
      {...props}
      fill={false}
    />
  );
}

ButtonPrimary.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonPrimary;
