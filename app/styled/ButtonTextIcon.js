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

export function ButtonTextIcon({ icon, hasIcon, label, ...props }) {
  return (
    <Styled
      label={label}
      a11Title={label}
      icon={icon || (hasIcon && <Next color="dark" />)}
      plain
      reverse
      gap="xsmall"
      alignSelf="start"
      {...props}
    />
  );
}

ButtonTextIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonTextIcon;
