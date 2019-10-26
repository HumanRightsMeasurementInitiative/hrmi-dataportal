import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Box } from 'grommet';

import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import PanelAccordion from './PanelAccordion';
import RightMain from './RightMain';
import RightTop from './RightTop';
import IndicatorContent from './IndicatorContent';

function RightContent({
  rights,
  indicators,
  benchmark,
  onMetricClick,
  standard,
  hasAtRisk,
  intl,
  trackEvent,
  onRawChange,
  raw,
}) {
  return (
    <div>
      {rights &&
        rights.map(right => {
          const rightIndicators = indicators.filter(
            indicator => indicator.right === right.key,
          );
          return (
            <Box border="top" key={right.key}>
              <PanelAccordion
                buttonText={`${rightIndicators.length} ${lowerCase(
                  intl.formatMessage(rootMessages.metricTypes.indicators),
                )}`}
                level={2}
                top={
                  <RightTop
                    right={right}
                    benchmark={benchmark}
                    onMetricClick={onMetricClick}
                    standard={standard}
                    hasAtRisk={hasAtRisk}
                  />
                }
                main={
                  <RightMain
                    right={right}
                    benchmark={benchmark}
                    onMetricClick={onMetricClick}
                    standard={standard}
                    hasAtRisk={hasAtRisk}
                  />
                }
                onClick={open =>
                  trackEvent({
                    category: 'Data',
                    action: `${open ? 'Expand' : 'Collapse'} ESR right`,
                    value: right.key,
                  })
                }
                content={
                  <IndicatorContent
                    indicators={rightIndicators}
                    benchmark={benchmark}
                    onMetricClick={onMetricClick}
                    standard={standard}
                    raw={raw}
                    onRawChange={onRawChange}
                  />
                }
              />
            </Box>
          );
        })}
    </div>
  );
}

RightContent.propTypes = {
  onMetricClick: PropTypes.func,
  standard: PropTypes.string,
  rights: PropTypes.array,
  indicators: PropTypes.array,
  benchmark: PropTypes.object,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
  trackEvent: PropTypes.func,
  onRawChange: PropTypes.func,
  raw: PropTypes.bool,
};

export default injectIntl(RightContent);
