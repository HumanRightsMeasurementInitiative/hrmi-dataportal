import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import messages from './messages';

function NarrativeCPRNoData({ messageValues, hadSurvey }) {
  return (
    <Paragraph>
      {!hadSurvey && (
        <FormattedMessage {...messages.cpr.noData} values={messageValues} />
      )}
      {hadSurvey && (
        <FormattedMessage
          {...messages.compAssessmentCPR.noDataButSurvey}
          values={messageValues}
        />
      )}
    </Paragraph>
  );
}

NarrativeCPRNoData.propTypes = {
  messageValues: PropTypes.object,
  hadSurvey: PropTypes.bool,
};

export default NarrativeCPRNoData;
