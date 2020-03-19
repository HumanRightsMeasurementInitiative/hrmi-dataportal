/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import styled from 'styled-components';
import { Box, Text } from 'grommet';

import rootMessages from 'messages';
import messages from 'containers/LayerSettings/messages';

// prettier-ignore
export function HINotes({
  showHINote,
  showHIIndicatorNote,
  showHICountryNote,
  intl,
}) {
  return (
    <Box
      direction="column"
      flex={{ shrink: 0 }}
    >
      <Box pad={{ bottom: 'xsmall' }}>
        <Text style={{ fontWeight: 600 }} size="small">
          {showHINote || showHIIndicatorNote && (
            <span>
              {`(${intl.formatMessage(
                rootMessages.labels.hiCountry,
              )}): ${intl.formatMessage(messages.hi.title)}`}
            </span>
          )}
          {showHICountryNote && (
            <FormattedMessage {...messages.hi.title} />
          )}
        </Text>
      </Box>
      <Box>
        <Text size="xsmall">
          {showHINote && (
            <FormattedMessage {...messages.hi.text} />
          )}
          {showHIIndicatorNote && (
            <FormattedMessage {...messages.hi.textIndicator} />
          )}
          {showHICountryNote && (
            <FormattedMessage {...messages.hi.text} />
          )}
        </Text>
      </Box>
    </Box>
  );
}

HINotes.propTypes = {
  inModal: PropTypes.bool,
  showHINote: PropTypes.bool,
  showHIIndicatorNote: PropTypes.bool,
  showHICountryNote: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(HINotes);
