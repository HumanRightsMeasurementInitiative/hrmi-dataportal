import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const sortData = (a, b, column) => {
  if (a[column] && !b[column]) return 1;
  if (!a[column] && b[column]) return -1;
  return parseFloat(a[column]) > parseFloat(b[column]) ? 1 : -1;
};

const HEIGHT = [50, 50, 25];
const Styled = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  position: relative;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.global.colors['light-2']};
`;
const Bar = styled.div`
  display: block;
  position: absolute;
  /* border-left: 1px solid ${props => props.theme.global.colors['light-2']}; */
  width: ${({ width }) => width}%;
  background-color: ${({ theme, color }) => theme.global.colors[color]};
  bottom: 0;
`;

export function MetricPreviewChart({
  data,
  column,
  maxValue,
  color,
  level = 1,
}) {
  const sorted = data.sort((a, b) => sortData(a, b, column));

  return (
    <Styled height={HEIGHT[level]}>
      {sorted.map((country, index, array) => {
        const height = country[column] ? (country[column] / maxValue) * 100 : 0;
        return (
          <Bar
            color={color}
            width={100 / array.length}
            key={country.country_code}
            style={{
              height: `${(height * HEIGHT[level]) / 100}px`,
              left: `${(100 / array.length) * index}%`,
            }}
          />
        );
      })}
    </Styled>
  );
}

MetricPreviewChart.propTypes = {
  data: PropTypes.array,
  column: PropTypes.string,
  color: PropTypes.string,
  maxValue: PropTypes.number,
  level: PropTypes.number,
};

export default MetricPreviewChart;
