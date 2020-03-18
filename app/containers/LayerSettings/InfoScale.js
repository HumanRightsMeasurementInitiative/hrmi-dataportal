import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Paragraph } from 'grommet';
import rootMessages from 'messages';

function InfoScale({ intl, size = 'small' }) {
  return (
    <div>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <FormattedMessage {...rootMessages.settings.scale.intro} />
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.scale.dimensions)}: `}
        </span>
        <span>
          {intl.formatMessage(rootMessages.settings.scale.dimensionsInfo)}
        </span>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.scale.rights)}: `}
        </span>
        <span>
          <FormattedMessage {...rootMessages.settings.scale.rightsInfo} />
        </span>
      </Paragraph>
    </div>
  );
}

InfoScale.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
  hasKey: PropTypes.bool,
};

export default injectIntl(InfoScale);
