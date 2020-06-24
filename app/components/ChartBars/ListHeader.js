/**
 *
 * ListHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import AnnotateBenchmark from 'components/ChartBars/AnnotateBenchmark';
import AnnotateBetter from 'components/AnnotateBetterWorse';

import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
// import messages from './messages';
import { scoreAsideWidth, chartLabelWidth } from './chart-utils';

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.small};
  right: ${({ theme }) => theme.global.edgeSize.medium};
  top: -2px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    right: ${({ theme }) => theme.global.edgeSize.small};
  }
`;

// prettier-ignore
const StyledScoreText = styled(Text)`
  padding: 0;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0;
  }
`;

const BarWrap = styled(Box)``;
// prettier-ignore
const CountryWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;
const getScoreAsideWidth = (size, hasAside = false) => {
  if (hasAside) {
    return scoreAsideWidth(size);
  }
  return 0;
};
export function ListHeader({
  metric,
  benchmark,
  commonLabel,
  labelColor = 'dark',
  annotateBetter = true,
  hasAside = false,
  benchmarkIconOnly,
  annotateBenchmark = true,
  annotateMinMax = true,
}) {
  const annotateBk = annotateBenchmark && metric && metric.type === 'esr';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="end" pad={{ bottom: 'xxsmall' }}>
          <CountryWrap
            width={chartLabelWidth(size)}
            noBorder
            align="start"
            flex={{ shrink: 0 }}
            pad={{ right: 'small' }}
          >
            <StyledScoreText
              size="small"
              style={{ fontWeight: 600 }}
              color={labelColor}
            >
              {commonLabel || (
                <FormattedMessage {...rootMessages.labels.score} />
              )}
            </StyledScoreText>
          </CountryWrap>
          <BarWrap
            flex
            direction="row"
            style={{ position: 'relative' }}
            align="center"
          >
            {annotateMinMax && metric && (
              <Box direction="row" justify="between" width="100%">
                <Text size="xsmall" style={{ transform: 'translateX(-50%)' }}>
                  0
                </Text>
                {metric && metric.type === 'esr' && (
                  <Text size="xsmall" weight={600} textAlign="center">
                    <FormattedMessage
                      {...rootMessages.labels.xAxis[benchmark || 'cpr']}
                    />
                  </Text>
                )}
                <Text size="xsmall" style={{ transform: 'translateX(50%)' }}>
                  {metric.type === 'esr' || metric.metricType === 'indicators'
                    ? '100%'
                    : '10'}
                </Text>
              </Box>
            )}
            {annotateBetter && isMinSize(size, 'medium') && (
              <WrapAnnotateBetter>
                <AnnotateBetter />
              </WrapAnnotateBetter>
            )}
            {annotateBk && (
              <AnnotateBenchmark
                benchmarkKey={benchmark}
                hasBetter={annotateBetter}
                type={benchmarkIconOnly ? 'icon' : 'header'}
              />
            )}
          </BarWrap>
          {hasAside && (
            <Box width={getScoreAsideWidth(size, true)} flex={{ shrink: 0 }} />
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ListHeader.propTypes = {
  metric: PropTypes.object,
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  commonLabel: PropTypes.string,
  labelColor: PropTypes.string,
  annotateBetter: PropTypes.bool,
  hasAside: PropTypes.bool,
  benchmarkIconOnly: PropTypes.bool,
  annotateBenchmark: PropTypes.bool,
  annotateMinMax: PropTypes.bool,
};

export default ListHeader;
