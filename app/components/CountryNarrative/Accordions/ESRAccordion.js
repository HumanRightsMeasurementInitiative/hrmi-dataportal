import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import HowToRead from 'containers/HowToRead';

import { lowerCase } from 'utils/string';
import rootMessages from 'messages';
import PanelAccordion from './PanelAccordion';
import PanelSimple from './PanelSimple';
import DimensionMain from './DimensionMain';
import DimensionTop from './DimensionTop';
import RightMain from './RightMain';
import RightTop from './RightTop';
import IndicatorMain from './IndicatorMain';
import IndicatorTop from './IndicatorTop';

const Styled = styled(Box)``;

function ESRAccordion({
  dimension,
  rights,
  indicators,
  benchmark,
  onMetricClick,
  standard,
  hasAtRisk,
  intl,
  trackEvent,
}) {
  return (
    <Styled margin={{ bottom: 'medium' }}>
      <Box alignSelf="end">
        <HowToRead
          chart="Bar"
          contxt="narrative"
          data={benchmark.key}
          htr={`bullet-${dimension.key}`}
        />
      </Box>
      <Box elevation="small" margin={{ top: 'xsmall' }}>
        <PanelAccordion
          buttonText={`${rights.length} rights`}
          level={1}
          top={
            <DimensionTop
              dimension={dimension}
              onMetricClick={onMetricClick}
              standard={standard}
              benchmark={benchmark}
              hasAtRisk={hasAtRisk}
            />
          }
          main={
            <DimensionMain
              dimension={dimension}
              onMetricClick={onMetricClick}
              standard={standard}
              benchmark={benchmark}
              hasAtRisk={hasAtRisk}
            />
          }
          onClick={open =>
            trackEvent({
              category: 'Data',
              action: `ESR dimension ${open ? 'expand' : 'collapse'}`,
              value: dimension,
            })
          }
          content={
            <div>
              {rights &&
                rights.map(right => {
                  const rightIndicators = indicators.filter(
                    indicator => indicator.right === right.key,
                  );
                  return (
                    <Box border="top" key={right.key}>
                      <PanelAccordion
                        buttonText={`${rightIndicators.length} ${lowerCase(
                          intl.formatMessage(
                            rootMessages.metricTypes.indicators,
                          ),
                        )}`}
                        level={2}
                        top={
                          <RightTop
                            right={right}
                            benchmark={benchmark}
                            onMetricClick={onMetricClick}
                            standard={standard}
                            hasAtRisk={hasAtRisk}
                          />
                        }
                        main={
                          <RightMain
                            right={right}
                            benchmark={benchmark}
                            onMetricClick={onMetricClick}
                            standard={standard}
                            hasAtRisk={hasAtRisk}
                          />
                        }
                        onClick={open =>
                          trackEvent({
                            category: 'Data',
                            action: `ESR right ${open ? 'expand' : 'collapse'}`,
                            value: right,
                          })
                        }
                        content={
                          <div>
                            {rightIndicators.map(indicator => (
                              <PanelSimple
                                level={3}
                                key={indicator.key}
                                top={
                                  <IndicatorTop
                                    indicator={indicator}
                                    benchmark={benchmark}
                                    onMetricClick={onMetricClick}
                                    standard={standard}
                                  />
                                }
                                main={
                                  <IndicatorMain
                                    indicator={indicator}
                                    benchmark={benchmark}
                                    onMetricClick={onMetricClick}
                                    standard={standard}
                                  />
                                }
                              />
                            ))}
                          </div>
                        }
                      />
                    </Box>
                  );
                })}
            </div>
          }
        />
      </Box>
    </Styled>
  );
}

ESRAccordion.propTypes = {
  onMetricClick: PropTypes.func,
  standard: PropTypes.string,
  dimension: PropTypes.object,
  rights: PropTypes.array,
  indicators: PropTypes.array,
  benchmark: PropTypes.object,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
  trackEvent: PropTypes.func,
};

export default injectIntl(ESRAccordion);
