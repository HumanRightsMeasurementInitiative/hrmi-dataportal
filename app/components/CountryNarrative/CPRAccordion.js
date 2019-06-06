import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import HowToRead from 'containers/HowToRead';

import rootMessages from 'messages';

import { lowerCase } from 'utils/string';
import { isMinSize } from 'utils/responsive';

import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import DimensionPanelTop from './DimensionPanelTop';
import RightPanel from './RightPanel';
import RightPanelTop from './RightPanelTop';

const Styled = styled(Box)``;

function CPRAccordion({ dimension, rights, onMetricClick, intl }) {
  const parentRights = rights.filter(r => typeof r.aggregate === 'undefined');
  const subrights = rights.filter(r => typeof r.aggregate !== 'undefined');
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled margin={{ bottom: 'medium' }}>
          <Box alignSelf="end">
            <HowToRead
              chart="Bullet"
              contxt="narrative"
              data={dimension.key}
              htr={`bullet-${dimension.key}`}
            />
          </Box>
          <Box elevation="small" margin={{ top: 'xsmall' }}>
            <Accordion
              buttonText={`${parentRights.length} ${lowerCase(
                intl.formatMessage(rootMessages.metricTypes.rights),
              )}`}
              level={1}
              top={
                <DimensionPanelTop
                  dimension={dimension}
                  onMetricClick={onMetricClick}
                  hasAtRisk
                />
              }
              head={
                <DimensionPanel
                  dimension={dimension}
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
                          <Box border="top" key={right.key}>
                            <Box
                              direction="row"
                              align="center"
                              pad={{ top: 'small', horizontal: 'none' }}
                              fill="horizontal"
                            >
                              <RightPanelTop
                                right={right}
                                onMetricClick={onMetricClick}
                                hasAtRisk
                              />
                            </Box>
                            <Box direction="row">
                              <RightPanel
                                right={right}
                                onMetricClick={onMetricClick}
                                hasAtRisk
                              />
                              <Box
                                width={
                                  isMinSize(size, 'medium') ? '200px' : '50px'
                                }
                                flex={{ shrink: 0 }}
                              />
                            </Box>
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
                            top={
                              <RightPanelTop
                                right={right}
                                onMetricClick={onMetricClick}
                              />
                            }
                            head={
                              <RightPanel
                                right={right}
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
                                      isSubright
                                      onMetricClick={onMetricClick}
                                      hasAtRisk
                                    />
                                    <Box
                                      width={
                                        isMinSize(size, 'medium')
                                          ? '200px'
                                          : '50px'
                                      }
                                      flex={{ shrink: 0 }}
                                    />
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
      )}
    </ResponsiveContext.Consumer>
  );
}

CPRAccordion.propTypes = {
  onMetricClick: PropTypes.func,
  dimension: PropTypes.object,
  rights: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(CPRAccordion);
