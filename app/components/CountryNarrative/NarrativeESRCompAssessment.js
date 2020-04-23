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
  intl,
  countryGrammar,
  comparativeScore,
  comparativeRights,
  groupAverageScore,
}) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
      country.subregion_code,
    ),
    esr: intl.formatMessage(rootMessages.dimensions.esr),
    dimension: intl.formatMessage(rootMessages.dimensions.esr),
  };

  if (!comparativeScore) {
    return (
      <>
        <FormattedMessage
          {...messages.compAssessmentESR.noData}
          values={messageValues}
        />
        <FormattedMessage
          {...messages.esr.noDataFunding}
          values={messageValues}
        />
      </>
    );
  }
  // all, some or one right
  if (comparativeScore) {
    const rangeLo = comparativeScore - RANGE;
    const rangeHi = comparativeScore + RANGE;
    return (
      <>
        {comparativeRights === 'all' && (
          <FormattedMessage
            {...messages.compAssessmentESR.start}
            values={messageValues}
          />
        )}
        {comparativeRights === 'some' && (
          <FormattedMessage
            {...messages.compAssessmentESR.startSome}
            values={messageValues}
          />
        )}
        {comparativeRights !== 'all' && comparativeRights !== 'some' && (
          <FormattedMessage
            {...messages.compAssessmentESR.startOne}
            values={{
              ...messageValues,
              right: intl.formatMessage(rootMessages.rights[comparativeRights]),
            }}
          />
        )}
        <strong>
          <FormattedMessage
            {...messages.compAssessment.result[
              compareRange({
                lo: rangeLo,
                hi: rangeHi,
                reference: groupAverageScore,
              })
            ]}
            values={messageValues}
          />
        </strong>
        {comparativeRights !== 'all' && comparativeRights !== 'some' && (
          <FormattedMessage
            {...messages.compAssessmentESR.oneRight}
            values={{
              ...messageValues,
              right: intl.formatMessage(rootMessages.rights[comparativeRights]),
            }}
          />
        )}
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
        <FormattedMessage
          {...messages.compAssessmentESR.benchmarkNote}
          values={{
            benchmark: intl.formatMessage(
              rootMessages.settings.benchmark[benchmark.key],
            ),
          }}
        />
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
  comparativeScore: PropTypes.number,
  comparativeRights: PropTypes.string,
  groupAverageScore: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default injectIntl(NarrativeESRCompAssessment);
