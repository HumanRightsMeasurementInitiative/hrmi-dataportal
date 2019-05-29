import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Text } from 'grommet';

import BarMultiple from 'components/Bars/BarMultiple';
import Bar from 'components/Bars/Bar';
import rootMessages from 'messages';

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
  margin-top: ${({ first }) => (first ? 0 : 4)}px;
  margin-bottom: ${({ last }) => (last ? 0 : 4)}px;
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
              <Text size="xsmall">
                <FormattedMessage {...rootMessages.labels.better} />
              </Text>
            </AnnotateBetterInner>
          </AnnotateBetter>
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
                showLabels={showLabels}
                showBenchmark={showLabels}
                rotate={45}
                showIncompleteAction={false}
                scoreOnHover="top"
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
