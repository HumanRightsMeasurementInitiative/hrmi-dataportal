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
import formatScoreMax from 'utils/format-score-max';

const RightsType = styled(Box)``;
const Dimension = styled(Box)``;
const DimensionScoreWrapper = props => <Box {...props} width="200px" />;
const DimensionScoreText = props => <Text weight="bold" {...props} />;
const RightsScoresWrapper = props => (
  <Box direction="column" {...props} width="200px" />
);
const RightsScoresWrapperTable = styled.div`
  display: table;
`;
const RightsScoresWrapperRow = styled.div`
  display: table-row;
  line-height: 12px;
`;
const RightsScoresWrapperCellScore = styled.div`
  width: 50px;
  display: table-cell;
  border-bottom: 1px solid;
`;
const RightsScoresWrapperCellLabel = styled.div`
  display: table-cell;
  border-bottom: 1px solid;
  padding-bottom: 4px;
`;
const RightScoreText = props => <Text weight="bold" size="small" {...props} />;
const RightLabelText = styled.span`
  font-size: 12px;
`;
const BarWrap = props => <Box direction="row" {...props} align="center" />;
const Wrapper = props => <Box direction="row" {...props} justify="end" />;
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
const DimensionHeading = props => (
  <Heading level={5} margin={{ vertical: '5px' }} {...props} />
);
const StyledDimensionHeading = styled(DimensionHeading)`
  font-weight: normal;
`;

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
        value: score ? score.mean : false,
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
        value: score ? score.mean : false,
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
        value: score ? score[currentBenchmark.column] : false,
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
                <DimensionScoreWrapper>
                  <DimensionScoreText color="empowermentDark">
                    {empower && formatScoreMax(empower.mean, 10)}
                    {!empower && 'N/A'}
                  </DimensionScoreText>
                </DimensionScoreWrapper>
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
                <DimensionScoreWrapper>
                  <DimensionScoreText color="physintDark">
                    {physint && formatScoreMax(physint.mean, 10)}
                    {!physint && 'N/A'}
                  </DimensionScoreText>
                </DimensionScoreWrapper>
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
                <DimensionScoreWrapper>
                  <DimensionScoreText color="esrDark">
                    {esr && formatScoreMax(esr[currentBenchmark.column])}
                    {!esr && 'N/A'}
                  </DimensionScoreText>
                </DimensionScoreWrapper>
              )}
            </BarWrap>
          </Dimension>
        </RightsType>
      </ChartArea>
      {scale === 'r' && (
        <RightsScoresWrapper>
          <RightsScoresWrapperTable>
            {empowerValues &&
              empowerValues.map(v => (
                <RightsScoresWrapperRow key={v.key}>
                  <RightsScoresWrapperCellScore>
                    <RightScoreText color="empowermentDark">
                      {v.value && formatScoreMax(v.value, 10)}
                      {!v.value && 'N/A'}
                    </RightScoreText>
                  </RightsScoresWrapperCellScore>
                  <RightsScoresWrapperCellLabel>
                    <RightLabelText color="empowermentDark">
                      <FormattedMessage
                        {...rootMessages['rights-short'][v.key]}
                      />
                    </RightLabelText>
                  </RightsScoresWrapperCellLabel>
                </RightsScoresWrapperRow>
              ))}
            {physintValues &&
              physintValues.map(v => (
                <RightsScoresWrapperRow key={v.key}>
                  <RightsScoresWrapperCellScore>
                    <RightScoreText color="physintDark">
                      {v.value && formatScoreMax(v.value, 10)}
                      {!v.value && 'N/A'}
                    </RightScoreText>
                  </RightsScoresWrapperCellScore>
                  <RightsScoresWrapperCellLabel>
                    <RightLabelText color="physintDark">
                      <FormattedMessage
                        {...rootMessages['rights-short'][v.key]}
                      />
                    </RightLabelText>
                  </RightsScoresWrapperCellLabel>
                </RightsScoresWrapperRow>
              ))}
            {esrValues &&
              esrValues.map(v => (
                <RightsScoresWrapperRow key={v.key}>
                  <RightsScoresWrapperCellScore>
                    <RightScoreText color="esrDark">
                      {v.value && formatScoreMax(v.value)}
                      {!v.value && 'N/A'}
                    </RightScoreText>
                  </RightsScoresWrapperCellScore>
                  <RightsScoresWrapperCellLabel>
                    <RightLabelText color="esrDark">
                      <FormattedMessage
                        {...rootMessages['rights-short'][v.key]}
                      />
                    </RightLabelText>
                  </RightsScoresWrapperCellLabel>
                </RightsScoresWrapperRow>
              ))}
          </RightsScoresWrapperTable>
        </RightsScoresWrapper>
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
