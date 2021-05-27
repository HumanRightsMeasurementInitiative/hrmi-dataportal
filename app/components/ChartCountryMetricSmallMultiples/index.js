/**
 *
 * ChartCountryMetricSmallMultiples
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
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
import { formatScore } from 'utils/scores';
import { isMaxSize, isMinSize } from 'utils/responsive';

import Source from 'components/Source';
import { scoreAsideWidth } from 'components/ChartBars/chart-utils';

import {
  INDICATOR_LOOKBACK,
  BENCHMARKS,
  PEOPLE_GROUPS,
} from 'containers/App/constants';

import SettingsMultiToggle from 'containers/LayerSettings/SettingsMultiToggle';

import ButtonToggleSetting from 'styled/ButtonToggleSetting';
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

const PlotHintTighter = styled(PlotHint)`
  padding: 3px 6px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: ${({ fontWeight }) => fontWeight || 700};
`;

const KeyItem = styled(Box)`
  margin-left: 15px;
  text-align: right;
  position: relative;
`;

const CircleOpen = styled.div`
  width: 7px;
  height: 7px;
  margin-left: 4px;
  border-radius: 100%;
  border: 1px solid rgb(39, 170, 225);
  background-color: white;
`;

const CircleFill = styled.div`
  width: 7px;
  height: 7px;
  margin-left: 4px;
  border-radius: 100%;
  border: 1px solid rgb(39, 170, 225);
  background-color: rgb(39, 170, 225);
`;

const Settings = styled(Box)``;

const isEven = n => n % 2 === 0;
const isOdd = n => Math.abs(n % 2) === 1;

const getTickValuesX = (size, minYear, maxYear) => {
  const tickValuesX = [];
  const noYears = maxYear + 1 - minYear;
  /* eslint-disable no-plusplus */
  for (let y = minYear; y <= maxYear; y++) {
    if (isMaxSize(size, 'sm') && noYears > 8) {
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

function ChartCountryMetricSmallMultiples({
  scores,
  column,
  maxYear,
  minYear,
  maxValue,
  percentage,
  rangeColumns,
  rangeValues,
  color,
  colorCode,
  colorHint,
  // benchmarkRefs,
  benchmark,
  hasRawOption,
  raw,
  onRawChange,
  metric,
  onGroupToggle,
  groupsActive,
  theme,
  intl,
}) {
  const [highlight, setHighlight] = useState(false);
  const [highlightFemale, setHighlightFemale] = useState(false);
  const [highlightMale, setHighlightMale] = useState(false);
  const [highlightUpper, setHighlightUpper] = useState(false);
  const [highlightLower, setHighlightLower] = useState(false);
  if (!maxYear) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: new Date(minYear).getTime() - 15000000000, y: 0 },
    { x: new Date(maxYear).getTime() + 15000000000, y: maxValue },
  ];
  const hasScores = scores && scores.length > 0;

  let groupsFemale = false;
  let groupsMale = false;
  let groupsAll = true;
  let scoresFemale;
  let scoresMale;
  if (groupsActive) {
    groupsFemale = groupsActive.indexOf(PEOPLE_GROUPS[1].key) > -1;
    groupsMale = groupsActive.indexOf(PEOPLE_GROUPS[2].key) > -1;
    groupsAll = groupsActive.indexOf(PEOPLE_GROUPS[0].key) > -1;
    scoresFemale =
      hasScores &&
      getDataForGroup(
        scores,
        minYear,
        maxYear,
        column,
        PEOPLE_GROUPS[1].code, // female
        metric.metricType === 'indicators' && !raw,
      );
    scoresMale =
      hasScores &&
      getDataForGroup(
        scores,
        minYear,
        maxYear,
        column,
        PEOPLE_GROUPS[2].code, // male
        metric.metricType === 'indicators' && !raw,
      );
  }

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

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <div direction="column" align="start" pad={{ vertical: 'medium' }}>
          <WrapPlot metricType={metric.type}>
            <FlexibleWidthXYPlot
              height={isMinSize(size, 'medium') ? 240 : 200}
              xType="time"
              margin={{ bottom: 30, right: 10, left: percentage ? 30 : 25 }}
              onMouseLeave={() => {
                setHighlight(false);
                setHighlightMale(false);
                setHighlightFemale(false);
                setHighlightUpper(false);
                setHighlightLower(false);
              }}
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              {hasScores && rangeUpper && (
                <AreaSeries
                  data={rangeUpper}
                  style={{
                    fill: colorCode,
                    stroke: 'transparent',
                    opacity: 0.2,
                  }}
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
                  style={{ stroke: colorCode, opacity: 0.8, strokeWidth: 1 }}
                  onNearestX={(point, { index }) =>
                    setHighlightUpper({ point, index })
                  }
                />
              )}
              {hasScores && rangeLower && (
                <LineSeries
                  data={rangeLower}
                  style={{ stroke: colorCode, opacity: 0.8, strokeWidth: 1 }}
                  onNearestX={(point, { index }) =>
                    setHighlightLower({ point, index })
                  }
                />
              )}
              {groupsAll && scoresAll && (
                <LineMarkSeries
                  data={scoresAll}
                  size={2.5}
                  style={{
                    stroke: colorCode,
                    strokeWidth: 1,
                  }}
                  fill={
                    metric.metricType === 'indicators' ? 'white' : colorCode
                  }
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
                    stroke: colorCode,
                    strokeWidth: 1,
                  }}
                  fill={colorCode}
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
                  align={{ horizontal: 'right' }}
                  style={{
                    transform: 'translate(40%, 50%)',
                  }}
                >
                  <>
                    {highlightUpper && highlightUpper.point && (
                      <PlotHintTighter color={colorHint} fontWeight={500}>
                        {`${formatScore(highlightUpper.point.y, 1, intl)}${
                          percentage ? '%' : ''
                        }`}
                      </PlotHintTighter>
                    )}
                    <PlotHintTighter color={colorHint}>
                      {`${formatScore(highlight.point.y, 1, intl)}${
                        percentage ? '%' : ''
                      }`}
                    </PlotHintTighter>
                    {highlightUpper && highlightLower.point && (
                      <PlotHintTighter color={colorHint} fontWeight={500}>
                        {`${formatScore(highlightLower.point.y, 1, intl)}${
                          percentage ? '%' : ''
                        }`}
                      </PlotHintTighter>
                    )}
                  </>
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
                    {`${formatScore(highlightFemale.point.y, 1, intl)}${
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
                    {`${formatScore(highlightMale.point.y, 1, intl)}${
                      percentage ? '%' : ''
                    }`}
                  </PlotHint>
                </Hint>
              )}
            </FlexibleWidthXYPlot>
          </WrapPlot>
          <Box
            direction={isMinSize(size, 'medium') ? 'row' : 'column'}
            margin={{
              top: 'small',
              right: scoreAsideWidth(size),
              left: '-15px',
            }}
            justify={hasScores ? 'between' : 'end'}
          >
            {/* dots key */}
            {hasScores && metric.metricType === 'indicators' && (
              <Box direction="row">
                <KeyItem direction="row" align="center">
                  <Text size="xxsmall">
                    {isMinSize(size, 'medium') ? (
                      <FormattedMessage
                        {...rootMessages.settings.dataYear.present}
                      />
                    ) : (
                      <FormattedMessage
                        {...rootMessages.settings.dataYear.presentShort}
                      />
                    )}
                  </Text>
                  <CircleFill />
                </KeyItem>
                <KeyItem direction="row" align="center">
                  <Text size="xxsmall">
                    {isMinSize(size, 'medium') ? (
                      <FormattedMessage
                        {...rootMessages.settings.dataYear.previous}
                      />
                    ) : (
                      <FormattedMessage
                        {...rootMessages.settings.dataYear.previousShort}
                      />
                    )}
                  </Text>
                  <CircleOpen />
                </KeyItem>
              </Box>
            )}
          </Box>
          <Box
            margin={{
              top: currentBenchmark.key === 'best' ? 'xsmall' : 'medium',
            }}
          >
            <Source />
          </Box>
          {(hasRawOption || groupsActive) && (
            <Settings
              direction="row"
              justify="end"
              pad="xsmall"
              margin={{ bottom: 'small' }}
            >
              {groupsActive && (
                <Box
                  direction={isMinSize(size, 'medium') ? 'row' : 'column'}
                  pad={isMinSize(size, 'medium') && { horizontal: 'medium' }}
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
                  <ButtonToggleSetting
                    active={!raw}
                    disabled={!raw}
                    onClick={() => {
                      onRawChange(false);
                    }}
                  >
                    <FormattedMessage {...rootMessages.settings.value.score} />
                  </ButtonToggleSetting>
                  <ButtonToggleSetting
                    active={raw}
                    disabled={raw}
                    onClick={() => {
                      onRawChange(true);
                    }}
                  >
                    <FormattedMessage {...rootMessages.settings.value.raw} />
                  </ButtonToggleSetting>
                </Box>
              )}
            </Settings>
          )}
        </div>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartCountryMetricSmallMultiples.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rangeColumns: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rangeValues: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  column: PropTypes.string,
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  color: PropTypes.string,
  colorCode: PropTypes.string,
  colorHint: PropTypes.string,
  maxValue: PropTypes.number,
  percentage: PropTypes.bool,
  benchmarkRefs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hasRawOption: PropTypes.bool,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  onGroupToggle: PropTypes.func,
  groupsActive: PropTypes.array,
  theme: PropTypes.object,
  intl: intlShape.isRequired,
};

export default withTheme(injectIntl(ChartCountryMetricSmallMultiples));
