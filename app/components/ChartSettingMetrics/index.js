import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Drop, Text, ResponsiveContext } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';
import { truncateText } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';

import MetricSelect from './MetricSelect';

// prettier-ignore
const ButtonDropdown = styled(Button)`
  display: inline;
  padding: 0px 3px;
  margin: 0px 3px;
  border-bottom: 1px solid;
  background-color: transparent;
  font-weight: 600;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 3px;
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
  standard,
  intl,
}) {
  const [activeMetric, setActiveMetric] = useState(activeDefault);
  const [open, setOpen] = useState(false);
  const dropButton = useRef(null);

  // fall back to activeDefault if activeMetric not included in metrics
  useEffect(() => {
    if (activeMetric !== activeDefault) {
      const metricsFlat = metrics.reduce((m1, m) => {
        if (m.children) {
          const childrenFlat = m.children.reduce((m2, c) => {
            if (c.children) {
              return m2.concat(c).concat(c.children);
            }
            return m2.concat(c);
          }, []);
          return m1.concat(m).concat(childrenFlat);
        }
        return m1.concat(m);
      }, []);
      if (metricsFlat.map(m => m.key).indexOf(activeMetric) < 0) {
        setActiveMetric(activeDefault);
      }
    }
  }, [standard]);

  const details = getMetricDetails(activeMetric);

  const metricSelector = (
    <ResponsiveContext.Consumer>
      {size => (
        <Box>
          <Text size={isMinSize(size, 'large') ? 'medium' : 'small'}>
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
                        <Text
                          style={{ whiteSpace: 'nowrap', paddingRight: '5px' }}
                          size={isMinSize(size, 'large') ? 'medium' : 'small'}
                        >
                          {truncateText(
                            intl.formatMessage(
                              rootMessages[
                                details.metricType === 'indicators'
                                  ? 'subrights'
                                  : details.metricType
                              ][activeMetric],
                            ),
                            isMaxSize(size, 'sm') ? 30 : 60,
                          )}
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
                overflow="scroll"
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
      )}
    </ResponsiveContext.Consumer>
  );

  return (
    <div>
      {header && header({ metricCode: activeMetric })}
      {chart && chart({ metricCode: activeMetric, metricSelector })}
    </div>
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
  standard: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartSettingMetrics);
