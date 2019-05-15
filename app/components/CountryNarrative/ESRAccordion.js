import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box } from 'grommet';

import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';
import IndicatorPanel from './IndicatorPanel';

function ESRAccordion({
  dimension,
  dimensionKey,
  rights,
  indicators,
  benchmark,
}) {
  return (
    <Box elevation="small" margin={{ top: 'medium' }}>
      <Accordion
        buttonText={`${rights.length} rights`}
        head={
          <DimensionPanel
            dimension={dimension}
            dimensionKey={dimensionKey}
            column={benchmark.column}
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
                      buttonText={`${rightIndicators.length} indicators`}
                      head={
                        <RightPanel right={right} column={benchmark.column} />
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
                              />
                              <Box pad="medium" />
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
  );
}

ESRAccordion.propTypes = {
  dimensionKey: PropTypes.string,
  dimension: PropTypes.object,
  rights: PropTypes.array,
  indicators: PropTypes.array,
  benchmark: PropTypes.object,
};

export default ESRAccordion;
