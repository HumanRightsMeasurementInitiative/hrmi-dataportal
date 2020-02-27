/**
 *
 * ChartTools
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { openHowToRead, openSettings } from 'containers/App/actions';
import { getHowToRead, getSettingsLayer } from 'containers/App/selectors';
import messages from 'containers/LayerHowToRead/messages';

import ButtonChartTool from 'styled/ButtonChartTool';

const Styled = styled.div``;

export function ChartTools({
  howToReadConfig,
  settingsConfig,
  layer,
  settingsLayer,
  onOpenHowToRead,
  onOpenSettings,
}) {
  return (
    <Styled>
      {howToReadConfig && (
        <ButtonChartTool
          onClick={() => {
            if (layer && layer.key === howToReadConfig.key) {
              return onOpenHowToRead(false);
            }
            return onOpenHowToRead(howToReadConfig);
          }}
        >
          <FormattedMessage {...messages.label} />
        </ButtonChartTool>
      )}
      {settingsConfig && (
        <ButtonChartTool
          onClick={() => {
            if (settingsLayer && settingsLayer.key === settingsConfig.key) {
              return onOpenSettings(false);
            }
            return onOpenSettings(settingsConfig);
          }}
        >
          Settings
        </ButtonChartTool>
      )}
    </Styled>
  );
}

ChartTools.propTypes = {
  howToReadConfig: PropTypes.object,
  settingsConfig: PropTypes.object,
  onOpenHowToRead: PropTypes.func,
  onOpenSettings: PropTypes.func,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  settingsLayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  layer: state => getHowToRead(state),
  settingsLayer: state => getSettingsLayer(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onOpenHowToRead: args => dispatch(openHowToRead(args)),
    onOpenSettings: args => dispatch(openSettings(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChartTools);
