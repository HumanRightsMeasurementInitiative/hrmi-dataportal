import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import { injectIntl } from 'react-intl'; // not used now?

import BarWrapper from './BarWrapper';
import Grades from './Grades';
import ListHeader from './ListHeader';

const Styled = styled(Box)`
  margin: 0 auto;
  position: relative;
`;
const WrapInnerChart = styled(Box)`
  position: relative;
`;

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
  scoresAside = true,
  summaryScore,
  isStatic,
  benchmarkIconOnly,
  annotateBenchmark = true,
  annotateMinMax = true,
}) {
  if (!data) return null;
  return (
    <ResponsiveContext.Consumer>
      {() => (
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
                scoreOnHover={!scoresAside || scoreOnHover}
                scoresAside={scoresAside}
                summaryScore={summaryScore}
                isStatic={isStatic}
              />
            ))}
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
  annotateBenchmark: PropTypes.bool,
  annotateMinMax: PropTypes.bool,
  level: PropTypes.number,
  summaryScore: PropTypes.object,
};

export default injectIntl(ChartBars);
