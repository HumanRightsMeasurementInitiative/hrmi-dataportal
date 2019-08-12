import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import Bar from 'components/Bars/Bar';
import { COLUMNS } from 'containers/App/constants';

const getDimensionValue = (data, benchmark, raw) => {
  if (data.score) {
    const col = raw
      ? COLUMNS.ESR.RAW
      : (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(data.score[col]);
  }
  return false;
};

const getDimensionRefs = (data, benchmark, raw) => {
  if (raw) {
    const valueMin =
      data.details && parseFloat(data.details[COLUMNS.ESR.RAW_REF_MIN]);
    return [
      {
        value: valueMin,
        style: 'solid',
        key: 'min',
        align: valueMin < 33 ? 'left' : 'right',
      },
      {
        value: data.score && parseFloat(data.score[COLUMNS.ESR.RAW_REF]),
        style: 'dotted',
        key: 'adjusted',
        align: 'right',
      },
      {
        value:
          data.details && parseFloat(data.details[COLUMNS.ESR.RAW_REF_BEST]),
        style: 'solid',
        key: 'best',
        align: 'left',
      },
    ];
  }
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refIndicatorColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: data.score && parseFloat(data.score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
function IndicatorMain({ indicator, benchmark, standard, raw }) {
  const data = {
    ...indicator,
    color: 'esr',
    value: getDimensionValue(indicator, benchmark, raw),
    refValues: getDimensionRefs(indicator, benchmark, raw),
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
      <Bar
        level={3}
        data={data}
        showScore
        showLabels
        showBenchmark
        annotateBenchmarkAbove
        showAllBenchmarkAnnotations
        padAnnotateBenchmarkAbove={false}
      />
    </Box>
  );
}
IndicatorMain.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  raw: PropTypes.bool,
};

export default IndicatorMain;
