import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Box } from 'grommet';
import styled from 'styled-components';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

const Styled = styled(Box)``;

const OptionButton = props => <Button plain {...props} />;

const StyledOption = styled(OptionButton)`
  padding: 5px 10px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding-left: ${({ level }) => {
    if (level === 2) {
      return 25;
    }
    if (level === 3) {
      return 40;
    }
    return 10;
  }}px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['light-4']};
`;
const StyledOptionDisabled = styled.div`
  color: ${({ theme }) => theme.global.colors.secondary};
  padding: 5px 10px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding-left: ${({ level }) => {
    if (level === 2) {
      return 25;
    }
    if (level === 3) {
      return 40;
    }
    return 10;
  }}px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['light-4']};
`;

export function MetricSelect({
  setActiveMetric,
  activeMetric,
  metrics,
  // onClose,
}) {
  // const dimensions = prepMetrics(DIMENSIONS, 'dimensions', search, intl);
  // const rights = prepMetrics(RIGHTS, 'rights', search, intl);
  // const indicators = prepMetrics(INDICATORS, 'indicators', search, intl);
  // const hasMetrics =
  //   dimensions.length > 0 || rights.length > 0 || indicators.length > 0;
  return (
    <Styled>
      {metrics.map(m => {
        const details = getMetricDetails(m.key);
        return (
          <div key={m.key}>
            {!m.disabled && (
              <StyledOption
                level={1}
                fill="horizontal"
                active={m.key === activeMetric}
                onClick={() => setActiveMetric(m.key)}
              >
                <FormattedMessage
                  {...rootMessages[details.metricType][m.key]}
                />
              </StyledOption>
            )}
            {m.disabled && (
              <StyledOptionDisabled>
                <FormattedMessage
                  {...rootMessages[details.metricType][m.key]}
                />
              </StyledOptionDisabled>
            )}
            {m.children &&
              m.children.map(m2 => {
                const details2 = getMetricDetails(m2.key);
                return (
                  <div key={m2.key}>
                    <StyledOption
                      level={2}
                      fill="horizontal"
                      active={m2.key === activeMetric}
                      onClick={() => setActiveMetric(m2.key)}
                    >
                      <FormattedMessage
                        {...rootMessages[details2.metricType][m2.key]}
                      />
                    </StyledOption>
                    {m2.children &&
                      m2.children.map(m3 => {
                        const details3 = getMetricDetails(m3.key);
                        return (
                          <div key={m3.key}>
                            <StyledOption
                              level={3}
                              fill="horizontal"
                              active={m3.key === activeMetric}
                              onClick={() => setActiveMetric(m3.key)}
                            >
                              <FormattedMessage
                                {...rootMessages[details3.metricType][m3.key]}
                              />
                            </StyledOption>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        );
      })}
    </Styled>
  );
}

MetricSelect.propTypes = {
  setActiveMetric: PropTypes.func,
  activeMetric: PropTypes.string,
  metrics: PropTypes.array,
  // onClose: PropTypes.func,
  // intl: intlShape.isRequired,
};

export default injectIntl(MetricSelect);
