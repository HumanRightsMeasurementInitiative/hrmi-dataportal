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
  hasLabelsSmall = true,
  annotateBenchmark = true,
  annotateMinMax = true,
  labelsMinimal = false,
}) {
  const annotateBk = annotateBenchmark && metric && metric.type === 'esr';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="end" pad={{ bottom: 'xxsmall' }}>
          {(size !== 'small' || hasLabelsSmall) && (
            <CountryWrap
              width={chartLabelWidth(size, hasLabelsSmall, labelsMinimal)}
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
          )}
          <BarWrap
            flex
            direction="row"
            style={{ position: 'relative' }}
            align="center"
          >
            {annotateMinMax && metric && (
              <>
                <Text size="xsmall" style={{ transform: 'translateX(-50%)' }}>
                  0
                </Text>
                <Box
                  margin={{ left: 'auto' }}
                  pad={annotateBk ? { left: 'xsmall' } : null}
                  style={{
                    transform:
                      size === 'small' && metric.type === 'esr'
                        ? 'translateX(30%)'
                        : 'translateX(50%)',
                  }}
                >
                  <Text size="xsmall">
                    {metric.type === 'esr' || metric.metricType === 'indicators'
                      ? '100%'
                      : '10'}
                  </Text>
                </Box>
              </>
            )}
            {annotateBetter && (
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
  hasLabelsSmall: PropTypes.bool,
  annotateBenchmark: PropTypes.bool,
  annotateMinMax: PropTypes.bool,
  labelsMinimal: PropTypes.bool,
};

export default ListHeader;
