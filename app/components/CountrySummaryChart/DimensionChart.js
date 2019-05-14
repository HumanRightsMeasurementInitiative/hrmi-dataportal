import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';

import rootMessages from 'messages';

import BarHorizontal from 'components/BarHorizontal';

import formatScoreMax from 'utils/format-score-max';

const DimensionScoreWrapper = props => <Box {...props} width="200px" />;
const DimensionScoreText = props => <Text weight="bold" {...props} />;

const BarWrap = props => <Box direction="row" {...props} align="center" />;

const DimensionHeading = props => (
  <Heading level={5} margin={{ vertical: '5px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;

function DimensionChart({ dimensionKey, column, data, maxValue, unit = '' }) {
  const value =
    data && data.score && data.score[column] && parseFloat(data.score[column]);
  return (
    <Box>
      <StyledDimensionHeading>
        <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
      </StyledDimensionHeading>
      <BarWrap>
        <BarHorizontal
          color={dimensionKey}
          data={data}
          value={value}
          minValue={0}
          maxValue={maxValue}
          unit={unit}
        />
        <DimensionScoreWrapper>
          <DimensionScoreText color={`${dimensionKey}Dark`}>
            {value && formatScoreMax(value, maxValue)}
            {!value && 'N/A'}
          </DimensionScoreText>
        </DimensionScoreWrapper>
      </BarWrap>
    </Box>
  );
}

DimensionChart.propTypes = {
  dimensionKey: PropTypes.string,
  column: PropTypes.string,
  scale: PropTypes.string,
  unit: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  maxValue: PropTypes.number,
};

export default DimensionChart;
