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
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Layer, Box, ResponsiveContext, Heading } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';

import {
  getStandardSearch,
  getBenchmarkSearch,
  getScaleSearch,
  getSettingsLayer,
} from 'containers/App/selectors';
import {
  setStandard,
  setBenchmark,
  setScale,
  openSettings,
} from 'containers/App/actions';
import { STANDARDS, BENCHMARKS } from 'containers/App/constants';

import ButtonIcon from 'styled/ButtonIcon';

import {
  isMaxSize,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

import messages from './messages';

import ScaleToggle from './ScaleToggle';
import SettingsToggle from './SettingsToggle';

const SetScaleWrap = styled.div``;
const ButtonWrap = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export function LayerSettings({
  scale,
  standard,
  benchmark,
  onSetStandard,
  onSetBenchmark,
  onSetScale,
  onClose,
  layer,
  theme,
}) {
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
            <Heading level={3}>
              <FormattedMessage {...messages.label} />
            </Heading>
            <ButtonWrap>
              <ButtonIcon onClick={() => onClose()}>
                <CloseIcon size="xlarge" color="white" />
              </ButtonIcon>
            </ButtonWrap>
            {layer.showScale && (
              <SetScaleWrap>
                <ScaleToggle scale={scale} onSetScale={onSetScale} />
              </SetScaleWrap>
            )}
            {layer.showBenchmark && (
              <SettingsToggle
                setting="benchmark"
                active={benchmark}
                onActivate={onSetBenchmark}
                options={BENCHMARKS}
                square={{
                  type: 'line',
                  style: benchmark === 'best' ? 'solid' : 'dashed',
                  color: 'light-2',
                }}
                horizontal
              />
            )}
            {layer.showStandard && (
              <SettingsToggle
                setting="standard"
                active={standard}
                onActivate={onSetStandard}
                options={STANDARDS}
                square={{
                  type: 'square',
                  style: standard === 'core' ? 'solid' : 'stripes',
                  color: 'esr',
                }}
                horizontal
              />
            )}
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
}

LayerSettings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  standard: PropTypes.string,
  onSetStandard: PropTypes.func,
  benchmark: PropTypes.string,
  onSetBenchmark: PropTypes.func,
  scale: PropTypes.string,
  onSetScale: PropTypes.func,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClose: PropTypes.func,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scale: state => getScaleSearch(state),
  layer: state => getSettingsLayer(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
    onSetScale: value => dispatch(setScale(value)),
    onClose: () => dispatch(openSettings(false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(LayerSettings));
