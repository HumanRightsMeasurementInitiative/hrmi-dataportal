/**
 *
 * BarWrapper
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import Bar from 'components/ChartBars/Bar';
import BarBullet from 'components/ChartBars/BarBullet';

import { isMinSize } from 'utils/responsive';

import BarLabelButton from './BarLabelButton';

const BarWrap = styled(Box)``;
// prettier-ignore
const LabelWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;

export function BarWrapper({
  score,
  bullet,
  allowWordBreak,
  // onClick,
  // currentBenchmark,
  // standard,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box key={score.key} direction="row" align="center" border="right">
          <LabelWrap
            width={isMinSize(size, 'medium') ? '160px' : '80px'}
            align="end"
            flex={{ shrink: 0 }}
            pad={{ right: 'small' }}
          >
            {score.label && (
              <BarLabelButton
                onClick={() => console.log('label click')}
                label={score.label}
                allowWordBreak={allowWordBreak}
              />
            )}
          </LabelWrap>
          <BarWrap flex>
            {!bullet && (
              <Bar
                showLabels={false}
                level={2}
                data={score}
                scoreOnHover="top"
              />
            )}
            {bullet && (
              <BarBullet
                color={score.color}
                level={2}
                showLabels={false}
                data={score}
                scoreOnHover="top"
                bandOnHover="top"
              />
            )}
          </BarWrap>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

BarWrapper.propTypes = {
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  bullet: PropTypes.bool,
  allowWordBreak: PropTypes.bool,
  // standard: PropTypes.string,
  // currentBenchmark: PropTypes.object,
};

export default BarWrapper;
