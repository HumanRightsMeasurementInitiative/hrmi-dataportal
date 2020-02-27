import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Heading, Box, ResponsiveContext } from 'grommet';

import { DIMENSIONS } from 'containers/App/constants';
import { rightsForDimension } from 'utils/rights';
import UL from 'styled/UL';
import BarMultiple from 'components/ChartBars/BarMultiple';
import AnnotateBenchmark from 'components/ChartBars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';
import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';

const Styled = styled.div``;
const StyledUL = styled(UL)`
  margin: 2px;
  padding: 0;
`;
const StyledLI = styled.li`
  list-style: none;
`;

const randomValue = (min, max) => Math.random() * (max - min) + min;

const stackContent = size => size === 'large' || size === 'small';

function HTRSummaryRights({ intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          <HTRParagraph>
            <FormattedMessage {...messages.summary.rights.intro} />
          </HTRParagraph>
          {DIMENSIONS.map(d => {
            const rights = rightsForDimension(d.key);
            const dataMultiple = {
              color: d.key,
              unit: d.type === 'esr' ? '%' : '',
              maxValue: d.type === 'cpr' ? 10 : 100,
              data: rights.map(right => ({
                key: right.key,
                value:
                  d.type === 'cpr' ? randomValue(5, 10) : randomValue(50, 95),
                refValues: d.type === 'esr' && [
                  { value: 100, style: 'solid', key: 'best' },
                ],
              })),
            };
            return (
              <Box key={d.key} margin={{ bottom: 'medium' }} responsive={false}>
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
                  direction={stackContent(size) ? 'column' : 'row'}
                  align="start"
                  pad={{ top: 'small' }}
                  responsive={false}
                >
                  <Box
                    width={stackContent(size) ? '100%' : '50%'}
                    flex={{ shrink: 0 }}
                    pad={
                      stackContent(size)
                        ? { right: 'small' }
                        : { left: 'small', right: 'medium' }
                    }
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
                            rootMessages.settings.benchmark.nameShort,
                          )}
                          above
                          align="right"
                          relative
                          left={100}
                          margin="1px"
                        />
                      )}
                      <BarMultiple
                        dataMultiple={dataMultiple}
                        showLabels
                        totalHeight={36}
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
                      <FormattedMessage {...messages.summary.rights[d.key]} />
                    </HTRParagraph>
                  </Box>
                </Box>
                <Heading
                  responsive={false}
                  level={6}
                  margin={{ top: 'xsmall', bottom: '0' }}
                >
                  <FormattedMessage
                    {...messages.summary.rights.rightsListTitle}
                  />
                </Heading>
                <StyledUL>
                  {rights.map(r => (
                    <StyledLI key={r.key}>
                      <Text size="xsmall">
                        <FormattedMessage {...rootMessages.rights[r.key]} />
                      </Text>
                    </StyledLI>
                  ))}
                </StyledUL>
                {d.key === 'esr' && (
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
                        {...rootMessages.tooltip.benchmark.adjusted}
                      />
                    </HTRParagraph>
                    <HTRParagraph margin={{ vertical: 'xsmall' }}>
                      <span style={{ fontWeight: 600 }}>
                        {`${intl.formatMessage(
                          rootMessages.settings.benchmark.best,
                        )}: `}
                      </span>
                      <FormattedMessage
                        {...rootMessages.tooltip.benchmark.best}
                      />
                    </HTRParagraph>
                  </Box>
                )}
              </Box>
            );
          })}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

HTRSummaryRights.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRSummaryRights);
