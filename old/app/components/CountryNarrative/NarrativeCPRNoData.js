import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { Paragraph } from 'grommet';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import messages from './messages';

function NarrativeCPRNoData ({ messageValues, hadSurvey, someRights, intl }) {
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
      <FormattedMessage
        {...messages.compAssessmentCPR.noData}
        values={messageValues}
      />
      <ButtonTextIcon
        href={intl.formatMessage(messages.compAssessmentCPR.noDataLinkURL)}
        target='_blank'
        label={intl.formatMessage(messages.compAssessmentCPR.noDataLinkAnchor)}
        gap='xsmall'
      />
    </Paragraph>
  );
}

NarrativeCPRNoData.propTypes = {
  messageValues: PropTypes.object,
  hadSurvey: PropTypes.bool,
  someRights: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRNoData);
