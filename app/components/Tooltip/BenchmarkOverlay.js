import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Paragraph } from 'grommet';
import rootMessages from 'messages';

function BenchmarkOverlay({ intl, size = 'small' }) {
  return (
    <>
      <Paragraph margin={{ vertical: 'small' }} size={size}>
        <FormattedMessage {...rootMessages.tooltip.benchmark.intro} />
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.adjusted)}: `}
        </span>
        <span>
          {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
        </span>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }} size={size}>
        <span style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.best)}: `}
        </span>
        <span>
          <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
        </span>
      </Paragraph>
    </>
  );
}

BenchmarkOverlay.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
};

export default injectIntl(BenchmarkOverlay);
