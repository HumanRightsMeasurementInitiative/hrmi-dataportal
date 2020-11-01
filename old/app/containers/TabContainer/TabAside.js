import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

import { getAsideWidth } from 'utils/responsive';

function TabAside({ asideTab, activeTab }) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Box
            width={getAsideWidth(size)}
            direction="column"
            flex={{ shrink: 0 }}
          >
            {asideTab.content({ activeTab })}
          </Box>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabAside.propTypes = {
  asideTab: PropTypes.object,
  activeTab: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TabAside;
