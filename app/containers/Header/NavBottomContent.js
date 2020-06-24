import React from 'react';
import PropTypes from 'prop-types';

import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';
import NavGroups from 'containers/Search/NavGroups';

const NavBottomContent = ({ type, size, onClose, setOpen }) => {
  if (type === 'metrics') {
    return (
      <NavMetric
        size={size}
        onClose={() => {
          if (onClose) onClose();
          setOpen(false);
        }}
      />
    );
  }
  if (type === 'countries') {
    return (
      <NavCountry
        size={size}
        onClose={() => {
          if (onClose) onClose();
          setOpen(false);
        }}
      />
    );
  }
  if (type === 'people') {
    return (
      <NavGroups
        size={size}
        onClose={() => {
          if (onClose) onClose();
          setOpen(false);
        }}
      />
    );
  }
  return null;
};

NavBottomContent.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  onClose: PropTypes.func,
  setOpen: PropTypes.func,
};

export default NavBottomContent;
