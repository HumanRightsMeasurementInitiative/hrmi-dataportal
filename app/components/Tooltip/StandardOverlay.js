import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Paragraph } from 'grommet';
import rootMessages from 'messages';

function StandardOverlay({ intl, size = 'small' }) {
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <FormattedMessage {...rootMessages.tooltip.standard.intro} />
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.standard.core)}: `}
        </span>
        <span>{intl.formatMessage(rootMessages.tooltip.standard.core)}</span>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.standard.hi)}: `}
        </span>
        <span>
          <FormattedMessage {...rootMessages.tooltip.standard.hi} />
        </span>
      </Paragraph>
    </>
  );
}

StandardOverlay.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
};

export default injectIntl(StandardOverlay);
