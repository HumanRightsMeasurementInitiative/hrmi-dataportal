import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Text } from 'grommet';

import AnnotateBenchmark from 'components/ChartBars/AnnotateBenchmark';
import BarMultiple from 'components/ChartBars/BarMultiple';
import Bar from 'components/ChartBars/Bar';
import rootMessages from 'messages';

const WIDTH = [72, 116];
const MARGINS = 4;
const heightRotated = w => w * 2 ** (1 / 2); // height * sqrt(2)
const Styled = styled.div`
  height: ${({ w }) => heightRotated(w)}px;
  padding-top: ${({ w }) => (heightRotated(w) - w) / 2}px;
`;
const BarWrapRotated = styled.div`
  display: block;
  width: ${({ w }) => w}px;
  margin: 0 auto;
  transform: rotate(-45deg);
  position: relative;
`;

const BarWrapInner = styled.div`
  margin-top: ${({ first }) => (first ? 0 : MARGINS)}px;
  margin-bottom: ${({ last }) => (last ? 0 : MARGINS)}px;
`;

const AnnotateBetter = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  right: 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  margin: 8px 0;
  &:after {
    content: '';
    position: absolute;
    top: -4.5px;
    right: 0;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid ${({ theme }) => theme.global.colors['dark-4']};
  }
`;

const IndicateBetterBelow = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  right: 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  margin: 8px 0;
  &:after {
    content: '';
    position: absolute;
    top: -4.5px;
    right: 0;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid ${({ theme }) => theme.global.colors['dark-4']};
  }
`;
const AnnotateBetterInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: table;
  text-align: right;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 10px;
  transform: rotate(45deg);
`;

export function DiamondChart({
  dimensions,
  rightGroups,
  showLabels,
  hideZeroLabels = false,
  hoverEnabled = true,
  small = false,
  indicateBetterBelow = false,
  showBenchmark,
  benchmark,
}) {
  if (!dimensions && !rightGroups) return null;
  const w = small ? WIDTH[0] : WIDTH[1];
  return (
    <Styled w={w}>
      <BarWrapRotated w={w}>
        {showLabels && (
          <AnnotateBetter>
            <AnnotateBetterInner>
              <Text size="xsmall">
                <FormattedMessage {...rootMessages.labels.better} />
              </Text>
            </AnnotateBetterInner>
          </AnnotateBetter>
        )}
        {showBenchmark && (
          <AnnotateBenchmark type="diamond" benchmarkKey={benchmark.key} />
        )}
        {dimensions &&
          dimensions.map((dim, index, list) => (
            <BarWrapInner
              key={dim.key}
              first={index === 0}
              last={index === list.length - 1}
            >
              <Bar
                data={dim}
                showLabels={(!hideZeroLabels || dim.value > 0) && showLabels}
                rotate={45}
                showIncompleteAction={false}
                scoreOnHover="top"
                hoverEnabled={hoverEnabled}
                height={(w - MARGINS * 2) / list.length}
                hasBackground
              />
            </BarWrapInner>
          ))}
        {rightGroups &&
          rightGroups.map((rightGroup, index, list) => (
            <BarWrapInner
              key={rightGroup.key}
              first={index === 0}
              last={index === list.length - 1}
            >
              <BarMultiple
                dataMultiple={rightGroup}
                showLabels={showLabels}
                rotate={45}
                scoreOnHover="top"
                heightIndividual={(w - MARGINS * 2) / 13}
                hasBackground
              />
            </BarWrapInner>
          ))}
        {indicateBetterBelow && <IndicateBetterBelow />}
      </BarWrapRotated>
    </Styled>
  );
}

DiamondChart.propTypes = {
  rightGroups: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dimensions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  showLabels: PropTypes.bool,
  showBenchmark: PropTypes.bool,
  hideZeroLabels: PropTypes.bool,
  hoverEnabled: PropTypes.bool,
  small: PropTypes.bool,
  benchmark: PropTypes.object,
  indicateBetterBelow: PropTypes.bool,
};

export default DiamondChart;
