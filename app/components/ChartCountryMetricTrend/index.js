/**
 *
 * ChartCountryMetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
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

import { INDICATOR_LOOKBACK, PEOPLE_GROUPS } from 'containers/App/constants';

import SettingsMultiToggle from 'containers/LayerSettings/SettingsMultiToggle';

import ButtonToggleValueSetting from 'styled/ButtonToggleValueSetting';
import WrapPlot from 'styled/WrapPlot';

import rootMessages from 'messages';

const PlotHint = styled.div`
  color: ${({ color, theme }) => theme.global.colors[color]};
  background: ${({ theme }) => theme.global.colors.white};
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.global.edgeSize.xxsmall};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  width: auto;
  white-space: nowrap;
`;

const Settings = styled(Box)``;

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
const getDataForValue = (value, minYear, maxYear) => {
  const data = [];
  /* eslint-disable no-plusplus */
  for (let y = parseInt(minYear, 10); y <= parseInt(maxYear, 10); y++) {
    data.push({
      syear: y,
      x: new Date(`${y}`).getTime(),
      y: parseFloat(value),
    });
  }
  return data;
};
function ChartCountryMetricTrend({
  scores,
  column,
  maxYear,
  minYear,
  maxValue,
  percentage,
  rangeColumns,
  rangeValues,
  color,
  colorHint,
  benchmarkRefs,
  hasRawOption,
  raw,
  onRawChange,
  metric,
  onGroupToggle,
  groupsActive,
  theme,
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

  const groupsAll = groupsActive.indexOf(PEOPLE_GROUPS[0].key) > -1;
  const groupsFemale = groupsActive.indexOf(PEOPLE_GROUPS[1].key) > -1;
  const groupsMale = groupsActive.indexOf(PEOPLE_GROUPS[2].key) > -1;

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
  // benchmark references
  const xyDataRefs =
    benchmarkRefs &&
    benchmarkRefs.map(ref => {
      if (typeof ref.value !== 'undefined') {
        return {
          xy: getDataForValue(ref.value, minYear, maxYear),
          ...ref,
        };
      }
      if (ref.refColumn) {
        return {
          xy: getDataForGroup(
            scores,
            minYear,
            maxYear,
            ref.refColumn,
            PEOPLE_GROUPS[0].code,
            metric.metricType === 'indicators' && !raw,
          ),
          ...ref,
        };
      }
      return null;
    });
  // cpr ranges
  let rangeUpper;
  let rangeLower;
  if (rangeColumns && hasScores) {
    rangeUpper = getDataForGroup(scores, minYear, maxYear, rangeColumns.upper);
    rangeLower = getDataForGroup(scores, minYear, maxYear, rangeColumns.lower);
  }
  if (rangeValues) {
    rangeUpper = getDataForValue(rangeValues.upper, minYear, maxYear);
    rangeLower = getDataForValue(rangeValues.lower, minYear, maxYear);
  }

  const tickValuesY = percentage
    ? [0, 20, 40, 60, 80, 100]
    : [0, 2, 4, 6, 8, 10];

  const hasGroupOption =
    (scoresFemale && scoresFemale.length > 1) ||
    (scoresMale && scoresMale.length > 1);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="column" pad={{ vertical: 'medium' }}>
          <WrapPlot>
            <FlexibleWidthXYPlot
              height={size !== 'small' ? 240 : 200}
              xType="time"
              margin={{ bottom: 30, right: 10, left: percentage ? 30 : 25 }}
              onMouseLeave={() => {
                setHighlight(false);
                setHighlightMale(false);
                setHighlightFemale(false);
              }}
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              {hasScores && rangeUpper && (
                <AreaSeries
                  data={rangeUpper}
                  style={{ fill: color, stroke: 'transparent', opacity: 0.2 }}
                />
              )}
              {hasScores && rangeLower && (
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
              {hasScores && rangeUpper && (
                <LineSeries
                  data={rangeUpper}
                  style={{ stroke: color, opacity: 0.8, strokeWidth: 1 }}
                />
              )}
              {hasScores && rangeLower && (
                <LineSeries
                  data={rangeLower}
                  style={{ stroke: color, opacity: 0.8, strokeWidth: 1 }}
                />
              )}
              {xyDataRefs &&
                xyDataRefs.map(
                  ref =>
                    ref && (
                      <LineMarkSeries
                        key={ref.key}
                        data={ref.xy}
                        size={1.5}
                        style={{
                          stroke: 'black',
                          line: {
                            strokeWidth: ref.style === 'dotted' ? 2 : 1,
                          },
                          mark: {
                            strokeWidth: 1,
                          },
                          opacity: ref.style === 'dotted' ? 0.4 : 0.2,
                        }}
                        markStyle={{
                          fill: 'black',
                        }}
                        strokeDasharray={ref.style === 'dotted' && [1, 2]}
                      />
                    ),
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
                      : theme.global.colors[PEOPLE_GROUPS[1].color]
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
                      : theme.global.colors[PEOPLE_GROUPS[2].color]
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
                    stroke: theme.global.colors[PEOPLE_GROUPS[1].color],
                    strokeWidth: 1,
                  }}
                  fill={theme.global.colors[PEOPLE_GROUPS[1].color]}
                />
              )}
              {groupsMale && scoresMaleRawAvailable && (
                <MarkSeries
                  colorType="literal"
                  data={scoresMaleRawAvailable}
                  size={3}
                  style={{
                    stroke: theme.global.colors[PEOPLE_GROUPS[2].color],
                    strokeWidth: 1,
                  }}
                  fill={theme.global.colors[PEOPLE_GROUPS[2].color]}
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
          {(hasRawOption || hasGroupOption) && (
            <Settings
              direction="row"
              justify="end"
              pad="xsmall"
              margin={{ bottom: 'small' }}
            >
              {hasGroupOption && (
                <Box
                  direction={size !== 'small' ? 'row' : 'column'}
                  pad={size !== 'small' && { horizontal: 'medium' }}
                  justify="start"
                  fill="horizontal"
                >
                  <SettingsMultiToggle
                    setting="groups"
                    active={groupsActive}
                    onChange={groups => {
                      onGroupToggle(groups);
                    }}
                    defaultColor={color}
                    options={PEOPLE_GROUPS}
                  />
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

ChartCountryMetricTrend.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rangeColumns: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rangeValues: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  column: PropTypes.string,
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  color: PropTypes.string,
  colorHint: PropTypes.string,
  maxValue: PropTypes.number,
  percentage: PropTypes.bool,
  benchmarkRefs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  hasRawOption: PropTypes.bool,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  onGroupToggle: PropTypes.func,
  groupsActive: PropTypes.array,
  theme: PropTypes.object,
};

export default withTheme(ChartCountryMetricTrend);
