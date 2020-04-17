/**
 *
 * AboutMetric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Heading, Box, Text } from 'grommet';
import styled from 'styled-components';
import { STANDARDS } from 'containers/App/constants';
import ReadMore from 'components/ReadMore';
import UL from 'styled/UL';
import WrapAsideTop from 'styled/WrapAsideTop';
import rootMessages from 'messages';
import messages from './messages';

const StyledUL = styled(UL)`
  margin-top: 0;
`;
function AboutMetric({
  metric,
  metricInfo,
  standard,
  intl,
  fullInfo,
  showTitle,
  countryScoreMsg,
}) {
  const { metricType } = metric;
  return (
    <Box
      direction="column"
      pad={{ left: 'medium', top: 'small', bottom: 'medium' }}
    >
      <WrapAsideTop>
        {showTitle && (
          <Heading responsive={false} level={3}>
            <FormattedMessage {...rootMessages[metricType][metric.key]} />
          </Heading>
        )}
        {countryScoreMsg && (
          <Box>
            <Text>{countryScoreMsg}</Text>
          </Box>
        )}
        <Heading responsive={false} level={5} margin={{ vertical: 'xsmall' }}>
          <FormattedMessage {...messages.title[metricType]} />
        </Heading>
        {rootMessages[`${metricType}-about`] && fullInfo && (
          <div>
            <FormattedMessage
              {...rootMessages[`${metricType}-about`][metric.key]}
            />
          </div>
        )}
        {rootMessages[`${metricType}-about`] && !fullInfo && (
          <ReadMore
            message={intl.formatMessage(
              rootMessages[`${metricType}-about`][metric.key],
            )}
          />
        )}
      </WrapAsideTop>
      {metricType === 'indicators' && metricInfo && (
        <>
          <Box>
            <Heading
              responsive={false}
              level={5}
              margin={{ vertical: 'xsmall' }}
            >
              <FormattedMessage {...messages.titleStandards} />
            </Heading>
            <Box>
              {metricInfo.standard === 'Both' && (
                <StyledUL>
                  {STANDARDS.map(s => (
                    <li key={s.key}>
                      <FormattedMessage
                        {...rootMessages.settings.standard[s.key]}
                      />
                    </li>
                  ))}
                </StyledUL>
              )}
              {metricInfo.standard !== 'Both' && standard && (
                <StyledUL>
                  <li>
                    <FormattedMessage
                      {...rootMessages.settings.standard[standard.key]}
                    />
                  </li>
                </StyledUL>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

AboutMetric.propTypes = {
  metric: PropTypes.object,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fullInfo: PropTypes.bool,
  showTitle: PropTypes.bool,
  standard: PropTypes.object,
  intl: intlShape.isRequired,
  countryScoreMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default injectIntl(AboutMetric);
