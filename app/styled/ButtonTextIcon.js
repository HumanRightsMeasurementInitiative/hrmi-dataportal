import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

// prettier-ignore
const Styled = styled(Button)`
  font-weight: 600;
  color: ${({ theme, secondary }) => theme.global.colors[secondary ? 'secondary' : 'dark']};
  &:hover {
    text-decoration: underline;
  }
`;

export function ButtonTextIcon({ icon, hasIcon, label, secondary, ...props }) {
  return (
    <Styled
      secondary={secondary}
      label={label}
      a11Title={label}
      icon={icon || (hasIcon && <FormNext color="dark" size="large" />)}
      plain
      reverse
      gap="hair"
      alignSelf="start"
      {...props}
    />
  );
}

ButtonTextIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  secondary: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonTextIcon;
