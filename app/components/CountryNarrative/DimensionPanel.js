import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import BarHorizontal from 'components/Bars/Bar';
import BarBulletHorizontal from 'components/Bars/BarBullet';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import ButtonText from 'styled/ButtonText';

import AnnotateBetter from './AnnotateBetter';
import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
`;

const getDimensionValue = (data, benchmark) => {
  if (data.type === 'cpr' && data.score) {
    return data.score[COLUMNS.CPR.MEAN];
  }
  if (data.type === 'esr' && data.score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return data.score && data.score[col];
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
        value: score && score[col],
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

function DimensionPanel({
  dimension,
  benchmark,
  standard,
  onMetricClick,
  hasAtRisk = true,
  intl,
}) {
  const { key } = dimension;
  const data = {
    ...dimension,
    color: dimension.key,
    value: getDimensionValue(dimension, benchmark),
    band: dimension.type === 'cpr' && getBand(dimension.score),
    refValues:
      dimension.type === 'esr' && getDimensionRefs(dimension.score, benchmark),
    maxValue: dimension.type === 'esr' ? '100' : '10',
    stripes: dimension.type === 'esr' && standard === 'hi',
    unit: dimension.type === 'esr' ? '%' : '',
  };
  return (
    <Box pad={{ vertical: 'small', horizontal: 'none' }} fill="horizontal">
      <Box
        direction="row"
        align="center"
        pad={{ vertical: 'none', horizontal: 'small' }}
      >
        <ButtonTextHeading onClick={() => onMetricClick(key)}>
          <AccordionPanelHeading level={4}>
            <FormattedMessage {...rootMessages.dimensions[key]} />
          </AccordionPanelHeading>
        </ButtonTextHeading>
        <TabLinks
          level={1}
          onItemClick={onMetricClick}
          items={[
            {
              key,
              value: 0,
              label: intl.formatMessage(rootMessages.tabs.trend),
              skip: !data.value,
            },
            {
              key,
              value: 1,
              label: intl.formatMessage(rootMessages.tabs['people-at-risk']),
              skip: !hasAtRisk,
            },
            {
              key,
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
      >
        <AnnotateBetter />
        {dimension.type === 'cpr' && (
          <BarBulletHorizontal data={data} showLabels showScore />
        )}
        {dimension.type === 'esr' && (
          <BarHorizontal
            data={data}
            showLabels
            showScore
            annotateBenchmarkAbove
            showBenchmark={!!data.value}
            showAllBenchmarkAnnotations
          />
        )}
      </Box>
    </Box>
  );
}
DimensionPanel.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  onMetricClick: PropTypes.func,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(DimensionPanel);
