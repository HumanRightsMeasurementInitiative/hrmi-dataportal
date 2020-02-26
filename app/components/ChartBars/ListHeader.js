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

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.small};
  right: ${({ theme }) => theme.global.edgeSize.medium};
  top: -2px;
`;

// prettier-ignore
const StyledScoreText = styled(Text)`
  padding: 0 5px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 8px;
  }
`;

const BarWrap = styled(Box)``;
// prettier-ignore
const CountryWrap = styled(Box)`
  border-right: 1px solid;
  border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};
`;

export function ListHeader({ metric, benchmark }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="end" pad={{ bottom: 'xsmall' }}>
          <CountryWrap
            width={isMinSize(size, 'medium') ? '160px' : '80px'}
            noBorder
            align="end"
            pad={{ right: 'small' }}
            flex={{ shrink: 0 }}
          >
            <StyledScoreText size="small" style={{ fontWeight: 600 }}>
              <FormattedMessage {...rootMessages.labels.score} />
            </StyledScoreText>
          </CountryWrap>
          <BarWrap
            flex
            direction="row"
            style={{ position: 'relative' }}
            align="center"
          >
            <Text size="small" style={{ transform: 'translateX(-50%)' }}>
              0
            </Text>
            <Text
              size="small"
              margin={{ left: 'auto' }}
              style={{ transform: 'translateX(50%)' }}
            >
              {metric.type === 'esr' || metric.metricType === 'indicators'
                ? '100%'
                : '10'}
            </Text>
            <WrapAnnotateBetter>
              <AnnotateBetter />
            </WrapAnnotateBetter>
            {metric.type === 'esr' && (
              <AnnotateBenchmark
                benchmarkKey={benchmark}
                above
                margin="0 2px"
              />
            )}
          </BarWrap>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ListHeader.propTypes = {
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
};

export default ListHeader;
