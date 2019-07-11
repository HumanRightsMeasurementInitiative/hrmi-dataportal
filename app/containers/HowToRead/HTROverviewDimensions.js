import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';
import DiamondChart from 'components/CountryPreview/DiamondChart';

import { DIMENSIONS } from 'containers/App/constants';
import rootMessages from 'messages';
import messages from './messages';
import HTRParagraph from './HTRParagraph';
const Styled = styled.div``;

const randomValue = (min, max) => Math.random() * (max - min) + min;

const getDimensions = (d, i) => {
  const min = d.type === 'cpr' ? 5 : 50;
  const max = d.type === 'cpr' ? 10 : 95;
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
      <HTRParagraph>
        <FormattedMessage {...messages.overview.dimensions.intro} />
      </HTRParagraph>
      {DIMENSIONS.map((d, index) => (
        <span key={d.key}>
          <Heading responsive={false} level={4} margin={{ bottom: 'none' }}>
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
              <HTRParagraph>
                <FormattedMessage {...messages.overview.dimensions[d.key]} />
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

HTROverviewDimensions.propTypes = {
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(HTROverviewDimensions);
