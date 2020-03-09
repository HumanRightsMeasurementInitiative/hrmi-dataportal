import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';
import { Next } from 'grommet-icons';

// prettier-ignore
const Styled = styled(Button)`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export function ButtonTextIcon({ onClick, icon, hasIcon, label, ...props }) {
  return (
    <Styled
      label={label}
      a11Title={label}
      onClick={onClick}
      icon={icon || (hasIcon && <Next color="dark" />)}
      plain
      reverse
      gap="xsmall"
      fill={false}
      {...props}
    />
  );
}

ButtonTextIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonTextIcon;
