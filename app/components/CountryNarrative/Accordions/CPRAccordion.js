import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import HowToRead from 'containers/HowToRead';

import rootMessages from 'messages';

import { lowerCase } from 'utils/string';

import PanelAccordion from './PanelAccordion';
import PanelSimple from './PanelSimple';
import DimensionMain from './DimensionMain';
import DimensionTop from './DimensionTop';
import RightMain from './RightMain';
import RightTop from './RightTop';

const Styled = styled(Box)``;

function CPRAccordion({ dimension, rights, onMetricClick, intl, trackEvent }) {
  const parentRights = rights.filter(r => typeof r.aggregate === 'undefined');
  const subrights = rights.filter(r => typeof r.aggregate !== 'undefined');
  return (
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
        <PanelAccordion
          buttonText={`${parentRights.length} ${lowerCase(
            intl.formatMessage(rootMessages.metricTypes.rights),
          )}`}
          level={1}
          top={
            <DimensionTop
              dimension={dimension}
              onMetricClick={onMetricClick}
              hasAtRisk
            />
          }
          main={
            <DimensionMain
              dimension={dimension}
              onMetricClick={onMetricClick}
              hasAtRisk
            />
          }
          onClick={open =>
            trackEvent({
              category: 'Data',
              action: `${open ? 'Expand' : 'Collapse'} CPR dimension`,
              value: dimension.key,
            })
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
                      <PanelSimple
                        key={right.key}
                        level={2}
                        top={
                          <RightTop
                            right={right}
                            onMetricClick={onMetricClick}
                            hasAtRisk
                          />
                        }
                        main={
                          <RightMain
                            right={right}
                            onMetricClick={onMetricClick}
                            hasAtRisk
                          />
                        }
                      />
                    );
                  }

                  return (
                    <Box border="top" key={right.key}>
                      <PanelAccordion
                        buttonText={`${rightSubrights.length} ${lowerCase(
                          intl.formatMessage(
                            rootMessages.metricTypes.subrights,
                          ),
                        )}`}
                        level={2}
                        top={
                          <RightTop
                            right={right}
                            onMetricClick={onMetricClick}
                          />
                        }
                        main={
                          <RightMain
                            right={right}
                            onMetricClick={onMetricClick}
                          />
                        }
                        onClick={open =>
                          trackEvent({
                            category: 'Data',
                            action: `${open ? 'Expand' : 'Collapse'} CPR right`,
                            value: right.key,
                          })
                        }
                        content={
                          <div>
                            {rightSubrights.map(subright => (
                              <PanelSimple
                                level={3}
                                key={subright.key}
                                top={
                                  <RightTop
                                    right={subright}
                                    onMetricClick={onMetricClick}
                                    hasAtRisk
                                    isSubright
                                  />
                                }
                                main={
                                  <RightMain
                                    right={subright}
                                    onMetricClick={onMetricClick}
                                    hasAtRisk
                                    isSubright
                                  />
                                }
                              />
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
  trackEvent: PropTypes.func,
};

export default injectIntl(CPRAccordion);
