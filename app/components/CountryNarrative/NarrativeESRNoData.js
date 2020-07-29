import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import messages from './messages';

function NarrativeESRNoData({ messageValues, showFundingNote, short }) {
  return (
    <Paragraph>
      {short && (
        <FormattedMessage {...messages.esr.noData} values={messageValues} />
      )}
      {!short && (
        <>
          <FormattedMessage
            {...messages.compAssessmentESR.noData}
            values={messageValues}
          />
          <span style={{ marginLeft: '5px' }} />
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
  short: PropTypes.bool,
};

export default NarrativeESRNoData;
