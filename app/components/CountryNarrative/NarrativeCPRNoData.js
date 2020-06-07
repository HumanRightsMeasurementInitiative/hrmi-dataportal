import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import messages from './messages';

function NarrativeCPRNoData({ messageValues, hadSurvey, someRights }) {
  if (someRights) {
    return (
      <Paragraph>
        <FormattedMessage
          {...messages.compAssessmentCPR.noDataButRights}
          values={messageValues}
        />
      </Paragraph>
    );
  }
  if (hadSurvey) {
    return (
      <Paragraph>
        <FormattedMessage
          {...messages.compAssessmentCPR.noDataButSurvey}
          values={messageValues}
        />
      </Paragraph>
    );
  }
  return (
    <Paragraph>
      <FormattedMessage {...messages.cpr.noData} values={messageValues} />
    </Paragraph>
  );
}

NarrativeCPRNoData.propTypes = {
  messageValues: PropTypes.object,
  hadSurvey: PropTypes.bool,
  someRights: PropTypes.bool,
};

export default NarrativeCPRNoData;
