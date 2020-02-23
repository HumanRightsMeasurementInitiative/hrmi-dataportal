import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import Bar from 'components/ChartBars/Bar';
import { COLUMNS } from 'containers/App/constants';

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
function IndicatorMain({ indicator, benchmark, standard }) {
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
    <Box
      pad={{ top: 'ms', left: 'medium', right: 'large', bottom: 'medium' }}
      fill="horizontal"
      style={{ position: 'relative' }}
      responsive={false}
    >
      <Bar level={3} data={data} showScore showLabels />
    </Box>
  );
}
IndicatorMain.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.object,
  standard: PropTypes.string,
};

export default IndicatorMain;
