import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Box } from 'grommet';

import { BENCHMARKS, COLUMNS } from 'containers/App/constants';
import BarMultipleHorizontal from 'components/BarMultipleHorizontal';

const BarWrap = props => (
  <Box direction="row" {...props} align="center" pad="small" />
);
const prepRightsData = rights => {
  const sorted = Object.values(rights).sort((a, b) => {
    if (a.type === 'cpr' && b.type !== 'cpr') return -1;
    if (a.type === 'esr' && b.type !== 'esr') return 1;
    if (a.type === 'cpr' && b.type === 'cpr') {
      if (a.dimension === 'empowerment' && b.dimension !== 'empowerment') {
        return -1;
      }
      if (a.dimension !== 'empowerment' && b.dimension !== 'empowerment') {
        return 1;
      }
      return 1;
    }
    return 1;
  });
  return sorted.filter(r => typeof r.aggregate === 'undefined');
};

export function DiamondChart({ dimensions, rights, benchmark }) {
  if (!dimensions && !rights) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  return (
    <>
      {dimensions && (
        <BarWrap>
          <BarMultipleHorizontal
            minValue={0}
            maxValues={[10, 10, 100]}
            data={[dimensions.empowerment, dimensions.physint, dimensions.esr]}
            level={0}
            columns={[
              COLUMNS.CPR.MEAN,
              COLUMNS.CPR.MEAN,
              currentBenchmark.column,
            ]}
          />
        </BarWrap>
      )}
      {rights && (
        <>
          <BarWrap>
            <BarMultipleHorizontal
              minValue={0}
              maxValues={[10, 10, 10, 10, 10, 10, 10, 100, 100, 100, 100, 100]}
              data={prepRightsData(rights)}
              level={0}
              columns={[
                COLUMNS.CPR.MEAN,
                COLUMNS.CPR.MEAN,
                COLUMNS.CPR.MEAN,
                COLUMNS.CPR.MEAN,
                COLUMNS.CPR.MEAN,
                COLUMNS.CPR.MEAN,
                COLUMNS.CPR.MEAN,
                currentBenchmark.column,
                currentBenchmark.column,
                currentBenchmark.column,
                currentBenchmark.column,
                currentBenchmark.column,
              ]}
            />
          </BarWrap>
        </>
      )}
    </>
  );
}

DiamondChart.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  rights: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dimensions: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default DiamondChart;
