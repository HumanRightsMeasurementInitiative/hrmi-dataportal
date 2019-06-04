import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Paragraph, Heading, Box } from 'grommet';

import { DIMENSIONS } from 'containers/App/constants';
import { rightsForDimension } from 'utils/rights';
import UL from 'styled/UL';
import BarMultiple from 'components/Bars/BarMultiple';
import AnnotateBenchmark from 'components/Bars/AnnotateBenchmark';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';
import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div``;
const StyledUL = styled(UL)`
  margin: 2px;
  padding: 0;
`;
const StyledLI = styled.li`
  list-style: none;
`;

const randomValue = (min, max) => Math.random() * (max - min) + min;

function HTRSummaryRights({ intl }) {
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.summary.rights.intro} />
      </Paragraph>
      {DIMENSIONS.map(d => {
        const rights = rightsForDimension(d.key);
        const dataMultiple = {
          color: d.key,
          unit: d.type === 'esr' ? '%' : '',
          maxValue: d.type === 'cpr' ? 10 : 100,
          data: rights.map(right => ({
            key: right.key,
            value: d.type === 'cpr' ? randomValue(5, 10) : randomValue(50, 100),
            refValues: d.type === 'esr' && [
              { value: 100, style: 'solid', key: 'best' },
            ],
          })),
        };
        return (
          <span key={d.key}>
            <Heading level={4} margin={{ bottom: 'none' }}>
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
              <Box width="50%" flex={{ shrink: 0 }} pad={{ left: 'medium' }}>
                <Paragraph>
                  <FormattedMessage {...messages.summary.rights[d.key]} />
                </Paragraph>
              </Box>
            </Box>
            <Heading level={6} margin={{ vertical: 'xxsmall' }}>
              <FormattedMessage {...messages.summary.rights.rightsListTitle} />
            </Heading>
            <StyledUL>
              {rights.map(r => (
                <StyledLI key={r.key}>
                  <Text size="small">
                    <FormattedMessage {...rootMessages.rights[r.key]} />
                  </Text>
                </StyledLI>
              ))}
            </StyledUL>
            {d.key === 'esr' && (
              <>
                <Paragraph>
                  <FormattedMessage {...messages.general.benchmarkIntro} />
                  <Text
                    style={{ fontWeight: 600 }}
                    margin={{ horizontal: 'xsmall' }}
                  >
                    <FormattedMessage
                      {...rootMessages.settings.benchmark.name}
                    />
                  </Text>
                </Paragraph>
                <Paragraph margin={{ vertical: 'xsmall' }}>
                  <Text size="small" style={{ fontWeight: 600 }}>
                    {`${intl.formatMessage(
                      rootMessages.settings.benchmark.adjusted,
                    )}: `}
                  </Text>
                  <Text size="small">
                    {intl.formatMessage(
                      rootMessages.tooltip.benchmark.adjusted,
                    )}
                  </Text>
                </Paragraph>
                <Paragraph margin={{ vertical: 'xsmall' }}>
                  <Text size="small" style={{ fontWeight: 600 }}>
                    {`${intl.formatMessage(
                      rootMessages.settings.benchmark.best,
                    )}: `}
                  </Text>
                  <Text size="small">
                    <FormattedMessage
                      {...rootMessages.tooltip.benchmark.best}
                    />
                  </Text>
                </Paragraph>
              </>
            )}
          </span>
        );
      })}
    </Styled>
  );
}

HTRSummaryRights.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTRSummaryRights);
