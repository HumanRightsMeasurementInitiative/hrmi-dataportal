/**
 *
 * ChartCountrySnapshot
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';
import formatScoreMax from 'utils/format-score-max';

import rootMessages from 'messages';
// import messages from './messages';

import ChartBars from 'components/ChartBars';
import { COLUMNS } from 'containers/App/constants';

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

const getMetricLabel = score => score.key;
// const country = countries.find(c => c.country_code === score.country_code);
// let label = '';
// if (rootMessages.countries[country.country_code]) {
//   label = intl.formatMessage(rootMessages.countries[country.country_code]);
// } else {
//   label = country.country_code;
// }
// if (
//   metric &&
//   (metric.type === 'esr' || metric.metricType === 'indicators') &&
//   country &&
//   country.high_income_country === '1'
// ) {
//   label = `${label} (${intl.formatMessage(rootMessages.labels.hiCountry)})`;
// }
// return label;
// };

// prettier-ignore
const prepareData = ({ scores, dimensionCode, currentBenchmark, standard }) =>
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
        label: getMetricLabel(s),
      }
      : {
        color: dimensionCode,
        value: getCPRDimensionValue(s.score),
        maxValue: 10,
        unit: '',
        key: s.key,
        label: getMetricLabel(s),
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
}) {
  // const currentStandard = STANDARDS.find(s => s.key === standard);

  // <ResponsiveContext.Consumer>
  // {size => (
  return (
    <Box
      direction="column"
      pad={{ bottom: 'small' }}
      margin={{ bottom: 'small' }}
    >
      <Box direction="row">
        <ChartArea>
          <Dimension>
            <DimensionHeading>
              <FormattedMessage {...rootMessages.dimensions[dimensionCode]} />
              {` (${formatScoreMax(dimensionScore, maxValue)})`}
            </DimensionHeading>
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
              })}
              currentBenchmark={type === 'esr' && currentBenchmark}
              standard={type === 'esr' && standard}
            />
          </Dimension>
        </ChartArea>
      </Box>
    </Box>
  );
}
// )}
// </ResponsiveContext.Consumer>

ChartCountrySnapshot.propTypes = {
  rights: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dimensionScore: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  currentBenchmark: PropTypes.object,
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  year: PropTypes.number,
  maxValue: PropTypes.number,
  type: PropTypes.string,
  dimensionCode: PropTypes.string,
};

export default ChartCountrySnapshot;
