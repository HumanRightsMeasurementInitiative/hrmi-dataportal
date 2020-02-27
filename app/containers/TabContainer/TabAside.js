import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

import { getAsideWidth } from 'utils/responsive';

function TabAside({ asideTab, tabIndex }) {
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
            {asideTab.content({ activeTab: tabIndex })}
          </Box>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabAside.propTypes = {
  asideTab: PropTypes.object,
  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default TabAside;
