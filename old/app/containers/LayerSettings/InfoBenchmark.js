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
  ${({ lineStyle }) =>
    lineStyle === 'solid' &&
    css`
      border-right: 2px solid;
      border-color: ${props => props.theme.global.colors['dark-2']};
    `}
  ${({ lineStyle }) =>
    lineStyle !== 'solid' &&
    css`
      background-image: linear-gradient(
        ${props => props.theme.global.colors['dark-2']} 50%,
        rgba(255, 255, 255, 0) 0%
      );
      background-position: right;
      background-size: 2px 4px;
      background-repeat: repeat-y;
    `}
`;

function BenchmarkOverlay({
  intl,
  size = 'small',
  hasKey,
  singleBenchmark,
  benchmarkKey,
}) {
  return (
    <>
      {!singleBenchmark && (
        <Paragraph margin={{ vertical: 'small' }} size={size}>
          <FormattedMessage {...rootMessages.settings.benchmark.intro} />
        </Paragraph>
      )}
      {singleBenchmark && (
        <Paragraph margin={{ vertical: 'small' }} size={size}>
          <FormattedMessage {...rootMessages.settings.benchmark.introSingle} />
        </Paragraph>
      )}
      {(!singleBenchmark || benchmarkKey === 'adjusted') && (
        <>
          {hasKey && (
            <SquareWrap>
              <Square color="light-2" type="line" lineStyle="dashed" />
            </SquareWrap>
          )}
          <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
            <span style={{ fontWeight: 600 }}>
              {`${intl.formatMessage(
                rootMessages.settings.benchmark.adjusted,
              )}: `}
            </span>
            <span>
              {intl.formatMessage(rootMessages.settings.benchmark.adjustedInfo)}
            </span>
          </Paragraph>
        </>
      )}
      {(!singleBenchmark || benchmarkKey === 'best') && (
        <>
          {hasKey && (
            <SquareWrap>
              <Square color="light-2" type="line" lineStyle="solid" />
            </SquareWrap>
          )}
          <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
            <span style={{ fontWeight: 600 }}>
              {`${intl.formatMessage(rootMessages.settings.benchmark.best)}: `}
            </span>
            <span>
              <FormattedMessage {...rootMessages.settings.benchmark.bestInfo} />
            </span>
          </Paragraph>
        </>
      )}
    </>
  );
}

BenchmarkOverlay.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
  singleBenchmark: PropTypes.bool,
  benchmarkKey: PropTypes.string,
  hasKey: PropTypes.bool,
};

export default injectIntl(BenchmarkOverlay);
