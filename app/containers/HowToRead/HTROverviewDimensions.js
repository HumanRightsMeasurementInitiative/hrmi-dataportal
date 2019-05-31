import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Paragraph, Heading, Box } from 'grommet';
import DiamondChart from 'components/CountryPreview/DiamondChart';

import { DIMENSIONS } from 'containers/App/constants';
import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div``;

const randomValue = (min, max) => Math.random() * (max - min) + min;

const getDimensions = (d, i) => {
  const min = d.type === 'cpr' ? 5 : 50;
  const max = d.type === 'cpr' ? 10 : 100;
  return DIMENSIONS.map((dim, index) => ({
    key: dim.key,
    color: dim.key,
    value: index === i ? randomValue(min, max) : 0,
    maxValue: max,
    unit: dim.type === 'esr' ? '%' : '',
  }));
};

function HTROverviewDimensions({ intl }) {
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.overview.dimensions.intro} />
      </Paragraph>
      {DIMENSIONS.map((d, index) => (
        <span key={d.key}>
          <Heading level={4} margin={{ bottom: 'none' }}>
            <FormattedMessage {...rootMessages.dimensions[d.key]} />
          </Heading>
          <Box direction="row" align="center">
            <Box
              width="50%"
              flex={{ shrink: 0 }}
              pad={{ left: 'small', right: 'medium', vertical: 'medium' }}
            >
              <DiamondChart
                dimensions={getDimensions(d, index)}
                showLabels
                hideZeroLabels
                hoverEnabled={false}
                small
              />
            </Box>
            <Box width="50%" flex={{ shrink: 0 }} pad={{ left: 'medium' }}>
              <Paragraph>
                <FormattedMessage {...messages.overview.dimensions[d.key]} />
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

HTROverviewDimensions.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTROverviewDimensions);
