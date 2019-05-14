import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box, Accordion, AccordionPanel } from 'grommet';

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
      <Accordion animate={false} multiple>
        <AccordionPanel
          label={
            <DimensionPanel
              dimension={dimension}
              dimensionKey={dimensionKey}
              column={benchmark.column}
            />
          }
        >
          <div>
            {rights &&
              rights.map(right => (
                <Box border="top" key={right.key}>
                  <Accordion animate={false} multiple key={right.key}>
                    <AccordionPanel
                      label={
                        <RightPanel
                          key={right.key}
                          right={right}
                          column={benchmark.column}
                        />
                      }
                    >
                      {indicators
                        .filter(indicator => indicator.right === right.key)
                        .map(indicator => (
                          <Box border="top" direction="row" key={indicator.key}>
                            <IndicatorPanel
                              key={indicator.key}
                              indicator={indicator}
                              column={benchmark.column}
                            />
                            <Box pad="medium" />
                          </Box>
                        ))}
                    </AccordionPanel>
                  </Accordion>
                </Box>
              ))}
          </div>
        </AccordionPanel>
      </Accordion>
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
