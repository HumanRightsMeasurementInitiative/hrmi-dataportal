import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

import { compareRange, getMessageGrammar } from 'utils/narrative';

import rootMessages from 'messages';
import messages from './messages';
import NarrativeESRNoData from './NarrativeESRNoData';

const RANGE = 5;

const isCountryHighIncome = country => country.high_income_country === '1';

const PDFParagraph = styled(Paragraph)`
  @media print {
    font-size: 15px;
    line-height: 20px;
  }
`;

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
      <NarrativeESRNoData
        messageValues={messageValues}
        showFundingNote={country.subregion_code !== 'pacific'}
      />
    );
  }
  // all, some or one right
  if (comparativeScore) {
    const rangeLo = comparativeScore - RANGE;
    const rangeHi = comparativeScore + RANGE;
    return (
      <PDFParagraph>
        {isCountryHighIncome(country) && (
          <FormattedMessage
            {...messages.compAssessmentESR.startHi}
            values={messageValues}
          />
        )}
        {!isCountryHighIncome(country) && (
          <FormattedMessage
            {...messages.compAssessment.start}
            values={messageValues}
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
        {comparativeRights === 'all' && (
          <FormattedMessage
            {...messages.compAssessmentESR.endAll}
            values={messageValues}
          />
        )}
        {comparativeRights === 'some' && (
          <FormattedMessage
            {...messages.compAssessmentESR.endSome}
            values={messageValues}
          />
        )}
        {comparativeRights !== 'all' && comparativeRights !== 'some' && (
          <FormattedMessage
            {...messages.compAssessmentESR.endOne}
            values={{
              ...messageValues,
              right: intl.formatMessage(rootMessages.rights[comparativeRights]),
            }}
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
      </PDFParagraph>
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
