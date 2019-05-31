import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { FlexibleWidthXYPlot, AreaSeries, VerticalBarSeries } from 'react-vis';

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
  height: ${({ height }) => height}px;
`;

export function MetricPreviewChart({
  data,
  column,
  maxValue,
  color,
  level = 1,
  maxScores,
  theme,
  highlightCountry,
}) {
  const sorted =
    data && data.scores && data.scores.sort((a, b) => sortData(a, b, column));
  return (
    <Styled height={HEIGHT[level]}>
      {data && (
        <FlexibleWidthXYPlot
          height={HEIGHT[level]}
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <AreaSeries
            data={[{ x: 0, y: 0 }, { x: maxScores, y: maxValue }]}
            style={{ opacity: 0 }}
          />
          <VerticalBarSeries
            colorRange={[
              theme.global.colors[color],
              theme.global.colors['light-3'],
            ]}
            colorDomain={[0, 1]}
            colorScale="category"
            data={sorted.map((d, index, list) => {
              const c =
                !highlightCountry ||
                (highlightCountry && d.country_code === highlightCountry)
                  ? 0
                  : 1;
              return {
                x: index + (maxScores - list.length),
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
  highlightCountry: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  column: PropTypes.string,
  color: PropTypes.string,
  maxValue: PropTypes.number,
  level: PropTypes.number,
  maxScores: PropTypes.number,
  theme: PropTypes.object,
};

export default withTheme(MetricPreviewChart);
