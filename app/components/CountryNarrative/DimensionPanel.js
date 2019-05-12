import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Text, Box, Heading } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';

import rootMessages from 'messages';

import { getDimensionScore } from 'utils/scores';
import formatScore from 'utils/format-score';

import { DIMENSIONS } from 'containers/App/constants';
const DimensionScoreText = props => (
  <Text weight="bold" {...props} alignSelf="end" margin={{ right: '52px' }} />
);

function DimensionPanel({ dimensions, dimensionKey, column }) {
  const score = getDimensionScore(dimensions, dimensionKey);
  const dimensionDetails = DIMENSIONS.find(d => d.key === dimensionKey);
  const value = score && score[column];
  return (
    <Box pad={{ vertical: 'xsmall', horizontal: 'small' }} fill="horizontal">
      <Heading level={5} margin={{ vertical: '2px' }}>
        <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
      </Heading>
      {value && (
        <BarHorizontal
          color={dimensionKey}
          value={parseFloat(value)}
          minValue={0}
          maxValue={dimensionDetails.type === 'esr' ? 100 : 10}
          noData={!value}
          unit={dimensionDetails.type === 'esr' ? '%' : ''}
        />
      )}
      <DimensionScoreText color={`${dimensionKey}Dark`}>
        {value && formatScore(value)}
        {!value && 'N/A'}
      </DimensionScoreText>
    </Box>
  );
}
DimensionPanel.propTypes = {
  dimensions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dimensionKey: PropTypes.string,
  column: PropTypes.string,
};

export default DimensionPanel;
