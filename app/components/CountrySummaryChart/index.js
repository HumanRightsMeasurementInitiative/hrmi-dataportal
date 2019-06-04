/**
 *
 * CountrySummaryChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';

import rootMessages from 'messages';
// import messages from './messages';
import { BENCHMARKS, COLUMNS } from 'containers/App/constants';
import ScaleToggle from 'containers/Settings/ScaleToggle';
import { getRightsScoresForDimension } from 'utils/scores';

import Source from 'components/Source';

import DimensionChart from './DimensionChart';
import RightsChart from './RightsChart';
import RightsScoreItem from './RightsScoreItem';
import DimensionTitle from './DimensionTitle';

const RightsType = styled(Box)`
  margin-bottom: 12px;
`;
const RightsScoresWrapperTable = styled.div`
  display: table;
`;
const RightsScoresWrapper = props => (
  <Box direction="column" {...props} width="200px" flex={{ shrink: 0 }} />
);
const ChartArea = props => (
  <Box direction="column" fill="horizontal" {...props} />
);

const RightsTypeHeading = props => (
  <Heading
    responsive={false}
    level={4}
    margin={{ vertical: 'none' }}
    {...props}
  />
);

function CountrySummaryChart({
  dimensions,
  benchmark,
  scale,
  rights,
  standard,
  esrYear,
  cprYear,
}) {
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  // figure out rights scores
  const empowerRights =
    scale === 'r' && getRightsScoresForDimension(rights, 'empowerment');
  const physintRights =
    scale === 'r' && getRightsScoresForDimension(rights, 'physint');
  const esrRights = scale === 'r' && getRightsScoresForDimension(rights, 'esr');

  return (
    <Box
      direction="column"
      pad={{ bottom: 'large' }}
      margin={{ bottom: 'large' }}
      border="bottom"
    >
      <Box direction="row">
        <ChartArea>
          <RightsType>
            <RightsTypeHeading>
              <FormattedMessage {...rootMessages['rights-types'].cpr} />
              {` (${cprYear})`}
            </RightsTypeHeading>
            {scale === 'd' && (
              <DimensionChart data={dimensions && dimensions.empowerment} />
            )}
            {scale === 'd' && (
              <DimensionChart data={dimensions && dimensions.physint} />
            )}
            {scale === 'r' && (
              <RightsChart
                data={{
                  rights: empowerRights,
                  type: 'cpr',
                  dimension: 'empowerment',
                }}
              />
            )}
            {scale === 'r' && (
              <RightsChart
                data={{
                  rights: physintRights,
                  type: 'cpr',
                  dimension: 'physint',
                }}
              />
            )}
          </RightsType>
          <RightsType>
            <RightsTypeHeading>
              <FormattedMessage {...rootMessages['rights-types'].esr} />
              {` (${esrYear})`}
            </RightsTypeHeading>
            {scale === 'd' && (
              <DimensionChart
                data={dimensions && dimensions.esr}
                benchmark={currentBenchmark}
                standard={standard}
              />
            )}
            {scale === 'r' && (
              <RightsChart
                data={{
                  rights: esrRights,
                  type: 'esr',
                  dimension: 'esr',
                }}
                benchmark={currentBenchmark}
                standard={standard}
              />
            )}
          </RightsType>
          <Box pad={{ top: 'none' }}>
            <ScaleToggle />
          </Box>
        </ChartArea>
        {scale === 'r' && (
          <RightsScoresWrapper>
            <RightsTypeHeading>&nbsp;</RightsTypeHeading>
            <DimensionTitle>&nbsp;</DimensionTitle>
            <RightsScoresWrapperTable>
              {empowerRights &&
                empowerRights.map(right => (
                  <RightsScoreItem
                    key={right.key}
                    dimensionKey="empowerment"
                    maxValue={10}
                    right={{
                      key: right.key,
                      value: right.score && right.score[COLUMNS.CPR.MEAN],
                    }}
                  />
                ))}
              {physintRights &&
                physintRights.map(right => (
                  <RightsScoreItem
                    key={right.key}
                    dimensionKey="physint"
                    maxValue={10}
                    right={{
                      key: right.key,
                      value: right.score && right.score[COLUMNS.CPR.MEAN],
                    }}
                  />
                ))}
              {esrRights &&
                esrRights.map(right => (
                  <RightsScoreItem
                    key={right.key}
                    dimensionKey="esr"
                    maxValue={100}
                    right={{
                      key: right.key,
                      value:
                        right.score && right.score[currentBenchmark.column],
                    }}
                  />
                ))}
            </RightsScoresWrapperTable>
          </RightsScoresWrapper>
        )}
      </Box>
      <Source />
    </Box>
  );
}

CountrySummaryChart.propTypes = {
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  esrYear: PropTypes.number,
  cprYear: PropTypes.number,
};

export default CountrySummaryChart;
