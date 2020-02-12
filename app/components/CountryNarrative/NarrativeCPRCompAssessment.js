import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { compareRange, getMessageGrammar } from 'utils/narrative';
import { isCountryHighIncome, isCountryOECD } from 'utils/countries';

import { COLUMNS } from 'containers/App/constants';

import messages from './messages';

function NarrativeCPRCompAssessment({
  dimensionKey,
  country,
  countryGrammar,
  score,
  referenceScore,
  referenceCount,
  intl,
  conjunct = false,
}) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
    ),
    referenceCount,
    referenceCountLessOne: referenceCount - 1,
  };

  const isHiOECD = isCountryHighIncome(country) && isCountryOECD(country);

  return (
    <>
      {!conjunct && isHiOECD && (
        <FormattedMessage
          {...messages.compAssessmentCPR.hiOECD}
          values={messageValues}
        />
      )}
      {!conjunct && !isHiOECD && (
        <FormattedMessage
          {...messages.compAssessmentCPR.notHiOECD}
          values={messageValues}
        />
      )}
      {conjunct && (
        <FormattedMessage
          {...messages.compAssessmentCPR.conjunct}
          values={messageValues}
        />
      )}
      <strong>
        <FormattedMessage
          {...messages.compAssessment.result[
            compareRange({
              lo: score[COLUMNS.CPR.LO],
              hi: score[COLUMNS.CPR.HI],
              reference: referenceScore,
            })
          ]}
          values={messageValues}
        />
      </strong>
      <FormattedMessage
        {...messages.compAssessmentCPR.end[dimensionKey]}
        values={messageValues}
      />
      {conjunct && <span>.</span>}
    </>
  );
}
NarrativeCPRCompAssessment.propTypes = {
  conjunct: PropTypes.bool,
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  referenceCount: PropTypes.number,
  referenceScore: PropTypes.number,
  dimensionKey: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRCompAssessment);
