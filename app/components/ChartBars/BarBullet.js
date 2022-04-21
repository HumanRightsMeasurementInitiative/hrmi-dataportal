/**
 *
 * BarBullet
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';

import Wrapper from './styled/BarWrap';
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
  margin-top: -1px;
  width: 100%;
  height: 1px;
  background-color: ${({ theme, color }) =>
    theme.global.colors[color || 'dark']};
  opacity: 0.33;
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
  border-right-width: ${props => (props.bandOnHover ? 1 : 0)}px;
  height: ${props => props.height * 0.7}px;
`;

const BarBand = styled.div`
  position: absolute;
  top: ${props => props.height / 2 - props.height * 0.35}px;
  height: ${props => props.height * 0.7}px;
  background-color: ${props => props.theme.global.colors[props.color]};
  opacity: ${({ active, hover }) => {
    if (hover) return 0.5;
    if (active) return 0.5;
    return 0.35;
  }};
`;

function BarBullet({
  data,
  level = 2,
  showLabels,
  showScore,
  scoreOnHover,
  bandOnHover,
  annotate,
  annotateOnHover,
  hoverEnabled = true,
  hasBackground,
  scoreAbove,
  active,
}) {
  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false);
  const { color, value, maxValue, unit, band, labels } = data;

  return (
    <Wrapper
      onTouchStart={() => {
        if (hoverEnabled) {
          setTouched(true);
          setTimeout(() => setTouched(false), 1000);
          setHover(!hover);
          setTimeout(() => setHover(false), 5000);
        }
      }}
      onClick={evt => {
        if (touched) {
          if (evt) evt.preventDefault();
          if (evt) evt.stopPropagation();
        }
      }}
      onMouseEnter={() => hoverEnabled && setHover(true)}
      onMouseLeave={() => hoverEnabled && setHover(false)}
    >
      {showLabels && <MinLabel>0</MinLabel>}
      <BarWrapper>
        <BarAnchor height={HEIGHT[level]}>
          {value && <BarReference hasBackground={hasBackground} />}
          {value && (
            <BarBand
              color={active ? `${color}Active` : color}
              hover={hover && hoverEnabled}
              active={active}
              height={HEIGHT[level]}
              lo={(band.lo / maxValue) * 100}
              hi={(band.hi / maxValue) * 100}
              style={{
                left: `${(band.lo / maxValue) * 100}%`,
                width: `${
                  !bandOnHover
                    ? Math.min(band.hi / maxValue, 1) * 100 -
                      (band.lo / maxValue) * 100
                    : (band.hi / maxValue) * 100 - (band.lo / maxValue) * 100
                }%`,
              }}
            />
          )}
          {value && (
            <MarkValue
              color={active ? `${color}Active` : color}
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
              bandOnHover={bandOnHover}
              style={{ left: `${(band.hi / maxValue) * 100}%` }}
            />
          )}
          {((hover && annotateOnHover) || annotate) && (
            <Score
              left={(band.lo / maxValue) * 100}
              color={color}
              level={Math.max(2, level)}
              direction={scoreAbove ? 'top' : 'bottom'}
              secondary
              align="right"
              title={labels && labels.lo}
              titleRightOffset="15px"
            />
          )}
          {((hover && annotateOnHover) || annotate) && (
            <Score
              left={(band.hi / maxValue) * 100}
              color={color}
              level={Math.max(2, level)}
              direction={scoreAbove ? 'top' : 'bottom'}
              secondary
              align="left"
              title={labels && labels.hi}
              titleLeftOffset="15px"
            />
          )}
          {((hover && annotateOnHover) || annotate) && (
            <Score
              left={(value / maxValue) * 100}
              color={color}
              level={1}
              direction={scoreAbove ? 'top' : 'bottom'}
              secondary
              title={labels && labels.value}
            />
          )}
          {band.lo && bandOnHover && (hover || showScore) && (
            <Score
              score={band.lo}
              left={(band.lo / maxValue) * 100}
              color={color}
              level={Math.max(2, level)}
              direction={scoreAbove ? 'top' : 'bottom'}
              secondary
              align="right"
            />
          )}
          {band.hi && bandOnHover && (hover || showScore) && (
            <Score
              score={band.hi}
              left={(band.hi / maxValue) * 100}
              color={color}
              level={Math.max(2, level)}
              direction={scoreAbove ? 'top' : 'bottom'}
              secondary
              align="left"
            />
          )}
          {value && (showScore || (hover && scoreOnHover)) && (
            <Score
              score={value}
              left={(value / maxValue) * 100}
              color={color}
              level={scoreOnHover ? 1 : level}
              direction={scoreAbove ? 'top' : 'bottom'}
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

BarBullet.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  level: PropTypes.number,
  showLabels: PropTypes.bool,
  showScore: PropTypes.bool,
  hasBackground: PropTypes.bool,
  hoverEnabled: PropTypes.bool,
  scoreAbove: PropTypes.bool,
  active: PropTypes.bool,
  scoreOnHover: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  bandOnHover: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  annotateOnHover: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  annotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default BarBullet;
