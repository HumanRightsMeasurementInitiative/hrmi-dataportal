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
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { ResponsiveContext, Button } from 'grommet';
import { CircleQuestion, Performance } from 'grommet-icons';

import { openHowToRead, openSettings } from 'containers/App/actions';
import { getHowToRead, getSettingsLayer } from 'containers/App/selectors';

import { isMinSize } from 'utils/responsive';

import messages from './messages';

const Styled = styled.div``;
const StyledButton = styled(Button)`
  background: white;
  padding: 3px;
  margin-right: ${({ theme }) => theme.global.edgeSize.small};
  font-weight: 600;
  &:last-child {
    margin-right: 0;
  }
  border-radius: 9999px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 3px 10px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.global.colors['light-5']};
  }
`;

export function ChartTools({
  howToReadConfig,
  settingsConfig,
  layer,
  settingsLayer,
  onOpenHowToRead,
  onOpenSettings,
  intl,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          {howToReadConfig && (
            <StyledButton
              onClick={() => {
                if (layer && layer.key === howToReadConfig.key) {
                  return onOpenHowToRead(false);
                }
                return onOpenHowToRead(howToReadConfig);
              }}
              icon={<CircleQuestion color="dark" size="large" />}
              plain
              label={
                isMinSize(size, 'large')
                  ? intl.formatMessage(messages.howToRead)
                  : null
              }
              gap="xsmall"
            />
          )}
          {settingsConfig && (
            <StyledButton
              onClick={() => {
                if (settingsLayer && settingsLayer.key === settingsConfig.key) {
                  return onOpenSettings(false);
                }
                return onOpenSettings(settingsConfig);
              }}
              icon={<Performance color="dark" size="large" />}
              plain
              label={
                isMinSize(size, 'large')
                  ? intl.formatMessage(messages.settings)
                  : null
              }
              gap="xsmall"
            />
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartTools.propTypes = {
  onOpenHowToRead: PropTypes.func,
  onOpenSettings: PropTypes.func,
  howToReadConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  settingsConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  settingsLayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
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

export default compose(withConnect)(injectIntl(ChartTools));
