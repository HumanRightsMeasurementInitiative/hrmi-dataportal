/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { withTheme } from 'styled-components';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  AreaSeries,
  HorizontalGridLines,
  MarkSeries,
  ChartLabel,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';

import { COLUMNS, TYPES } from 'containers/App/constants';

import {
  sortRegions,
  getRegionData,
  getRegionYearData,
  getRegionDataLow,
  getRegionDataHigh,
  getXTime,
} from 'utils/charts';

import messages from './messages';

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

const checkDataAvailable = (scores, column) =>
  Object.values(scores[column]).length > 0;

function PlotMultiRegion({
  theme,
  height,
  highlightRegion,
  regionScores,
  year,
  column,
  metric,
  currentRegion,
  onSetRegionFilter,
  setYear,
  setRegion,
  tickValuesX,
  tickValuesY,
  dataForceYRange,
  intl,
}) {
  const activeRegionScore =
    regionScores && currentRegion && regionScores[currentRegion];
  const activeRegionData =
    activeRegionScore && getRegionYearData(year, activeRegionScore[column]);
  const hiRegionScore =
    regionScores &&
    highlightRegion &&
    highlightRegion !== currentRegion &&
    regionScores[highlightRegion];
  const hiRegionYearData =
    hiRegionScore && getRegionYearData(year, hiRegionScore[column]);

  const hasData = checkDataAvailable(activeRegionScore, column);
  // prettier-ignore
  return (
    <FlexibleWidthXYPlot
      height={height}
      xType="time"
      margin={{
        bottom: 20,
        top: 10,
        right: 12,
        left: 30,
      }}
      style={{
        cursor: highlightRegion ? 'pointer' : 'default',
      }}
      onMouseLeave={() => {
        setRegion(null);
        // setYear(false);
      }}
      onClick={() => {
        if (highlightRegion) {
          onSetRegionFilter(highlightRegion);
        }
        if (!highlightRegion) {
          onSetRegionFilter();
        }
      }}
    >
      <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
      {/* CPR region credible intervals */}
      {metric.type === 'cpr' &&
        regionScores &&
        Object.keys(regionScores)
          .filter(region =>
            highlightRegion
              ? region === highlightRegion
              : region === currentRegion,
          )
          .map(region => [
            <AreaSeries
              data={getRegionDataHigh(
                regionScores[region][COLUMNS.CPR.SD],
                regionScores[region][COLUMNS.CPR.MEAN],
                80,
              )}
              style={{
                fill: theme.global.colors[region],
                stroke: 'transparent',
                opacity: 0.2,
              }}
            />,
            <AreaSeries
              data={getRegionDataLow(
                regionScores[region][COLUMNS.CPR.SD],
                regionScores[region][COLUMNS.CPR.MEAN],
                80,
              )}
              style={{
                fill: 'white',
                stroke: 'white',
                opacity: 1,
                strokeWidth: 1,
              }}
            />
          ])}
      {/* VDEM region credible intervals */}
      {metric.type === 'vdem' &&
        regionScores &&
        Object.keys(regionScores)
          .filter(region =>
            highlightRegion
              ? region === highlightRegion
              : region === currentRegion,
          )
          .map(region => [
            <AreaSeries
              data={getRegionDataHigh(
                regionScores[region][COLUMNS.VDEM.SD],
                regionScores[region][COLUMNS.VDEM.MEAN],
                68,
              )}
              style={{
                fill: theme.global.colors[region],
                stroke: 'transparent',
                opacity: 0.2,
              }}
            />,
            <AreaSeries
              data={getRegionDataLow(
                regionScores[region][COLUMNS.VDEM.SD],
                regionScores[region][COLUMNS.VDEM.MEAN],
                68,
              )}
              style={{
                fill: 'white',
                stroke: 'white',
                opacity: 1,
                strokeWidth: 1,
              }}
            />
          ])}
      <HorizontalGridLines
        tickValues={tickValuesY}
        style={{ stroke: 'rgba(136, 150, 160, 0.2)' }}
      />
      <XAxis
        tickFormat={timeFormat('%Y')}
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 1 },
        }}
        tickValues={tickValuesX}
        tickPadding={2}
      />
      <XAxis
        tickFormat={timeFormat('%Y')}
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          text: {
            fontWeight: 700,
            textShadow: theme.global.outline,
          },
        }}
        tickValues={[getXTime(year)]}
        tickPadding={2}
      />
      <YAxis
        tickFormat={value =>
          TYPES[metric.type] && TYPES[metric.type].isPerc ? `${value}%` : value
        }
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 1 },
        }}
        tickSize={3}
        tickValues={tickValuesY}
        tickPadding={2}
      />
      {/* all region lines except when highlighted */}
      {regionScores &&
        Object.keys(regionScores)
          .filter(
            region =>
              region !== highlightRegion ||
              region === currentRegion,
          )
          .sort((a, b) => sortRegions(a, b, currentRegion))
          .map(region => {
            let color = theme.global.colors['dark-5'];
            let strokeWidth = 1;
            if (region === currentRegion) {
              color = theme.global.colors[region];
              strokeWidth = 2.5;
            }
            if (metric.type !== 'esr') {
              strokeWidth = 1.5;
            }
            return (
              <LineSeries
                key={region}
                data={getRegionData(regionScores[region][column])}
                style={{
                  stroke: color,
                  strokeWidth,
                }}
                onNearestX={point => {
                  setYear(point.syear);
                }}
                onSeriesMouseOver={() => {
                  if (region !== currentRegion) {
                    setRegion(region);
                  } else {
                    setRegion(null)
                  }
                }}
              />
            );
          })}
      {/* active region marker */}
      {activeRegionData && (
        <MarkSeries
          key={currentRegion}
          data={activeRegionData}
          stroke={theme.global.colors[currentRegion]}
          fill={theme.global.colors[currentRegion]}
          size={4}
        />
      )}
      {/* highlighted region line only */}
      {regionScores &&
        highlightRegion &&
        highlightRegion !== currentRegion &&
        Object.keys(regionScores)
          .filter(r => r === highlightRegion)
          .map(region => (
            <LineSeries
              key={region}
              data={getRegionData(regionScores[region][column])}
              style={{
                stroke: theme.global.colors[highlightRegion],
                strokeWidth: metric.type === 'cpr' ? 1 : 1.5,
              }}
            />
          ))}
      {/* highlighted region marker only */}
      {hiRegionYearData && (
        <MarkSeries
          key={highlightRegion}
          data={hiRegionYearData}
          stroke={theme.global.colors[highlightRegion]}
          fill={theme.global.colors[highlightRegion]}
          size={3}
        />
      )}
      {!hasData && (
        <ChartLabel
          text={intl.formatMessage(messages.noDataForRegionShort)}
          className="sotw-chart-nodata-watermark-small"
          includeMargin={false}
          xPercent={0.5}
          yPercent={1}
          style={{
            dominantBaseline: 'middle',
            textAnchor: 'middle',
          }}
        />
      )}
    </FlexibleWidthXYPlot>
  );
}

PlotMultiRegion.propTypes = {
  theme: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSetRegionFilter: PropTypes.func,
  setYear: PropTypes.func,
  highlightRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setRegion: PropTypes.func,
  tickValuesX: PropTypes.array,
  tickValuesY: PropTypes.array,
  dataForceYRange: PropTypes.array,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  column: PropTypes.string,
  height: PropTypes.number,
  intl: intlShape.isRequired,
};

export default withTheme(injectIntl(PlotMultiRegion));
