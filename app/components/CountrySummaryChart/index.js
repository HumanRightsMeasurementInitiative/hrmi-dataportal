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
import { BENCHMARKS } from 'containers/App/constants';
import { getDimensionScore, getRightsScoresForDimension } from 'utils/scores';

import Dimension from './Dimension';
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
    {...props}
    fill="horizontal"
    margin={{ bottom: '80px' }}
  />
);

const RightsTypeHeading = props => (
  <Heading level={4} margin={{ vertical: '5px' }} {...props} />
);

function CountrySummaryChart({ dimensions, benchmark, scale, rights }) {
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  // figure out dimension scores
  const empower =
    scale === 'd' &&
    dimensions &&
    getDimensionScore(dimensions.cpr, 'empowerment');
  const physint =
    scale === 'd' && dimensions && getDimensionScore(dimensions.cpr, 'physint');
  const esr =
    scale === 'd' && dimensions && getDimensionScore(dimensions.esr, 'esr');

  // figure out rights scores
  const empowerRights =
    scale === 'r' &&
    rights &&
    getRightsScoresForDimension(rights.cpr, 'empowerment', 'mean');
  const physintRights =
    scale === 'r' &&
    rights &&
    getRightsScoresForDimension(rights.cpr, 'physint', 'mean');
  const esrRights =
    scale === 'r' &&
    rights &&
    currentBenchmark &&
    getRightsScoresForDimension(rights.esr, 'esr', currentBenchmark.column);

  return (
    <Styled>
      <ChartArea>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].cpr} />
          </RightsTypeHeading>
          <Dimension
            dimensionKey="empowerment"
            scale={scale}
            value={empower && parseFloat(empower.mean)}
            maxValue={10}
            values={empowerRights}
          />
          <Dimension
            dimensionKey="physint"
            scale={scale}
            value={physint && parseFloat(physint.mean)}
            maxValue={10}
            values={physintRights}
          />
        </RightsType>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].esr} />
          </RightsTypeHeading>
          <Dimension
            dimensionKey="esr"
            scale={scale}
            value={esr && parseFloat(esr[currentBenchmark.column])}
            maxValue={100}
            values={esrRights}
            unit="%"
          />
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
                  right={right}
                />
              ))}
            {physintRights &&
              physintRights.map(right => (
                <RightsScoreItem
                  key={right.key}
                  dimensionKey="physint"
                  maxValue={10}
                  right={right}
                />
              ))}
            {esrRights &&
              esrRights.map(right => (
                <RightsScoreItem
                  key={right.key}
                  dimensionKey="esr"
                  maxValue={100}
                  right={right}
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
};

export default CountrySummaryChart;
