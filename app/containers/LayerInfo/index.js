/**
 *
 * LayerSettings
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Layer, Box, ResponsiveContext } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';

import {
  isMaxSize,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

const ButtonWrap = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export function LayerInfo({ onClose, theme, content }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Layer
          onEsc={() => onClose()}
          onClickOutside={() => onClose()}
          modal={isMaxSize(size, 'medium')}
          position="right"
          full="vertical"
        >
          <Box
            elevation="large"
            width={
              isMaxSize(size, 'medium')
                ? '100%'
                : `${getFloatingAsideWidth(size, theme, windowDimensions)}px`
            }
            direction="column"
            flex={{ shrink: 0 }}
            pad={isMaxSize(size, 'medium') ? 'small' : 'medium'}
            fill="vertical"
            overflow="auto"
            style={{ position: 'relative' }}
            responsive={false}
          >
            <ButtonWrap>
              <ButtonIcon onClick={onClose}>
                <CloseIcon size="xlarge" color="white" />
              </ButtonIcon>
            </ButtonWrap>
            {content}
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
}

LayerInfo.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  theme: PropTypes.object,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default withTheme(LayerInfo);
