import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Accordion, AccordionPanel, Box } from 'grommet';

import { RIGHTS } from 'containers/App/constants';

import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';

function CPRAccordion({ dimension, dimensionKey, rights }) {
  const parentRights = rights.filter(r => typeof r.aggregate === 'undefined');
  const subrights = rights.filter(r => typeof r.aggregate !== 'undefined');
  return (
    <Box elevation="small" margin={{ top: 'medium' }}>
      <Accordion animate={false} multiple>
        <AccordionPanel
          label={
            <DimensionPanel
              dimension={dimension}
              dimensionKey={dimensionKey}
              column="mean"
            />
          }
        >
          <div>
            {parentRights &&
              parentRights.map(right => {
                const hasSubrights =
                  RIGHTS.filter(r => r.aggregate === right.key).length > 0;
                if (!hasSubrights) {
                  return (
                    <Box border="top" direction="row" key={right.key}>
                      <RightPanel key={right.key} right={right} column="mean" />
                      <Box pad="medium" />
                    </Box>
                  );
                }

                return (
                  <Box border="top" key={right.key}>
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
                        {subrights
                          .filter(r => r.aggregate === right.key)
                          .map(subright => (
                            <Box
                              border="top"
                              direction="row"
                              key={subright.key}
                            >
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
  dimension: PropTypes.object,
  rights: PropTypes.array,
};

export default CPRAccordion;
