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
  const empower = dimensions && dimensions.empowerment.score;
  const physint = dimensions && dimensions.physint.score;
  const esr = dimensions && dimensions.esr.score;

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
          <Dimension
            dimensionKey="empowerment"
            scale={scale}
            value={empower && parseFloat(empower[COLUMNS.CPR.MEAN])}
            maxValue={10}
            rights={empowerRights}
            column={COLUMNS.CPR.MEAN}
          />
          <Dimension
            dimensionKey="physint"
            scale={scale}
            value={physint && parseFloat(physint[COLUMNS.CPR.MEAN])}
            maxValue={10}
            rights={physintRights}
            column={COLUMNS.CPR.MEAN}
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
            rights={esrRights}
            unit="%"
            column={currentBenchmark.column}
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
};

export default CountrySummaryChart;
