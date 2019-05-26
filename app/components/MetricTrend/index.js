/**
 *
 * MetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box } from 'grommet';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  LineMarkSeries,
  AreaSeries,
  HorizontalGridLines,
  // Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';

import {
  INDICATOR_LOOKBACK,
  STANDARDS,
  BENCHMARKS,
} from 'containers/App/constants';

import SettingsToggle from 'containers/Settings/SettingsToggle';

import WrapPlot from 'styled/WrapPlot';

function MetricTrend({
  scores,
  column,
  maxYear,
  maxValue,
  percentage,
  rangeColumns,
  color,
  benchmark,
  standard,
  hasBenchmarkOption,
  hasStandardOption,
  onSetBenchmark,
  onSetStandard,
}) {
  const yAxisRange = [0, maxValue];
  let xAxisRange = [
    new Date(`${2015 - 0.5}`).getTime(),
    new Date(`${parseInt(maxYear, 10) + 0.5}`).getTime(),
  ];
  let dataForceYRange = [
    { x: xAxisRange[0], y: yAxisRange[0] },
    { x: xAxisRange[1], y: yAxisRange[1] },
  ];
  const rangeUpper = [];
  const rangeLower = [];
  const xyData = [];
  const hasScores = scores && scores.length > 0;
  if (hasScores) {
    const scoresSorted = scores.sort((a, b) =>
      parseInt(a.year, 10) > parseInt(b.year, 10) ? 1 : -1,
    );
    const minYear = parseInt(scoresSorted[0].year, 10);
    // axis ranges
    xAxisRange = [
      new Date(`${minYear - 0.5}`).getTime(),
      new Date(`${parseInt(maxYear, 10) + 0.5}`).getTime(),
    ];

    // dummy data to force the area plot from 0
    dataForceYRange = [
      { x: xAxisRange[0], y: yAxisRange[0] },
      { x: xAxisRange[1], y: yAxisRange[1] },
    ];

    /* eslint-disable no-plusplus */
    for (let y = minYear; y <= parseInt(maxYear, 10); y++) {
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

  /* eslint-ensable no-plusplus */
  return (
    <Box direction="column" pad="medium">
      <WrapPlot>
        <FlexibleWidthXYPlot
          height={400}
          xType="time"
          margin={{ bottom: 30, right: 13 }}
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
          <HorizontalGridLines />
          <XAxis
            tickFormat={timeFormat('%Y')}
            tickTotal={hasScores ? xyData.length : 2}
            style={{
              ticks: { strokeWidth: 1 },
            }}
            tickPadding={2}
          />
          <YAxis
            tickFormat={value => (percentage ? `${value}%` : value)}
            style={{
              ticks: { strokeWidth: 1 },
            }}
            tickSize={3}
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
              style={{
                stroke: color,
                strokeWidth: 2,
              }}
              markStyle={{
                fill: color,
              }}
              data={xyData}
            />
          )}
        </FlexibleWidthXYPlot>
      </WrapPlot>
      {(hasBenchmarkOption || hasStandardOption) && (
        <Box direction="row" pad={{ horizontal: 'medium' }}>
          {hasScores && hasBenchmarkOption && (
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
    </Box>
  );
}

MetricTrend.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rangeColumns: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  column: PropTypes.string,
  maxYear: PropTypes.string,
  color: PropTypes.string,
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
