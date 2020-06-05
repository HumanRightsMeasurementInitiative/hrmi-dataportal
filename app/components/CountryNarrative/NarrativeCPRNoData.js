import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import messages from './messages';

function NarrativeCPRNoData({ messageValues, short }) {
  return (
    <Paragraph>
      {short && (
        <FormattedMessage {...messages.cpr.noData} values={messageValues} />
      )}
      {!short && (
        <>
          <FormattedMessage
            {...messages.compAssessmentCPR.noData}
            values={messageValues}
          />
        </>
      )}
    </Paragraph>
  );
}

NarrativeCPRNoData.propTypes = {
  messageValues: PropTypes.object,
  short: PropTypes.bool,
};

export default NarrativeCPRNoData;
