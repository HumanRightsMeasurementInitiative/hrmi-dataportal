import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import Bar from 'components/Bars/Bar';
import AnnotateBenchmark from 'components/Bars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';
import Hint from 'styled/Hint';

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
          {contxt === 'narrative' && (
            <HTRParagraph>
              <Hint italic>
                <FormattedMessage {...messages.simpleBar.drilldownHint} />
              </Hint>
            </HTRParagraph>
          )}
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
              <FormattedMessage {...rootMessages.tooltip.benchmark.adjusted} />
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
          {contxt !== 'narrative' && (
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
