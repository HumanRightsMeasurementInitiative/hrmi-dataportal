import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import HowToRead from 'components/HowToRead';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import { lowerCase } from 'utils/string';

import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import RightPanel from './RightPanel';

const Styled = styled(Box)``;

function CPRAccordion({ dimension, rights, onMetricClick, intl }) {
  const parentRights = rights.filter(r => typeof r.aggregate === 'undefined');
  const subrights = rights.filter(r => typeof r.aggregate !== 'undefined');
  return (
    <Styled margin={{ top: 'medium' }}>
      <Box alignSelf="end">
        <HowToRead type="cpr" context="accordion" />
      </Box>
      <Box elevation="small" margin={{ top: 'xsmall' }}>
        <Accordion
          buttonText={`${parentRights.length} ${lowerCase(
            intl.formatMessage(rootMessages.metricTypes.rights),
          )}`}
          level={1}
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
                        buttonText={`${rightSubrights.length} ${lowerCase(
                          intl.formatMessage(
                            rootMessages.metricTypes.subrights,
                          ),
                        )}`}
                        level={2}
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
    </Styled>
  );
}

CPRAccordion.propTypes = {
  onMetricClick: PropTypes.func,
  dimension: PropTypes.object,
  rights: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(CPRAccordion);
