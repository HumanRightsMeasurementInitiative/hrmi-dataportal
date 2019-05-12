import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box, Accordion, AccordionPanel } from 'grommet';

import {
  getIndicatorScoresForRight,
  getRightsScoresForDimension,
} from 'utils/scores';

import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';
import IndicatorPanel from './IndicatorPanel';

function ESRAccordion({
  dimensions,
  dimensionKey,
  rights,
  indicators,
  indicatorDetails,
  benchmark,
}) {
  const dimRights = getRightsScoresForDimension(rights, dimensionKey, false);
  return (
    <Box elevation="small" margin={{ top: 'medium' }}>
      <Accordion animate={false} multiple>
        <AccordionPanel
          label={
            <DimensionPanel
              dimensions={dimensions}
              dimensionKey={dimensionKey}
              column={benchmark.column}
            />
          }
        >
          <div>
            {dimRights &&
              dimRights.map(right => (
                <Box border="top">
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
                      {getIndicatorScoresForRight(
                        indicators,
                        right.key,
                        false,
                        indicatorDetails,
                      ).map(indicator => (
                        <Box border="top" direction="row">
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
  dimensions: PropTypes.array,
  rights: PropTypes.array,
  indicators: PropTypes.array,
  indicatorDetails: PropTypes.array,
  benchmark: PropTypes.object,
};

export default ESRAccordion;
