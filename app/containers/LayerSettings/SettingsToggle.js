import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';

import Tooltip from 'components/Tooltip';
import BenchmarkOverlay from 'components/Tooltip/BenchmarkOverlay';
import StandardOverlay from 'components/Tooltip/StandardOverlay';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';

// import { DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';

const HEIGHT = 20;
const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)
const SquareWrap = styled.div`
  display: block;
  height: ${({ rotated }) => (rotated ? heightRotated : HEIGHT / 2)}px;
  width: ${({ rotated }) => (rotated ? heightRotated : HEIGHT * 1.5)}px;
  padding-top: ${({ rotated }) =>
    rotated ? (heightRotated - HEIGHT) / 2 : 0}px;
  padding-right: ${({ rotated }) =>
    rotated ? (heightRotated - HEIGHT) / 2 : 0}px;
  margin: 0 0 0 auto;
`;
const Square = styled.div`
  display: block;
  width: ${({ rotated }) => (rotated ? HEIGHT : HEIGHT * 1.5)}px;
  height: ${({ rotated }) => (rotated ? HEIGHT : HEIGHT / 2)}px;
  margin: 0 auto;
  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(-45deg);
    `};
  background-color: ${({ theme, color, lineStyle }) =>
    lineStyle === 'stripes' ? 'transparent' : theme.global.colors[color]};
  ${({ lineStyle, type }) =>
    lineStyle === 'solid' &&
    type === 'line' &&
    css`
      border-right: 1px solid;
      border-color: ${props => props.theme.global.colors['dark-2']};
    `}
  ${({ lineStyle, type }) =>
    lineStyle !== 'solid' &&
    type === 'line' &&
    css`
      background-image: linear-gradient(
        ${props => props.theme.global.colors['dark-2']} 50%,
        rgba(255, 255, 255, 0) 0%
      );
      background-position: right;
      background-size: 2px 4px;
      background-repeat: repeat-y;
    `}
  ${({ type, lineStyle, theme, color }) =>
    type === 'square' &&
    lineStyle === 'stripes' &&
    css`
      background-image: linear-gradient(
        135deg,
        ${theme.global.colors[color]} 30%,
        ${theme.global.colors[`${color}Trans`]} 30%,
        ${theme.global.colors[`${color}Trans`]} 50%,
        ${theme.global.colors[color]} 50%,
        ${theme.global.colors[color]} 80%,
        ${theme.global.colors[`${color}Trans`]} 80%,
        ${theme.global.colors[`${color}Trans`]} 100%
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
  square,
  horizontal = false,
}) {
  return (
    <Box direction="column" flex={{ shrink: 0 }} responsive={false}>
      <Box direction="row" align="center">
        <Box pad={{ vertical: 'small' }} direction="row">
          <Text size="small" style={{ fontWeight: 600 }}>
            <FormattedMessage {...rootMessages.settings[setting].name} />
          </Text>
          {setting === 'standard' && (
            <Tooltip iconSize="medium" large component={<StandardOverlay />} />
          )}
          {setting === 'benchmark' && (
            <Tooltip iconSize="medium" large component={<BenchmarkOverlay />} />
          )}
        </Box>
        {square && (
          <SquareWrap rotated={!horizontal}>
            <Square
              rotated={!horizontal}
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
  );
}

SettingsToggle.propTypes = {
  onActivate: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  square: PropTypes.object,
  tooltip: PropTypes.node,
  horizontal: PropTypes.bool,
};

export default SettingsToggle;
