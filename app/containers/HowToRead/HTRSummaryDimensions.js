import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Paragraph, Heading, Box } from 'grommet';
import { DIMENSIONS } from 'containers/App/constants';
import Bar from 'components/Bars/Bar';
import AnnotateBenchmark from 'components/Bars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';

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
          <Heading responsive={false} level={4} margin={{ bottom: 'none' }}>
            <FormattedMessage {...rootMessages.dimensions[d.key]} />
          </Heading>
          <Box direction="row" align="center">
            <Box
              width="50%"
              flex={{ shrink: 0 }}
              pad={{ left: 'small', right: 'medium' }}
            >
              <Box style={{ position: 'relative' }}>
                {d.type === 'esr' && (
                  <AnnotateBenchmark
                    tooltip={false}
                    label={intl.formatMessage(
                      rootMessages.settings.benchmark.name,
                    )}
                    above
                    align="right"
                    relative
                    left={100}
                    margin="1px"
                  />
                )}
                <Bar
                  data={{
                    value: d.type === 'cpr' ? 8 : 75,
                    unit: d.type === 'esr' ? '%' : '',
                    maxValue: d.type === 'cpr' ? 10 : 100,
                    color: d.key,
                    refValues: d.type === 'esr' && [
                      { value: 100, style: 'solid', key: 'best' },
                    ],
                  }}
                  showLabels
                />
                <AnnotateBetterWorse absolute />
              </Box>
            </Box>
            <Box width="50%" flex={{ shrink: 0 }} pad={{ left: 'medium' }}>
              <Paragraph>
                <FormattedMessage {...messages.summary.dimensions[d.key]} />
              </Paragraph>
            </Box>
          </Box>
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
