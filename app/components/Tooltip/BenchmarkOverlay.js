import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Text, Paragraph } from 'grommet';
import rootMessages from 'messages';

function BenchmarkOverlay({ intl, size = 'small' }) {
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size="xsmall">
          <FormattedMessage {...rootMessages.tooltip.benchmark.intro} />
        </Text>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size={size} style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.adjusted)}: `}
        </Text>
        <Text size="xsmall">
          {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
        </Text>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size={size} style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.best)}: `}
        </Text>
        <Text size={size}>
          <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
        </Text>
      </Paragraph>
    </>
  );
}

BenchmarkOverlay.propTypes = {
  intl: intlShape.isRequired,
  size: PropTypes.string,
};

export default injectIntl(BenchmarkOverlay);
