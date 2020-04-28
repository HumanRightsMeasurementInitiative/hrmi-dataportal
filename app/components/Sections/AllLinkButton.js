import React from 'react';
import PropTypes from 'prop-types';

import ButtonTextIcon from 'styled/ButtonTextIcon';

import AllLinkButtonWrap from './AllLinkButtonWrap';

export function AllLinkButton({ label, onClick }) {
  return (
    <AllLinkButtonWrap>
      <ButtonTextIcon label={label} onClick={onClick} hasIcon />
    </AllLinkButtonWrap>
  );
}

AllLinkButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default AllLinkButton;
