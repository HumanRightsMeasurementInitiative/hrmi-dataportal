import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import Bar from 'components/Bars/Bar';
import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import ButtonText from 'styled/ButtonText';

import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
`;

const getDimensionValue = (data, benchmark) => {
  if (data.score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(data.score[col]);
  }
  return false;
};

const getDimensionRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refIndicatorColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
function IndicatorPanel({
  indicator,
  benchmark,
  standard,
  onMetricClick,
  intl,
}) {
  const data = {
    ...indicator,
    color: 'esr',
    value: getDimensionValue(indicator, benchmark),
    refValues: getDimensionRefs(indicator.score, benchmark),
    maxValue: '100',
    stripes: standard === 'hi',
    unit: '%',
  };
  return (
    <Box pad={{ vertical: 'xxsmall', horizontal: 'none' }} fill="horizontal">
      <Box
        direction="row"
        align="center"
        pad={{ vertical: 'none', horizontal: 'small' }}
      >
        <ButtonTextHeading onClick={() => onMetricClick(indicator.key)}>
          <AccordionPanelHeading level={6}>
            <FormattedMessage {...rootMessages.indicators[indicator.key]} />
          </AccordionPanelHeading>
        </ButtonTextHeading>
        <TabLinks
          level={3}
          onItemClick={onMetricClick}
          items={[
            {
              key: indicator.key,
              value: 0,
              label: intl.formatMessage(rootMessages.tabs.trend),
              skip: !data.value,
            },
            {
              key: indicator.key,
              value: 1,
              label: intl.formatMessage(rootMessages.tabs.about),
            },
          ]}
        />
      </Box>
      <Box
        pad={{ top: 'ms', left: 'medium', right: 'large', bottom: 'medium' }}
        fill="horizontal"
        style={{ position: 'relative' }}
      >
        <Bar level={3} data={data} showScore showLabels />
      </Box>
    </Box>
  );
}
IndicatorPanel.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(IndicatorPanel);
