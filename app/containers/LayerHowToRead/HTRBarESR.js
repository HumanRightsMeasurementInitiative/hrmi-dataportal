import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import Bar from 'components/ChartBars/Bar';
import AnnotateBenchmark from 'components/ChartBars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';

import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';
const Styled = styled.div``;

const stackContent = size => size === 'large' || size === 'small';

function HTRBarESR({ contxt, intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          <Box
            direction={stackContent(size) ? 'column' : 'row'}
            align="center"
            responsive={false}
          >
            <Box
              width={stackContent(size) ? '100%' : '50%'}
              flex={{ shrink: 0 }}
              pad={
                stackContent(size)
                  ? { right: 'small', vertical: 'small' }
                  : { left: 'small', right: 'medium' }
              }
              responsive={false}
            >
              <Box
                style={{ position: 'relative' }}
                margin={{ bottom: 'medium' }}
                responsive={false}
              >
                <AnnotateBenchmark
                  label={intl.formatMessage(
                    rootMessages.settings.benchmark.name,
                  )}
                  type="htr"
                />
                <Bar
                  level={2}
                  data={{
                    value: 78,
                    unit: '%',
                    maxValue: 100,
                    color: 'esr',
                    refValues: [{ value: 100, style: 'solid', key: 'best' }],
                  }}
                  showLabels
                  hasBackground
                />
                <AnnotateBetterWorse absolute />
              </Box>
            </Box>
            <Box
              width={stackContent(size) ? '100%' : '50%'}
              flex={{ shrink: 0 }}
              pad={stackContent(size) ? 'none' : { left: 'medium' }}
            >
              <HTRParagraph>
                <FormattedMessage {...messages.simpleBar.intro} />
              </HTRParagraph>
            </Box>
          </Box>
          <Box margin={{ top: 'small' }} responsive={false}>
            <HTRParagraph>
              <FormattedMessage
                {...messages.general.benchmarkIntro}
                values={{
                  benchmark: (
                    <span style={{ fontWeight: 600, margin: '0 3px' }}>
                      {intl.formatMessage(rootMessages.settings.benchmark.name)}
                    </span>
                  ),
                }}
              />
            </HTRParagraph>
            <HTRParagraph margin={{ vertical: 'xsmall' }}>
              <span style={{ fontWeight: 600 }}>
                {`${intl.formatMessage(
                  rootMessages.settings.benchmark.adjusted,
                )}: `}
              </span>
              <FormattedMessage
                {...rootMessages.settings.benchmark.adjustedInfo}
              />
            </HTRParagraph>
            <HTRParagraph margin={{ vertical: 'xsmall' }}>
              <span style={{ fontWeight: 600 }}>
                {`${intl.formatMessage(
                  rootMessages.settings.benchmark.best,
                )}: `}
              </span>
              <FormattedMessage {...rootMessages.settings.benchmark.bestInfo} />
            </HTRParagraph>
          </Box>
          {contxt === 'metrics' && (
            <HTRParagraph>
              <FormattedMessage {...messages.simpleBar.countryComparison} />
            </HTRParagraph>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

HTRBarESR.propTypes = {
  contxt: PropTypes.string,
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRBarESR);
