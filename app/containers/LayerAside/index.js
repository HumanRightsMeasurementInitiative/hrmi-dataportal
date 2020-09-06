/**
 *
 * LayerSettings
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { withTheme } from 'styled-components';
import { Layer, Box, ResponsiveContext } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';

import { getAsideLayer } from 'containers/App/selectors';
import { setAsideLayer } from 'containers/App/actions';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';
import LayerSettings from 'containers/LayerSettings';
import LayerHowToRead from 'containers/LayerHowToRead';

import ButtonIcon from 'styled/ButtonIcon';

import {
  isMaxSize,
  isMinSize,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

const ButtonWrap = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export function LayerAside({ onClose, theme, layer }) {
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

  if (!layer) return null;
  const inverse = layer.type === 'aboutMetric' || layer.type === 'aboutCountry';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Layer
          onEsc={() => onClose()}
          onClickOutside={() => onClose()}
          modal={isMaxSize(size, 'medium')}
          animation={isMinSize(size, 'large')}
          position="right"
          full={isMaxSize(size, 'medium') || 'vertical'}
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
            fill="vertical"
            overflow="auto"
            style={{ position: 'relative' }}
            responsive={false}
            background={layer.background || 'white'}
            pad={{ right: 'medium' }}
          >
            <ButtonWrap>
              <ButtonIcon onClick={onClose} subtle inverse={inverse}>
                <CloseIcon size="xlarge" color={inverse ? 'white' : 'dark'} />
              </ButtonIcon>
            </ButtonWrap>
            {layer.type === 'htr' && <LayerHowToRead layer={layer} />}
            {layer.type === 'settings' && <LayerSettings layer={layer} />}
            {layer.type === 'aboutMetric' && (
              <AboutMetricContainer
                metricCode={layer.code}
                countryCode={layer.countryCode}
                dateRange={layer.dateRange}
                showTitle
                showMetricLink
                showAboutMetric
                showSources={layer.showSources}
                countryScoreMsg={layer.countryScoreMsg}
                inverse
                inAside
              />
            )}
            {layer.type === 'aboutCountry' && (
              <AboutCountryContainer
                countryCode={layer.code}
                showTitle
                showCountryLink
                inverse
                inAside
              />
            )}
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
}

LayerAside.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  theme: PropTypes.object,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  layer: state => getAsideLayer(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(setAsideLayer(false));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(LayerAside));
