import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import Tooltip from 'components/Tooltip';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';
// import { DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';

const HEIGHT = 20;
const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)
const SquareWrap = styled.div`
  display: block;
  height: ${heightRotated}px;
  width: ${heightRotated}px;
  padding-top: ${(heightRotated - HEIGHT) / 2}px;
  margin: 0 0 0 auto;
`;
const Square = styled.div`
  display: block;
  width: ${HEIGHT}px;
  height: ${HEIGHT}px;
  margin: 0 auto;
  transform: rotate(-45deg);
  background-color: ${({ theme, color }) => theme.global.colors[color]};
  border-right: 1px ${({ lineStyle }) => lineStyle || 'solid'};
  border-color: ${({ theme, type }) =>
    type === 'line' ? theme.global.colors['dark-2'] : 'transparent'};
  ${({ type, lineStyle, theme, color }) =>
    type === 'square' &&
    lineStyle === 'stripes' &&
    css`
      background-image: linear-gradient(
        135deg,
        ${theme.global.colors[color]} 30%,
        ${theme.global.colors['light-2']} 30%,
        ${theme.global.colors['light-2']} 50%,
        ${theme.global.colors[color]} 50%,
        ${theme.global.colors[color]} 80%,
        ${theme.global.colors['light-2']} 80%,
        ${theme.global.colors['light-2']} 100%
      );
      background-size: 5px 5px;
      background-repeat: repeat;
    `}
`;

function SettingsToggle({
  options,
  onActivate,
  active,
  setting,
  tooltip,
  square,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          pad={{ left: size === 'xlarge' ? 'large' : 'medium' }}
          direction="column"
        >
          <Box direction="row" align="center" margin={{ right: 'xsmall' }}>
            <Box pad={{ vertical: 'small' }} direction="row">
              <Text size="small" style={{ fontWeight: 600 }}>
                <FormattedMessage {...rootMessages.settings[setting].name} />
              </Text>
              {tooltip && (
                <Tooltip
                  component={tooltip}
                  iconSize="medium"
                  maxWidth="400px"
                />
              )}
            </Box>
            {square && (
              <SquareWrap>
                <Square
                  color={square.color}
                  type={square.type}
                  lineStyle={square.style}
                />
              </SquareWrap>
            )}
          </Box>
          <Box direction="row" align="center">
            {options.map(option => (
              <ButtonToggleSetting
                key={option.key}
                active={option.key === active}
                disabled={option.key === active}
                onClick={() => {
                  onActivate(option.key);
                }}
              >
                <Text size="small">
                  <FormattedMessage
                    {...rootMessages.settings[setting][option.key]}
                  />
                </Text>
              </ButtonToggleSetting>
            ))}
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

SettingsToggle.propTypes = {
  onActivate: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  square: PropTypes.object,
  tooltip: PropTypes.node,
};

export default SettingsToggle;
