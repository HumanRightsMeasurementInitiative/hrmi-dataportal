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
  LineMarkSeries,
  AreaSeries,
  HorizontalGridLines,
  // Hint,
} from 'react-vis';
import { timeFormat } from 'd3-time-format';

import { INDICATOR_LOOKBACK } from 'containers/App/constants';

import WrapPlot from 'styled/WrapPlot';

function MetricTrend({ scores, column, maxYear, maxValue, percentage }) {
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
  /* eslint-disable no-plusplus */
  for (let y = minYear; y <= parseInt(maxYear, 10); y++) {
    const score = scoresSorted.reduce((memo, s) => {
      const scoreYear = parseInt(s.year, 10);
      if (scoreYear === y) return s;
      if (scoreYear < y && scoreYear >= y - INDICATOR_LOOKBACK) return s;
      return memo;
    }, null);
    // console.log(score)
    if (score) {
      xyData.push({
        syear: y,
        x: new Date(`${y}`).getTime(),
        y: parseInt(score[column], 10),
      });
    }
  }
  // console.log(scores, xyData)
  /* eslint-ensable no-plusplus */
  return (
    <Box direction="column" pad="medium">
      <WrapPlot>
        <FlexibleWidthXYPlot
          height={400}
          xType="time"
          margin={{ bottom: 30, right: 13 }}
        >
          <HorizontalGridLines />
          <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
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
          <LineMarkSeries
            style={{
              strokeWidth: 2,
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
  column: PropTypes.string,
  maxYear: PropTypes.string,
  maxValue: PropTypes.number,
  percentage: PropTypes.bool,
};

export default MetricTrend;
