import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import HowToRead from 'components/HowToRead';

import { lowerCase } from 'utils/string';
import rootMessages from 'messages';
import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';
import IndicatorPanel from './IndicatorPanel';

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
}) {
  return (
    <Styled margin={{ top: 'medium' }}>
      <Box alignSelf="end">
        <HowToRead
          chart="SingleBar"
          context="CountryNarrative"
          data={benchmark.key}
        />
      </Box>
      <Box elevation="small" margin={{ top: 'xsmall' }}>
        <Accordion
          buttonText={`${rights.length} rights`}
          level={1}
          head={
            <DimensionPanel
              dimension={dimension}
              column={benchmark.column}
              onMetricClick={onMetricClick}
              standard={standard}
              hasAtRisk={hasAtRisk}
              refColumns={
                // prettier-ignore
                benchmark.key === 'adjusted'
                  ? [{ value: 100, style: 'dotted', key: 'adjusted' }]
                  : [
                    { value: 100, style: 'solid', key: 'adjusted' },
                    { column: benchmark.refColumn, style: 'dotted', key: 'best' },
                  ]
              }
            />
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
                      <Accordion
                        buttonText={`${rightIndicators.length} ${lowerCase(
                          intl.formatMessage(
                            rootMessages.metricTypes.indicators,
                          ),
                        )}`}
                        level={2}
                        head={
                          <RightPanel
                            right={right}
                            column={benchmark.column}
                            onMetricClick={onMetricClick}
                            standard={standard}
                            hasAtRisk={hasAtRisk}
                            refColumns={
                              // prettier-ignore
                              benchmark.key === 'adjusted'
                                ? [{ value: 100, style: 'dotted', key: 'adjusted' }]
                                : [
                                  { value: 100, style: 'solid', key: 'adjusted' },
                                  { column: benchmark.refColumn, style: 'dotted', key: 'best' },
                                ]
                            }
                          />
                        }
                        content={
                          <div>
                            {rightIndicators.map(indicator => (
                              <Box
                                border="top"
                                direction="row"
                                key={indicator.key}
                              >
                                <IndicatorPanel
                                  indicator={indicator}
                                  column={benchmark.column}
                                  onMetricClick={onMetricClick}
                                  standard={standard}
                                  refColumns={
                                    // prettier-ignore
                                    benchmark.key === 'adjusted'
                                      ? [{ value: 100, style: 'dotted', key: 'adjusted' }]
                                      : [
                                        { value: 100, style: 'solid', key: 'adjusted' },
                                        { column: benchmark.refIndicatorColumn, style: 'dotted', key: 'best' },
                                      ]
                                  }
                                />
                                <Box width="200px" />
                              </Box>
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
};

export default injectIntl(ESRAccordion);
