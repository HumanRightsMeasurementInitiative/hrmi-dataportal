import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Paragraph, Heading } from 'grommet';

import { DIMENSIONS } from 'containers/App/constants';
import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div``;

function HTRSummaryDimensions({ intl }) {
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.summary.dimensions.intro} />
      </Paragraph>
      {DIMENSIONS.map(d => (
        <span key={d.key}>
          <Heading level={4}>
            <FormattedMessage {...rootMessages.dimensions[d.key]} />
          </Heading>
          <Paragraph>
            <FormattedMessage {...messages.summary.dimensions[d.key]} />
          </Paragraph>
          {d.key === 'esr' && (
            <>
              <Paragraph>
                <FormattedMessage {...messages.general.benchmarkIntro} />
                <Text
                  style={{ fontWeight: 600 }}
                  margin={{ horizontal: 'xsmall' }}
                >
                  <FormattedMessage {...rootMessages.settings.benchmark.name} />
                </Text>
              </Paragraph>
              <Paragraph margin={{ vertical: 'xsmall' }}>
                <Text size="small" style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.adjusted,
                  )}: `}
                </Text>
                <Text size="small">
                  {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
                </Text>
              </Paragraph>
              <Paragraph margin={{ vertical: 'xsmall' }}>
                <Text size="small" style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.best,
                  )}: `}
                </Text>
                <Text size="small">
                  <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
                </Text>
              </Paragraph>
            </>
          )}
        </span>
      ))}
    </Styled>
  );
}

HTRSummaryDimensions.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRSummaryDimensions);
