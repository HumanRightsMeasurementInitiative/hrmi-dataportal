import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import Bar from 'components/ChartBars/Bar';
import BarBullet from 'components/ChartBars/BarBullet';
import AnnotateBetter from 'components/AnnotateBetterWorse';

import { COLUMNS } from 'containers/App/constants';

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  right: ${({ theme }) => theme.global.edgeSize.large};
  bottom: 0;
  margin-top: -4px;
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

function DimensionMain({ dimension, benchmark, standard }) {
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
      pad={{ top: 'ms', left: 'medium', right: 'large', bottom: 'medium' }}
      fill="horizontal"
      style={{ position: 'relative' }}
      responsive={false}
    >
      <WrapAnnotateBetter>
        <AnnotateBetter />
      </WrapAnnotateBetter>
      {dimension.type === 'cpr' && (
        <BarBullet data={data} showLabels showScore bandOnHover />
      )}
      {dimension.type === 'esr' && (
        <Bar
          data={data}
          showLabels
          showScore
          annotateBenchmarkAbove
          showBenchmark
          showAllBenchmarkAnnotations
          padAnnotateBenchmarkAbove={false}
        />
      )}
    </Box>
  );
}
DimensionMain.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  benchmark: PropTypes.object,
};

export default DimensionMain;
