/**
 *
 * MetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  LineMarkSeries,
  MarkSeries,
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
import SettingsMultiToggle from 'containers/Settings/SettingsMultiToggle';

import ButtonToggleValueSetting from 'styled/ButtonToggleValueSetting';
import WrapPlot from 'styled/WrapPlot';

import rootMessages from 'messages';

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

const Settings = styled(Box)`
  background: ${({ theme }) => theme.global.colors['light-0']};
  min-height: 80px;
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

const getDataForGroup = (
  scores,
  minYear,
  maxYear,
  column,
  groupCode,
  lookback = false,
) => {
  const data = [];
  const scoresAll = groupCode
    ? scores.filter(s => s.group === groupCode)
    : scores;
  const scoresSorted = scoresAll.sort((a, b) =>
    parseInt(a.year, 10) > parseInt(b.year, 10) ? 1 : -1,
  );
  /* eslint-disable no-plusplus */
  for (let y = parseInt(minYear, 10); y <= parseInt(maxYear, 10); y++) {
    const score = scoresSorted.reduce((memo, s) => {
      const scoreYear = parseInt(s.year, 10);
      if (scoreYear === y) return s;
      if (lookback && scoreYear < y && scoreYear >= y - INDICATOR_LOOKBACK)
        return s;
      return memo;
    }, null);
    if (score) {
      data.push({
        syear: y,
        x: new Date(`${y}`).getTime(),
        y: parseFloat(score[column]),
      });
    }
  }
  return data;
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
  hasRawOption,
  onSetBenchmark,
  onSetStandard,
  raw,
  onRawChange,
  groups,
  onGroupsChange,
  metric,
  onGroupToggle,
  groupsActive,
}) {
  const [highlight, setHighlight] = useState(false);
  const [highlightFemale, setHighlightFemale] = useState(false);
  const [highlightMale, setHighlightMale] = useState(false);
  if (!maxYear) return null;

  // dummy data to force the area plot from 0
  const dataForceYRange = [
    { x: new Date(`${parseFloat(minYear) - 0.1}`).getTime(), y: 0 },
    { x: new Date(`${parseFloat(maxYear) + 0.5}`).getTime(), y: maxValue },
  ];
  const hasScores = scores && scores.length > 0;

  const groupsAll = !groups || groupsActive.indexOf(PEOPLE_GROUPS[0].key) > -1;
  const groupsFemale =
    groups && groupsActive.indexOf(PEOPLE_GROUPS[1].key) > -1;
  const groupsMale = groups && groupsActive.indexOf(PEOPLE_GROUPS[2].key) > -1;

  const scoresAll =
    hasScores &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      rangeColumns ? false : PEOPLE_GROUPS[0].code,
      metric.metricType === 'indicators' && !raw,
    );
  const scoresFemale =
    hasScores &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      PEOPLE_GROUPS[1].code, // female
      metric.metricType === 'indicators' && !raw,
    );
  const scoresMale =
    hasScores &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      PEOPLE_GROUPS[2].code, // male
      metric.metricType === 'indicators' && !raw,
    );
  const scoresAllRawAvailable =
    hasScores &&
    metric.metricType === 'indicators' &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      PEOPLE_GROUPS[0].code,
      false,
    );
  const scoresFemaleRawAvailable =
    hasScores &&
    metric.metricType === 'indicators' &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      PEOPLE_GROUPS[1].code,
      false,
    );
  const scoresMaleRawAvailable =
    hasScores &&
    metric.metricType === 'indicators' &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      PEOPLE_GROUPS[2].code,
      false,
    );

  // console.log(scoresFemale)
  const rangeUpper =
    hasScores && getDataForGroup(scores, minYear, maxYear, rangeColumns.upper);
  const rangeLower =
    hasScores && getDataForGroup(scores, minYear, maxYear, rangeColumns.lower);

  const tickValuesY = percentage
    ? [0, 20, 40, 60, 80, 100]
    : [0, 2, 4, 6, 8, 10];

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
                setHighlightMale(false);
                setHighlightFemale(false);
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
                  style={{ stroke: color, opacity: 0.8, strokeWidth: 1 }}
                />
              )}
              {hasScores && rangeColumns && (
                <LineSeries
                  data={rangeLower}
                  style={{ stroke: color, opacity: 0.8, strokeWidth: 1 }}
                />
              )}
              {groupsAll && scoresAll && (
                <LineMarkSeries
                  data={scoresAll}
                  size={2.5}
                  style={{
                    stroke: color,
                    strokeWidth: 1,
                  }}
                  fill={metric.metricType === 'indicators' ? 'white' : color}
                  onNearestX={(point, { index }) =>
                    setHighlight({ point, index })
                  }
                />
              )}
              {groupsFemale && scoresFemale && (
                <LineMarkSeries
                  data={scoresFemale}
                  size={2.5}
                  style={{
                    stroke: '#EE5A45',
                    strokeWidth: 1,
                  }}
                  fill={
                    metric.metricType === 'indicators'
                      ? 'white'
                      : PEOPLE_GROUPS[1].color
                  }
                  onNearestX={(point, { index }) =>
                    setHighlightFemale({ point, index })
                  }
                />
              )}
              {groupsMale && scoresMale && (
                <LineMarkSeries
                  data={scoresMale}
                  size={2.5}
                  style={{
                    stroke: '#0D6D64',
                    strokeWidth: 1,
                  }}
                  fill={
                    metric.metricType === 'indicators'
                      ? 'white'
                      : PEOPLE_GROUPS[2].color
                  }
                  onNearestX={(point, { index }) =>
                    setHighlightMale({ point, index })
                  }
                />
              )}
              {groupsAll && scoresAllRawAvailable && (
                <MarkSeries
                  colorType="literal"
                  data={scoresAllRawAvailable}
                  size={3}
                  style={{
                    stroke: color,
                    strokeWidth: 1,
                  }}
                  fill={color}
                />
              )}
              {groupsFemale && scoresFemaleRawAvailable && (
                <MarkSeries
                  colorType="literal"
                  data={scoresFemaleRawAvailable}
                  size={3}
                  style={{
                    stroke: PEOPLE_GROUPS[1].color,
                    strokeWidth: 1,
                  }}
                  fill={PEOPLE_GROUPS[1].color}
                />
              )}
              {groupsMale && scoresMaleRawAvailable && (
                <MarkSeries
                  colorType="literal"
                  data={scoresMaleRawAvailable}
                  size={3}
                  style={{
                    stroke: PEOPLE_GROUPS[2].color,
                    strokeWidth: 1,
                  }}
                  fill={PEOPLE_GROUPS[2].color}
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
              {highlightFemale && highlightFemale.point && (
                <Hint
                  value={highlightFemale.point}
                  align={{ vertical: 'top', horizontal: 'left' }}
                  style={{
                    transform: 'translateX(50%)',
                  }}
                >
                  <PlotHint color={PEOPLE_GROUPS[1].color}>
                    {`${formatScore(highlightFemale.point.y)}${
                      percentage ? '%' : ''
                    }`}
                  </PlotHint>
                </Hint>
              )}
              {highlightMale && highlightMale.point && (
                <Hint
                  value={highlightMale.point}
                  align={{ vertical: 'top', horizontal: 'left' }}
                  style={{
                    transform: 'translateX(50%)',
                  }}
                >
                  <PlotHint color={PEOPLE_GROUPS[2].color}>
                    {`${formatScore(highlightMale.point.y)}${
                      percentage ? '%' : ''
                    }`}
                  </PlotHint>
                </Hint>
              )}
            </FlexibleWidthXYPlot>
          </WrapPlot>
          {((scoresFemale && scoresFemale.length > 1) ||
            (scoresMale && scoresMale.length > 1)) && (
            <Settings
              direction="row"
              justify="end"
              pad="xsmall"
              margin={{ vertical: 'small' }}
            >
              {groups && (
                <Box
                  direction={size !== 'small' ? 'row' : 'column'}
                  pad={size !== 'small' && { horizontal: 'medium' }}
                  justify="start"
                  fill="horizontal"
                >
                  <SettingsMultiToggle
                    setting="groups"
                    active={groupsActive}
                    onChange={(group, active) => {
                      onGroupToggle(group, active);
                    }}
                    defaultColor={color}
                    options={PEOPLE_GROUPS}
                  />
                </Box>
              )}
              <Box direction="row" justify="end" align="center">
                <ButtonToggleValueSetting
                  active={!groups}
                  disabled={!groups}
                  onClick={() => {
                    onGroupsChange(false);
                  }}
                >
                  Overall
                </ButtonToggleValueSetting>
                <ButtonToggleValueSetting
                  active={groups}
                  disabled={groups}
                  onClick={() => {
                    onGroupsChange(true);
                  }}
                >
                  By sex
                </ButtonToggleValueSetting>
              </Box>
            </Settings>
          )}
          {(hasBenchmarkOption || hasStandardOption || hasRawOption) && (
            <Settings
              direction="row"
              justify="end"
              pad="xsmall"
              margin={{ vertical: 'small' }}
            >
              {(hasBenchmarkOption || hasStandardOption) && (
                <Box
                  direction={size !== 'small' ? 'row' : 'column'}
                  pad={size !== 'small' && { horizontal: 'medium' }}
                  justify="start"
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
              {hasRawOption && (
                <Box direction="row" justify="end" align="center">
                  <ButtonToggleValueSetting
                    active={!raw}
                    disabled={!raw}
                    onClick={() => {
                      onRawChange(false);
                    }}
                  >
                    <FormattedMessage {...rootMessages.settings.value.score} />
                  </ButtonToggleValueSetting>
                  <ButtonToggleValueSetting
                    active={raw}
                    disabled={raw}
                    onClick={() => {
                      onRawChange(true);
                    }}
                  >
                    <FormattedMessage {...rootMessages.settings.value.raw} />
                  </ButtonToggleValueSetting>
                </Box>
              )}
            </Settings>
          )}
          <Source center />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

MetricTrend.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rangeColumns: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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
  hasRawOption: PropTypes.bool,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  groups: PropTypes.bool,
  onGroupsChange: PropTypes.func,
  onGroupToggle: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  onSetStandard: PropTypes.func,
  groupsActive: PropTypes.array,
};

export default MetricTrend;
