import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Drop } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

import MetricSelect from './MetricSelect';

// prettier-ignore
const ButtonDropdown = styled(Button)`
  padding: 0px 3px;
  margin: 0px 3px;
  border-bottom: 1px solid;
  background-color: transparent;
  &:hover {
    theme.global.colors[active ? 'dark-2' : 'dark-3']};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 5px;
    width: auto;
  }
`;

function ChartSettingMetrics({ activeDefault, metrics, chart, header }) {
  const [activeMetric, setActiveMetric] = useState(activeDefault);
  const [open, setOpen] = useState(false);
  const dropButton = useRef(null);
  const details = getMetricDetails(activeMetric);
  // TODO fall back to activeDefault if activeMetric not included in metrics
  return (
    <Box margin={{ bottom: 'xlarge' }}>
      {header && header({ metricCode: activeMetric })}
      <Box direction="row" margin={{ bottom: 'medium' }}>
        See how this country performs
        <ButtonDropdown
          plain
          first
          onClick={() => setOpen(!open)}
          label={
            <Box
              direction="row"
              align="center"
              justify="between"
              fill="horizontal"
              gap="xsmall"
            >
              <FormattedMessage
                {...rootMessages[details.metricType][activeMetric]}
              />
              {open && <FormUp size="large" />}
              {!open && <FormDown size="large" />}
            </Box>
          }
          ref={dropButton}
        />
        when looking at indicators/sex/over/time/at-risk data
        {open && (
          <Drop
            align={{ top: 'bottom', left: 'left' }}
            target={dropButton.current}
            onClickOutside={() => setOpen(false)}
            overflow="hidden"
          >
            <MetricSelect
              onClose={() => setOpen(false)}
              metrics={metrics}
              activeMetric={activeMetric}
              setActiveMetric={code => {
                setActiveMetric(code);
                setOpen(false);
              }}
            />
          </Drop>
        )}
      </Box>
      {chart && chart({ metricCode: activeMetric })}
    </Box>
  );
}
ChartSettingMetrics.propTypes = {
  activeDefault: PropTypes.string, // the key
  metrics: PropTypes.array, // the available metrics
  chart: PropTypes.func,
  header: PropTypes.func,
};

export default ChartSettingMetrics;
