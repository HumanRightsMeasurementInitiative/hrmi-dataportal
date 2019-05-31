import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Paragraph, Box } from 'grommet';
import Bar from 'components/Bars/Bar';
import AnnotateBenchmark from 'components/Bars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div``;

function HTRBarESR({ contxt, intl }) {
  return (
    <Styled>
      <Box direction="row" align="center">
        <Box
          width="50%"
          flex={{ shrink: 0 }}
          pad={{ left: 'small', right: 'medium' }}
        >
          <Box style={{ position: 'relative' }}>
            <AnnotateBenchmark
              tooltip={false}
              label={intl.formatMessage(rootMessages.settings.benchmark.name)}
              above
              align="right"
              relative
              left={100}
              margin="1px"
            />
            <Bar
              level={contxt === 'narrative' ? 1 : 2}
              data={{
                value: 78,
                unit: '%',
                maxValue: 100,
                color: 'esr',
                refValues: [{ value: 100, style: 'solid', key: 'best' }],
              }}
              showLabels
            />
            <AnnotateBetterWorse absolute />
          </Box>
        </Box>
        <Box width="50%" flex={{ shrink: 0 }} pad={{ left: 'medium' }}>
          <Paragraph>
            <FormattedMessage {...messages.simpleBar.intro} />
          </Paragraph>
        </Box>
      </Box>
      <Paragraph>
        <FormattedMessage {...messages.general.benchmarkIntro} />
        <Text style={{ fontWeight: 600 }} margin={{ horizontal: 'xsmall' }}>
          <FormattedMessage {...rootMessages.settings.benchmark.name} />
        </Text>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size="small" style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.adjusted)}: `}
        </Text>
        <Text size="small">
          {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
        </Text>
      </Paragraph>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size="small" style={{ fontWeight: 600 }}>
          {`${intl.formatMessage(rootMessages.settings.benchmark.best)}: `}
        </Text>
        <Text size="small">
          <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
        </Text>
      </Paragraph>
      {contxt !== 'narrative' && (
        <Paragraph>
          <FormattedMessage {...messages.simpleBar.countryComparison} />
        </Paragraph>
      )}
    </Styled>
  );
}

HTRBarESR.propTypes = {
  contxt: PropTypes.string,
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRBarESR);
