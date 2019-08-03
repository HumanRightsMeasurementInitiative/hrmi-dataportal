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

import rootMessages from 'messages';
import messages from './messages';

const RANGE = 5;

const isCountryHighIncome = country => country.high_income_country === '1';

function NarrativeESRCompAssessment({
  benchmark,
  country,
  score,
  referenceScore,
  referenceCount,
  intl,
  countryGrammar,
}) {
  const messageValues = {
    esr: intl.formatMessage(rootMessages.dimensions.esr),
    country: intl.formatMessage(rootMessages.countries[country.country_code]),
    region: intl.formatMessage(rootMessages.regions[country.region_code]),
    needsArticleRegion: needsArticleRegion(intl.locale, country.region_code),
    isPlural: isPlural(intl.locale, countryGrammar),
    genderNumber: genderNumber(intl.locale, countryGrammar),
    needsArticle: needsArticle(intl.locale, countryGrammar),
    referenceCount,
    referenceCountLessOne: referenceCount - 1,
  };

  const rangeLo = parseFloat(score[benchmark.column]) - RANGE;
  const rangeHi = parseFloat(score[benchmark.column]) + RANGE;
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

NarrativeESRCompAssessment.propTypes = {
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  referenceCount: PropTypes.number,
  referenceScore: PropTypes.number,
  benchmark: PropTypes.object,
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRCompAssessment);
