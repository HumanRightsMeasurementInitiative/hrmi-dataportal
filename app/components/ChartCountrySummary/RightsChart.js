import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import { COLUMNS } from 'containers/App/constants';

import BarMultiple from 'components/ChartBars/BarMultiple';
import AnnotateBetter from 'components/AnnotateBetterWorse';
import { isMinSize } from 'utils/responsive';
import DimensionTitle from './DimensionTitle';
import RightsScoreItem from './RightsScoreItem';

const RightsScoresWrapperTable = styled.div`
  display: table;
  margin: -24px 0;
`;

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

function RightsChart({ data, standard, benchmark, scoreWidth }) {
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
    <ResponsiveContext.Consumer>
      {size => (
        <Box>
          <DimensionTitle dimensionKey={data.dimension} />
          <Box
            direction="row"
            align="center"
            style={{
              marginTop:
                isMinSize(size, 'medium') || data.type !== 'esr'
                  ? '-24px'
                  : '-6px',
            }}
          >
            <Box
              fill="horizontal"
              pad={{ vertical: '24px' }}
              responsive={false}
            >
              <Box
                pad={{ vertical: 'xsmall', left: 'medium', right: 'large' }}
                fill="horizontal"
                style={{ position: 'relative' }}
                responsive={false}
              >
                <BarMultiple
                  dataMultiple={dataMultiple}
                  showLabels
                  totalHeight={36}
                  annotateBenchmarkAbove={data.type === 'esr'}
                />
                <WrapAnnotateBetter>
                  <AnnotateBetter absolute />
                </WrapAnnotateBetter>
              </Box>
            </Box>
            <Box flex={{ shrink: 0 }} width={scoreWidth}>
              <RightsScoresWrapperTable>
                {dataMultiple.data &&
                  dataMultiple.data.map(right => (
                    <RightsScoreItem
                      key={right.key}
                      dimensionKey={data.dimension}
                      maxValue={dataMultiple.maxValue}
                      right={{
                        key: right.key,
                        value: right.value,
                      }}
                    />
                  ))}
              </RightsScoresWrapperTable>
            </Box>
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

RightsChart.propTypes = {
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  scoreWidth: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default RightsChart;
