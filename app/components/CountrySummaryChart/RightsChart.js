import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import { COLUMNS } from 'containers/App/constants';

import BarMultipleHorizontal from 'components/Bars/BarMultiple';
import DimensionTitle from './DimensionTitle';
import AnnotateBetter from './AnnotateBetter';

const BarWrap = props => <Box direction="row" {...props} align="center" />;

const getDimensionRefs = (score, standard, benchmark) => {
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
function RightsChart({ data, standard, benchmark }) {
  if (!data) return null;
  const dataMultiple = {
    color: data.dimension,
    stripes: data.type === 'esr' && standard === 'hi',
    unit: data.type === 'esr' ? '%' : '',
    maxValue: data.type === 'cpr' ? 10 : 100,
    benchmark: benchmark && benchmark.key,
    data:
      data.rights &&
      data.rights.map(right => ({
        key: right.key,
        value: getDimensionValue(right, benchmark),
        refValues:
          right.type === 'esr' &&
          getDimensionRefs(right.score, standard, benchmark),
      })),
  };
  return (
    <Box pad={{ bottom: 'medium' }}>
      <DimensionTitle dimensionKey={data.dimension} />
      <BarWrap>
        <Box
          pad={{ vertical: 'xsmall', left: 'medium', right: 'large' }}
          fill="horizontal"
          style={{ position: 'relative' }}
        >
          <BarMultipleHorizontal
            dataMultiple={dataMultiple}
            showLabels
            totalHeight={36}
            annotateBenchmarkAbove
          />
          <AnnotateBetter />
        </Box>
      </BarWrap>
    </Box>
  );
}

RightsChart.propTypes = {
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default RightsChart;
