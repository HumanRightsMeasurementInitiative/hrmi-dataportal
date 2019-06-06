import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormNext } from 'grommet-icons';
import Bar from 'components/Bars/Bar';
import BarBullet from 'components/Bars/BarBullet';
import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import ButtonText from 'styled/ButtonText';
import Hidden from 'styled/Hidden';

import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
`;

const getDimensionValue = (data, benchmark) => {
  if (data.type === 'cpr' && data.score) {
    return parseFloat(data.score[COLUMNS.CPR.MEAN]);
  }
  if (data.type === 'esr' && data.score) {
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
    const col = benchmark.refColumn;
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
const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

function RightPanel({
  right,
  benchmark,
  isSubright,
  onMetricClick,
  standard,
  hasAtRisk = true,
  intl,
}) {
  const data = {
    ...right,
    color: right.dimension,
    value: getDimensionValue(right, benchmark),
    band: right.type === 'cpr' && getBand(right.score),
    refValues: right.type === 'esr' && getDimensionRefs(right.score, benchmark),
    maxValue: right.type === 'esr' ? '100' : '10',
    stripes: right.type === 'esr' && standard === 'hi',
    unit: right.type === 'esr' ? '%' : '',
  };
  return (
    <Box pad={{ vertical: 'xsmall', horizontal: 'none' }} fill="horizontal">
      <Box
        direction="row"
        align="center"
        pad={{ vertical: 'none', horizontal: 'small' }}
      >
        <ButtonTextHeading onClick={() => onMetricClick(right.key)}>
          <AccordionPanelHeading level={isSubright ? 6 : 5}>
            <FormattedMessage {...rootMessages['rights-short'][right.key]} />
            <Hidden min="medium">
              <FormNext size="large" />
            </Hidden>
          </AccordionPanelHeading>
        </ButtonTextHeading>
        <TabLinks
          level={isSubright ? 3 : 2}
          onItemClick={onMetricClick}
          items={[
            {
              key: right.key,
              value: 0,
              label: intl.formatMessage(rootMessages.tabs['people-at-risk']),
              skip: !hasAtRisk,
            },
            {
              key: right.key,
              value: hasAtRisk ? 1 : 0,
              label: intl.formatMessage(rootMessages.tabs.trend),
              skip: !data.value,
            },
            {
              key: right.key,
              value: hasAtRisk ? 2 : 1,
              label: intl.formatMessage(rootMessages.tabs.about),
            },
          ]}
        />
      </Box>
      <Box
        pad={{ top: 'ms', left: 'medium', right: 'large', bottom: 'medium' }}
        fill="horizontal"
        style={{ position: 'relative' }}
        responsive={false}
      >
        {right.type === 'esr' && (
          <Bar level={isSubright ? 3 : 2} data={data} showScore showLabels />
        )}
        {right.type === 'cpr' && (
          <BarBullet
            level={isSubright ? 3 : 2}
            data={data}
            showLabels
            showScore
            bandOnHover
          />
        )}
      </Box>
    </Box>
  );
}
RightPanel.propTypes = {
  onMetricClick: PropTypes.func,
  right: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  column: PropTypes.string,
  isSubright: PropTypes.bool,
  columnLo: PropTypes.string,
  columnHi: PropTypes.string,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
  refColumns: PropTypes.array,
};

export default injectIntl(RightPanel);
