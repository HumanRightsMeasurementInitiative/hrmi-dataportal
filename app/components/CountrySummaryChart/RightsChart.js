import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import BarMultipleHorizontal from 'components/BarMultipleHorizontal';
import DimensionTitle from './DimensionTitle';

const BarWrap = props => <Box direction="row" {...props} align="center" />;

function RightsChart({
  dimensionKey,
  column,
  maxValue,
  data,
  unit = '',
  standard,
  refColumns,
}) {
  return (
    <Box>
      <DimensionTitle dimensionKey={dimensionKey} />
      <BarWrap>
        <BarMultipleHorizontal
          color={dimensionKey}
          minValue={0}
          maxValue={maxValue}
          unit={unit}
          data={data}
          column={column}
          refData={refColumns}
          stripes={dimensionKey === 'esr' && standard === 'hi'}
        />
      </BarWrap>
    </Box>
  );
}

RightsChart.propTypes = {
  dimensionKey: PropTypes.string,
  refColumns: PropTypes.array,
  column: PropTypes.string,
  standard: PropTypes.string,
  unit: PropTypes.string,
  maxValue: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default RightsChart;
