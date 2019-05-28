/**
 *
 * CountryPreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Button, Box, Text } from 'grommet';
import { Emergency } from 'grommet-icons';

import Tooltip from 'components/Tooltip';

import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  COLUMNS,
} from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

import DiamondChart from './DiamondChart';

const StyledEmergency = styled(Emergency)`
  fill: ${({ theme }) => theme.global.colors.highlight2} !important;
`;

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

const getDimensionRefs = (dim, scores, standard, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best' && scores.esr) {
    const score =
      scores.esr[dim.key] &&
      scores.esr[dim.key].find(s => s.standard === standard.code);
    const col = benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      { value: score && score[col], style: 'dotted', key: 'adjusted' },
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
    return scores.cpr[dim.key][0][COLUMNS.CPR.MEAN];
  }
  if (
    dim.type === 'esr' &&
    scores.esr &&
    scores.esr[dim.key] &&
    scores.esr[dim.key].length > 0
  ) {
    const score = scores.esr[dim.key].find(s => s.standard === standard.code);
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && score[col];
  }
  return false;
};
const getTooltip = (standard, country, intl) => {
  if (country.high_income_country === '1' && standard.key === 'core') {
    return (
      <Tooltip
        icon={<StyledEmergency size="small" />}
        text={intl.formatMessage(messages.hiForCore)}
        insideButton
        maxWidth="150px"
      />
    );
  }
  if (country.high_income_country === '0' && standard.key === 'hi') {
    return (
      <Tooltip
        icon={<StyledEmergency size="small" />}
        text={intl.formatMessage(messages.loForHi)}
        insideButton
        maxWidth="150px"
      />
    );
  }
  return null;
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
    tooltip: dim.type === 'esr' && getTooltip(standard, country, intl),
    key: dim.key,
    color: dim.key,
    value: getDimensionValue(dim, scores, standard, benchmark),
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
    tooltip: dim.type === 'esr' && getTooltip(standard, country, intl),
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
        refValues:
        right.type === 'esr' && getDimensionRefs(right, scores, standard, benchmark),
      }))
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
  intl,
  showAnnotation,
}) {
  if (!country) return null;
  return (
    <Box
      pad={{ horizontal: 'small', vertical: 'medium' }}
      width="250px"
      alignContent="center"
    >
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
                  country,
                  intl,
                )}
                benchmark={benchmark}
                showLabels={showAnnotation}
              />
            </div>
          )}
          {scale === 'r' && (
            <div>
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
              />
            </div>
          )}
          <Box pad={{ top: 'small' }}>
            <Text textAlign="center" alignSelf="center">
              <strong>
                <FormattedMessage
                  {...rootMessages.countries[country.country_code]}
                />
                {country && country.high_income_country === '1' && (
                  <span>
                    {` (${intl.formatMessage(rootMessages.labels.hiCountry)})`}
                  </span>
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
  showAnnotation: PropTypes.bool,
  benchmark: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(CountryPreview);
