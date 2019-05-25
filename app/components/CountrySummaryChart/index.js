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
import { getRightsScoresForDimension } from 'utils/scores';

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
const Styled = props => <Box direction="row" {...props} />;
const ChartArea = props => (
  <Box
    direction="column"
    fill="horizontal"
    margin={{ bottom: '80px' }}
    {...props}
  />
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
    <Styled>
      <ChartArea>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].cpr} />
          </RightsTypeHeading>
          {scale === 'd' && (
            <DimensionChart
              dimensionKey="empowerment"
              data={dimensions && dimensions.empowerment}
              maxValue={10}
              column={COLUMNS.CPR.MEAN}
            />
          )}
          {scale === 'd' && (
            <DimensionChart
              dimensionKey="physint"
              data={dimensions && dimensions.physint}
              maxValue={10}
              column={COLUMNS.CPR.MEAN}
            />
          )}
          {scale === 'r' && (
            <RightsChart
              dimensionKey="empowerment"
              data={empowerRights}
              maxValue={10}
              column={COLUMNS.CPR.MEAN}
            />
          )}
          {scale === 'r' && (
            <RightsChart
              dimensionKey="physint"
              data={physintRights}
              maxValue={10}
              column={COLUMNS.CPR.MEAN}
            />
          )}
        </RightsType>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].esr} />
          </RightsTypeHeading>
          {scale === 'd' && (
            <DimensionChart
              dimensionKey="esr"
              data={dimensions && dimensions.esr}
              maxValue={100}
              unit="%"
              column={currentBenchmark.column}
              standard={standard}
              refColumns={
                // prettier-ignore
                currentBenchmark.key === 'adjusted'
                  ? [{ value: 100, style: 'dotted', key: 'adjusted' }]
                  : [
                    { value: 100, style: 'solid', key: 'adjusted' },
                    { column: currentBenchmark.refColumn, style: 'dotted', key: 'best' },
                  ]
              }
            />
          )}
          {scale === 'r' && (
            <RightsChart
              dimensionKey="esr"
              data={esrRights}
              maxValue={100}
              column={currentBenchmark.column}
              standard={standard}
              refColumns={
                // prettier-ignore
                currentBenchmark.key === 'adjusted'
                  ? [{ value: 100, style: 'dotted', key: 'adjusted' }]
                  : [
                    { value: 100, style: 'solid', key: 'adjusted' },
                    { column: currentBenchmark.refColumn, style: 'dotted', key: 'best' },
                  ]
              }
            />
          )}
        </RightsType>
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
                    value: right.score && right.score[currentBenchmark.column],
                  }}
                />
              ))}
          </RightsScoresWrapperTable>
        </RightsScoresWrapper>
      )}
    </Styled>
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
