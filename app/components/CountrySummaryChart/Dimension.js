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

function Dimension({
  dimensionKey,
  scale,
  column,
  value,
  maxValue,
  rights,
  unit = '',
}) {
  return (
    <Box>
      <StyledDimensionHeading>
        <FormattedMessage {...rootMessages.dimensions[dimensionKey]} />
      </StyledDimensionHeading>
      <BarWrap>
        <BarHorizontal
          color={dimensionKey}
          value={value}
          minValue={0}
          maxValue={maxValue}
          noData={
            (scale === 'd' && !value) ||
            (scale === 'r' &&
              rights &&
              !rights.reduce((memo, r) => memo || !!r.score, false))
          }
          unit={unit}
          multiple={scale === 'r'}
          values={
            scale === 'r' &&
            rights &&
            rights.map(r => ({
              key: r.key,
              value: r.score ? r.score[column] : false,
            }))
          }
        />
        {scale === 'd' && (
          <DimensionScoreWrapper>
            <DimensionScoreText color={`${dimensionKey}Dark`}>
              {value && formatScoreMax(value, maxValue)}
              {!value && 'N/A'}
            </DimensionScoreText>
          </DimensionScoreWrapper>
        )}
      </BarWrap>
    </Box>
  );
}

Dimension.propTypes = {
  dimensionKey: PropTypes.string,
  column: PropTypes.string,
  scale: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  maxValue: PropTypes.number,
  rights: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default Dimension;
