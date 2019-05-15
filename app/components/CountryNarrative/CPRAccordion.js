import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box } from 'grommet';

import { COLUMNS } from 'containers/App/constants';

import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';

function CPRAccordion({ dimension, dimensionKey, rights }) {
  const parentRights = rights.filter(r => typeof r.aggregate === 'undefined');
  const subrights = rights.filter(r => typeof r.aggregate !== 'undefined');
  return (
    <Box elevation="small" margin={{ top: 'medium' }}>
      <Accordion
        buttonText={`${parentRights.length} rights`}
        head={
          <DimensionPanel
            dimension={dimension}
            dimensionKey={dimensionKey}
            column={COLUMNS.CPR.MEAN}
            columnLo={COLUMNS.CPR.LO}
            columnHi={COLUMNS.CPR.HI}
          />
        }
        content={
          <div>
            {parentRights &&
              parentRights.map(right => {
                const rightSubrights = subrights.filter(
                  r => r.aggregate === right.key,
                );
                if (rightSubrights.length === 0) {
                  return (
                    <Box border="top" direction="row" key={right.key}>
                      <RightPanel
                        right={right}
                        column={COLUMNS.CPR.MEAN}
                        columnLo={COLUMNS.CPR.LO}
                        columnHi={COLUMNS.CPR.HI}
                      />
                      <Box pad="medium" />
                    </Box>
                  );
                }

                return (
                  <Box border="top" key={right.key}>
                    <Accordion
                      buttonText={`${rightSubrights.length} subrights`}
                      head={
                        <RightPanel
                          right={right}
                          column={COLUMNS.CPR.MEAN}
                          columnLo={COLUMNS.CPR.LO}
                          columnHi={COLUMNS.CPR.HI}
                        />
                      }
                      content={
                        <div>
                          {rightSubrights.map(subright => (
                            <Box
                              border="top"
                              direction="row"
                              key={subright.key}
                            >
                              <RightPanel
                                right={subright}
                                column={COLUMNS.CPR.MEAN}
                                columnLo={COLUMNS.CPR.LO}
                                columnHi={COLUMNS.CPR.HI}
                                isSubright
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

CPRAccordion.propTypes = {
  dimensionKey: PropTypes.string,
  dimension: PropTypes.object,
  rights: PropTypes.array,
};

export default CPRAccordion;
