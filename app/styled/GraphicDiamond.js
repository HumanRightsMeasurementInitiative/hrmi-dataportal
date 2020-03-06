import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  transform: rotate(-45deg);
  display: block;
  width: ${({ size }) => size || '50px'};
  height: ${({ size }) => size || '50px'};
`;
const Bar = styled.div`
  opacity: 0.8;
  background-color: ${({ theme, color }) =>
    color ? theme.global.colors[color] : 'red'};
  margin-bottom: 5px;
  width: ${({ width }) => width || '50px'};
  height: ${({ height }) => height || '50px'};
`;

export function GraphicDiamond({ color, size }) {
  return (
    <Styled size={`${size}px`}>
      <Bar color={color} width={`${size}px`} height={`${size / 3 - 5}px`} />
      <Bar color={color} width={`${size}px`} height={`${size / 3 - 5}px`} />
      <Bar color={color} width={`${size}px`} height={`${size / 3 - 5}px`} />
    </Styled>
  );
}

GraphicDiamond.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default GraphicDiamond;
