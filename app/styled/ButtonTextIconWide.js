import React from 'react';
import PropTypes from 'prop-types';
import { FormNext } from 'grommet-icons';

function buttonContent(
  label,
  size,
  icon,
  hasIcon,
  iconSize,
  secondary,
  reverse,
) {
  let iSize = iconSize;
  if (!iSize) {
    if (size === 'medium') iSize = 'large';
    if (size === 'large') iSize = 'xlarge';
  }
  const textIcon =
    icon ||
    (hasIcon && (
      // Grommet can only use theme colors defined in styled-components? and I can't access styled-components without being inside a Styled function.
      <FormNext color="#ffffff" size={iSize} />
    ));

  return reverse ? (
    <p style={{ display: 'flex', justifyContent: 'space-between' }}>
      {label} {textIcon}
    </p>
  ) : (
    <p style={{ display: 'flex', justifyContent: 'space-between' }}>
      {textIcon} {label}
    </p>
  );
}

export function ButtonTextIconWide({
  onClick,
  icon,
  hasIcon,
  label,
  secondary,
  size = 'medium',
  iconSize,
  reverse = true,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        alignSelf: 'start',
        fontWeight: 600,
        backgroundColor: '#262262',
        fontSize: '18px',
        padding: '0 10px',
        margin: '5px 0',
        width: '100%',
        borderRadius: '5px',
        border: 'none',
      }}
    >
      {buttonContent(label, size, icon, hasIcon, iconSize, secondary, reverse)}
    </button>
  );
}

ButtonTextIconWide.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  secondary: PropTypes.bool,
  reverse: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.string,
  iconSize: PropTypes.string,
};

export default ButtonTextIconWide;
