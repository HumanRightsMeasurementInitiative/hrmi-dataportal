import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import HowToRead from 'containers/HowToRead';

import { lowerCase } from 'utils/string';
import rootMessages from 'messages';
import PanelAccordion from './PanelAccordion';
import DimensionMain from './DimensionMain';
import DimensionTop from './DimensionTop';
import RightMain from './RightMain';
import RightTop from './RightTop';
import IndicatorContent from './IndicatorContent';

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
                        content={
                          <IndicatorContent
                            indicators={rightIndicators}
                            benchmark={benchmark}
                            onMetricClick={onMetricClick}
                            standard={standard}
                          />
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
