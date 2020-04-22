/**
 *
 * AboutMetric
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Heading, Box, AccordionPanel, Accordion } from 'grommet';
import { Down, Up } from 'grommet-icons';
import styled from 'styled-components';

import { STANDARDS } from 'containers/App/constants';
import AboutMetricSources from 'containers/AboutMetricSources';

import UL from 'styled/UL';
import ButtonIcon from 'styled/ButtonIcon';

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
}) {
  const [actives, setActive] = useState([]);
  const { metricType } = metric;
  return (
    <Box margin={{ top: 'medium' }}>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActive(newActive)}
      >
        <AccordionPanel
          header={
            <Box direction="row" gap="xsmall" align="center">
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
                {!actives.includes(0) && (
                  <ButtonIcon as="span" subtle small>
                    <Down size="small" />
                  </ButtonIcon>
                )}
                {actives.includes(0) && (
                  <ButtonIcon as="span" subtle small>
                    <Up size="small" />
                  </ButtonIcon>
                )}
              </Box>
            </Box>
          }
        >
          <Box pad="small" background="light-1">
            {rootMessages[`${metricType}-about`] && (
              <div>
                <FormattedMessage
                  {...rootMessages[`${metricType}-about`][metric.key]}
                />
              </div>
            )}
          </Box>
        </AccordionPanel>
        {metricType === 'indicators' && metricInfo && (
          <AccordionPanel
            header={
              <Box direction="row" gap="xsmall" align="center">
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
                  {!actives.includes(1) && (
                    <ButtonIcon as="span" subtle small>
                      <Down size="small" />
                    </ButtonIcon>
                  )}
                  {actives.includes(1) && (
                    <ButtonIcon as="span" subtle small>
                      <Up size="small" />
                    </ButtonIcon>
                  )}
                </Box>
              </Box>
            }
          >
            <Box pad="small" background="light-1">
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
          </AccordionPanel>
        )}
        {showSources && (
          <AccordionPanel
            header={
              <Box direction="row" gap="xsmall" align="center">
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
                  {!actives.includes(2) && (
                    <ButtonIcon as="span" subtle small>
                      <Down size="small" />
                    </ButtonIcon>
                  )}
                  {actives.includes(2) && (
                    <ButtonIcon as="span" subtle small>
                      <Up size="small" />
                    </ButtonIcon>
                  )}
                </Box>
              </Box>
            }
          >
            <AboutMetricSources
              metric={metric}
              indicatorInfo={metricInfo}
              onSelectMetric={onSelectMetric}
            />
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
};

export default AboutMetric;
