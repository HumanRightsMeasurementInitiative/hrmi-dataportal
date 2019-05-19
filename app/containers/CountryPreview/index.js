/**
 *
 * CountryPreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Button, Box, Text } from 'grommet';

import rootMessages from 'messages';

import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  COLUMNS,
} from 'containers/App/constants';

import DiamondChart from './DiamondChart';
import messages from './messages';

const hasScoreRights = (metricScores, standard) => {
  if (Object.keys(metricScores).length === 0) return false;
  const noRightsScores = Object.values(metricScores).reduce(
    (m, scores) => (scores.find(s => s.standard === standard.code) ? m + 1 : m),
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

const getDimensions = (
  scores,
  standard,
  benchmark,
  otherStandard,
  indicators,
) =>
  DIMENSIONS.map(dim => ({
    ...dim,
    score:
      scores[dim.type] &&
      scores[dim.type][dim.key] &&
      (dim.type === 'cpr'
        ? scores.cpr[dim.key][0]
        : scores.esr[dim.key].find(s => s.standard === standard.code)),
    hasScoreAlternate:
      dim.type === 'esr' &&
      scores.esr &&
      scores.esr.esr &&
      !!scores.esr.esr.find(s => s.standard === otherStandard.code),
    hasScoreRights:
      dim.type === 'esr' && scores.esr && hasScoreRights(scores.esr, standard),
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
    column:
      dim.type === 'cpr'
        ? COLUMNS.CPR.MEAN
        : (benchmark && benchmark.column) || COLUMNS.ESR.CORE,
    maxValue: dim.type === 'cpr' ? 10 : 100,
  }));

const prepRights = rights =>
  Object.values(rights)
    .filter(r => typeof r.aggregate === 'undefined')
    .sort((a, b) => {
      if (a.type === 'cpr' && b.type !== 'cpr') return -1;
      if (a.type === 'esr' && b.type !== 'esr') return 1;
      if (a.type === 'cpr' && b.type === 'cpr') {
        if (a.dimension === 'empowerment' && b.dimension !== 'empowerment') {
          return -1;
        }
        if (a.dimension !== 'empowerment' && b.dimension !== 'empowerment') {
          return 1;
        }
        return 1;
      }
      return 1;
    });

// prettier-ignore
const getRights = (scores, standard, benchmark, otherStandard, indicators) =>
  prepRights(RIGHTS).map(right => ({
    ...right,
    score:
      scores[right.type] &&
      scores[right.type][right.key] &&
      (right.type === 'cpr'
        ? scores.cpr[right.key][0]
        : scores.esr[right.key].find(
          s => s.standard === standard.code && s.group === 'All',
        )),
    hasScoreAlternate:
      right.type === 'esr' &&
      scores.esr &&
      scores.esr[right.key] &&
      !!scores.esr[right.key].find(s => s.standard === otherStandard.code),
    hasScoreIndicators:
      right.type === 'esr' &&
      hasScoreIndicators(scores.indicators, indicators, right, standard),
    hasScoreIndicatorsAlternate:
      right.type === 'esr' &&
      hasScoreIndicators(scores.indicators, indicators, right, otherStandard),
    column:
      right.type === 'cpr'
        ? COLUMNS.CPR.MEAN
        : (benchmark && benchmark.column) || COLUMNS.ESR.CORE,
    maxValue: right.type === 'cpr' ? 10 : 100,
  }));

export function CountryPreview({
  onSelectCountry,
  country,
  scale,
  standard,
  otherStandard,
  benchmark,
  scores,
  indicators,
}) {
  if (!country) return null;

  // country && console.log(country.country_code, scores);
  return (
    <Box pad="small" width="200px" alignContent="center">
      {country && (
        <Button onClick={() => onSelectCountry(country.country_code)}>
          {scale === 'd' && (
            <div>
              <DiamondChart
                dimensions={getDimensions(
                  scores,
                  standard,
                  benchmark,
                  otherStandard,
                  indicators,
                )}
                benchmark={benchmark}
              />
            </div>
          )}
          {scale === 'r' && (
            <div>
              <DiamondChart
                rights={getRights(
                  scores,
                  standard,
                  benchmark,
                  otherStandard,
                  indicators,
                )}
                benchmark={benchmark}
              />
            </div>
          )}
          <Box>
            <Text textAlign="center" alignSelf="center">
              <strong>
                <FormattedMessage
                  {...rootMessages.countries[country.country_code]}
                />
                {country.high_income_country === '1' && (
                  <FormattedMessage {...messages.hi} />
                )}
              </strong>
            </Text>
          </Box>
        </Button>
      )}
    </Box>
  );
}

CountryPreview.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onSelectCountry: PropTypes.func,
  country: PropTypes.object,
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scores: PropTypes.object,
  scale: PropTypes.string,
  standard: PropTypes.object,
  otherStandard: PropTypes.object,
  isDefaultStandard: PropTypes.bool,
  benchmark: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(CountryPreview);
