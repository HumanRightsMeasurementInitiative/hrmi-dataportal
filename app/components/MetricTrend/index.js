/**
 *
 * MetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  LineMarkSeries,
  AreaSeries,
  HorizontalGridLines,
  Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';
import formatScore from 'utils/format-score';

import Source from 'components/Source';

import {
  INDICATOR_LOOKBACK,
  STANDARDS,
  BENCHMARKS,
} from 'containers/App/constants';

import SettingsToggle from 'containers/Settings/SettingsToggle';

import WrapPlot from 'styled/WrapPlot';

const PlotHint = styled.div`
  color: ${({ color }) => color};
  background: ${({ theme }) => theme.global.colors.white};
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.global.edgeSize.xxsmall};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  font-weight: 700;
`;

function MetricTrend({
  scores,
  column,
  maxYear,
  minYear,
  maxValue,
  percentage,
  rangeColumns,
  color,
  colorHint,
  benchmark,
  standard,
  hasBenchmarkOption,
  hasStandardOption,
  onSetBenchmark,
  onSetStandard,
}) {
  const [highlight, setHighlight] = useState(false);
  if (!maxYear) return null;

  // dummy data to force the area plot from 0
  const dataForceYRange = [
    { x: new Date(`${parseInt(minYear, 10) - 0.4}`).getTime(), y: 0 },
    { x: new Date(`${parseInt(maxYear, 10) + 0.8}`).getTime(), y: maxValue },
  ];
  const rangeUpper = [];
  const rangeLower = [];
  const xyData = [];
  const tickValuesX = [];
  const tickValuesY = percentage
    ? [0, 20, 40, 60, 80, 100]
    : [0, 2, 4, 6, 8, 10];

  const hasScores = scores && scores.length > 0;
  if (hasScores) {
    const scoresSorted = scores.sort((a, b) =>
      parseInt(a.year, 10) > parseInt(b.year, 10) ? 1 : -1,
    );

    /* eslint-disable no-plusplus */
    for (let y = parseInt(minYear, 10); y <= parseInt(maxYear, 10); y++) {
      const score = scoresSorted.reduce((memo, s) => {
        const scoreYear = parseInt(s.year, 10);
        if (scoreYear === y) return s;
        if (scoreYear < y && scoreYear >= y - INDICATOR_LOOKBACK) return s;
        return memo;
      }, null);
      if (score) {
        xyData.push({
          syear: y,
          x: new Date(`${y}`).getTime(),
          y: parseFloat(score[column]),
        });
        if (rangeColumns) {
          rangeUpper.push({
            syear: y,
            x: new Date(`${y}`).getTime(),
            y: parseFloat(score[rangeColumns.upper]),
          });
        }
        rangeLower.push({
          syear: y,
          x: new Date(`${y}`).getTime(),
          y: parseFloat(score[rangeColumns.lower]),
        });
      }
    }
  }
  for (let y = parseInt(minYear, 10); y <= parseInt(maxYear, 10); y++) {
    tickValuesX.push(new Date(`${y}`).getTime());
  }

  /* eslint-ensable no-plusplus */
  return (
    <Box direction="column" pad="medium">
      <WrapPlot>
        <FlexibleWidthXYPlot
          height={400}
          xType="time"
          margin={{ bottom: 30, right: 0 }}
          onMouseLeave={() => {
            setHighlight(false);
          }}
        >
          <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
          {hasScores && rangeColumns && (
            <AreaSeries
              data={rangeUpper}
              style={{ fill: color, stroke: 'transparent', opacity: 0.2 }}
            />
          )}
          {hasScores && rangeColumns && (
            <AreaSeries
              data={rangeLower}
              style={{
                fill: 'white',
                stroke: 'white',
                opacity: 1,
                strokeWidth: 1,
              }}
            />
          )}
          <HorizontalGridLines tickValues={tickValuesY} />
          <XAxis
            tickFormat={timeFormat('%Y')}
            style={{
              ticks: { strokeWidth: 1 },
            }}
            tickValues={tickValuesX}
            tickPadding={2}
          />
          <YAxis
            tickFormat={value => (percentage ? `${value}%` : value)}
            style={{
              ticks: { strokeWidth: 1 },
            }}
            tickSize={3}
            tickValues={tickValuesY}
            tickPadding={2}
          />
          {hasScores && rangeColumns && (
            <LineSeries
              data={rangeUpper}
              style={{ stroke: color, opacity: 0.5, strokeWidth: 1 }}
            />
          )}
          {hasScores && rangeColumns && (
            <LineSeries
              data={rangeLower}
              style={{ stroke: color, opacity: 0.5, strokeWidth: 1 }}
            />
          )}
          {hasScores && (
            <LineMarkSeries
              size={3}
              style={{
                stroke: color,
                strokeWidth: 2,
              }}
              markStyle={{
                fill: color,
              }}
              data={xyData}
              onNearestX={(point, { index }) => setHighlight({ point, index })}
            />
          )}
          {highlight && highlight.point && (
            <Hint
              value={highlight.point}
              align={{ vertical: 'top', horizontal: 'left' }}
              style={{
                transform: 'translateX(50%)',
              }}
            >
              <PlotHint color={colorHint}>
                {`${formatScore(highlight.point.y)}${percentage ? '%' : ''}`}
              </PlotHint>
            </Hint>
          )}
        </FlexibleWidthXYPlot>
      </WrapPlot>
      {(hasBenchmarkOption || hasStandardOption) && (
        <Box direction="row" pad={{ horizontal: 'medium' }}>
          {hasBenchmarkOption && (
            <SettingsToggle
              setting="benchmark"
              active={benchmark}
              onActivate={onSetBenchmark}
              options={BENCHMARKS}
            />
          )}
          {hasStandardOption && (
            <SettingsToggle
              setting="standard"
              active={standard}
              onActivate={onSetStandard}
              options={STANDARDS}
            />
          )}
        </Box>
      )}
      <Source />
    </Box>
  );
}

MetricTrend.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rangeColumns: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  column: PropTypes.string,
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  color: PropTypes.string,
  colorHint: PropTypes.string,
  maxValue: PropTypes.number,
  percentage: PropTypes.bool,
  benchmark: PropTypes.string,
  standard: PropTypes.string,
  hasBenchmarkOption: PropTypes.bool,
  hasStandardOption: PropTypes.bool,
  onSetBenchmark: PropTypes.func,
  onSetStandard: PropTypes.func,
};

export default MetricTrend;
