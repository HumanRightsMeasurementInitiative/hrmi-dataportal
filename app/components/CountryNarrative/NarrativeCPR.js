import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import formatScore from 'utils/format-score';

import { needsArticle, isPlural, getCPRScoreRange } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';

function NarrativeCPR({ dimensionKey, country, score, noData, intl }) {
  // console.log(dimensionKey, country, score, noData, intl);
  if (noData) {
    return (
      <Paragraph>
        <FormattedMessage
          {...messages.cpr.noData}
          values={{
            physint: intl.formatMessage(rootMessages.dimensions.physint),
            empowerment: intl.formatMessage(
              rootMessages.dimensions.empowerment,
            ),
            country: intl.formatMessage(
              rootMessages.countries[country.country_code],
            ),
            isPlural: isPlural(intl.locale, country.country_code),
            needsArticle: needsArticle(intl.locale, country.country_code),
          }}
        />
      </Paragraph>
    );
  }
  if (dimensionKey === 'empowerment') {
    const range = getCPRScoreRange(score.mean);
    return (
      range && (
        <Paragraph>
          <FormattedMessage
            {...messages.cpr.start}
            values={{
              dimension: intl.formatMessage(
                rootMessages.dimensions.empowerment,
              ),
              country: intl.formatMessage(
                rootMessages.countries[country.country_code],
              ),
              isPlural: isPlural(intl.locale, country.country_code),
              needsArticle: needsArticle(intl.locale, country.country_code),
              score: <strong>{formatScore(score.mean)}</strong>,
            }}
          />
          <FormattedMessage {...messages.cpr.then.empowerment[range]} />
        </Paragraph>
      )
    );
  }
  if (dimensionKey === 'physint') {
    const range = getCPRScoreRange(score.mean);
    return (
      range && (
        <Paragraph>
          <FormattedMessage
            {...messages.cpr.start}
            values={{
              dimension: intl.formatMessage(rootMessages.dimensions.physint),
              country: intl.formatMessage(
                rootMessages.countries[country.country_code],
              ),
              isPlural: isPlural(intl.locale, country.country_code),
              needsArticle: needsArticle(intl.locale, country.country_code),
              score: <strong>{formatScore(score.mean)}</strong>,
            }}
          />
          {range && <FormattedMessage {...messages.cpr.then.physint[range]} />}
        </Paragraph>
      )
    );
  }
  return null;
}
NarrativeCPR.propTypes = {
  noData: PropTypes.bool,
  dimensionKey: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPR);
