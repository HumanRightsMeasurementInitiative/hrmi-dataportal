import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import ButtonTextIcon from 'styled/ButtonTextIcon';

export function AllLinkButton ({ label, onClick, size = 'large', ...rest }) {
  return (
    <Box {...rest}>
      <ButtonTextIcon label={label} onClick={onClick} hasIcon size={size} />
    </Box>
  );
}

AllLinkButton.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default AllLinkButton;
