import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Accordion, AccordionPanel, Box } from 'grommet';

import {
  getSubrightsScoresForRight,
  getRightsScoresForDimension,
} from 'utils/scores';
import { RIGHTS } from 'containers/App/constants';

import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';

function CPRAccordion({ dimensions, dimensionKey, rights }) {
  const dimRights = getRightsScoresForDimension(rights, dimensionKey, false);
  return (
    <Box elevation="small" margin={{ top: 'medium' }}>
      <Accordion animate={false} multiple>
        <AccordionPanel
          label={
            <DimensionPanel
              dimensions={dimensions}
              dimensionKey={dimensionKey}
              column="mean"
            />
          }
        >
          <div>
            {dimRights &&
              dimRights.map(right => {
                const hasSubrights =
                  RIGHTS.filter(r => r.aggregate === right.key).length > 0;
                if (!hasSubrights) {
                  return (
                    <Box border="top" direction="row">
                      <RightPanel key={right.key} right={right} column="mean" />
                      <Box pad="medium" />
                    </Box>
                  );
                }
                const subrightScores = getSubrightsScoresForRight(
                  rights,
                  right.key,
                );
                return (
                  <Box border="top">
                    <Accordion key={right.key} animate={false} multiple>
                      <AccordionPanel
                        label={
                          <RightPanel
                            key={right.key}
                            right={right}
                            column="mean"
                          />
                        }
                      >
                        {subrightScores.map(subright => (
                          <Box border="top" direction="row">
                            <RightPanel
                              key={subright.key}
                              right={subright}
                              column="mean"
                              isSubright
                            />
                            <Box pad="medium" />
                          </Box>
                        ))}
                      </AccordionPanel>
                    </Accordion>
                  </Box>
                );
              })}
          </div>
        </AccordionPanel>
      </Accordion>
    </Box>
  );
}

CPRAccordion.propTypes = {
  dimensionKey: PropTypes.string,
  dimensions: PropTypes.array,
  rights: PropTypes.array,
};

export default CPRAccordion;
