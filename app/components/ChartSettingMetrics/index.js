import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';

function ChartSettingMetrics({ activeDefault, metrics, chart, header }) {
  const [activeMetric, setActiveMetric] = useState(activeDefault);

  // TODO fall back to activeDefault if activeMetric not included in metrics
  return (
    <Box>
      {header && header({ metricCode: activeMetric })}
      <Box direction="row">
        {metrics.map(m => (
          <div key={m.key}>
            <ButtonToggleSetting
              active={m.key === activeMetric}
              onClick={() => setActiveMetric(m.key)}
            >
              {m.key}
            </ButtonToggleSetting>
            {m.children &&
              m.children.map(m1 => (
                <div key={m1.key}>
                  <ButtonToggleSetting
                    active={m1.key === activeMetric}
                    onClick={() => setActiveMetric(m1.key)}
                  >
                    {m1.key}
                  </ButtonToggleSetting>
                  {m1.children &&
                    m1.children.map(m2 => (
                      <span key={m2.key}>
                        <ButtonToggleSetting
                          active={m2.key === activeMetric}
                          onClick={() => setActiveMetric(m2.key)}
                        >
                          {m2.key}
                        </ButtonToggleSetting>
                      </span>
                    ))}
                </div>
              ))}
          </div>
        ))}
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
