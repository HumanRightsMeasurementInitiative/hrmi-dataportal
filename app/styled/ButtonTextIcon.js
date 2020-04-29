import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

// prettier-ignore
const Styled = styled(Button)`
  font-weight: 600;
  color: ${({ theme, secondary }) => theme.global.colors[secondary ? 'secondary' : 'dark']};
  font-size: ${({ theme, size }) => theme.text[size].size};
  &:hover {
    text-decoration: underline;
  }
`;

export function ButtonTextIcon({
  icon,
  hasIcon,
  label,
  secondary,
  size = 'medium',
  iconSize,
  ...rest
}) {
  let iSize = iconSize;
  if (!iSize) {
    if (size === 'medium') iSize = 'large';
    if (size === 'large') iSize = 'xlarge';
  }
  return (
    <Styled
      secondary={secondary}
      label={label}
      a11Title={label}
      icon={
        icon ||
        (hasIcon && (
          <FormNext color={secondary ? 'secondary' : 'dark'} size={iSize} />
        ))
      }
      plain
      reverse
      gap={size !== 'medium' ? 'hair' : '0'}
      alignSelf="start"
      size={size}
      {...rest}
    />
  );
}

ButtonTextIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  secondary: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  iconSize: PropTypes.string,
};

export default ButtonTextIcon;
