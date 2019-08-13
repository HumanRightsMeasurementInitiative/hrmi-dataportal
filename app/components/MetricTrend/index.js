/**
 *
 * MetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
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
import { utcFormat as timeFormat } from 'd3-time-format';
import formatScore from 'utils/format-score';

import Source from 'components/Source';

import {
  INDICATOR_LOOKBACK,
  STANDARDS,
  BENCHMARKS,
  PEOPLE_GROUPS,
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
  width: auto;
  white-space: nowrap;
`;

const isEven = n => n % 2 === 0;
const isOdd = n => Math.abs(n % 2) === 1;

const getTickValuesX = (size, minYear, maxYear) => {
  const tickValuesX = [];
  const noYears = maxYear + 1 - minYear;
  /* eslint-disable no-plusplus */
  for (let y = minYear; y <= maxYear; y++) {
    if (size === 'small' && noYears > 8) {
      if (isEven(noYears) && isOdd(y)) {
        tickValuesX.push(new Date(`${y}`).getTime());
      }
      if (isOdd(noYears) && isEven(y)) {
        tickValuesX.push(new Date(`${y}`).getTime());
      }
    } else {
      tickValuesX.push(new Date(`${y}`).getTime());
    }
  }
  /* eslint-enable no-plusplus */
  return tickValuesX;
};

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
    { x: new Date(`${parseFloat(minYear) - 0.1}`).getTime(), y: 0 },
    { x: new Date(`${parseFloat(maxYear) + 0.5}`).getTime(), y: maxValue },
  ];
  const rangeUpper = [];
  const rangeLower = [];
  const xyData = [];
  const tickValuesY = percentage
    ? [0, 20, 40, 60, 80, 100]
    : [0, 2, 4, 6, 8, 10];

  const hasScores = scores && scores.length > 0;
  if (hasScores) {
    const scoresAll = scores.filter(s => s.group === PEOPLE_GROUPS[0].code);
    const scoresSorted = scoresAll.sort((a, b) =>
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

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="column" pad={{ vertical: 'medium' }}>
          <WrapPlot>
            <FlexibleWidthXYPlot
              height={size !== 'small' ? 320 : 240}
              xType="time"
              margin={{ bottom: 30, right: 10, left: percentage ? 30 : 25 }}
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
              <HorizontalGridLines
                tickValues={tickValuesY}
                style={{
                  stroke: 'rgba(136, 150, 160, 0.2)',
                }}
              />
              <XAxis
                tickFormat={timeFormat('%Y')}
                style={{
                  ticks: { strokeWidth: 1 },
                }}
                tickValues={getTickValuesX(
                  size,
                  parseInt(minYear, 10),
                  parseInt(maxYear, 10),
                )}
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
                  onNearestX={(point, { index }) =>
                    setHighlight({ point, index })
                  }
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
                    {`${formatScore(highlight.point.y)}${
                      percentage ? '%' : ''
                    }`}
                  </PlotHint>
                </Hint>
              )}
            </FlexibleWidthXYPlot>
          </WrapPlot>
          <Source center />
          {(hasBenchmarkOption || hasStandardOption) && (
            <Box
              direction={size !== 'small' ? 'row' : 'column'}
              pad={
                size !== 'small'
                  ? { horizontal: 'medium' }
                  : { vertical: 'medium' }
              }
              justify="center"
              fill="horizontal"
            >
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
        </Box>
      )}
    </ResponsiveContext.Consumer>
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
