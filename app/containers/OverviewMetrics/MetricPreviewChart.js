import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FlexibleWidthXYPlot, AreaSeries, VerticalBarSeries } from 'react-vis';
import { scaleLinear } from 'd3-scale';

import NoDataHint from 'components/NoDataHint';

const sortData = (a, b, column) => {
  if (a[column] && !b[column]) return 1;
  if (!a[column] && b[column]) return -1;
  return parseFloat(a[column]) > parseFloat(b[column]) ? 1 : -1;
};

const HEIGHT = [50, 50, 25];
const Styled = styled.div`
  width: 100%;
  position: relative;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.global.colors['light-2']};
  height: ${({ height }) => height + 2}px;
`;

const scaleWidth = scaleLinear()
  .domain([1, 10])
  .range([0.2, 1]);

const getMaxWidth = maxScores => {
  if (maxScores > 20) return 1;
  return scaleWidth(maxScores);
};

export function MetricPreviewChart({
  data,
  column,
  maxValue,
  color,
  level = 1,
  maxScores,
  theme,
  activeCountry,
  loading,
}) {
  let sorted =
    data && data.scores && data.scores.sort((a, b) => sortData(a, b, column));
  if (sorted && sorted.length > 0 && sorted.length < maxScores) {
    sorted = [{ [column]: 0 }, ...sorted];
  }
  return (
    <Styled height={HEIGHT[level]}>
      {loading && <NoDataHint hint="loading" />}
      {(!sorted || sorted.length === 0) && !loading && (
        <NoDataHint hint="noData" />
      )}
      {sorted && sorted.length > 0 && (
        <FlexibleWidthXYPlot
          height={HEIGHT[level]}
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <AreaSeries
            data={[{ x: 1, y: 0 }, { x: maxScores, y: maxValue }]}
            style={{ opacity: 0 }}
          />
          <VerticalBarSeries
            colorRange={[
              theme.global.colors[color],
              theme.global.colors['light-3'],
            ]}
            colorDomain={[0, 1]}
            colorScale="category"
            barWidth={getMaxWidth(maxScores)}
            data={sorted.map((d, index, list) => {
              const c =
                !activeCountry ||
                (activeCountry && d.country_code === activeCountry)
                  ? 0
                  : 1;
              return {
                x: index + (maxScores - list.length) + 1,
                y: parseFloat(d[column]),
                color: c,
              };
            })}
          />
        </FlexibleWidthXYPlot>
      )}
    </Styled>
  );
}

MetricPreviewChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  activeCountry: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  column: PropTypes.string,
  color: PropTypes.string,
  maxValue: PropTypes.number,
  level: PropTypes.number,
  maxScores: PropTypes.number,
  theme: PropTypes.object,
  loading: PropTypes.bool,
};

export default withTheme(MetricPreviewChart);
