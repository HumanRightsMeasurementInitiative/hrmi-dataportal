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
import { ResponsiveContext, Button, Text } from 'grommet';
import { CircleQuestion, Performance, DocumentText } from 'grommet-icons';

import { setAsideLayer } from 'containers/App/actions';

import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';

const Styled = styled.div``;
// prettier-ignore
const StyledText = styled(Text)`
  border-bottom: 3px solid
    ${({ theme, hasWhiteBG = true }) =>
    hasWhiteBG
      ? theme.global.colors.buttonSecondaryOnWhiteHover
      : theme.global.colors.buttonSecondaryHover
};
`;
const StyledButton = styled(Button)`
  background: transparent;
  padding: 3px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xxsmall};
  font-weight: 600;
  &:last-child {
    margin-right: 0;
    padding-right: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 3px 10px;
  }
`;

export function ChartTools({
  howToReadConfig,
  settingsConfig,
  behindTheNumbersConfig,
  onSetAsideLayer,
  intl,
  hasWhiteBG = true,
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
                isMinSize(size, 'medium') ? (
                  <StyledText hasWhiteBG={hasWhiteBG}>
                    {intl.formatMessage(
                      rootMessages.labels.chartTools.howToRead,
                    )}
                  </StyledText>
                ) : null
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
                isMinSize(size, 'medium') ? (
                  <StyledText hasWhiteBG={hasWhiteBG}>
                    {intl.formatMessage(
                      rootMessages.labels.chartTools.settings,
                    )}
                  </StyledText>
                ) : null
              }
              gap="xsmall"
              reverse
            />
          )}
          {behindTheNumbersConfig && (
            <StyledButton
              onClick={() => {
                onSetAsideLayer({
                  type: 'btn',
                  ...behindTheNumbersConfig,
                });
              }}
              icon={<DocumentText color="dark" size="large" />}
              plain
              label={
                isMinSize(size, 'medium') ? (
                  <StyledText hasWhiteBG={hasWhiteBG}>
                    {intl.formatMessage(
                      rootMessages.labels.chartTools.behindTheNumbers,
                    )}
                  </StyledText>
                ) : null
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
  hasWhiteBG: PropTypes.bool,
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
