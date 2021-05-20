/**
 *
 * BarWrapper
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import Bar from 'components/ChartBars/Bar';
import BarBullet from 'components/ChartBars/BarBullet';

import { formatScore } from 'utils/scores';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
import { chartLabelWidth, scoreAsideWidth } from './chart-utils';
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

const ScoreAside = styled(Text)`
  @media print {
    font-size: 12px;
  }
`;

export function BarWrapper({
  score,
  bullet,
  labelColor,
  hasBackground,
  level,
  scoreOnHover = true,
  scoresAside = false,
  isStatic = false,
  intl,
  rawScores,
}) {
  const [hover, setHover] = useState(false);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BarButton
          as={isStatic && 'div'}
          onClick={() => !isStatic && score.onClick && score.onClick()}
          onMouseEnter={() => isStatic || setHover(true)}
          onMouseLeave={() => isStatic || setHover(false)}
        >
          {(hover || score.active) && <Active color={`${score.color}Active`} />}
          <Box key={score.key} direction="row" align="center">
            <LabelWrap
              width={chartLabelWidth(size)}
              align="start"
              flex={{ shrink: 0 }}
              pad={{ right: 'small' }}
            >
              {score.label && (
                <BarLabel
                  label={score.label}
                  year={score.year}
                  color={
                    hover || score.active ? `${score.color}Active` : labelColor
                  }
                  level={level}
                >
                  {score.label}
                </BarLabel>
              )}
            </LabelWrap>
            <BarWrap flex border={rawScores ? false : 'right'}>
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
                width={scoreAsideWidth(size)}
                align="start"
                flex={{ shrink: 0 }}
                pad={{ left: 'small' }}
              >
                <ScoreAside
                  color={`${score.color}Dark`}
                  size={isMinSize(size, 'medium') ? 'small' : 'xxsmall'}
                  weight={600}
                >
                  {score.value &&
                    `${formatScore(score.value, 1, intl)}${score.unit || ''}`}
                  {!score.value &&
                    intl.formatMessage(rootMessages.labels.abbrev.notAvailable)}
                </ScoreAside>
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
  intl: intlShape,
  rawScores: PropTypes.bool,
  // standard: PropTypes.string,
  // currentBenchmark: PropTypes.object,
};

export default injectIntl(BarWrapper);
