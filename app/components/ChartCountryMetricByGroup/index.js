/**
 *
 * ChartCountryMetricByGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import quasiEquals from 'utils/quasi-equals';

// import Source from 'components/Source';
import ChartBars from 'components/ChartBars';

import {
  PEOPLE_GROUPS,
  COLUMNS,
  INDICATOR_LOOKBACK,
  GRADES,
} from 'containers/App/constants';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';

import rootMessages from 'messages';

const Styled = styled(Box)``;

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

const prepareData = ({
  scores,
  metric,
  currentYear,
  currentBenchmark,
  standard,
  raw,
  metricInfo,
  intl,
}) =>
  PEOPLE_GROUPS.filter(group => group.breakdown === 'sex').map(group => {
    const groupScores = scores && scores.filter(s => s.group === group.code);
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
      groupScore = groupScores.find(s => quasiEquals(s.year, currentYear));
    }

    return {
      color: group.key,
      value: getDimensionValue(groupScore, currentBenchmark, raw),
      refValues: getDimensionRefs(
        metric,
        metricInfo,
        groupScore,
        currentBenchmark,
        raw,
      ),
      maxValue: 100,
      stripes: standard === 'hi',
      label: intl.formatMessage(rootMessages.groups[group.key]),
      unit: '%',
      key: group.key,
      year: groupScore.year,
    };
  });

function ChartCountryMetricByGroup({
  scores,
  metricInfo,
  // colorHint,
  currentBenchmark,
  standard,
  hasRawOption,
  raw,
  onRawChange,
  metric,
  currentYear,
  intl,
}) {
  return (
    <Styled direction="column">
      <ChartBars
        data={prepareData({
          scores,
          metric,
          currentBenchmark,
          standard,
          raw,
          metricInfo,
          intl,
          currentYear,
        })}
        currentBenchmark={currentBenchmark}
        standard={standard}
        labelColor="esrDark"
        padVertical="small"
        grades={GRADES.esr}
        commonLabel={intl.formatMessage(rootMessages.charts.sexLabel)}
        isStatic
        metric={{ type: 'esr' }}
      />
      {hasRawOption && (
        <Settings direction="row" justify="end" pad="small" border="top">
          <Box direction="row" justify="end">
            <ButtonToggleSetting
              active={!raw}
              disabled={!raw}
              onClick={() => {
                onRawChange(false);
              }}
            >
              <FormattedMessage {...rootMessages.settings.value.score} />
            </ButtonToggleSetting>
            <ButtonToggleSetting
              active={raw}
              disabled={raw}
              onClick={() => {
                onRawChange(true);
              }}
            >
              <FormattedMessage {...rootMessages.settings.value.raw} />
            </ButtonToggleSetting>
          </Box>
        </Settings>
      )}
    </Styled>
  );
}
// <Source center />

ChartCountryMetricByGroup.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  color: PropTypes.string,
  colorHint: PropTypes.string,
  percentage: PropTypes.bool,
  currentBenchmark: PropTypes.object,
  standard: PropTypes.string,
  maxValue: PropTypes.number,
  // metric: PropTypes.object,
  hasRawOption: PropTypes.bool,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartCountryMetricByGroup);
