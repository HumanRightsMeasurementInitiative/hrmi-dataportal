/**
 *
 * MetricAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Heading, Box } from 'grommet';

import { STANDARDS } from 'containers/App/constants';
import rootMessages from 'messages';
import messages from './messages';

function MetricAbout({ metric, metricInfo, standard }) {
  const { metricType } = metric;
  return (
    <Box direction="column" pad="medium">
      <Heading level={4} margin={{ vertical: 'xsmall' }}>
        <FormattedMessage {...messages.title[metricType]} />
      </Heading>
      <Box>
        <FormattedMessage
          {...rootMessages[`${metricType}-about`][metric.key]}
        />
      </Box>
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
  standard: PropTypes.object,
};

export default MetricAbout;
