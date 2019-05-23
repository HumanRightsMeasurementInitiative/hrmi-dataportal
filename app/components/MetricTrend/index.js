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

import { INDICATOR_LOOKBACK } from 'containers/App/constants';

import WrapPlot from 'styled/WrapPlot';

function MetricTrend({
  scores,
  column,
  maxYear,
  maxValue,
  percentage,
  rangeColumns,
  color,
}) {
  if (!scores || scores.length === 0) return null;
  const scoresSorted = scores.sort((a, b) =>
    parseInt(a.year, 10) > parseInt(b.year, 10) ? 1 : -1,
  );
  const minYear = parseInt(scoresSorted[0].year, 10);
  // axis ranges
  const xAxisRange = [
    new Date(`${minYear - 0.5}`).getTime(),
    new Date(`${parseInt(maxYear, 10) + 0.5}`).getTime(),
  ];
  const yAxisRange = [0, maxValue];
  // dummy data to force the area plot from 0
  const dataForceYRange = [
    { x: xAxisRange[0], y: yAxisRange[0] },
    { x: xAxisRange[1], y: yAxisRange[1] },
  ];

  const xyData = [];
  const rangeUpper = [];
  const rangeLower = [];
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
          <AreaSeries
            data={rangeUpper}
            style={{ fill: color, stroke: 'transparent', opacity: 0.2 }}
          />
          <AreaSeries
            data={rangeLower}
            style={{
              fill: 'white',
              stroke: 'white',
              opacity: 1,
              strokeWidth: 1,
            }}
          />
          <HorizontalGridLines />
          <XAxis
            tickFormat={timeFormat('%Y')}
            tickTotal={xyData.length}
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
          <LineSeries
            data={rangeUpper}
            style={{ stroke: color, opacity: 0.5, strokeWidth: 1 }}
          />
          <LineSeries
            data={rangeLower}
            style={{ stroke: color, opacity: 0.5, strokeWidth: 1 }}
          />
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
        </FlexibleWidthXYPlot>
      </WrapPlot>
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
};

export default MetricTrend;
