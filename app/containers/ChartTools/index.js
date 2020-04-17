/**
 *
 * ChartTools
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { ResponsiveContext, Button } from 'grommet';
import { CircleQuestion, Performance } from 'grommet-icons';

import { setAsideLayer } from 'containers/App/actions';

import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';

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
  onSetAsideLayer,
  intl,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          {howToReadConfig && (
            <StyledButton
              onClick={() => {
                onSetAsideLayer({
                  type: 'htr',
                  ...howToReadConfig,
                });
              }}
              icon={<CircleQuestion color="dark" size="large" />}
              plain
              label={
                isMinSize(size, 'large')
                  ? intl.formatMessage(rootMessages.labels.chartTools.howToRead)
                  : null
              }
              gap="xsmall"
              reverse
            />
          )}
          {settingsConfig && (
            <StyledButton
              onClick={() => {
                onSetAsideLayer({
                  type: 'settings',
                  ...settingsConfig,
                });
              }}
              icon={<Performance color="dark" size="large" />}
              plain
              label={
                isMinSize(size, 'large')
                  ? intl.formatMessage(rootMessages.labels.chartTools.settings)
                  : null
              }
              gap="xsmall"
              reverse
            />
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartTools.propTypes = {
  howToReadConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  settingsConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSetAsideLayer: PropTypes.func,
  intl: intlShape.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetAsideLayer: args => dispatch(setAsideLayer(args)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ChartTools));
