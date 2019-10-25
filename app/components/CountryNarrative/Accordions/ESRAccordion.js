import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

import HowToRead from 'containers/HowToRead';

import PanelAccordion from './PanelAccordion';
import DimensionMain from './DimensionMain';
import DimensionTop from './DimensionTop';
import RightContent from './RightContent';

const Styled = styled(Box)``;

function ESRAccordion({
  dimension,
  rights,
  indicators,
  benchmark,
  onMetricClick,
  standard,
  hasAtRisk,
  trackEvent,
}) {
  return (
    <Styled margin={{ bottom: 'medium' }}>
      <Box alignSelf="end">
        <HowToRead
          chart="Bar"
          contxt="narrative"
          data={benchmark.key}
          htr={`bullet-${dimension.key}`}
        />
      </Box>
      <Box elevation="small" margin={{ top: 'xsmall' }}>
        <PanelAccordion
          buttonText={`${rights.length} rights`}
          level={1}
          top={
            <DimensionTop
              dimension={dimension}
              onMetricClick={onMetricClick}
              standard={standard}
              benchmark={benchmark}
              hasAtRisk={hasAtRisk}
            />
          }
          main={
            <DimensionMain
              dimension={dimension}
              onMetricClick={onMetricClick}
              standard={standard}
              benchmark={benchmark}
              hasAtRisk={hasAtRisk}
            />
          }
          onClick={open =>
            trackEvent({
              category: 'Data',
              action: `${open ? 'Expand' : 'Collapse'} ESR dimension`,
              value: dimension.key,
            })
          }
          content={
            <RightContent
              rights={rights}
              indicators={indicators}
              benchmark={benchmark}
              onMetricClick={onMetricClick}
              standard={standard}
              hasAtRisk={hasAtRisk}
              trackEvent={trackEvent}
            />
          }
        />
      </Box>
    </Styled>
  );
}

ESRAccordion.propTypes = {
  onMetricClick: PropTypes.func,
  standard: PropTypes.string,
  dimension: PropTypes.object,
  rights: PropTypes.array,
  indicators: PropTypes.array,
  benchmark: PropTypes.object,
  hasAtRisk: PropTypes.bool,
  trackEvent: PropTypes.func,
};

export default ESRAccordion;
