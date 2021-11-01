/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import { reduce } from 'lodash/collection';

import { formatScore } from 'utils/scores';
import { isMinSize, isMaxSize } from 'utils/responsive';
// import { isMinSize } from 'utils/responsive';

import ButtonPlain from 'styled/ButtonPlain';
import rootMessages from 'messages';

const Styled = styled(p => <Box flex={{ shrink: 0 }} {...p} />)`
  width: 30px;
  padding-top: ${({ padding }) => padding.top || 0}px;
  padding-bottom: ${({ padding }) => padding.bottom || 0}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: ${({ mode }) => (mode === 'detail-region' ? 200 : 30)}px;
  }
`;
const Inner = styled(p => <Box fill {...p} />)`
  position: relative;
`;
const CountryLabel = styled(Box)`
  position: absolute;
  left: 0;
  top: ${({ offsetY }) => offsetY}px;
  /* font-weight: bold; */
  color: ${({ regionCode, theme }) => theme.global.colors[regionCode]};
  transform: translateY(-50%);
  margin-top: -1px;
`;
// color: ${({ region }) => }
const RegionButton = styled(p => <ButtonPlain {...p} />)`
  position: absolute;
  left: 0;
  top: ${({ offsetY }) => offsetY}px;
  transform: translateY(-50%);
  margin-top: -1px;
  display: block;
  width: 100%;
`;
const RegionLabelWrap = styled(Box)`
  color: ${({ regionCode, inactive, theme }) =>
    inactive ? 'grey' : theme.global.colors[regionCode]};
`;
const RegionLabelWrapMulti = styled.div`
  position: absolute;
  right: 0;
  top: ${({ offsetY }) => offsetY || 0}px;
  color: ${({ regionCode, theme }) => theme.global.colors[regionCode]};
  text-align: right;
  transform: translateY(-50%);
  white-space: nowrap;
  pointer-events: none;
`;
// margin-top: -1px;
const RegionLabelMultiScore = styled.div`
  font-weight: 700;
  font-size: ${({ large }) => (large ? 16 : 14)}px;
  line-height: ${({ large }) => (large ? 16 : 14)}px;
  height: ${({ large }) => (large ? 16 : 14)}px;
  margin-top: ${({ large }) => (large ? -2 : 0)}px;
`;
const RegionLabelMultiTitle = styled.div`
  position: absolute;
  top: ${({ above }) => (above ? 'auto' : '100%')};
  bottom: ${({ above }) => (above ? '100%' : 'auto')};
  right: 1px;
  text-shadow: ${({ theme }) => theme.global.outline};
  font-size: 12px;
  line-height: 12px;
  height: 12px;
  transform: translateY(${({ above }) => (above ? -3 : 3)}px);
`;

const prepLabels = (
  scores,
  column,
  year,
  height,
  maxLabelHeight,
  range,
  minValue,
  maxYear,
) =>
  scores &&
  Object.keys(scores)
    .filter(code => !!scores[code])
    .map(code => {
      const colScores = scores[code][column];
      const yearScore = colScores[year];
      const maxYearScore = colScores[maxYear];
      return {
        value: yearScore ? yearScore.average || yearScore.score : null,
        valueMaxYear: maxYearScore
          ? maxYearScore.average || maxYearScore.score
          : null,
        count: yearScore ? yearScore.count : null,
        code,
      };
    })
    .sort((a, b) => {
      if (!a || !b) return 1;
      return a.valueMaxYear > b.valueMaxYear ? -1 : 1;
    })
    .reduce((memo, label) => {
      const { valueMaxYear } = label;
      const minOffset =
        memo.length > 0 ? memo[memo.length - 1].offset + maxLabelHeight : 0;
      const offset = Math.max(
        minOffset,
        (1 - (valueMaxYear - minValue) / range) * height,
      );
      // console.log(valueMaxYear, minOffset, offset, valueMaxYear / maxValue)
      return [
        ...memo,
        {
          ...label,
          offset,
        },
      ];
    }, []);

const getScores = (regionScores, countryScores, hCountry, aCountry) => {
  let scores = { ...regionScores } || {};
  if (countryScores && hCountry && countryScores[hCountry]) {
    scores = {
      ...scores,
      [hCountry]: countryScores[hCountry],
    };
  }
  if (countryScores && aCountry && countryScores[aCountry]) {
    scores = {
      ...scores,
      [aCountry]: countryScores[aCountry],
    };
  }
  return scores;
};
const getScoresMulti = (regionScores, hRegion, aRegion) =>
  reduce(
    regionScores,
    (memo, value, code) => {
      if (code === hRegion || code === aRegion) {
        return {
          ...memo,
          [code]: value,
        };
      }
      return memo;
    },
    {},
  );

const LABEL_RESERVED_HEIGHT = {
  'detail-region': 12,
  'multi-region': 12,
};

