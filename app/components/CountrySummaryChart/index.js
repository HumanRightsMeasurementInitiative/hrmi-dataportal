/**
 *
 * CountrySummaryChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Box, Text } from 'grommet';

import { FormattedMessage } from 'react-intl';
import rootMessages from 'messages';
// import messages from './messages';
import BarHorizontal from 'components/BarHorizontal';
import { BENCHMARKS, RIGHTS } from 'containers/App/constants';
import roundScore from 'utils/round-score';

const RightsType = styled(Box)``;
const Dimension = styled(Box)``;
const RightsScores = props => (
  <Box direction="column" {...props} width="200px" />
);
const RightScore = styled.div``;
const DimensionScore = props => <Box {...props} width="200px" />;
const BarWrap = props => <Box direction="row" {...props} align="center" />;
const Wrapper = props => <Box direction="row" {...props} justify="end" />;
const ChartArea = props => (
  <Box direction="column" {...props} fill="horizontal" />
);

const RightsTypeHeading = props => (
  <Heading level={4} margin={{ vertical: '5px' }} {...props} />
);
const DimensionHeading = props => (
  <Heading level={5} margin={{ vertical: '5px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;

const formatCPRScore = value => `${roundScore(value)}/10`;
const formatESRScore = value => `${roundScore(value)}%`;

function CountrySummaryChart({ dimensions, benchmark, scale, rights }) {
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  // figure out dimension scores
  const empower =
    scale === 'd' &&
    dimensions &&
    dimensions.cpr.find(s => s.metric_code === 'empower');
  const physint =
    scale === 'd' &&
    dimensions &&
    dimensions.cpr.find(s => s.metric_code === 'physint');
  const esr =
    scale === 'd' &&
    dimensions &&
    dimensions.esr.find(s => s.metric_code === 'SER_Average');

  // figure out rights scores
  const physintValues =
    scale === 'r' &&
    rights &&
    rights.cpr &&
    RIGHTS.filter(
      r => r.dimension === 'physint' && typeof r.aggregate === 'undefined',
    ).map(r => {
      const score = rights.cpr.find(s => s.metric_code === r.code);
      return {
        key: r.key,
        value: score ? roundScore(score.mean) : false,
      };
    });

  const empowerValues =
    scale === 'r' &&
    rights &&
    rights.cpr &&
    RIGHTS.filter(
      r => r.dimension === 'empowerment' && typeof r.aggregate === 'undefined',
    ).map(r => {
      const score = rights.cpr.find(s => s.metric_code === r.code);
      return {
        key: r.key,
        value: score ? roundScore(score.mean) : false,
      };
    });

  const esrValues =
    scale === 'r' &&
    rights &&
    rights.esr &&
    RIGHTS.filter(
      r => r.dimension === 'esr' && typeof r.aggregate === 'undefined',
    ).map(r => {
      const score = rights.esr.find(s => s.metric_code === r.code);
      return {
        key: r.key,
        value: score ? roundScore(score[currentBenchmark.column]) : false,
      };
    });

  return (
    <Wrapper>
      <ChartArea>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].cpr} />
          </RightsTypeHeading>
          <Dimension>
            <StyledDimensionHeading>
              <FormattedMessage {...rootMessages.dimensions.empowerment} />
            </StyledDimensionHeading>
            <BarWrap>
              <BarHorizontal
                color="empowerment"
                value={empower && parseFloat(empower.mean)}
                minValue={0}
                maxValue={10}
                noData={
                  (scale === 'd' && !empower) ||
                  (scale === 'r' &&
                    empowerValues &&
                    !empowerValues.reduce(
                      (memo, v) => memo || !!v.value,
                      false,
                    ))
                }
                multiple={scale === 'r'}
                values={scale === 'r' && empowerValues}
              />
              {scale === 'd' && (
                <DimensionScore>
                  {empower && (
                    <Text weight="bold" color="empowermentDark">
                      {formatCPRScore(empower.mean)}
                    </Text>
                  )}
                  {!empower && <Text>N/A</Text>}
                </DimensionScore>
              )}
            </BarWrap>
          </Dimension>
          <Dimension>
            <StyledDimensionHeading>
              <FormattedMessage {...rootMessages.dimensions.physint} />
            </StyledDimensionHeading>
            <BarWrap>
              <BarHorizontal
                color="physint"
                value={physint && scale === 'd' && parseFloat(physint.mean)}
                minValue={0}
                maxValue={10}
                noData={
                  (scale === 'd' && !physint) ||
                  (scale === 'r' &&
                    physintValues &&
                    !physintValues.reduce(
                      (memo, v) => memo || !!v.value,
                      false,
                    ))
                }
                multiple={scale === 'r'}
                values={scale === 'r' && physintValues}
              />
              {scale === 'd' && (
                <DimensionScore>
                  {physint && (
                    <Text weight="bold" color="physintDark">
                      {formatCPRScore(physint.mean)}
                    </Text>
                  )}
                  {!physint && <Text>N/A</Text>}
                </DimensionScore>
              )}
            </BarWrap>
          </Dimension>
        </RightsType>
        <RightsType>
          <RightsTypeHeading>
            <FormattedMessage {...rootMessages['rights-types'].esr} />
          </RightsTypeHeading>
          <Dimension>
            <StyledDimensionHeading>
              <FormattedMessage {...rootMessages.dimensions.esr} />
            </StyledDimensionHeading>
            <BarWrap>
              <BarHorizontal
                color="esr"
                value={esr && parseFloat(esr[currentBenchmark.column])}
                minValue={0}
                maxValue={100}
                unit="%"
                noData={
                  (scale === 'd' && !esr) ||
                  (scale === 'r' &&
                    esrValues &&
                    !esrValues.reduce((memo, v) => memo || !!v.value, false))
                }
                multiple={scale === 'r'}
                values={scale === 'r' && esrValues}
              />
              {scale === 'd' && (
                <DimensionScore>
                  {esr && (
                    <Text weight="bold" color="esrDark">
                      {formatESRScore(esr[currentBenchmark.column])}
                    </Text>
                  )}
                  {!esr && <Text>N/A</Text>}
                </DimensionScore>
              )}
            </BarWrap>
          </Dimension>
        </RightsType>
      </ChartArea>
      {scale === 'r' && (
        <RightsScores>
          {empowerValues &&
            empowerValues.map(v => (
              <RightScore key={v.key}>
                {v.value && (
                  <Text weight="bold" color="empowermentDark" size="small">
                    {formatCPRScore(v.value)}
                  </Text>
                )}
                {!v.value && <Text>N/A</Text>}
              </RightScore>
            ))}
          {physintValues &&
            physintValues.map(v => (
              <RightScore key={v.key}>
                {v.value && (
                  <Text weight="bold" color="physintDark" size="small">
                    {formatCPRScore(v.value)}
                  </Text>
                )}
                {!v.value && <Text>N/A</Text>}
              </RightScore>
            ))}
          {esrValues &&
            esrValues.map(v => (
              <RightScore key={v.key}>
                {v.value && (
                  <Text weight="bold" color="esrDark" size="small">
                    {formatESRScore(v.value)}
                  </Text>
                )}
                {!v.value && <Text>N/A</Text>}
              </RightScore>
            ))}
        </RightsScores>
      )}
    </Wrapper>
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
