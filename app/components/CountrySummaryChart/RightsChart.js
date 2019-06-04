import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import { COLUMNS } from 'containers/App/constants';

import BarMultiple from 'components/Bars/BarMultiple';
import AnnotateBetter from 'components/AnnotateBetterWorse';
import DimensionTitle from './DimensionTitle';

const BarWrap = props => <Box direction="row" {...props} align="center" />;

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  right: ${({ theme }) => theme.global.edgeSize.large};
  top: 100%;
  margin-top: -4px;
`;

const getDimensionRefs = (score, standard, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    return [{ value: 100, style: 'solid', key: 'best' }];
  }
  return false;
};
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
          <BarMultiple
            dataMultiple={dataMultiple}
            showLabels
            totalHeight={36}
            annotateBenchmarkAbove
          />
          <WrapAnnotateBetter>
            <AnnotateBetter absolute />
          </WrapAnnotateBetter>
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
