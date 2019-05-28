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

const RightsType = styled(Box)``;
const RightsScoresWrapperTable = styled.div`
  display: table;
`;
const RightsScoresWrapper = props => (
  <Box direction="column" {...props} width="200px" />
);
const ChartArea = props => (
  <Box direction="column" fill="horizontal" {...props} />
);

const RightsTypeHeading = props => (
  <Heading level={4} margin={{ vertical: '5px' }} {...props} />
);

function CountrySummaryChart({
  dimensions,
  benchmark,
  scale,
  rights,
  standard,
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
    <Box direction="column" pad={{ bottom: 'large' }} border="bottom">
      <Box direction="row">
        <ChartArea>
          <RightsType>
            <RightsTypeHeading>
              <FormattedMessage {...rootMessages['rights-types'].cpr} />
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
          <Box pad={{ top: 'medium' }}>
            <ScaleToggle />
          </Box>
        </ChartArea>
        {scale === 'r' && (
          <RightsScoresWrapper>
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
};

export default CountrySummaryChart;
