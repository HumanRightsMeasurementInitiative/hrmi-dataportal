import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';

import BarBarMultiple from 'components/Bars/BarMultiple';
import Bar from 'components/Bars/Bar';

const WIDTH = 116;
const heightRotated = WIDTH * 2 ** (1 / 2); // height * sqrt(2)
const Styled = styled.div`
  height: ${heightRotated}px;
  padding-top: ${(heightRotated - WIDTH) / 2}px;
`;
const BarWrapRotated = styled.div`
  display: block;
  width: ${WIDTH}px;
  margin: 0 auto;
  transform: rotate(-45deg);
  position: relative;
`;

const BarWrapInner = styled.div`
  margin: 3px 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const AnnotateBetter = styled.div`
  position: absolute;
  width: 100%;
  bottom: 100%;
  right: 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  margin: 8px 0;
  &:after {
    content: '';
    position: absolute;
    top: -4.5px;
    right: -2px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid ${({ theme }) => theme.global.colors['dark-4']};
  }
`;
const AnnotateBetterInner = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  display: table;
  text-align: right;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 10px;
  transform: rotate(45deg);
`;

export function DiamondChart({ dimensions, rightGroups, showLabels }) {
  if (!dimensions && !rightGroups) return null;
  return (
    <Styled>
      <BarWrapRotated>
        {showLabels && (
          <AnnotateBetter>
            <AnnotateBetterInner>
              <Text size="xsmall"> Better </Text>
            </AnnotateBetterInner>
          </AnnotateBetter>
        )}
        {dimensions &&
          dimensions.map(dim => (
            <BarWrapInner key={dim.key}>
              <Bar
                data={dim}
                showLabels={showLabels}
                showBenchmark={showLabels}
                rotate={45}
                showIncompleteAction={false}
              />
            </BarWrapInner>
          ))}
        {rightGroups &&
          rightGroups.map(rightGroup => (
            <BarWrapInner key={rightGroup.key}>
              <BarBarMultiple
                dataMultiple={rightGroup}
                showLabels={showLabels}
                rotate={45}
              />
            </BarWrapInner>
          ))}
      </BarWrapRotated>
    </Styled>
  );
}

DiamondChart.propTypes = {
  rightGroups: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dimensions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  showLabels: PropTypes.bool,
};

export default DiamondChart;
