import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Paragraph } from 'grommet';

import ButtonText from 'styled/ButtonText';
import messages from './messages';

function NarrativeCPRNoData({ messageValues, intl, short }) {
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
  short: PropTypes.bool,
};

export default injectIntl(NarrativeCPRNoData);
