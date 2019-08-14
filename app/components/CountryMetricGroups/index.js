/**
 *
 * CountryMetricGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Heading, ResponsiveContext, Text } from 'grommet';

import Bar from 'components/Bars/Bar';
import AnnotateBetter from 'components/AnnotateBetterWorse';

import formatScoreMax from 'utils/format-score-max';
import { isMinSize } from 'utils/responsive';

import Source from 'components/Source';

import SettingsToggle from 'containers/Settings/SettingsToggle';
import { BENCHMARKS, PEOPLE_GROUPS } from 'containers/App/constants';

import rootMessages from 'messages';
// import SettingsToggle from 'containers/Settings/SettingsToggle';

const ScoreWrapper = props => <Box {...props} flex={{ shrink: 0 }} />;
const BarWrap = props => <Box direction="row" {...props} align="center" />;
const Styled = styled(Box)``;

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  right: ${({ theme }) => theme.global.edgeSize.large};
  top: 100%;
  margin-top: -4px;
`;

// prettier-ignore
const StyledHeading = styled(Heading)`
  font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
  line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
    line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
  }
`;

const getRefs = (score, benchmark, refColumn) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark[refColumn];
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};

function CountryMetricGroups({
  scores,
  metric,
  // metricInfo,
  percentage,
  color,
  colorHint,
  benchmark,
  standard,
  hasBenchmarkOption,
  onSetBenchmark,
  maxValue,
}) {
  // console.log('scores', scores)
  const { column } = benchmark;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled pad="medium" direction="column">
          {PEOPLE_GROUPS.map(group => {
            const groupScore = scores.find(s => s.group === group.code);
            const data = {
              color,
              value: parseFloat(groupScore[column]),
              refValues: getRefs(
                groupScore,
                benchmark,
                metric.metricType === 'indicators'
                  ? 'refIndicatorColumn'
                  : 'refColumn',
              ),
              maxValue,
              stripes: standard === 'hi',
              unit: percentage ? '%' : '',
            };
            return (
              <Box key={group.key}>
                <StyledHeading
                  level={4}
                  margin={{ vertical: 'none' }}
                  responsive={false}
                >
                  <FormattedMessage {...rootMessages.groups[group.key]} />
                </StyledHeading>
                <Box
                  pad={{ vertical: '24px' }}
                  style={{
                    marginTop: isMinSize(size, 'medium') ? '-24px' : '-6px',
                  }}
                  responsive={false}
                >
                  <BarWrap>
                    <Box
                      pad={{
                        vertical: 'xsmall',
                        left: 'medium',
                        right: 'large',
                      }}
                      fill="horizontal"
                      style={{ position: 'relative' }}
                      responsive={false}
                    >
                      <WrapAnnotateBetter>
                        <AnnotateBetter />
                      </WrapAnnotateBetter>
                      <Bar
                        level={2}
                        data={data}
                        showScore
                        showLabels
                        showBenchmark
                        annotateBenchmarkAbove
                        showAllBenchmarkAnnotations
                        padAnnotateBenchmarkAbove={false}
                      />
                    </Box>
                    <ScoreWrapper
                      width={isMinSize(size, 'medium') ? '200px' : '50px'}
                    >
                      <Text
                        weight="bold"
                        size={isMinSize(size, 'medium') ? 'large' : 'medium'}
                        color={colorHint}
                      >
                        {data.value && formatScoreMax(data.value, maxValue)}
                      </Text>
                    </ScoreWrapper>
                  </BarWrap>
                </Box>
              </Box>
            );
          })}
          <Source />
          {hasBenchmarkOption && (
            <Box
              direction={size !== 'small' ? 'row' : 'column'}
              pad={{ vertical: size === 'small' ? 'medium' : 'none' }}
              justify="start"
              fill="horizontal"
            >
              {hasBenchmarkOption && (
                <SettingsToggle
                  setting="benchmark"
                  active={benchmark.key}
                  onActivate={onSetBenchmark}
                  options={BENCHMARKS}
                  inModal
                />
              )}
            </Box>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

CountryMetricGroups.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  color: PropTypes.string,
  colorHint: PropTypes.string,
  percentage: PropTypes.bool,
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  hasBenchmarkOption: PropTypes.bool,
  onSetBenchmark: PropTypes.func,
  maxValue: PropTypes.number,
  metric: PropTypes.object,
};

export default CountryMetricGroups;
