/**
 *
 * ChartCountrySnapshot
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text, ResponsiveContext } from 'grommet';

import { COLUMNS } from 'containers/App/constants';

import ChartBars from 'components/ChartBars';

import formatScoreMax from 'utils/format-score-max';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
// import messages from './messages';

const Dimension = styled(Box)`
  margin-bottom: 6px;
  position: relative;
`;

const DimensionScore = styled.div`
  position: absolute;
  right: 100px;
  top: 0;
  padding: 5px 10px;
  min-width: 85px;
  text-align: center;
  background-color: ${({ hasScore, color, theme }) =>
    hasScore ? theme.global.colors[color] : 'transparent'};
  border: 1px solid;
  border-color: ${({ hasScore, color, theme }) =>
    !hasScore ? theme.global.colors[color] : 'transparent'};
  border-radius: 99999px;
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
    level={3}
    margin={{ vertical: 'none' }}
    {...props}
  />
);

const getESRDimensionValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};
const getCPRDimensionValue = score =>
  score && parseFloat(score[COLUMNS.CPR.MEAN]);

const getDimensionRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};

const getMetricLabel = (score, intl) =>
  intl.formatMessage(rootMessages['rights-xshort'][score.key]);

const prepareData = ({
  scores,
  dimensionCode,
  currentBenchmark,
  standard,
  onClick,
  intl,
}) =>
  // prettier-ignore
  scores.map(s =>
    dimensionCode === 'esr'
      ? {
        color: dimensionCode,
        refValues: getDimensionRefs(s.score, currentBenchmark),
        value: getESRDimensionValue(s.score, currentBenchmark),
        maxValue: 100,
        unit: '%',
        stripes: standard === 'hi',
        key: s.key,
        label: getMetricLabel(s, intl),
        onClick: () => onClick(s.key),
      }
      : {
        color: dimensionCode,
        value: getCPRDimensionValue(s.score),
        maxValue: 10,
        unit: '',
        key: s.key,
        label: getMetricLabel(s, intl),
        onClick: () => onClick(s.key),
      }
  );

function ChartCountrySnapshot({
  type,
  dimensionCode,
  dimensionScore,
  currentBenchmark,
  rights,
  standard,
  year,
  maxValue,
  onMetricClick,
  intl,
}) {
  // const currentStandard = STANDARDS.find(s => s.key === standard);

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
                <DimensionHeading color={dimensionCode}>
                  <FormattedMessage
                    {...rootMessages.dimensions[dimensionCode]}
                  />
                </DimensionHeading>
                <DimensionScore
                  hasScore={!!dimensionScore}
                  color={dimensionCode}
                >
                  <Text
                    weight="bold"
                    size={isMinSize(size, 'medium') ? 'large' : 'medium'}
                    color={dimensionScore ? 'white' : dimensionCode}
                  >
                    {dimensionScore && formatScoreMax(dimensionScore, maxValue)}
                    {!dimensionScore && 'N/A'}
                  </Text>
                </DimensionScore>
                <Text>
                  <FormattedMessage {...rootMessages['rights-types'][type]} />
                  {` (${year})`}
                </Text>
                <ChartBars
                  data={prepareData({
                    scores: rights,
                    dimensionCode,
                    currentBenchmark,
                    standard,
                    onClick: onMetricClick,
                    intl,
                  })}
                  currentBenchmark={type === 'esr' && currentBenchmark}
                  standard={type === 'esr' && standard}
                  commonLabel={`${intl.formatMessage(
                    rootMessages['rights-xshort-common'][dimensionCode],
                  )}`}
                  labelColor={`${dimensionCode}Dark`}
                  padVertical="small"
                />
              </Dimension>
            </ChartArea>
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartCountrySnapshot.propTypes = {
  intl: intlShape.isRequired,
  rights: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dimensionScore: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  currentBenchmark: PropTypes.object,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  year: PropTypes.number,
  maxValue: PropTypes.number,
  type: PropTypes.string,
  dimensionCode: PropTypes.string,
  onMetricClick: PropTypes.func,
};

export default injectIntl(ChartCountrySnapshot);
