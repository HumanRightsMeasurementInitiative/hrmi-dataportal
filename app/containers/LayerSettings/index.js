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
import { Layer, Box, ResponsiveContext, Heading, Paragraph } from 'grommet';
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
import { STANDARDS, BENCHMARKS, SCALES } from 'containers/App/constants';

import ButtonIcon from 'styled/ButtonIcon';

import {
  isMaxSize,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

import SettingsToggle from './SettingsToggle';
import InfoBenchmark from './InfoBenchmark';
import InfoStandard from './InfoStandard';
import InfoScale from './InfoScale';

const ButtonWrap = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const SettingWrap = styled.div`
  margin-bottom: 30px;
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
            <Heading level={2}>
              <FormattedMessage {...rootMessages.labels.tools.settings} />
            </Heading>
            <Paragraph>
              <FormattedMessage {...messages.intro} />
            </Paragraph>
            <ButtonWrap>
              <ButtonIcon onClick={() => onClose()} subtle>
                <CloseIcon size="xlarge" color="dark" />
              </ButtonIcon>
            </ButtonWrap>
            {layer.showScale && (
              <SettingWrap>
                <SettingsToggle
                  setting="scale"
                  active={scale}
                  onActivate={onSetScale}
                  options={SCALES.map(s => ({
                    label: s.type,
                    ...s,
                  }))}
                  horizontal
                />
                <InfoScale size="xsmall" />
              </SettingWrap>
            )}
            {layer.showBenchmark && (
              <SettingWrap>
                <SettingsToggle
                  setting="benchmark"
                  active={benchmark}
                  onActivate={onSetBenchmark}
                  options={BENCHMARKS}
                  horizontal
                />
                <InfoBenchmark size="xsmall" hasKey />
              </SettingWrap>
            )}
            {layer.showStandard && (
              <SettingWrap>
                <SettingsToggle
                  setting="standard"
                  active={standard}
                  onActivate={onSetStandard}
                  options={STANDARDS}
                  horizontal
                />
                <InfoStandard size="xsmall" hasKey />
              </SettingWrap>
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
