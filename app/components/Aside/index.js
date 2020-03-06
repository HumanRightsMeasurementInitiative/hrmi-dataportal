import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

import { getAsideWidth } from 'utils/responsive';

function Aside({ content, active, children }) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          width={getAsideWidth(size)}
          direction="column"
          flex={{ shrink: 0 }}
          fill="vertical"
        >
          {content
            ? content.content({ active })
            : children
          }
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Aside.propTypes = {
  content: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Aside;
