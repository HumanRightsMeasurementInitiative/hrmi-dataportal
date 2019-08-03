import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import {
  needsArticle,
  isPlural,
  compareRange,
  needsArticleRegion,
  genderNumber,
} from 'utils/narrative';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

const isCountryHighIncome = country => country.high_income_country === '1';
const isCountryOECD = country => country.OECD_country === '1';

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
    country: intl.formatMessage(rootMessages.countries[country.country_code]),
    region: intl.formatMessage(rootMessages.regions[country.region_code]),
    needsArticleRegion: needsArticleRegion(intl.locale, country.region_code),
    isPlural: isPlural(intl.locale, countryGrammar),
    needsArticle: needsArticle(intl.locale, countryGrammar),
    genderNumber: genderNumber(intl.locale, countryGrammar),
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
