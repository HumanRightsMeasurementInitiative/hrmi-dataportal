import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import { DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';

import DimensionTooltip from './DimensionTooltip';

const HEIGHT = 8;
const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)
const SquareWrap = styled.div`
  display: block;
  height: ${heightRotated}px;
  width: ${heightRotated}px;
  padding-top: ${(heightRotated - HEIGHT) / 2}px;
  margin-right ${({ theme }) => theme.global.edgeSize.small};
`;
const Square = styled.div`
  display: block;
  width: ${HEIGHT}px;
  height: ${HEIGHT}px;
  margin: 0 auto;
  transform: rotate(-45deg);
  background-color: ${({ theme, color }) => theme.global.colors[color]};
`;

const DimensionBox = props => <Box direction="row" align="center" {...props} />;

const DimensionWrap = styled(DimensionBox)`
  ${({ hasTriangle, theme }) =>
    hasTriangle &&
    css`
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 100%;
        width: 0;
        height: 0;
        border-style: solid;
        top: 3px;
        border-color: transparent ${theme.global.colors['light-4']} transparent
          transparent;
        border-width: 8px;
        margin-left: -16px;
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 100%;
        width: 0;
        height: 0;
        border-style: solid;
        top: 3px;
        border-color: transparent white transparent transparent;
        border-width: 8px;
        margin-left: -14px;
      }
    `}
`;

function Key({ inModal }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          pad={{
            left: 'xsmall',
            top: inModal ? 'medium' : 'ms',
            bottom: 'medium',
          }}
          direction="column"
          border={{
            color: 'light-4',
            style: 'solid',
            side: inModal ? 'bottom' : 'right',
            size: '2px',
          }}
          margin={inModal ? { bottom: 'small' } : 'none'}
          flex={{ shrink: 0 }}
          responsive={false}
        >
          {DIMENSIONS.map(d => (
            <DimensionWrap
              key={d.key}
              hasTriangle={!inModal && d.key === 'esr'}
              pad={{ right: size === 'xlarge' ? 'medium' : 'xsmall' }}
            >
              <SquareWrap>
                <Square color={d.key} />
              </SquareWrap>
              <Text size="small">
                <FormattedMessage {...rootMessages.dimensions[d.key]} />
              </Text>
              <Box
                margin={{ left: 'auto' }}
                pad={{ horizontal: size === 'xlarge' ? 'small' : 'xsmall' }}
              >
                <DimensionTooltip dimensionKey={d.key} />
              </Box>
            </DimensionWrap>
          ))}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Key.propTypes = {
  inModal: PropTypes.bool,
};

export default Key;
