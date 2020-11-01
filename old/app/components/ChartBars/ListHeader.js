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

import rootMessages from 'messages';
// import messages from './messages';
import { scoreAsideWidth, chartLabelWidth } from './chart-utils';

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
const RemoveFromPDFWrapper = styled.div`
  @media print {
    display: none;
  }
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
  benchmarkIconOnly = true,
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
              style={{ fontWeight: 300 }}
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
                {metric && (
                  <Text size="xsmall" weight={500} textAlign="center">
                    <FormattedMessage
                      {...rootMessages.labels.xAxis[
                        metric.type === 'esr' ? benchmark : 'cpr'
                      ]}
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
            <RemoveFromPDFWrapper>
              {annotateBk && (
                <AnnotateBenchmark
                  benchmarkKey={benchmark}
                  hasBetter={annotateBetter}
                  type={benchmarkIconOnly ? 'icon' : 'header'}
                />
              )}
            </RemoveFromPDFWrapper>
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
