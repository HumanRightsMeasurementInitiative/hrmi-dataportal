import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Paragraph } from 'grommet';
import { NewWindow } from 'grommet-icons';

import ButtonTextIcon from 'styled/ButtonTextIcon';
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
          <ButtonTextIcon
            href={intl.formatMessage(messages.compAssessmentCPR.noDataLinkURL)}
            target="_blank"
            label={intl.formatMessage(
              messages.compAssessmentCPR.noDataLinkAnchor,
            )}
            icon={<NewWindow color="dark" />}
            gap="xsmall"
          />
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
