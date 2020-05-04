import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import messages from './messages';

function NarrativeESRNoData({
  messageValues,
  showFundingNote,
  isCompAssessment,
}) {
  return (
    <Paragraph>
      {!isCompAssessment && (
        <FormattedMessage {...messages.esr.noData} values={messageValues} />
      )}
      {isCompAssessment && (
        <>
          <FormattedMessage
            {...messages.compAssessmentESR.noData}
            values={messageValues}
          />
          <FormattedMessage
            {...messages.compAssessmentESR.noDataMissingData}
            values={messageValues}
          />
          {showFundingNote && (
            <FormattedMessage
              {...messages.compAssessmentESR.noDataFunding}
              values={messageValues}
            />
          )}
        </>
      )}
    </Paragraph>
  );
}

NarrativeESRNoData.propTypes = {
  messageValues: PropTypes.object,
  showFundingNote: PropTypes.bool,
  isCompAssessment: PropTypes.bool,
};

export default NarrativeESRNoData;
