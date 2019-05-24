import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box } from 'grommet';

import { COLUMNS } from 'containers/App/constants';

import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';

function CPRAccordion({ dimension, rights, onMetricClick }) {
  const parentRights = rights.filter(r => typeof r.aggregate === 'undefined');
  const subrights = rights.filter(r => typeof r.aggregate !== 'undefined');
  return (
    <Box elevation="small" margin={{ top: 'medium' }}>
      <Accordion
        buttonText={`${parentRights.length} rights`}
        head={
          <DimensionPanel
            dimension={dimension}
            column={COLUMNS.CPR.MEAN}
            columnLo={COLUMNS.CPR.LO}
            columnHi={COLUMNS.CPR.HI}
            onMetricClick={onMetricClick}
            hasAtRisk
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
                        onMetricClick={onMetricClick}
                        hasAtRisk
                      />
                      <Box width="200px" />
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
                          onMetricClick={onMetricClick}
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
                                onMetricClick={onMetricClick}
                                hasAtRisk
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
  );
}

CPRAccordion.propTypes = {
  onMetricClick: PropTypes.func,
  dimension: PropTypes.object,
  rights: PropTypes.array,
};

export default CPRAccordion;
