import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormNext } from 'grommet-icons';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import ButtonText from 'styled/ButtonText';
import Hidden from 'styled/Hidden';

import PanelHeading from './PanelHeading';
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

function DimensionTop({
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
    <Box
      direction="row"
      align="center"
      pad={{ vertical: 'none', horizontal: 'small' }}
    >
      <ButtonTextHeading onClick={() => onMetricClick(key)}>
        <PanelHeading level={4}>
          <FormattedMessage {...rootMessages.dimensions[key]} />
          <Hidden min="medium">
            <FormNext size="large" />
          </Hidden>
        </PanelHeading>
      </ButtonTextHeading>
      <TabLinks
        level={1}
        onItemClick={onMetricClick}
        items={[
          {
            key,
            value: 'atrisk',
            label: intl.formatMessage(rootMessages.tabs['people-at-risk']),
            skip: !hasAtRisk,
          },
          {
            key,
            value: 'trend',
            label: intl.formatMessage(rootMessages.tabs.trend),
            skip: !data.value,
          },
          {
            key,
            value: 'about',
            label: intl.formatMessage(rootMessages.tabs.about),
          },
        ]}
      />
    </Box>
  );
}
DimensionTop.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  benchmark: PropTypes.object,
  onMetricClick: PropTypes.func,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(DimensionTop);
