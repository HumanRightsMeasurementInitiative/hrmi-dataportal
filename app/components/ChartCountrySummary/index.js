/**
 *
 * ChartCountrySummary
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, ResponsiveContext, Text } from 'grommet';
import { isMinSize } from 'utils/responsive';
import formatScoreMax from 'utils/format-score-max';

import rootMessages from 'messages';
// import messages from './messages';

import RightsChart from './RightsChart';

const Dimension = styled(Box)`
  margin-bottom: 6px;
`;
const ChartArea = props => (
  <Box direction="column" fill="horizontal" {...props} />
);

// prettier-ignore
const StyledDimensionHeading = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
`;
const DimensionHeading = props => (
  <StyledDimensionHeading
    responsive={false}
    level={4}
    margin={{ vertical: 'none' }}
    {...props}
  />
);

function ChartCountrySummary({
  type,
  dimensionCode,
  dimensionScore,
  currentBenchmark,
  rights,
  standard,
  year,
  maxValue,
}) {
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  // const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          direction="column"
          pad={{ bottom: 'small' }}
          margin={{ bottom: 'small' }}
        >
          <Box direction="row">
            <ChartArea>
              <Dimension>
                <DimensionHeading>
                  <FormattedMessage
                    {...rootMessages.dimensions[dimensionCode]}
                  />
                  {` (${formatScoreMax(dimensionScore, maxValue)})`}
                </DimensionHeading>
                <Text>
                  <FormattedMessage {...rootMessages['rights-types'][type]} />
                  {` (${year})`}
                </Text>
                <RightsChart
                  data={{
                    rights,
                    type,
                    dimension: dimensionCode,
                  }}
                  benchmark={type === 'esr' && currentBenchmark}
                  standard={type === 'esr' && standard}
                  scoreWidth={isMinSize(size, 'medium') ? '200px' : '50px'}
                />
              </Dimension>
            </ChartArea>
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartCountrySummary.propTypes = {
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensionScore: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentBenchmark: PropTypes.object,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  year: PropTypes.number,
  maxValue: PropTypes.number,
  type: PropTypes.string,
  dimensionCode: PropTypes.string,
};

export default ChartCountrySummary;
