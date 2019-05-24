import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { css } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import UL from 'styled/UL';

import Tooltip from 'components/Tooltip';
import { RIGHTS, DIMENSIONS } from 'containers/App/constants';

import rootMessages from 'messages';

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

const dimensionRights = dimensionKey =>
  RIGHTS.filter(
    r => typeof r.aggregate === 'undefined' && r.dimension === dimensionKey,
  );
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

function Key({ intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          pad={{ left: 'xsmall', top: 'ms', bottom: 'medium' }}
          direction="column"
          border={{
            color: 'light-4',
            style: 'solid',
            side: 'right',
            size: '2px',
          }}
        >
          {DIMENSIONS.map(d => {
            const rights = dimensionRights(d.key);
            return (
              <DimensionWrap
                key={d.key}
                hasTriangle={d.key === 'esr'}
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
                  <Tooltip
                    iconSize="medium"
                    text={intl.formatMessage(rootMessages.tooltip[d.key], {
                      count: rights.length,
                    })}
                    maxWidth="300px"
                    component={
                      <>
                        <FormattedMessage
                          {...rootMessages.tooltip[d.key]}
                          values={{ count: rights.length }}
                        />
                        <UL>
                          {rights.map(r => (
                            <li key={r.key}>
                              <FormattedMessage
                                {...rootMessages.rights[r.key]}
                              />
                            </li>
                          ))}
                        </UL>
                      </>
                    }
                  />
                </Box>
              </DimensionWrap>
            );
          })}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Key.propTypes = {
  intl: intlShape,
};

export default injectIntl(Key);
