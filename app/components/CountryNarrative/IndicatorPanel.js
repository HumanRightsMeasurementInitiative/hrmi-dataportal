import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Heading, Text, Box, Button } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';

import rootMessages from 'messages';
import formatScore from 'utils/format-score';

const IndicatorScoreText = props => (
  <Text
    weight="bold"
    size="small"
    alignSelf="end"
    margin={{ right: '52px' }}
    {...props}
  />
);

const maxValue = 100;

function IndicatorPanel({ indicator, column, standard, onMetricClick }) {
  const value =
    indicator.score &&
    indicator.score[column] &&
    parseFloat(indicator.score[column]);
  return (
    <Box pad={{ vertical: 'xxsmall', horizontal: 'small' }} fill="horizontal">
      <Box direction="row" align="center">
        <Button onClick={() => onMetricClick(indicator.key)}>
          <Heading level={6} margin={{ vertical: '2px' }}>
            <FormattedMessage {...rootMessages.indicators[indicator.key]} />
          </Heading>
        </Button>
        <Button onClick={() => onMetricClick(indicator.key, 0)}>
          <Text size="xsmall" margin={{ horizontal: 'xsmall' }}>
            <FormattedMessage {...rootMessages.tabs.trend} />
          </Text>
        </Button>
        <Button onClick={() => onMetricClick(indicator.key, 1)}>
          <Text size="xsmall" margin={{ horizontal: 'xsmall' }}>
            <FormattedMessage {...rootMessages.tabs.about} />
          </Text>
        </Button>
      </Box>
      <BarHorizontal
        level={3}
        color="esr"
        value={value}
        minValue={0}
        maxValue={maxValue}
        data={indicator}
        unit="%"
        stripes={standard === 'hi'}
      />
      <IndicatorScoreText color="esrDark">
        {value && formatScore(value)}
      </IndicatorScoreText>
    </Box>
  );
}
IndicatorPanel.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  column: PropTypes.string,
  standard: PropTypes.string,
  onMetricClick: PropTypes.func,
};

export default IndicatorPanel;
