/**
 *
 * MetricAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import styled from 'styled-components';
import { Heading, Box } from 'grommet';

import { STANDARDS } from 'containers/App/constants';
import ReadMore from 'components/ReadMore';
import rootMessages from 'messages';
import messages from './messages';

function MetricAbout({ metric, metricInfo, standard, intl, fullInfo }) {
  const { metricType } = metric;
  return (
    <Box direction="column" pad={{ left: 'medium', vertical: 'medium' }}>
      <Heading level={4} margin={{ vertical: 'xsmall' }}>
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
      {metricType === 'indicators' && metricInfo && (
        <>
          <Box>
            <Heading level={5} margin={{ vertical: 'xsmall' }}>
              <FormattedMessage {...messages.titleSource} />
            </Heading>
            <Box>
              <ul>
                {metricInfo.source.split(',').map(source => (
                  <li key={source}>
                    <FormattedMessage {...rootMessages.sources[source]} />
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box>
            <Heading level={4} margin={{ vertical: 'xsmall' }}>
              <FormattedMessage {...messages.titleStandards} />
            </Heading>
            <Box>
              {metricInfo.standard === 'Both' && (
                <ul>
                  {STANDARDS.map(s => (
                    <li key={s.key}>
                      <FormattedMessage
                        {...rootMessages.settings.standard[s.key]}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {metricInfo.standard !== 'Both' && standard && (
                <ul>
                  <li>
                    <FormattedMessage
                      {...rootMessages.settings.standard[standard.key]}
                    />
                  </li>
                </ul>
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
