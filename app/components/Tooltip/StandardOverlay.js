import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';

import { Paragraph } from 'grommet';
import rootMessages from 'messages';

const HEIGHT = '15px';
const WIDTH = '40px';
const SquareWrap = styled.div`
  display: block;
  height: ${HEIGHT};
  width: ${WIDTH};
  margin-top: 15px;
`;
const Square = styled.div`
  display: block;
  height: ${HEIGHT};
  width: ${WIDTH};
  margin: 0 auto;
  background-color: ${({ theme, color, lineStyle }) =>
    lineStyle === 'stripes' ? 'transparent' : theme.global.colors[color]};
  ${({ lineStyle, theme, color }) =>
    lineStyle === 'stripes' &&
    css`
      background-image: linear-gradient(
        135deg,
        ${theme.global.colors[color]} 30%,
        ${theme.global.colors[`${color}Trans`]} 30%,
        ${theme.global.colors[`${color}Trans`]} 50%,
        ${theme.global.colors[color]} 50%,
        ${theme.global.colors[color]} 80%,
        ${theme.global.colors[`${color}Trans`]} 80%,
        ${theme.global.colors[`${color}Trans`]} 100%
      );
      background-size: 5px 5px;
      background-repeat: repeat;
    `}
`;
function StandardOverlay({ intl, size = 'small', hasKey }) {
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <FormattedMessage {...rootMessages.tooltip.standard.intro} />
      </Paragraph>
      {hasKey && (
        <SquareWrap>
          <Square color="esr" type="square" lineStyle="solid" />
        </SquareWrap>
      )}
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.standard.core)}: `}
        </span>
        <span>{intl.formatMessage(rootMessages.tooltip.standard.core)}</span>
      </Paragraph>
      {hasKey && (
        <SquareWrap>
          <Square color="esr" type="square" lineStyle="stripes" />
        </SquareWrap>
      )}
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.standard.hi)}: `}
        </span>
        <span>
          <FormattedMessage {...rootMessages.tooltip.standard.hi} />
        </span>
      </Paragraph>
    </>
  );
}

StandardOverlay.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
  hasKey: PropTypes.bool,
};

export default injectIntl(StandardOverlay);
