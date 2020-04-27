import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Drop, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';
import messages from './messages';

import MetricSelect from './MetricSelect';

// &:hover {
//   theme.global.colors[active ? 'dark-2' : 'dark-3']};
// }
// prettier-ignore
const ButtonDropdown = styled(Button)`
  display: inline;
  padding: 0px 3px;
  margin: 0px 3px;
  border-bottom: 1px solid;
  background-color: transparent;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 5px;
    width: auto;
  }
`;

function ChartSettingMetrics({
  activeDefault,
  metrics,
  chart,
  header,
  chartId = 'indicators',
  countryMessageValues,
  noOfScores,
}) {
  const [activeMetric, setActiveMetric] = useState(activeDefault);
  const [open, setOpen] = useState(false);
  const dropButton = useRef(null);

  // fall back to activeDefault if activeMetric not included in metrics
  useEffect(() => {
    if (activeMetric !== activeDefault) {
      const inMetrics = metrics.reduce((pass, m) => {
        if (m.key === activeMetric) return true;
        if (
          m.children &&
          m.children.reduce(
            (pass2, c) => pass2 || c.key === activeMetric,
            false,
          )
        ) {
          return true;
        }
        return pass;
      }, false);
      if (!inMetrics) {
        setActiveMetric(activeDefault);
      }
    }
  }, [metrics]);

  const details = getMetricDetails(activeMetric);
  return (
    <Box margin={{ bottom: 'xlarge' }}>
      {header && header({ metricCode: activeMetric })}
      <Box margin={{ bottom: 'small' }}>
        <Text size="medium">
          <FormattedMessage
            {...messages[chartId]}
            values={{
              no: noOfScores,
              hasMany: noOfScores !== 1,
              ...countryMessageValues,
              dropdown: (
                <ButtonDropdown
                  plain
                  first
                  onClick={() => setOpen(!open)}
                  label={
                    <span>
                      <Text style={{ whiteSpace: 'nowrap' }}>
                        <FormattedMessage
                          {...rootMessages[details.metricType][activeMetric]}
                        />
                      </Text>
                      {open && <FormUp size="large" />}
                      {!open && <FormDown size="large" />}
                    </span>
                  }
                  ref={dropButton}
                />
              ),
            }}
          />
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
        </Text>
      </Box>
      {chart && chart({ metricCode: activeMetric })}
    </Box>
  );
}
ChartSettingMetrics.propTypes = {
  activeDefault: PropTypes.string, // the key
  chartId: PropTypes.string, // the key
  metrics: PropTypes.array, // the available metrics
  chart: PropTypes.func,
  header: PropTypes.func,
  countryMessageValues: PropTypes.object,
  noOfScores: PropTypes.number,
};

export default ChartSettingMetrics;
