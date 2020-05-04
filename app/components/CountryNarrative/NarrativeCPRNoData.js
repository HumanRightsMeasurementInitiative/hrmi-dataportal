import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Paragraph } from 'grommet';

import ButtonText from 'styled/ButtonText';
import messages from './messages';

function NarrativeCPRNoData({ messageValues, intl, isCompAssessment }) {
  return (
    <Paragraph>
      {!isCompAssessment && (
        <FormattedMessage {...messages.cpr.noData} values={messageValues} />
      )}
      {isCompAssessment && (
        <>
          <FormattedMessage
            {...messages.compAssessmentCPR.noData}
            values={messageValues}
          />
          <ButtonText
            target="_blank"
            href={intl.formatMessage(messages.compAssessmentCPR.noDataLinkURL)}
          >
            <FormattedMessage
              {...messages.compAssessmentCPR.noDataLinkAnchor}
            />
          </ButtonText>
        </>
      )}
    </Paragraph>
  );
}

NarrativeCPRNoData.propTypes = {
  messageValues: PropTypes.object,
  intl: intlShape.isRequired,
  isCompAssessment: PropTypes.bool,
};

export default injectIntl(NarrativeCPRNoData);
