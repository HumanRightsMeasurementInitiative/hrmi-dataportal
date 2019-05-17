import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import formatScore from 'utils/format-score';

import rootMessages from 'messages';
import messages from './messages';

const CPR_SCORE_RANGES = [
  {
    message: 'a',
    min: 0,
    max: 6,
  },
  {
    message: 'b',
    min: 6,
    max: 8,
  },
  {
    message: 'c',
    min: 8,
    max: 10,
  },
];

const contriesNeedArticleEN = [
  'GBR',
  'BHS', // 'The' should actually be capitalised
  'CYM',
  'TCA',
  'USA',
  'VCT',
  'VGB',
  'VIR',
  'MHL',
  'MNP',
  'PHL',
  'SLB',
  'CHI',
  'CZE',
  'FRO',
  'RUS',
  'NLD',
  'SVK',
  'ARE',
  'SYR',
  'MDV',
  'CAF',
  'COD',
  'COG',
  'SYC',
];
const contriesArePluralEN = [
  'BHS',
  'BRB',
  'CYM',
  'TCA',
  'USA',
  'VCT',
  'VGB',
  'VIR',
  'MHL',
  'MNP',
  'PHL',
  'SLB',
  'CHI',
  'FRO',
  'ARE',
  'MDV',
  'SYC',
];

const needsArticleEN = code => contriesNeedArticleEN.indexOf(code) > -1;
const arePluralEN = code => contriesArePluralEN.indexOf(code) > -1;

const getScoreMessage = value => {
  const range = CPR_SCORE_RANGES.find(r => value > r.min && value <= r.max);
  return range && range.message;
};

function NarrativeCPR({ dimensionKey, country, score, noData, intl }) {
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
            needsArticleEN: needsArticleEN(country.country_code),
          }}
        />
      </Paragraph>
    );
  }
  if (dimensionKey === 'empowerment') {
    const msg = getScoreMessage(score.mean);
    return (
      msg && (
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
              isPluralEN: arePluralEN(country.country_code),
              needsArticleEN: needsArticleEN(country.country_code),
              score: <strong>{formatScore(score.mean)}</strong>,
            }}
          />
          {msg && <FormattedMessage {...messages.cpr.then.empowerment[msg]} />}
        </Paragraph>
      )
    );
  }
  if (dimensionKey === 'physint') {
    const msg = getScoreMessage(score.mean);
    return (
      msg && (
        <Paragraph>
          <FormattedMessage
            {...messages.cpr.start}
            values={{
              dimension: intl.formatMessage(rootMessages.dimensions.physint),
              country: intl.formatMessage(
                rootMessages.countries[country.country_code],
              ),
              isPluralEN: arePluralEN(country.country_code),
              needsArticleEN: needsArticleEN(country.country_code),
              score: <strong>{formatScore(score.mean)}</strong>,
            }}
          />
          {msg && <FormattedMessage {...messages.cpr.then.physint[msg]} />}
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
