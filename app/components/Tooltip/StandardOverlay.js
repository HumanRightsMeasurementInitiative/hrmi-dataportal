import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Text, Paragraph } from 'grommet';
import rootMessages from 'messages';

function StandardOverlay({ intl, size = 'small' }) {
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size="xsmall">
          <FormattedMessage {...rootMessages.tooltip.standard.intro} />
        </Text>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size={size} style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.standard.core)}: `}
        </Text>
        <Text size="xsmall">
          {intl.formatMessage(rootMessages.tooltip.standard.core)}
        </Text>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size={size} style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.standard.hi)}: `}
        </Text>
        <Text size={size}>
          <FormattedMessage {...rootMessages.tooltip.standard.hi} />
        </Text>
      </Paragraph>
    </>
  );
}

StandardOverlay.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
};

export default injectIntl(StandardOverlay);
