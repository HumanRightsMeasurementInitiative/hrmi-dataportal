import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Text, Box, Heading, Button } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';

import rootMessages from 'messages';

import formatScore from 'utils/format-score';

const DimensionScoreText = props => (
  <Text weight="bold" {...props} alignSelf="end" margin={{ right: '52px' }} />
);

function DimensionPanel({
  dimension,
  column,
  columnLo,
  columnHi,
  standard,
  onMetricClick,
}) {
  const { score, type, key } = dimension;
  const value = score && score[column] && parseFloat(score[column]);

  return (
    <Box pad={{ vertical: 'xsmall', horizontal: 'small' }} fill="horizontal">
      <Box direction="row">
        <Button onClick={() => onMetricClick(key)}>
          <Heading level={5} margin={{ vertical: '2px' }}>
            <FormattedMessage {...rootMessages.dimensions[key]} />
          </Heading>
        </Button>
        <Button onClick={() => onMetricClick(key)}>
          <Text size="small" margin={{ horizontal: 'small' }}>
            <FormattedMessage {...rootMessages.tabs['people-at-risk']} />
          </Text>
        </Button>
      </Box>
      {type === 'esr' && (
        <BarHorizontal
          color={key}
          value={value}
          minValue={0}
          maxValue={100}
          data={dimension}
          unit="%"
          stripes={standard === 'hi'}
        />
      )}
      {type === 'cpr' && (
        <BarBulletHorizontal
          color={key}
          value={value}
          band={{
            lo: score && parseFloat(score[columnLo]),
            hi: score && parseFloat(score[columnHi]),
          }}
          minValue={0}
          maxValue={10}
          noData={!value}
        />
      )}
      <DimensionScoreText color={`${key}Dark`}>
        {value && formatScore(value)}
      </DimensionScoreText>
    </Box>
  );
}
DimensionPanel.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  column: PropTypes.string,
  columnLo: PropTypes.string,
  columnHi: PropTypes.string,
  onMetricClick: PropTypes.func,
};

export default DimensionPanel;
