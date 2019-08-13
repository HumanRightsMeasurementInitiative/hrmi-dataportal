import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import Bar from 'components/Bars/Bar';
import BarBullet from 'components/Bars/BarBullet';
import { COLUMNS } from 'containers/App/constants';

const getDimensionValue = (type, score, benchmark) => {
  if (type === 'cpr' && score) {
    return parseFloat(score[COLUMNS.CPR.MEAN]);
  }
  if (type === 'esr' && score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(score[col]);
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

function RightMain({ right, benchmark, isSubright, standard }) {
  // console.log('right', right)
  const data = {
    ...right,
    color: right.dimension,
    value: getDimensionValue(right.type, right.score, benchmark),
    band: right.type === 'cpr' && getBand(right.score),
    refValues: right.type === 'esr' && getDimensionRefs(right.score, benchmark),
    maxValue: right.type === 'esr' ? '100' : '10',
    stripes: right.type === 'esr' && standard === 'hi',
    unit: right.type === 'esr' ? '%' : '',
  };

  return (
    <Box
      pad={{ top: 'ms', left: 'medium', right: 'large', bottom: 'medium' }}
      fill="horizontal"
      style={{ position: 'relative' }}
      responsive={false}
    >
      {right.type === 'esr' && (
        <Bar
          level={isSubright ? 3 : 2}
          data={data}
          showScore
          showLabels
          showBenchmark
          annotateBenchmarkAbove
          showAllBenchmarkAnnotations
          padAnnotateBenchmarkAbove={false}
        />
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
  );
}
RightMain.propTypes = {
  right: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  isSubright: PropTypes.bool,
};

export default RightMain;
