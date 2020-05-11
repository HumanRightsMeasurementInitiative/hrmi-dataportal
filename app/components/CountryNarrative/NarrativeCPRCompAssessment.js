import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import { compareRange, getMessageGrammar } from 'utils/narrative';
import { isCountryHighIncome, isCountryOECD } from 'utils/countries';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

import NarrativeCPRNoData from './NarrativeCPRNoData';

function NarrativeCPRCompAssessment({
  dimensionKey,
  country,
  countryGrammar,
  comparativeScoreRange,
  referenceScore,
  referenceCount,
  intl,
  comparativeRights,
  comparativeGroup,
}) {
  const messageValues = {
    ...getMessageGrammar(
      intl,
      country.country_code,
      country.region_code,
      countryGrammar,
    ),
    physint: intl.formatMessage(rootMessages.dimensions.physint),
    empowerment: intl.formatMessage(rootMessages.dimensions.empowerment),
    referenceCount,
    referenceCountLessOne: referenceCount - 1,
  };

  const isHiOECD = isCountryHighIncome(country) && isCountryOECD(country);
  if (!comparativeScoreRange) {
    return <NarrativeCPRNoData messageValues={messageValues} />;
  }
  if (comparativeRights === 'all' && comparativeGroup === 'region') {
    return (
      <Paragraph>
        {isHiOECD && (
          <FormattedMessage
            {...messages.compAssessmentCPR.hiOECD}
            values={messageValues}
          />
        )}
        {!isHiOECD && (
          <FormattedMessage
            {...messages.compAssessmentCPR.notHiOECD}
            values={messageValues}
          />
        )}
        <strong>
          <FormattedMessage
            {...messages.compAssessment.result[
              compareRange({
                lo: comparativeScoreRange[COLUMNS.CPR.LO],
                hi: comparativeScoreRange[COLUMNS.CPR.HI],
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
    );
  }
  return (
    <Paragraph>
      {comparativeRights === 'all' && (
        <FormattedMessage
          {...messages.compAssessment.start}
          values={messageValues}
        />
      )}
      {comparativeRights === 'some' && (
        <FormattedMessage
          {...messages.compAssessment.startSome}
          values={messageValues}
        />
      )}
      {comparativeRights !== 'all' && comparativeRights !== 'some' && (
        <FormattedMessage
          {...messages.compAssessment.startOne}
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
              lo: comparativeScoreRange[COLUMNS.CPR.LO],
              hi: comparativeScoreRange[COLUMNS.CPR.HI],
              reference: referenceScore,
            })
          ]}
          values={messageValues}
        />
      </strong>
      {comparativeRights !== 'all' && comparativeRights !== 'some' && (
        <FormattedMessage
          {...messages.compAssessment.oneRight}
          values={{
            ...messageValues,
            right: intl.formatMessage(rootMessages.rights[comparativeRights]),
          }}
        />
      )}
      {isHiOECD && (
        <FormattedMessage
          {...messages.compAssessmentCPR.endHiOECD}
          values={messageValues}
        />
      )}
      {!isHiOECD && comparativeGroup === 'region' && (
        <FormattedMessage
          {...messages.compAssessmentCPR.endRegion}
          values={messageValues}
        />
      )}
      {!isHiOECD && comparativeGroup !== 'region' && (
        <FormattedMessage
          {...messages.compAssessmentCPR.endOther}
          values={messageValues}
        />
      )}
    </Paragraph>
  );
}
NarrativeCPRCompAssessment.propTypes = {
  comparativeRights: PropTypes.string,
  comparativeGroup: PropTypes.string,
  country: PropTypes.object,
  countryGrammar: PropTypes.object,
  referenceCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  referenceScore: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  dimensionKey: PropTypes.string,
  comparativeScoreRange: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRCompAssessment);
