import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Text } from 'grommet';
import { COLUMNS } from 'containers/App/constants';

import BarMultipleHorizontal from 'components/Bars/BarMultiple';
import DimensionTitle from './DimensionTitle';

const BarWrap = props => <Box direction="row" {...props} align="center" />;

const AnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  right: ${({ theme }) => theme.global.edgeSize.large};
  top: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  margin: 5px 0;
  &:after {
    content: '';
    position: absolute;
    top: -4.5px;
    right: -2px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid ${({ theme }) => theme.global.colors['dark-4']};
  }
`;
const AnnotateBetterInner = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: table;
  text-align: right;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 2px 12px;
`;

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
const getDimensionValue = (data, standard, benchmark) => {
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
  console.log(data);
  const dataMultiple = {
    color: data.dimension,
    stripes: data.type === 'esr' && standard.key === 'hi',
    unit: data.type === 'esr' ? '%' : '',
    maxValue: data.type === 'cpr' ? 10 : 100,
    benchmark: benchmark && benchmark.key,
    data:
      data.rights &&
      data.rights.map(right => ({
        key: right.key,
        value: getDimensionValue(right, standard, benchmark),
        refValues:
          right.type === 'esr' &&
          getDimensionRefs(right.score, standard, benchmark),
      })),
  };
  console.log(dataMultiple);
  return (
    <Box pad={{ bottom: 'ms' }}>
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
          />
          <AnnotateBetter>
            <AnnotateBetterInner>
              <Text size="xsmall"> Better </Text>
            </AnnotateBetterInner>
          </AnnotateBetter>
        </Box>
      </BarWrap>
    </Box>
  );
}

RightsChart.propTypes = {
  benchmark: PropTypes.string,
  standard: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default RightsChart;
