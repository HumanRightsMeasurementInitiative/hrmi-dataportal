/**
 *
 * MetricAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Heading, Box } from 'grommet';
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
function MetricAbout({ metric, metricInfo, standard, intl, fullInfo }) {
  const { metricType } = metric;
  return (
    <Box
      direction="column"
      pad={{ left: 'medium', top: 'small', bottom: 'medium' }}
    >
      {(intl.locale === 'en' || metricType !== 'dimensions') && (
        <WrapAsideTop>
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
      )}
      {metricType === 'indicators' && metricInfo && (
        <>
          <Box>
            <Heading
              responsive={false}
              level={5}
              margin={{ vertical: 'xsmall' }}
            >
              <FormattedMessage {...messages.titleSource} />
            </Heading>
            <Box>
              <StyledUL>
                {metricInfo.source.split(',').map(source => (
                  <li key={source}>
                    <FormattedMessage {...rootMessages.sources[source]} />
                  </li>
                ))}
              </StyledUL>
            </Box>
          </Box>
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

MetricAbout.propTypes = {
  metric: PropTypes.object,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fullInfo: PropTypes.bool,
  standard: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(MetricAbout);