function ScoreSheet({
  height,
  margin,
  regionScores,
  countriesScores,
  year,
  highlightCountry,
  highlightRegion,
  column,
  intl,
  metric,
  maxValue,
  minValue,
  maxYear,
  onSetRegionFilter,
  currentRegion,
  setRegion,
  activeCountry,
  mode,
  showLabel,
}) {
  const styledHeight = margin
    ? height - (margin.top || 0) - (margin.bottom || 0)
    : height;
  // prettier-ignore
  const scores =
    mode === 'multi-region'
      ? getScoresMulti(regionScores, highlightRegion, currentRegion)
      : getScores(
        regionScores,
        countriesScores,
        highlightCountry,
        activeCountry,
      );
  const labels =
    scores &&
    prepLabels(
      scores,
      column,
      year,
      styledHeight,
      LABEL_RESERVED_HEIGHT[mode],
      maxValue - minValue,
      minValue,
      maxYear,
    );
  /* eslint-disable no-console */
  if (highlightCountry && !rootMessages.countries[highlightCountry]) {
    console.log('Country code not in language files:', highlightCountry);
  }
  if (activeCountry && !rootMessages.countries[activeCountry]) {
    console.log('Country code not in language files:', activeCountry);
  }
  /* eslint-enable no-console */
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled padding={margin} mode={mode}>
          <Inner>
            {labels &&
              labels.map((label, index, list) => {
                const isRegion =
                  label.code !== activeCountry &&
                  label.code !== highlightCountry;
                if (!isRegion) {
                  return (
                    <CountryLabel
                      key={label.code}
                      direction="row"
                      gap="xsmall"
                      align="center"
                      regionCode={
                        regionScores &&
                        Object.keys(regionScores) &&
                        Object.keys(regionScores)[0]
                      }
                      offsetY={label.offset}
                    >
                      <Text size="xsmall">
                        {label.value &&
                          formatScore(label.value, metric.type, intl)}
                        {!label.value &&
                          intl.formatMessage(
                            rootMessages.labels.abbrev.notAvailable,
                          )}
                      </Text>
                      {isMinSize(size, 'ms') && (
                        <Text size="xsmall">
                          {rootMessages.countries[label.code]
                            ? intl.formatMessage(
                              rootMessages.countries[label.code],
                            )
                            : label.code}
                        </Text>
                      )}
                    </CountryLabel>
                  );
                }
                if (
                  isRegion &&
                  label.value
                ) {
                  if (mode === 'detail-region' && isMinSize(size, 'ms')) {
                    const inactive =
                      highlightRegion && label.code !== highlightRegion;
                    return (
                      <RegionButton
                        key={label.code}
                        offsetY={label.offset}
                        onClick={() =>
                          currentRegion === 'all' && onSetRegionFilter(label.code)
                        }
                        onMouseOver={() =>
                          currentRegion === 'all' && setRegion(label.code)
                        }
                        onFocus={() =>
                          currentRegion === 'all' && setRegion(label.code)
                        }
                        onMouseOut={() => currentRegion === 'all' && setRegion(null)}
                        onBlur={() => currentRegion === 'all' && setRegion(null)}
                        disabled={currentRegion === 'world'}
                      >
                        <RegionLabelWrap
                          direction="row"
                          gap="xsmall"
                          inactive={inactive}
                          regionCode={label.code}
                          align="center"
                        >
                          <Text size="xsmall" weight={inactive ? 'normal' : 'bold'}>
                            {formatScore(label.value, metric.type, intl)}
                          </Text>
                          <Text size="xsmall" weight={inactive ? 'normal' : 'bold'}>
                            <FormattedMessage
                              {...rootMessages.un_regions_short[label.code]}
                            />
                          </Text>
                        </RegionLabelWrap>
                      </RegionButton>
                    );
                  }
                  if (
                    mode === 'multi-region' ||
                    (mode === 'detail-region' && isMaxSize(size, 'small'))
                  ) {
                    const showTitleMulti =
                      showLabel && highlightRegion && label.code === highlightRegion;
                    const titleMultiAbove = showTitleMulti && index === 0;
                    const scoreLarge =
                      (mode === 'multi-region' && !highlightRegion) ||
                      (mode === 'detail-region' && list.length === 1);
                    return (
                      <RegionLabelWrapMulti
                        key={label.code}
                        regionCode={label.code}
                        offsetY={label.offset}
                      >
                        <RegionLabelMultiScore large={scoreLarge}>
                          {formatScore(label.value, metric.type, intl)}
                        </RegionLabelMultiScore>
                        {showTitleMulti && (
                          <RegionLabelMultiTitle above={titleMultiAbove}>
                            <FormattedMessage
                              {...rootMessages.un_regions_short[label.code]}
                            />
                          </RegionLabelMultiTitle>
                        )}
                      </RegionLabelWrapMulti>
                    );
                  }
                }
                return null;
              })}
          </Inner>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// {actCountry && (
//   <CountryLabel
//     direction="row"
//     gap="xsmall"
//     align="center"
//     regionCode={
//       regionScores &&
//       Object.keys(regionScores) &&
//       Object.keys(regionScores)[0]
//     }
//     offsetY={actCountry.offset}
//   >
//     <Text size="xsmall">
//       {actCountry.value &&
//         formatScore(actCountry.value, metric.type, intl)}
//       {!actCountry.value &&
//         intl.formatMessage(rootMessages.labels.abbrev.notAvailable)}
//     </Text>
//     <Text size="xxsmall">{actCountry.title}</Text>
//   </CountryLabel>
// )}

ScoreSheet.propTypes = {
  height: PropTypes.number,
  margin: PropTypes.object,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countriesScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  highlightCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  activeCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  highlightRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  column: PropTypes.string,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  maxYear: PropTypes.string,
  currentRegion: PropTypes.string,
  mode: PropTypes.string,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSetRegionFilter: PropTypes.func,
  setRegion: PropTypes.func,
  showLabel: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(ScoreSheet);
