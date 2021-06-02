/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Text, Box, ResponsiveContext } from 'grommet';

import Tooltip from 'components/Tooltip';

import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  margin-bottom: 5px;
`;
const MetricIcon = styled.img`
  background: ${({ theme, bgr }) => theme.global.colors[bgr]};
  height: ${({ small }) => (small ? 40 : 48)}px;
  width: ${({ small }) => (small ? 40 : 48)}px;
`;

const ButtonTitle = styled(ButtonPlain)`
  color: ${({ color, theme }) => theme.global.colors[color]};
  line-height: normal;
  &:hover {
    color: ${({ color, theme }) => theme.global.colors[color]};
    text-decoration: underline;
  }
`;

function CardHeader({ metric, currentRegion, onSelectMetric, mode }) {
  const color = currentRegion === 'all' ? 'world' : currentRegion || 'world';
  return (
    <ResponsiveContext.Consumer>
      {() => (
        <Styled>
          <Box
            pad={{ horizontal: 'xsmall' }}
            direction="row"
            gap="small"
            align="start"
            justify="between"
            fill="horizontal"
          >
            <MetricIcon src={metric.icon} alt="" bgr={color} small />
            <Box direction="row" justify="between" gap="small" align="start">
              <ButtonTitle
                color={currentRegion}
                onClick={() => onSelectMetric('regions')}
              >
                <Text
                  size={mode === 'multi-country' ? 'medium' : 'large'}
                  weight={600}
                  color={currentRegion}
                >
                  <FormattedMessage
                    {...rootMessages['rights-short'][metric.key]}
                  />
                </Text>
              </ButtonTitle>
              <Box pad={{ top: 'xxsmall' }}>
                <Tooltip
                  component={
                    <Box gap="small">
                      <Text size="xsmall">
                        <FormattedMessage {...messages.tooltip} />
                      </Text>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardHeader.propTypes = {
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentRegion: PropTypes.string,
  onSelectMetric: PropTypes.func,
  mode: PropTypes.string,
};

export default CardHeader;
