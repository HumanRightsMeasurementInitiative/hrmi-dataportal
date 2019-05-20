import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import {
  needsArticle,
  isPlural,
  compareRange,
  needsArticleRegion,
} from 'utils/narrative';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

const isCountryHighIncome = country => country.high_income_country === '1';
const isCountryOECD = country => country.OECD_country === '1';

function NarrativeCPRCompAssessment({
  dimensionKey,
  country,
  score,
  referenceScore,
  referenceCount,
  intl,
}) {
  const messageValues = {
    country: intl.formatMessage(rootMessages.countries[country.country_code]),
    region: intl.formatMessage(rootMessages.regions[country.region_code]),
    needsArticleRegion: needsArticleRegion(intl.locale, country.region_code),
    isPlural: isPlural(intl.locale, country.country_code),
    needsArticle: needsArticle(intl.locale, country.country_code),
    referenceCount,
    referenceCountLessOne: referenceCount - 1,
  };

  return (
    <>
      <Paragraph>
        {isCountryHighIncome(country) && isCountryOECD(country) && (
          <FormattedMessage
            {...messages.compAssessmentCPR.hiOECD}
            values={messageValues}
          />
        )}
        {(!isCountryHighIncome(country) || !isCountryOECD(country)) && (
          <FormattedMessage
            {...messages.compAssessmentCPR.notHiOECD}
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
      </Paragraph>
      <Paragraph>
        {` [DEBUG // scoreLo: ${score[COLUMNS.CPR.LO]} // scoreHi: ${
          score[COLUMNS.CPR.HI]
        } // referenceScore ${referenceScore}] `}
      </Paragraph>
    </>
  );
}
NarrativeCPRCompAssessment.propTypes = {
  country: PropTypes.object,
  referenceCount: PropTypes.number,
  referenceScore: PropTypes.number,
  dimensionKey: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRCompAssessment);
