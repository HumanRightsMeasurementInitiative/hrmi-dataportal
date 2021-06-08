import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

import { compareRange, getMessageGrammar } from 'utils/narrative';
import { isCountryHighIncome, isCountryOECD } from 'utils/countries';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

import NarrativeCPRNoData from './NarrativeCPRNoData';

const PDFParagraph = styled(Paragraph)`
  @media print {
    font-size: 15px;
    line-height: 20px;
  }
`;

function NarrativeCPRCompAssessment({
  dimensionKey,
  country,
  countryGrammar,
  score,
  referenceScore,
  referenceCount,
  intl,
  comparativeGroup,
  hadSurvey,
  someRights,
}) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
      comparativeGroup === 'subregion' ? country.subregion_code : null,
    ),
    dimension: intl.formatMessage(rootMessages.dimensions[dimensionKey]),
    referenceCount,
  };
  const isHiOECD = isCountryHighIncome(country) && isCountryOECD(country);
  if (!score) {
    return (
      <NarrativeCPRNoData
        messageValues={messageValues}
        hadSurvey={hadSurvey}
        someRights={someRights}
      />
    );
  }
  return (
    <PDFParagraph>
      {isHiOECD && (
        <FormattedMessage
          {...messages.compAssessmentCPR.startHiOECD}
          values={messageValues}
        />
      )}
      {!isHiOECD && comparativeGroup === 'all' && (
        <FormattedMessage
          {...messages.compAssessmentCPR.startNotHiOECD}
          values={messageValues}
        />
      )}
      {!isHiOECD && comparativeGroup !== 'all' && (
        <FormattedMessage
          {...messages.compAssessment.start}
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
    </PDFParagraph>
  );
}
NarrativeCPRCompAssessment.propTypes = {
  dimensionKey: PropTypes.string,
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  referenceScore: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  referenceCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  comparativeGroup: PropTypes.string,
  hadSurvey: PropTypes.bool,
  someRights: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRCompAssessment);
