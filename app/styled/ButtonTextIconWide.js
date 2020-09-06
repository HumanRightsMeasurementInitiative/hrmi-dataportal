import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormNext } from 'grommet-icons';

const StyledButton = styled.button`
  align-self: start;
  font-weight: 600;
  background-color: #262262;
  font-size: 18px;
  padding: 0 10px;
  margin: 5px 0;
  width: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export function ButtonTextIconWide({
  onClick,
  icon,
  hasIcon,
  label,
  iconSize,
  reverse = true,
}) {
  return (
    <StyledButton type="button" onClick={onClick}>
      <p style={{ display: 'flex', justifyContent: 'space-between' }}>
        {reverse && label}
        {icon ||
          (hasIcon && <FormNext color="white" size={iconSize || 'large'} />)}
        {!reverse && label}
      </p>
    </StyledButton>
  );
}

ButtonTextIconWide.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  reverse: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconSize: PropTypes.string,
};

export default ButtonTextIconWide;
