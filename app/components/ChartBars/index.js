import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import { intlShape, injectIntl } from 'react-intl';
// import { COLUMNS } from 'containers/App/constants';

// import AnnotateBetter from 'components/AnnotateBetterWorse';
import { formatScoreMax } from 'utils/scores';

import BarWrapper from './BarWrapper';
import Grades from './Grades';
import ListHeader from './ListHeader';

import { chartLabelWidth, scoreAsideWidth } from './chart-utils';

const Styled = styled(Box)`
  margin: 0 auto;
  position: relative;
`;
const WrapInnerChart = styled(Box)`
  position: relative;
`;
const SummaryWrap = styled(Box)`
  position: absolute;
  left: 0;
  top: -10px;
  bottom: -3px;
  right: 0;
  pointer-events: none;
`;
const DimensionScoreWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  border-left: 1px solid black;
  left: ${({ score }) => {
    if (score) {
      if (score.maxValue === 100) {
        return score.score;
      }
      return (score.score / score.maxValue) * 100;
    }
    return 0;
  }}%;
`;
const DimensionScore = styled.div`
  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
  padding: 0px 8px;
  text-align: center;
  background-color: ${({ color, theme }) => theme.global.colors[color]};
  border-radius: 99999px;
`;

const getScoreAsideWidth = (size, hasAside = false) => {
  if (hasAside) {
    return scoreAsideWidth(size);
  }
  return 0;
};

function ChartBars({
  data,
  listHeader,
  metric,
  currentBenchmark,
  bullet,
  allowWordBreak,
  commonLabel,
  labelColor,
  padVertical,
  grades,
  gradeLabels,
  level = 2,
  annotateBetter = true,
  scoreOnHover,
  scoresAside,
  summaryScore,
  isStatic,
  intl,
  benchmarkIconOnly,
  hasLabelsSmall = true,
  annotateBenchmark = true,
  annotateMinMax = true,
  labelsMinimal = false,
}) {
  if (!data) return null;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          pad={{
            top: 'ms',
            bottom: padVertical || 'medium',
          }}
          direction="column"
          fill="horizontal"
        >
          {(commonLabel || listHeader) && (
            <ListHeader
              metric={metric}
              benchmark={currentBenchmark && currentBenchmark.key}
              commonLabel={commonLabel}
              labelColor={labelColor}
              annotateBetter={!grades && annotateBetter}
              hasAside={scoresAside}
              benchmarkIconOnly={benchmarkIconOnly}
              hasLabelsSmall={hasLabelsSmall}
              labelsMinimal={labelsMinimal}
              annotateBenchmark={annotateBenchmark}
              annotateMinMax={annotateMinMax}
            />
          )}
          <WrapInnerChart>
            {grades && (
              <Grades
                grades={grades}
                labels={gradeLabels}
                hasAside={scoresAside}
                hasLabelsSmall={hasLabelsSmall}
                labelsMinimal={labelsMinimal}
                offset={size === 'small' && metric && metric.type === 'esr'}
              />
            )}
            {data.map(d => (
              <BarWrapper
                key={d.key}
                score={d}
                bullet={bullet}
                allowWordBreak={allowWordBreak}
                labelColor={labelColor}
                hasBackground={!grades}
                level={level}
                scoreOnHover={scoreOnHover}
                scoresAside={scoresAside}
                summaryScore={summaryScore}
                isStatic={isStatic}
                hasLabelsSmall={hasLabelsSmall}
                labelsMinimal={labelsMinimal}
              />
            ))}
            {summaryScore && (
              <SummaryWrap direction="row">
                <Box
                  width={chartLabelWidth(size, false, labelsMinimal)}
                  flex={{ shrink: 0 }}
                />
                <Box
                  flex
                  direction="row"
                  style={{ position: 'relative' }}
                  align="center"
                >
                  <DimensionScoreWrapper score={summaryScore}>
                    <DimensionScore color={labelColor}>
                      <Text weight={600} size="small" color="white">
                        {formatScoreMax(
                          summaryScore.score,
                          summaryScore.maxValue,
                          1,
                          false,
                          intl,
                        )}
                      </Text>
                    </DimensionScore>
                  </DimensionScoreWrapper>
                </Box>
                {scoresAside && (
                  <Box
                    width={getScoreAsideWidth(size, true)}
                    flex={{ shrink: 0 }}
                  />
                )}
              </SummaryWrap>
            )}
          </WrapInnerChart>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// standard={standard}
// currentBenchmark={currentBenchmark}

ChartBars.propTypes = {
  allowWordBreak: PropTypes.bool,
  annotateBetter: PropTypes.bool,
  scoreOnHover: PropTypes.bool,
  scoresAside: PropTypes.bool,
  commonLabel: PropTypes.string,
  labelColor: PropTypes.string,
  padVertical: PropTypes.string,
  listHeader: PropTypes.bool,
  bullet: PropTypes.bool,
  metric: PropTypes.object,
  currentBenchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  grades: PropTypes.array,
  gradeLabels: PropTypes.bool,
  isStatic: PropTypes.bool,
  benchmarkIconOnly: PropTypes.bool,
  hasLabelsSmall: PropTypes.bool,
  annotateBenchmark: PropTypes.bool,
  annotateMinMax: PropTypes.bool,
  labelsMinimal: PropTypes.bool,
  level: PropTypes.number,
  summaryScore: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartBars);
