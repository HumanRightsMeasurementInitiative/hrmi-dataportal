import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { compareRange, getMessageGrammar } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';

const RANGE = 5;

const isCountryHighIncome = country => country.high_income_country === '1';

function NarrativeESRCompAssessment({
  benchmark,
  country,
  dimensionScore,
  referenceScore,
  referenceCount,
  intl,
  countryGrammar,
}) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
    ),
    esr: intl.formatMessage(rootMessages.dimensions.esr),
    referenceCount,
    referenceCountLessOne: referenceCount - 1,
    dimension: intl.formatMessage(rootMessages.dimensions.esr),
  };

  if (!dimensionScore) {
    return (
      <>
        <FormattedMessage {...messages.esr.noData} values={messageValues} />
        <FormattedMessage
          {...messages.esr.noDataFunding}
          values={messageValues}
        />
      </>
    );
  }
  if (dimensionScore) {
    const rangeLo = parseFloat(dimensionScore[benchmark.column]) - RANGE;
    const rangeHi = parseFloat(dimensionScore[benchmark.column]) + RANGE;
    return (
      <>
        <FormattedMessage
          {...messages.compAssessmentESR.start}
          values={messageValues}
        />
        <strong>
          <FormattedMessage
            {...messages.compAssessment.result[
              compareRange({
                lo: rangeLo,
                hi: rangeHi,
                reference: referenceScore,
              })
            ]}
            values={messageValues}
          />
        </strong>
        {isCountryHighIncome(country) && (
          <FormattedMessage
            {...messages.compAssessmentESR.endHi}
            values={messageValues}
          />
        )}
        {!isCountryHighIncome(country) && (
          <FormattedMessage
            {...messages.compAssessmentESR.end}
            values={messageValues}
          />
        )}
      </>
    );
  }
  return null;
}

NarrativeESRCompAssessment.propTypes = {
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  referenceCount: PropTypes.number,
  referenceScore: PropTypes.number,
  benchmark: PropTypes.object,
  dimensionScore: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rightsAverageScore: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRCompAssessment);
