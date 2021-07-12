import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import DropOption from 'styled/DropOption';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

const Styled = styled.div``;

// const OptionButton = props => <Button plain {...props} />;
// prettier-ignore
const StyledOption = styled(DropOption)`
  padding-left: ${({ level }) => {
    if (level === 2) {
      return 15;
    }
    if (level === 3) {
      return 20;
    }
    return 10;
  }}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-left: ${({ level }) => {
    if (level === 2) {
      return 22;
    }
    if (level === 3) {
      return 32;
    }
    return 12;
  }}px;
  }
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
        console.log({ m });
        return (
          <div key={m.key}>
            {!m.disabled && (
              <StyledOption
                level={1}
                fill="horizontal"
                active={m.key === activeMetric}
                disabled={m.key === activeMetric}
                onClick={() => setActiveMetric(m.key)}
                noBorderLast
              >
                <FormattedMessage
                  {...rootMessages[details.metricType][m.key]}
                />
              </StyledOption>
            )}
            {m.disabled && (
              <StyledOption disabled noBorderLast>
                <FormattedMessage
                  {...rootMessages[details.metricType][m.key]}
                />
              </StyledOption>
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
                      disabled={m2.key === activeMetric}
                      onClick={() => setActiveMetric(m2.key)}
                      noBorderLast
                    >
                      <FormattedMessage
                        {...rootMessages[details2.metricType][m2.key]}
                      />
                    </StyledOption>
                    {m2.children &&
                      m2.children.map(m3 => (
                        <div key={m3.key}>
                          <StyledOption
                            level={3}
                            fill="horizontal"
                            active={m3.key === activeMetric}
                            disabled={m3.key === activeMetric}
                            onClick={() => setActiveMetric(m3.key)}
                            noBorderLast
                          >
                            <FormattedMessage
                              {...rootMessages.subrights[m3.key]}
                            />
                          </StyledOption>
                        </div>
                      ))}
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
