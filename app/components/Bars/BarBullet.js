/**
 *
 * BarBulletHorizontal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';

import Wrapper from './styled/BarWrapper';
import MinLabel from './styled/MinLabel';
import MaxLabel from './styled/MaxLabel';
import Score from './styled/Score';

const BarWrapper = styled.div``;

// level:
const HEIGHT = [50, 35, 20, 14];
const MARK_WIDTH = [4, 4, 3, 3];

const BarAnchor = styled.div`
  position: relative;
  display: block;
  height: ${props => props.height}px;
  width: 100%;
  background-color: transparent;
`;
const BarReference = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -2px;
  width: 100%;
  height: 4px;
  background-color: ${props => props.theme.global.colors['light-2']};
`;

const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: ${props => props.height / 2 - props.height * 0.15}px;
  height: ${props => props.height * 0.3}px;
  background-color: ${props => props.theme.global.colors['light-5']};
`;
const MarkValue = styled.div`
  position: absolute;
  top: 0;
  height: ${props => props.height}px;
  width: 0;
  margin-left: -${props => MARK_WIDTH[props.level || 1] / 2}px;
  border-right: ${props => MARK_WIDTH[props.level || 1]}px solid;
  border-color: ${props => props.theme.global.colors[props.color]};
`;
const MarkBound = styled(MarkValue)`
  top: ${props => props.height / 2 - props.height * 0.35}px;
  margin-left: -0.5px;
  border-right-width: 1px;
  height: ${props => props.height * 0.7}px;
`;

const BarBand = styled.div`
  position: absolute;
  top: ${props => props.height / 2 - props.height * 0.35}px;
  height: ${props => props.height * 0.7}px;
  background-color: ${props => props.theme.global.colors[props.color]};
  opacity: 0.4;
`;

function BarBulletHorizontal({ data, level = 1, showLabels, showScore }) {
  const { color, value, maxValue, unit, band } = data;
  return (
    <Wrapper>
      {showLabels && <MinLabel>0</MinLabel>}
      <BarWrapper>
        <BarAnchor height={HEIGHT[level]}>
          {value && <BarReference />}
          {value && (
            <BarValue
              height={HEIGHT[level]}
              style={{ width: `${(value / maxValue) * 100}%` }}
            />
          )}
          {value && (
            <BarBand
              color={color}
              height={HEIGHT[level]}
              lo={(band.lo / maxValue) * 100}
              hi={(band.hi / maxValue) * 100}
              style={{
                left: `${(band.lo / maxValue) * 100}%`,
                width: `${(band.hi / maxValue) * 100 -
                  (band.lo / maxValue) * 100}%`,
              }}
            />
          )}
          {value && (
            <MarkValue
              color={color}
              height={HEIGHT[level]}
              level={level}
              style={{ left: `${(value / maxValue) * 100}%` }}
            />
          )}
          {value && (
            <MarkBound
              color={color}
              height={HEIGHT[level]}
              style={{ left: `${(band.lo / maxValue) * 100}%` }}
            />
          )}
          {value && (
            <MarkBound
              color={color}
              height={HEIGHT[level]}
              style={{ left: `${(band.hi / maxValue) * 100}%` }}
            />
          )}
          {showScore && (
            <Score
              score={value}
              left={(value / maxValue) * 100}
              color={color}
              level={level}
            />
          )}
        </BarAnchor>
      </BarWrapper>
      {showLabels && (
        <MaxLabel>
          <Text size="small">
            {unit ? `${maxValue}${unit}` : `${maxValue}`}
          </Text>
        </MaxLabel>
      )}
    </Wrapper>
  );
}

BarBulletHorizontal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  level: PropTypes.number,
  showLabels: PropTypes.bool,
  showScore: PropTypes.bool,
};

export default BarBulletHorizontal;
