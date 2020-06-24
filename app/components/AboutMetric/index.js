/**
 *
 * AboutMetric
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Heading, Box, AccordionPanel, Accordion, Text } from 'grommet';
import { Down, Up } from 'grommet-icons';
import styled from 'styled-components';

import { STANDARDS } from 'containers/App/constants';
import AboutMetricSources from 'containers/AboutMetricSources';

import UL from 'styled/UL';

import rootMessages from 'messages';
import messages from './messages';

const StyledUL = styled(UL)`
  margin-top: 0;
`;
function AboutMetric({
  metric,
  metricInfo,
  standard,
  showSources,
  onSelectMetric,
  dateRange,
  countryCode,
}) {
  const [actives, setActive] = useState([]);
  const { metricType } = metric;
  const hasAbout = rootMessages[`${metricType}-about`];
  const hasIndicator = metricType === 'indicators' && metricInfo;
  const aboutIndex = 0;
  const indicatorIndex = hasIndicator && hasAbout ? 1 : 0;
  const sourceIndex = aboutIndex + indicatorIndex + 1;

  return (
    <Box margin={{ top: 'medium' }}>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActive(newActive)}
      >
        {hasAbout && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={5}
                    margin={{ vertical: 'xsmall' }}
                  >
                    <FormattedMessage {...messages.title[metricType]} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(aboutIndex) && <Down size="small" />}
                  {actives.includes(aboutIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              <Text>
                <FormattedMessage
                  {...rootMessages[`${metricType}-about`][metric.key]}
                />
              </Text>
            </Box>
          </AccordionPanel>
        )}
        {hasIndicator && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={5}
                    margin={{ vertical: 'xsmall' }}
                  >
                    <FormattedMessage {...messages.titleStandards} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(indicatorIndex) && <Down size="small" />}
                  {actives.includes(indicatorIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
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
                <FormattedMessage
                  {...rootMessages.settings.standard[standard.key]}
                />
              )}
            </Box>
          </AccordionPanel>
        )}
        {showSources && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={5}
                    margin={{ vertical: 'xsmall' }}
                  >
                    {metricType === 'indicators' && (
                      <FormattedMessage {...messages.titleSource} />
                    )}
                    {metricType !== 'indicators' && (
                      <FormattedMessage {...messages.titleSourcesByIndicator} />
                    )}
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(sourceIndex) && <Down size="small" />}
                  {actives.includes(sourceIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              <AboutMetricSources
                metric={metric}
                indicatorInfo={metricInfo}
                onSelectMetric={onSelectMetric}
                countryCode={countryCode}
                dateRange={dateRange}
              />
            </Box>
          </AccordionPanel>
        )}
      </Accordion>
    </Box>
  );
}

AboutMetric.propTypes = {
  metric: PropTypes.object,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.object,
  showSources: PropTypes.bool,
  onSelectMetric: PropTypes.func,
  countryCode: PropTypes.string,
  dateRange: PropTypes.object,
};

export default AboutMetric;
