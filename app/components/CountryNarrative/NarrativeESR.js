import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import formatScore from 'utils/format-score';
import { needsArticle, isPlural, getESRScoreRange } from 'utils/narrative';

import OL from 'styled/OL';

import { BENCHMARKS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

function NarrativeESR({ country, score, intl, someData }) {
  // console.log(score);
  const scoreAdjusted =
    score && score[BENCHMARKS.find(s => s.key === 'adjusted').column];
  const scoreBest =
    score && score[BENCHMARKS.find(s => s.key === 'best').column];

  const messageValues = {
    dimension: intl.formatMessage(rootMessages.dimensions.esr),
    country: intl.formatMessage(rootMessages.countries[country.country_code]),
    isPlural: isPlural(intl.locale, country.country_code),
    needsArticle: needsArticle(intl.locale, country.country_code),
    less99adjusted: score && parseFloat(scoreAdjusted) < 99,
    scoreAdjusted: score && `${formatScore(scoreAdjusted)}%`,
    scoreAdjustedBold: score && <strong>{formatScore(scoreAdjusted)}%</strong>,
    scoreBest: score && `${formatScore(scoreBest)}%`,
    scoreBestBold: score && <strong>{formatScore(scoreBest)}%</strong>,
    benchmarkAdjusted: intl.formatMessage(
      rootMessages.settings.benchmark.adjusted,
    ),
    benchmarkBest: intl.formatMessage(rootMessages.settings.benchmark.best),
  };
  if (!score) {
    return (
      <Paragraph>
        <FormattedMessage {...messages.esr.noData} values={messageValues} />
        {someData && (
          <FormattedMessage {...messages.esr.someData} values={messageValues} />
        )}
        <FormattedMessage
          {...messages.esr.noDataFunding}
          values={messageValues}
        />
      </Paragraph>
    );
  }
  if (score) {
    const rangeAdjusted = getESRScoreRange(scoreAdjusted);
    const rangeBest = getESRScoreRange(scoreBest);
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
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  someData: PropTypes.bool,
  country: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESR);
