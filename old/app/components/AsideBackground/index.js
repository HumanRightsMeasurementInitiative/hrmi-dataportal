/**
 *
 * AsideBackground
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext, Box } from 'grommet';
import { withTheme } from 'styled-components';
import {
  isMaxSize,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

function AsideBackground ({ theme, color }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    function handleResize () {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          direction='row'
          fill
          style={{ position: 'absolute', left: 0, right: 0 }}
          justify='end'
        >
          <Box
            background={color || 'light-1'}
            fill='vertical'
            width={
              isMaxSize(size, 'medium')
                ? '100%'
                : `${getFloatingAsideWidth(size, theme, windowDimensions)}px`
            }
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

AsideBackground.propTypes = {
  color: PropTypes.string,
  theme: PropTypes.object,
};

export default withTheme(AsideBackground);
