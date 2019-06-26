import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { Box, ResponsiveContext } from 'grommet';
import { isMinSize } from 'utils/responsive';

function PanelSimple({ head, top, level }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box border="top">
          <Box
            direction="row"
            align="center"
            pad={{ top: level === 3 ? 'xsmall' : 'small', horizontal: 'none' }}
            fill="horizontal"
          >
            {top}
          </Box>
          <Box direction="row">
            {head}
            <Box
              width={isMinSize(size, 'medium') ? '200px' : '50px'}
              flex={{ shrink: 0 }}
            />
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

PanelSimple.propTypes = {
  top: PropTypes.node,
  head: PropTypes.node,
  level: PropTypes.number,
};

export default PanelSimple;
