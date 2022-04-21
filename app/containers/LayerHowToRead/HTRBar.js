import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import Bar from 'components/ChartBars/Bar';
import AnnotateBenchmark from 'components/ChartBars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';
import Grades from 'components/ChartBars/Grades';

import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';
const Styled = styled.div``;

const stackContent = size =>
  size === 'large' || size === 'small' || size === 'sm';

const grades = [
  { class: 'poor', min: 0 },
  { class: 'bad', min: 75 },
  { class: 'fair', min: 85 },
  { class: 'good', min: 95 },
];

function HTRBar({ contxt, intl, dimension }) {
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
              width={'100%'}
              flex={{ shrink: 0 }}
              pad={
                stackContent(size)
                  ? { right: 'small', vertical: 'small' }
                  : { left: 'small', right: 'medium' }
              }
              responsive={false}
            >
              <Box
                style={{ position: 'relative', border: '1px solid black' }}
                margin={{ bottom: 'medium' }}
                responsive={false}
              >
                {dimension === 'esr' && (
                  <AnnotateBenchmark
                    label={intl.formatMessage(
                      rootMessages.settings.benchmark.name,
                    )}
                    type="htr"
                  />
                )}
                <Bar
                  level={2}
                  data={{
                    value: dimension === 'esr' ? 60 : 6.0,
                    unit: dimension === 'esr' ? '%' : '',
                    maxValue: dimension === 'esr' ? 100 : 10,
                    color: dimension || 'esr',
                    refValues: dimension === 'esr' && [
                      {
                        value: 100,
                        style: 'solid',
                        key: 'best',
                      },
                    ],
                  }}
                  showLabels
                  hasBackground
                />
                <Grades grades={grades} useChartLabels={false} />
              </Box>
            </Box>
          </Box>
          <br />
          <HTRParagraph>
            <FormattedMessage
              {...messages.simpleBar.intro}
              values={{
                unit: dimension === 'esr' ? '%' : '',
                maxValue: dimension === 'esr' ? 100 : 10,
              }}
            />
          </HTRParagraph>
          {dimension === 'esr' && (
            <Box margin={{ top: 'small' }} responsive={false}>
              <HTRParagraph>
                <FormattedMessage
                  {...messages.general.benchmarkIntro}
                  values={{
                    benchmark: (
                      <span style={{ fontWeight: 600, margin: '0 3px' }}>
                        {intl.formatMessage(
                          rootMessages.settings.benchmark.name,
                        )}
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
                <FormattedMessage
                  {...rootMessages.settings.benchmark.bestInfo}
                />
              </HTRParagraph>
            </Box>
          )}
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

HTRBar.propTypes = {
  contxt: PropTypes.string,
  dimension: PropTypes.string,
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRBar);
