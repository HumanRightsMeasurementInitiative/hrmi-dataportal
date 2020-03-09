import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

// prettier-ignore
const Styled = styled(Button)`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export function ButtonTextIcon({ onClick, icon, label }) {
  return (
    <Styled
      label={label}
      a11Title={label}
      onClick={onClick}
      icon={icon && <FormNext />}
      plain
      reverse
      gap="xxsmall"
      fill={false}
    />
  );
}

ButtonTextIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.bool,
  label: PropTypes.string,
};

export default ButtonTextIcon;
