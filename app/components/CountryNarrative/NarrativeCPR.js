import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

import { formatScore } from 'utils/scores';

import { getCPRScoreRange, getMessageGrammar } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';

const PDFParagraph = styled(Paragraph)`
  @media print {
    font-size: 15px;
    line-height: 20px;
  }
`;

function NarrativeCPR({ dimensionKey, country, score, intl, countryGrammar }) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
    ),
    physint: intl.formatMessage(rootMessages.dimensions.physint),
    empowerment: intl.formatMessage(rootMessages.dimensions.empowerment),
    scoreBold: score && (
      <strong>{formatScore(score.mean, 1, intl)}/10</strong>
      // <strong>{formatScore(score.mean, 1, intl)}</strong>
    ),
    score: score && formatScore(score.mean, 1, intl),
  };
  if (!score) {
    return null;
  }
  if (dimensionKey === 'empowerment') {
    const range = score && getCPRScoreRange(score.mean);
    return (
      range && (
        <PDFParagraph>
          <FormattedMessage
            {...messages.cpr.start}
            values={{
              dimension: intl.formatMessage(
                rootMessages.dimensions.empowerment,
              ),
              ...messageValues,
            }}
          />
          <FormattedMessage
            {...messages.cpr.then.empowerment[range]}
            values={{
              dimension: intl.formatMessage(
                rootMessages.dimensions.empowerment,
              ),
              ...messageValues,
            }}
          />
        </PDFParagraph>
      )
    );
  }
  if (dimensionKey === 'physint') {
    const range = score && getCPRScoreRange(score.mean);
    return (
      range && (
        <PDFParagraph>
          <FormattedMessage
            {...messages.cpr.start}
            values={{
              dimension: intl.formatMessage(rootMessages.dimensions.physint),
              ...messageValues,
            }}
          />
          <FormattedMessage
            {...messages.cpr.then.physint[range]}
            values={{
              dimension: intl.formatMessage(rootMessages.dimensions.physint),
              ...messageValues,
            }}
          />
        </PDFParagraph>
      )
    );
  }
  return null;
}
NarrativeCPR.propTypes = {
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  dimensionKey: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPR);
