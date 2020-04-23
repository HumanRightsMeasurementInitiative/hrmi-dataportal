/**
 *
 * BarWrapper
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';

import Bar from 'components/ChartBars/Bar';
import BarBullet from 'components/ChartBars/BarBullet';

import { isMinSize } from 'utils/responsive';
import { formatScore } from 'utils/scores';

import Active from './styled/Active';
import BarButton from './BarButton';
import BarLabel from './BarLabel';

const BarWrap = styled(Box)``;
// prettier-ignore
const LabelWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;
// prettier-ignore
const ScoreAsideWrap = styled(Box)``;

export function BarWrapper({
  score,
  bullet,
  labelColor,
  hasBackground,
  level,
  scoreOnHover = true,
  scoresAside = false,
  isStatic = false,
}) {
  const [hover, setHover] = useState(false);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BarButton
          as={isStatic && 'div'}
          onClick={() => (isStatic && !score.onClick) || score.onClick()}
          onMouseEnter={() => isStatic || setHover(true)}
          onMouseLeave={() => isStatic || setHover(false)}
        >
          {(hover || score.active) && <Active color={`${score.color}Active`} />}
          <Box key={score.key} direction="row" align="center">
            <LabelWrap
              width={isMinSize(size, 'medium') ? '180px' : '160px'}
              align="start"
              flex={{ shrink: 0 }}
              pad={{ right: 'small' }}
            >
              {score.label && (
                <BarLabel
                  label={score.label}
                  color={
                    hover || score.active ? `${score.color}Active` : labelColor
                  }
                  level={level}
                >
                  {score.label}
                </BarLabel>
              )}
            </LabelWrap>
            <BarWrap flex border="right">
              {!bullet && (
                <Bar
                  showScore={scoreOnHover && hover}
                  showLabels={false}
                  level={2}
                  data={score}
                  hasBackground={hasBackground}
                  hoverEnabled={false}
                  scoreAbove={scoreOnHover}
                  active={hover || score.active}
                />
              )}
              {bullet && (
                <BarBullet
                  color={score.color}
                  level={2}
                  hoverEnabled={false}
                  showLabels={false}
                  data={score}
                  bandOnHover={scoreOnHover && hover}
                  showValueBar
                  hasBackground={hasBackground}
                  showScore={scoreOnHover && hover}
                  scoreAbove={scoreOnHover}
                  active={hover || score.active}
                />
              )}
            </BarWrap>
            {scoresAside && (
              <ScoreAsideWrap
                width={isMinSize(size, 'medium') ? '80px' : '60px'}
                align="start"
                flex={{ shrink: 0 }}
                pad={{ left: 'small' }}
              >
                <Text color={`${score.color}Dark`} size="small" weight={600}>
                  {score.value &&
                    `${formatScore(score.value)}${score.unit || ''}`}
                  {!score.value && 'N/A'}
                </Text>
              </ScoreAsideWrap>
            )}
          </Box>
        </BarButton>
      )}
    </ResponsiveContext.Consumer>
  );
}

BarWrapper.propTypes = {
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  bullet: PropTypes.bool,
  hasBackground: PropTypes.bool,
  scoreOnHover: PropTypes.bool,
  scoresAside: PropTypes.bool,
  isStatic: PropTypes.bool,
  labelColor: PropTypes.string,
  level: PropTypes.number,
  // standard: PropTypes.string,
  // currentBenchmark: PropTypes.object,
};

export default BarWrapper;
