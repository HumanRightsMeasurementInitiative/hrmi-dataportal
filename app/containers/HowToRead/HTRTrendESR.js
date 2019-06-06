import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text } from 'grommet';

import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';

const Styled = styled.div``;

function HTRTrendESR({ contxt, intl }) {
  return (
    <Styled>
      <HTRParagraph>
        <FormattedMessage {...messages.trendESR.intro} />
      </HTRParagraph>
      <HTRParagraph>
        <FormattedMessage {...messages.general.benchmarkIntro} />
        <Text style={{ fontWeight: 600 }} margin={{ horizontal: 'xsmall' }}>
          <FormattedMessage {...rootMessages.settings.benchmark.name} />
        </Text>
      </HTRParagraph>
      <HTRParagraph margin={{ vertical: 'xsmall' }}>
        <Text size="small" style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.adjusted)}: `}
        </Text>
        <Text size="small">
          {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
        </Text>
      </HTRParagraph>
      <HTRParagraph margin={{ vertical: 'xsmall' }}>
        <Text size="small" style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.best)}: `}
        </Text>
        <Text size="small">
          <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
        </Text>
      </HTRParagraph>
      {contxt !== 'narrative' && (
        <HTRParagraph>
          <FormattedMessage {...messages.simpleBar.countryComparison} />
        </HTRParagraph>
      )}
    </Styled>
  );
}

HTRTrendESR.propTypes = {
  contxt: PropTypes.string,
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRTrendESR);
