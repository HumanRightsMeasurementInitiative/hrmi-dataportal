/**
 *
 * ChartCountryMetricByGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Heading, ResponsiveContext, Text } from 'grommet';

import Bar from 'components/ChartBars/Bar';
import AnnotateBetter from 'components/AnnotateBetterWorse';

import formatScoreMax from 'utils/format-score-max';
import { isMinSize } from 'utils/responsive';
import quasiEquals from 'utils/quasi-equals';

import Source from 'components/Source';

import {
  PEOPLE_GROUPS,
  COLUMNS,
  INDICATOR_LOOKBACK,
} from 'containers/App/constants';
import ButtonToggleValueSetting from 'styled/ButtonToggleValueSetting';

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

const Settings = styled(Box)`
  background: ${({ theme }) => theme.global.colors['light-0']};
`;

const getDimensionValue = (score, benchmark, raw) => {
  if (score) {
    const col = raw
      ? COLUMNS.ESR.RAW
      : (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(score[col]);
  }
  return false;
};
const getDimensionRefs = (metric, metricInfo, score, benchmark, raw) => {
  if (raw) {
    const valueMin =
      metricInfo && parseFloat(metricInfo[COLUMNS.ESR.RAW_REF_MIN]);
    return [
      {
        value: valueMin,
        style: 'solid',
        key: 'min',
        align: valueMin < 33 ? 'left' : 'right',
      },
      {
        value: score && parseFloat(score[COLUMNS.ESR.RAW_REF]),
        style: 'dotted',
        key: 'adjusted',
        align: 'right',
      },
      {
        value: metricInfo && parseFloat(metricInfo[COLUMNS.ESR.RAW_REF_BEST]),
        style: 'solid',
        key: 'best',
        align: 'left',
      },
    ];
  }
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col =
      metric.metricType === 'indicators'
        ? benchmark.refIndicatorColumn
        : benchmark.refColumn;
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

function ChartCountryMetricByGroup({
  scores,
  metricInfo,
  percentage,
  color,
  colorHint,
  benchmark,
  standard,
  maxValue,
  hasRawOption,
  raw,
  onRawChange,
  metric,
  currentYear,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled pad="medium" direction="column">
          {PEOPLE_GROUPS.filter(group => group.breakdown === 'sex').map(
            group => {
              const groupScores =
                scores && scores.filter(s => s.group === group.code);
              let groupScore;
              if (groupScores && metric.metricType === 'indicators') {
                const mostRecentYear = groupScores.reduce((memo, s) => {
                  if (
                    parseInt(s.year, 10) >= currentYear - INDICATOR_LOOKBACK &&
                    (memo === null ||
                      (parseInt(s.year, 10) > memo &&
                        parseInt(s.year, 10) <= currentYear))
                  ) {
                    return parseInt(s.year, 10);
                  }
                  return memo;
                }, null);
                groupScore = groupScores.find(
                  s =>
                    quasiEquals(s.year, currentYear) ||
                    quasiEquals(s.year, mostRecentYear),
                );
              } else {
                groupScore = groupScores.find(s =>
                  quasiEquals(s.year, currentYear),
                );
              }

              const data = {
                color,
                value: getDimensionValue(groupScore, benchmark, raw),
                refValues: getDimensionRefs(
                  metric,
                  metricInfo,
                  groupScore,
                  benchmark,
                  raw,
                ),
                maxValue,
                stripes: standard === 'hi',
                unit: percentage ? '%' : '',
              };
              return (
                <Box key={group.key}>
                  <StyledHeading
                    level={4}
                    margin={{ top: 'xsmall', bottom: 'small' }}
                    responsive={false}
                  >
                    <FormattedMessage {...rootMessages.groups[group.key]} />
                    {raw && groupScore && groupScore.year && (
                      <>{` (${groupScore.year})`}</>
                    )}
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
            },
          )}
          <Source center />
          {hasRawOption && (
            <Settings direction="row" justify="end" pad="small" border="top">
              <Box direction="row" justify="end">
                <ButtonToggleValueSetting
                  active={!raw}
                  disabled={!raw}
                  onClick={() => {
                    onRawChange(false);
                  }}
                >
                  <FormattedMessage {...rootMessages.settings.value.score} />
                </ButtonToggleValueSetting>
                <ButtonToggleValueSetting
                  active={raw}
                  disabled={raw}
                  onClick={() => {
                    onRawChange(true);
                  }}
                >
                  <FormattedMessage {...rootMessages.settings.value.raw} />
                </ButtonToggleValueSetting>
              </Box>
            </Settings>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartCountryMetricByGroup.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  color: PropTypes.string,
  colorHint: PropTypes.string,
  percentage: PropTypes.bool,
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  maxValue: PropTypes.number,
  // metric: PropTypes.object,
  hasRawOption: PropTypes.bool,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
};

export default ChartCountryMetricByGroup;
