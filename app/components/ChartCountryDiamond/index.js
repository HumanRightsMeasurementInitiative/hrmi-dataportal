/**
 *
 * ChartCountryDiamond
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Box, Text, ResponsiveContext } from 'grommet';
import { FormNext } from 'grommet-icons';
import styled from 'styled-components';
// import Tooltip from 'components/Tooltip';
import { isMinSize, isMaxSize } from 'utils/responsive';

import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  COLUMNS,
} from 'containers/App/constants';

import CountryLabel from 'components/CountryLabel';

import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';
// import messages from './messages';

import DiamondChart from './DiamondChart';

// const StyledEmergency = styled(Emergency)`
//   fill: ${({ theme }) => theme.global.colors.highlight2} !important;
// `;

const Button = styled(ButtonPlain)`
  margin: 0 auto;
  @media (min-width: 520px) {
    margin: 0;
  }
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  &:active {
    background: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    background: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    text-decoration: underline;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    background: white;
    z-index: 8;
  }
`;
const CountryLabelWrap = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.global.colors.dark};
`;

const hasScoreRights = (metricScores, standard) => {
  if (Object.keys(metricScores).length === 0) return false;
  const noRightsScores = Object.values(metricScores).reduce(
    (m, scores) => (scores.find(s => s.standard === standard.code) ? m + 1 : m),
    0,
  );
  return noRightsScores > 0;
};
const hasScoreRightsPhysInt = metricScores => {
  if (Object.keys(metricScores).length === 0) return false;
  const noRightsScores = Object.keys(metricScores).reduce(
    (m, right) =>
      RIGHTS.filter(r => r.dimension === 'physint')
        .map(r => r.key)
        .includes(right)
        ? m + 1
        : m,
    0,
  );
  return noRightsScores > 0;
};
const hasScoreRightsEmpower = metricScores => {
  if (Object.keys(metricScores).length === 0) return false;
  const noRightsScores = Object.keys(metricScores).reduce(
    (m, right) =>
      RIGHTS.filter(r => r.dimension === 'empowerment')
        .map(r => r.key)
        .includes(right)
        ? m + 1
        : m,
    0,
  );
  return noRightsScores > 0;
};
const hasScoreIndicators = (indicatorScores, indicators, right, standard) => {
  if (!indicatorScores || !indicators) return false;
  const indicatorsStandard = indicators.filter(i => {
    if (right) {
      return (
        !!INDICATORS.find(
          is => is.code === i.metric_code && is.right === right.key,
        ) &&
        (i.standard === 'Both' || i.standard === standard.code)
      );
    }
    return i.standard === 'Both' || i.standard === standard.code;
  });
  return (
    indicatorScores &&
    !!Object.values(indicatorScores).find(
      s => indicatorsStandard.indexOf(s.metric_code) > -1,
    )
  );
};

const getDimensionRefs = (dim, scores, standard, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best' && scores.esr) {
    // const score =
    //   scores.esr[dim.key] &&
    //   scores.esr[dim.key].find(s => s.standard === standard.code);
    // const col = benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      // {
      //   value: score && parseFloat(score[col]),
      //   style: 'dotted',
      //   key: 'adjusted',
      // },
    ];
  }
  return false;
};
const getDimensionValue = (dim, scores, standard, benchmark) => {
  if (
    dim.type === 'cpr' &&
    scores.cpr &&
    scores.cpr[dim.key] &&
    scores.cpr[dim.key].length > 0
  ) {
    return parseFloat(scores.cpr[dim.key][0][COLUMNS.CPR.MEAN]);
  }
  if (
    dim.type === 'esr' &&
    scores.esr &&
    scores.esr[dim.key] &&
    scores.esr[dim.key].length > 0
  ) {
    const score = scores.esr[dim.key].find(s => s.standard === standard.code);
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};

const getDimensions = (
  scores,
  standard,
  benchmark,
  otherStandard,
  indicators,
  country,
  intl,
) =>
  DIMENSIONS.map(dim => ({
    // tooltip: dim.type === 'esr' && getTooltip(standard, country, intl),
    key: dim.key,
    color: dim.key,
    value: getDimensionValue(dim, scores, standard, benchmark),
    title: intl.formatMessage(rootMessages.dimensions[dim.key]),
    refValues:
      dim.type === 'esr' && getDimensionRefs(dim, scores, standard, benchmark),
    maxValue: dim.type === 'cpr' ? 10 : 100,
    stripes: dim.type === 'esr' && standard.key === 'hi',
    unit: dim.type === 'esr' ? '%' : '',
    hasScoreAlternate:
      dim.type === 'esr' &&
      scores.esr &&
      scores.esr.esr &&
      !!scores.esr.esr.find(s => s.standard === otherStandard.code),
    /* eslint-disable no-nested-ternary */
    hasScoreRights:
      dim.type === 'esr'
        ? scores.esr && hasScoreRights(scores.esr, standard)
        : // prettier-ignore
        dim.key === 'physint'
          ? 
          // prettier-ignore
          scores.cpr && hasScoreRightsPhysInt(scores.cpr)
          : 
          scores.cpr && hasScoreRightsEmpower(scores.cpr),
    /* eslint-enable */
    hasScoreRightsAlternate:
      dim.type === 'esr' &&
      scores.esr &&
      hasScoreRights(scores.esr, otherStandard),
    hasScoreIndicators:
      dim.type === 'esr' &&
      hasScoreIndicators(scores.indicators, indicators, false, standard),
    hasScoreIndicatorsAlternate:
      dim.type === 'esr' &&
      hasScoreIndicators(scores.indicators, indicators, false, otherStandard),
  }));

