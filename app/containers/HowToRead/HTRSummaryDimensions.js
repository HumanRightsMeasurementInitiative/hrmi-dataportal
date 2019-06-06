import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';
import { DIMENSIONS } from 'containers/App/constants';
import Bar from 'components/Bars/Bar';
import AnnotateBenchmark from 'components/Bars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';

import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';

const Styled = styled.div``;

function HTRSummaryDimensions({ intl }) {
  return (
    <Styled>
      <HTRParagraph>
        <FormattedMessage {...messages.summary.dimensions.intro} />
      </HTRParagraph>
      {DIMENSIONS.map(d => (
        <span key={d.key}>
          <Heading
            responsive={false}
            level={4}
            margin={{
              bottom: 'none',
              top: 'xsmall',
            }}
          >
            <FormattedMessage {...rootMessages.dimensions[d.key]} />
          </Heading>
          <Box
            direction="row"
            align="start"
            pad={{ top: 'small' }}
            responsive={false}
          >
            <Box
              width="50%"
              flex={{ shrink: 0 }}
              pad={{ left: 'small', right: 'medium' }}
              responsive={false}
            >
              <Box
                style={{
                  position: 'relative',
                  marginTop: d.type === 'esr' ? '26px' : 0,
                }}
                margin={{ bottom: 'medium' }}
                responsive={false}
              >
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
              <HTRParagraph>
                <FormattedMessage {...messages.summary.dimensions[d.key]} />
              </HTRParagraph>
            </Box>
          </Box>
          {d.key === 'esr' && (
            <Box margin={{ top: 'small' }} responsive={false}>
              <HTRParagraph>
                <FormattedMessage {...messages.general.benchmarkIntro} />
                <span style={{ fontWeight: 600, margin: '0 3px' }}>
                  <FormattedMessage {...rootMessages.settings.benchmark.name} />
                </span>
              </HTRParagraph>
              <HTRParagraph margin={{ vertical: 'xsmall' }}>
                <span style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.adjusted,
                  )}: `}
                </span>
                <FormattedMessage
                  {...rootMessages.tooltip.benchmark.adjusted}
                />
              </HTRParagraph>
              <HTRParagraph margin={{ vertical: 'xsmall' }}>
                <span style={{ fontWeight: 600 }}>
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark.best,
                  )}: `}
                </span>
                <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
              </HTRParagraph>
            </Box>
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
