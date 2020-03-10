/**
 *
 * BarWrapper
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';

import Bar from 'components/ChartBars/Bar';
import BarBullet from 'components/ChartBars/BarBullet';

import { isMinSize } from 'utils/responsive';
import formatScore from 'utils/format-score';

import BarLabelButton from './BarLabelButton';

const BarLabel = styled(Text)``;

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
  allowWordBreak,
  labelColor,
  hasBackground,
  level,
  scoreOnHover = true,
  scoresAside = false,
  // currentBenchmark,
  // standard,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box key={score.key} direction="row" align="center">
          <LabelWrap
            width={isMinSize(size, 'medium') ? '180px' : '160px'}
            align="start"
            flex={{ shrink: 0 }}
            pad={{ right: 'small' }}
          >
            {score.label && score.onClick && (
              <BarLabelButton
                onClick={() => score.onClick()}
                label={score.label}
                allowWordBreak={allowWordBreak}
                color={labelColor}
                level={level}
              />
            )}
            {score.label && !score.onClick && (
              <BarLabel label={score.label} color="dark" size="small">
                {score.label}
              </BarLabel>
            )}
          </LabelWrap>
          <BarWrap flex border="right">
            {!bullet && (
              <Bar
                showLabels={false}
                level={2}
                data={score}
                scoreOnHover={scoreOnHover && 'top'}
                hasBackground={hasBackground}
              />
            )}
            {bullet && (
              <BarBullet
                color={score.color}
                level={2}
                showLabels={false}
                data={score}
                scoreOnHover={scoreOnHover && 'top'}
                bandOnHover={scoreOnHover && 'top'}
                showValueBar
                hasBackground={hasBackground}
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
      )}
    </ResponsiveContext.Consumer>
  );
}

BarWrapper.propTypes = {
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  bullet: PropTypes.bool,
  hasBackground: PropTypes.bool,
  allowWordBreak: PropTypes.bool,
  scoreOnHover: PropTypes.bool,
  scoresAside: PropTypes.bool,
  labelColor: PropTypes.string,
  level: PropTypes.number,
  // standard: PropTypes.string,
  // currentBenchmark: PropTypes.object,
};

export default BarWrapper;