// prettier-ignore
const getRightGroups = (
  scores,
  standard,
  benchmark,
  otherStandard,
  indicators,
  country,
  intl,
) =>
  DIMENSIONS.map(dim => ({
    // tooltip: dim.type === 'esr' && getTooltip(standard, country, intl),
    benchmark: dim.type === 'esr' && benchmark && benchmark.key,
    key: dim.key,
    color: dim.key,
    stripes: dim.type === 'esr' && standard.key === 'hi',
    unit: dim.type === 'esr' ? '%' : '',
    maxValue: dim.type === 'cpr' ? 10 : 100,
    data: Object.values(RIGHTS)
      .filter(r => r.dimension === dim.key && typeof r.aggregate === 'undefined')
      .map(right => ({
        key: right.key,
        value: getDimensionValue(right, scores, standard, benchmark),
        title: intl.formatMessage(rootMessages['rights-xshort'][right.key]),
        refValues:
        right.type === 'esr' && getDimensionRefs(right, scores, standard, benchmark),
      }))
  }));

export function ChartCountryDiamond({
  onSelectCountry,
  country,
  scale,
  standard,
  otherStandard,
  benchmark,
  scores,
  indicators,
  intl,
  showAnnotation,
  onCountryHover,
  width,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box margin="xsmall" width={width} alignContent="center">
          {country && (
            <Button
              onClick={() => onSelectCountry(country[COLUMNS.COUNTRIES.CODE])}
              onMouseOver={() =>
                onCountryHover(country[COLUMNS.COUNTRIES.CODE])
              }
              onFocus={() => onCountryHover(country[COLUMNS.COUNTRIES.CODE])}
              onMouseOut={() => onCountryHover(false)}
              onBlur={() => onCountryHover(false)}
            >
              <Box
                pad={{ horizontal: 'small', vertical: 'medium' }}
                width={isMinSize(size, 'large') ? '250px' : '280px'}
                alignContent="center"
              >
                {scale === 'd' && (
                  <DiamondChart
                    dimensions={getDimensions(
                      scores,
                      standard,
                      benchmark,
                      otherStandard,
                      indicators,
                      country,
                      intl,
                    )}
                    benchmark={benchmark}
                    showLabels={showAnnotation}
                    showBenchmark={showAnnotation}
                  />
                )}
                {scale === 'r' && (
                  <DiamondChart
                    rightGroups={getRightGroups(
                      scores,
                      standard,
                      benchmark,
                      otherStandard,
                      indicators,
                      country,
                      intl,
                    )}
                    benchmark={benchmark}
                    showLabels={showAnnotation}
                    showBenchmark={showAnnotation}
                  />
                )}
                <Box pad={{ top: 'small' }}>
                  <Text textAlign="center" alignSelf="center">
                    <CountryLabelWrap>
                      <CountryLabel country={country} />
                      {isMaxSize(size, 'medium') && <FormNext size="medium" />}
                    </CountryLabelWrap>
                  </Text>
                </Box>
              </Box>
            </Button>
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartCountryDiamond.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onSelectCountry: PropTypes.func,
  onCountryHover: PropTypes.func,
  country: PropTypes.object,
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scores: PropTypes.object,
  scale: PropTypes.string,
  width: PropTypes.string,
  standard: PropTypes.object,
  otherStandard: PropTypes.object,
  showAnnotation: PropTypes.bool,
  benchmark: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartCountryDiamond);
