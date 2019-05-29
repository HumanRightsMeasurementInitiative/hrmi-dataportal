import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import Bar from 'components/Bars/Bar';
import { COLUMNS } from 'containers/App/constants';
import AnnotateBetter from 'components/AnnotateBetterWorse';
import formatScoreMax from 'utils/format-score-max';
import DimensionTitle from './DimensionTitle';

const DimensionScoreWrapper = props => (
  <Box {...props} width="200px" flex={{ shrink: 0 }} />
);
const DimensionScoreText = props => <Text weight="bold" {...props} />;
const BarWrap = props => <Box direction="row" {...props} align="center" />;

const WrapAnnotateBetter = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.global.edgeSize.medium};
  right: ${({ theme }) => theme.global.edgeSize.large};
  top: 100%;
  margin-top: -4px;
`;

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

function DimensionChart({ data, benchmark, standard }) {
  if (!data) return null;
  const maxValue = data.type === 'cpr' ? 10 : 100;
  const dim = {
    ...data,
    color: data.key,
    value: getDimensionValue(data, benchmark),
    refValues: data.type === 'esr' && getDimensionRefs(data.score, benchmark),
    maxValue,
    stripes: data.type === 'esr' && standard === 'hi',
    unit: data.type === 'esr' ? '%' : '',
  };
  return (
    <Box pad={{ bottom: 'medium' }}>
      <DimensionTitle dimensionKey={data.key} />
      <BarWrap>
        <Box
          pad={{ vertical: 'xsmall', left: 'medium', right: 'large' }}
          fill="horizontal"
          style={{ position: 'relative' }}
        >
          <Bar
            data={dim}
            showLabels
            annotateBenchmarkAbove
            showBenchmark={!!dim.value}
          />
          <WrapAnnotateBetter>
            <AnnotateBetter absolute />
          </WrapAnnotateBetter>
        </Box>
        <DimensionScoreWrapper>
          <DimensionScoreText color={`${data.key}Dark`}>
            {dim.value && formatScoreMax(dim.value, maxValue)}
            {!dim.value && 'N/A'}
          </DimensionScoreText>
        </DimensionScoreWrapper>
      </BarWrap>
    </Box>
  );
}

DimensionChart.propTypes = {
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default DimensionChart;
