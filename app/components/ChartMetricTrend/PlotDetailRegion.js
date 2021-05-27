/**
 *
 * PlotDetailRegion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
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
  getCountryData,
  getCountryYearData,
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
  Object.keys(scores).some(
    code =>
      scores[code][column] && Object.values(scores[code][column]).length > 0,
  );

function PlotDetailRegion({
  theme,
  height,
  highlightCountry,
  highlightRegion,
  countriesScores,
  regionScores,
  year,
  column,
  metric,
  currentRegion,
  onCountryClick,
  setYear,
  setCountry,
  setRegion,
  tickValuesX,
  tickValuesY,
  dataForceYRange,
  onSetRegionFilter,
  activeCountry,
  intl,
}) {
  // if we have regionScores we also have countryScores and vice versa
  const hasData = checkDataAvailable(regionScores, column);
  return (
    <FlexibleWidthXYPlot
      height={height}
      xType="time"
      margin={{
        bottom: 20,
        top: 10,
        right: 12,
        left: 50,
      }}
      style={{
        cursor: highlightRegion || highlightCountry ? 'pointer' : 'default',
      }}
      onMouseLeave={() => {
        setRegion(null);
        setCountry(null);
      }}
      onClick={() => {
        if (highlightCountry) {
          onCountryClick(highlightCountry);
        }
        if (!highlightCountry) {
          onCountryClick();
        }
        if (highlightRegion) {
          onSetRegionFilter(highlightRegion);
        }
      }}
    >
      <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
      {/* CPR region credible interval */}
      {metric.type === 'cpr' &&
        regionScores &&
        !highlightCountry &&
        Object.keys(regionScores)
          .filter(
            region => region === highlightRegion || region === currentRegion,
          )
          .map(region => {
            const dataHigh = getRegionDataHigh(
              regionScores[region][COLUMNS.CPR.SD],
              regionScores[region][COLUMNS.CPR.MEAN],
              80,
            );
            const dataLow = getRegionDataLow(
              regionScores[region][COLUMNS.CPR.SD],
              regionScores[region][COLUMNS.CPR.MEAN],
              80,
            );
            return [
              <AreaSeries
                data={dataHigh}
                style={{
                  fill: theme.global.colors[region],
                  stroke: 'transparent',
                  opacity: 0.2,
                }}
              />,
              <AreaSeries
                data={dataLow}
                style={{
                  fill: 'white',
                  stroke: 'white',
                  opacity: 1,
                  strokeWidth: 1,
                }}
              />,
            ];
          })}
      {/* CPR highlighted country credible interval */}
      {metric.type === 'cpr' &&
        countriesScores &&
        highlightCountry &&
        Object.keys(countriesScores)
          .filter(country => country === highlightCountry)
          .map(country => {
            // TODO consider colour by region
            const color = currentRegion;
            return [
              <AreaSeries
                data={getCountryData(countriesScores[country][COLUMNS.CPR.HI])}
                style={{
                  fill: theme.global.colors[color],
                  stroke: 'transparent',
                  opacity: 0.2,
                }}
              />,
              <AreaSeries
                data={getCountryData(countriesScores[country][COLUMNS.CPR.LO])}
                style={{
                  fill: 'white',
                  stroke: 'white',
                  opacity: 1,
                  strokeWidth: 1,
                }}
              />,
            ];
          })}
      {/* VDEM region credible interval */}
      {metric.type === 'vdem' &&
        regionScores &&
        !highlightCountry &&
        Object.keys(regionScores)
          .filter(
            region => region === highlightRegion || region === currentRegion,
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
            />,
          ])}
      {/* VDEM highlighted country credible interval */}
      {metric.type === 'vdem' &&
        countriesScores &&
        highlightCountry &&
        Object.keys(countriesScores)
          .filter(country => country === highlightCountry)
          .map(country => {
            // TODO consider colour by region
            const color = currentRegion;
            return [
              <AreaSeries
                data={getCountryData(countriesScores[country][COLUMNS.VDEM.HI])}
                style={{
                  fill: theme.global.colors[color],
                  stroke: 'transparent',
                  opacity: 0.2,
                }}
              />,
              <AreaSeries
                data={getCountryData(countriesScores[country][COLUMNS.VDEM.LO])}
                style={{
                  fill: 'white',
                  stroke: 'white',
                  opacity: 1,
                  strokeWidth: 1,
                }}
              />,
            ];
          })}
      <HorizontalGridLines
        tickValues={tickValuesY}
        style={{
          stroke: 'rgba(136, 150, 160, 0.2)',
        }}
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
      {/* all country lines except when highlighted or active */}
      {countriesScores &&
        Object.keys(countriesScores)
          .filter(c => c !== highlightCountry && c !== activeCountry)
          .map(country => (
            <LineSeries
              key={country}
              data={getCountryData(countriesScores[country][column])}
              style={{
                stroke: theme.global.colors['dark-5'],
                strokeWidth: 1,
              }}
              onSeriesMouseOver={() => {
                setCountry(country);
                setRegion(null);
              }}
            />
          ))}
      {/* all region lines */}
      {regionScores &&
        Object.keys(regionScores)
          .sort((a, b) => sortRegions(a, b, highlightRegion))
          .map(region => {
            const color =
              !highlightRegion || highlightRegion === region
                ? theme.global.colors[region]
                : theme.global.colors['dark-4'];
            let strokeWidth =
              !highlightRegion || highlightRegion === region ? 2.5 : 1.5;
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
                  setRegion(region);
                }}
              />
            );
          })}
      {/* all region markers except highlighted (could altern. sort) */}
      {regionScores &&
        Object.keys(regionScores)
          .sort((a, b) => sortRegions(a, b, highlightRegion))
          .map(region => {
            const color =
              !highlightRegion || highlightRegion === region
                ? theme.global.colors[region]
                : theme.global.colors['dark-4'];
            const msize = 4;
            return (
              <MarkSeries
                key={region}
                data={getRegionYearData(year, regionScores[region][column])}
                stroke={color}
                fill={color}
                size={msize}
              />
            );
          })}
      {/* active country line */}
      {countriesScores &&
        activeCountry &&
        currentRegion &&
        Object.keys(countriesScores)
          .filter(c => c === activeCountry)
          .map(country => (
            <LineSeries
              key={country}
              data={getCountryData(countriesScores[country][column])}
              style={{
                stroke: theme.global.colors[currentRegion],
                strokeWidth: 1,
              }}
            />
          ))}
      {/* highlighted country marker */}
      {countriesScores &&
        activeCountry &&
        currentRegion &&
        Object.keys(countriesScores)
          .filter(c => c === activeCountry)
          .map(country => (
            <MarkSeries
              key={country}
              data={getCountryYearData(year, countriesScores[country][column])}
              stroke={theme.global.colors[currentRegion]}
              fill={theme.global.colors[currentRegion]}
              size={3}
            />
          ))}
      {/* highlighted country line */}
      {countriesScores &&
        highlightCountry &&
        currentRegion &&
        Object.keys(countriesScores)
          .filter(c => c === highlightCountry)
          .map(country => (
            <LineSeries
              key={country}
              data={getCountryData(countriesScores[country][column])}
              style={{
                stroke: theme.global.colors[currentRegion],
                strokeWidth: 1,
              }}
            />
          ))}
      {/* highlighted country marker */}
      {countriesScores &&
        highlightCountry &&
        currentRegion &&
        Object.keys(countriesScores)
          .filter(c => c === highlightCountry)
          .map(country => (
            <MarkSeries
              key={country}
              data={getCountryYearData(year, countriesScores[country][column])}
              stroke={theme.global.colors[currentRegion]}
              fill={theme.global.colors[currentRegion]}
              size={3}
            />
          ))}
      {!hasData && (
        <ChartLabel
          text={intl.formatMessage(messages.noDataForRegion)}
          className="sotw-chart-nodata-watermark"
          includeMargin={false}
          xPercent={0.5}
          yPercent={0.5}
          style={{
            dominantBaseline: 'middle',
            textAnchor: 'middle',
          }}
        />
      )}
    </FlexibleWidthXYPlot>
  );
}
PlotDetailRegion.propTypes = {
  theme: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  setYear: PropTypes.func,
  highlightRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  highlightCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setCountry: PropTypes.func,
  setRegion: PropTypes.func,
  tickValuesX: PropTypes.array,
  tickValuesY: PropTypes.array,
  dataForceYRange: PropTypes.array,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countriesScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  column: PropTypes.string,
  height: PropTypes.number,
  activeCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default withTheme(injectIntl(PlotDetailRegion));

// const dataMedian = getRegionData(regionScores[region][column]);
// console.log(
//   dataMedian.map((median, index) =>
//     [
//       metric.code,
//       region,
//       median.syear,
//       median.y,
//       dataLow[index].y,
//       dataHigh[index].y,
//       median.count,
//     ].join(),
//   ),
// );
