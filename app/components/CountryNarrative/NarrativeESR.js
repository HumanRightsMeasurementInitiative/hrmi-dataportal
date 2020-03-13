import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import formatScore from 'utils/format-score';
import { getESRScoreRange, getMessageGrammar } from 'utils/narrative';

import OL from 'styled/OL';

import { BENCHMARKS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

function NarrativeESR({
  country,
  dimensionScore,
  intl,
  // someData,
  countryGrammar,
  short = false,
  benchmark,
  showNoData,
}) {
  // console.log(score);
  const scoreAdjusted =
    dimensionScore &&
    dimensionScore[BENCHMARKS.find(s => s.key === 'adjusted').column];
  const scoreBest =
    dimensionScore &&
    dimensionScore[BENCHMARKS.find(s => s.key === 'best').column];

  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
    ),
    dimension: intl.formatMessage(rootMessages.dimensions.esr),
    country: rootMessages.countries[country.country_code]
      ? intl.formatMessage(rootMessages.countries[country.country_code])
      : country.country_code,
    less99adjusted: dimensionScore && parseFloat(scoreAdjusted) < 99,
    scoreAdjusted: dimensionScore && `${formatScore(scoreAdjusted)}%`,
    scoreAdjustedBold: dimensionScore && (
      <strong>{formatScore(scoreAdjusted)}%</strong>
    ),
    scoreBest: dimensionScore && `${formatScore(scoreBest)}%`,
    scoreBestBold: dimensionScore && <strong>{formatScore(scoreBest)}%</strong>,
    benchmarkAdjusted: intl.formatMessage(
      rootMessages.settings.benchmark.adjusted,
    ),
    benchmarkBest: intl.formatMessage(rootMessages.settings.benchmark.best),
  };
  if (!dimensionScore && showNoData) {
    return (
      <Paragraph>
        <FormattedMessage {...messages.esr.noData} values={messageValues} />
        <FormattedMessage
          {...messages.esr.noDataFunding}
          values={messageValues}
        />
      </Paragraph>
    );
  }
  if (dimensionScore) {
    const rangeAdjusted = getESRScoreRange(scoreAdjusted);
    const rangeBest = getESRScoreRange(scoreBest);
    if (short) {
      return (
        <Paragraph>
          {benchmark === 'adjusted' && (
            <FormattedMessage
              {...messages.esr.scoreAdjusted}
              values={messageValues}
            />
          )}
          {benchmark !== 'adjusted' && (
            <FormattedMessage
              {...messages.esr.scoreBestSimple}
              values={messageValues}
            />
          )}
        </Paragraph>
      );
    }
    return (
      <>
        <Paragraph>
          <FormattedMessage {...messages.esr.start} values={messageValues} />
        </Paragraph>
        <OL>
          <li>
            <Paragraph>
              <FormattedMessage
                {...messages.esr.scoreAdjusted}
                values={messageValues}
              />
              <FormattedMessage
                {...messages.esr.scoreAdjustedExplanation}
                values={messageValues}
              />
            </Paragraph>
            <Paragraph>
              <FormattedMessage
                {...messages.esr.scoreAdjustedAnalysis}
                values={messageValues}
              />
              <strong>
                <FormattedMessage
                  {...messages.esr.scoreAdjustedRange[rangeAdjusted]}
                  values={messageValues}
                />
              </strong>
              <FormattedMessage
                {...messages.esr.scoreAdjustedEnd}
                values={messageValues}
              />
            </Paragraph>
          </li>
          <li>
            <Paragraph>
              <FormattedMessage
                {...messages.esr.scoreBestAnalysis}
                values={messageValues}
              />
              <strong>
                <FormattedMessage
                  {...messages.esr.scoreBestRange[rangeBest]}
                  values={messageValues}
                />
              </strong>
              <FormattedMessage
                {...messages.esr.scoreBestEnd}
                values={messageValues}
              />
            </Paragraph>
          </li>
        </OL>
      </>
    );
  }
  return null;
}

NarrativeESR.propTypes = {
  dimensionScore: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  someData: PropTypes.bool,
  showNoData: PropTypes.bool,
  short: PropTypes.bool,
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  benchmark: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESR);
