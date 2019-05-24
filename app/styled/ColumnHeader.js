import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

function ColumnHeader(props) {
  return (
    <Box
      pad={{
        left: props.main ? 'medium' : 'xsmall',
      }}
      {...props}
    />
  );
}

ColumnHeader.propTypes = {
  main: PropTypes.bool,
};

export default ColumnHeader;
