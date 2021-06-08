import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

import { formatScore } from 'utils/scores';
import { getESRScoreRange, getMessageGrammar } from 'utils/narrative';

import OL from 'styled/OL';

import { BENCHMARKS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

const PDFParagraph = styled(Paragraph)`
  @media print {
    font-size: 15px;
    line-height: 20px;
  }
`;

function NarrativeESR({
  country,
  dimensionScore,
  intl,
  // someData,
  countryGrammar,
  short = false,
  benchmark,
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
    scoreAdjusted: dimensionScore && `${formatScore(scoreAdjusted, 1, intl)}%`,
    scoreAdjustedBold: dimensionScore && (
      <strong>{formatScore(scoreAdjusted, 1, intl)}%</strong>
    ),
    scoreBest: dimensionScore && `${formatScore(scoreBest, 1, intl)}%`,
    scoreBestBold: dimensionScore && (
      <strong>{formatScore(scoreBest, 1, intl)}%</strong>
    ),
    benchmarkAdjusted: intl.formatMessage(
      rootMessages.settings.benchmark.adjusted,
    ),
    benchmarkBest: intl.formatMessage(rootMessages.settings.benchmark.best),
  };
  if (dimensionScore) {
    const rangeAdjusted = getESRScoreRange(scoreAdjusted);
    const rangeBest = getESRScoreRange(scoreBest);
    if (short) {
      return (
        <PDFParagraph>
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
        </PDFParagraph>
      );
    }
    return (
      <>
        <PDFParagraph>
          <FormattedMessage {...messages.esr.start} values={messageValues} />
        </PDFParagraph>
        <OL>
          <li>
            <PDFParagraph>
              <FormattedMessage
                {...messages.esr.scoreAdjusted}
                values={messageValues}
              />
              <FormattedMessage
                {...messages.esr.scoreAdjustedExplanation}
                values={messageValues}
              />
            </PDFParagraph>
            <PDFParagraph>
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
            </PDFParagraph>
          </li>
          <li>
            <PDFParagraph>
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
            </PDFParagraph>
          </li>
        </OL>
      </>
    );
  }
  return null;
}

NarrativeESR.propTypes = {
  dimensionScore: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // someData: PropTypes.bool,
  short: PropTypes.bool,
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  benchmark: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESR);
