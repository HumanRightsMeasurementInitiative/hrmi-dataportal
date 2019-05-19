import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Text, Box, Heading } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';

import rootMessages from 'messages';

import formatScore from 'utils/format-score';

const DimensionScoreText = props => (
  <Text weight="bold" {...props} alignSelf="end" margin={{ right: '52px' }} />
);

function DimensionPanel({
  dimension,
  dimensionKey,
  column,
  columnLo,
  columnHi,
  standard,
}) {
  const { score, type } = dimension;
  const value = score && score[column] && parseFloat(score[column]);

  return (
    <Box pad={{ vertical: 'xsmall', horizontal: 'small' }} fill="horizontal">
      <Heading level={5} margin={{ vertical: '2px' }}>
        <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
      </Heading>
      {type === 'esr' && (
        <BarHorizontal
          color={dimensionKey}
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
          color={dimensionKey}
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
      <DimensionScoreText color={`${dimensionKey}Dark`}>
        {value && formatScore(value)}
      </DimensionScoreText>
    </Box>
  );
}
DimensionPanel.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  dimensionKey: PropTypes.string,
  column: PropTypes.string,
  columnLo: PropTypes.string,
  columnHi: PropTypes.string,
};

export default DimensionPanel;
