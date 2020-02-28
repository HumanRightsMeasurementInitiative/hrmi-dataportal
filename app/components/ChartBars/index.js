import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext, Text } from 'grommet';
// import { COLUMNS } from 'containers/App/constants';

// import AnnotateBetter from 'components/AnnotateBetterWorse';
import { isMinSize } from 'utils/responsive';

import BarWrapper from './BarWrapper';
import ListHeader from './ListHeader';

const Styled = styled(Box)`
  margin: 0 auto;
`;
//
// const WrapAnnotateBetter = styled.div`
//   position: absolute;
//   left: ${({ theme }) => theme.global.edgeSize.medium};
//   right: ${({ theme }) => theme.global.edgeSize.large};
//   top: 100%;
//   margin-top: -4px;
// `;

// const getDimensionRefs = (score, standard, benchmark) => {
//   if (benchmark && benchmark.key === 'adjusted') {
//     return [{ value: 100, style: 'dotted', key: 'adjusted' }];
//   }
//   if (benchmark && benchmark.key === 'best') {
//     return [{ value: 100, style: 'solid', key: 'best' }];
//   }
//   return false;
// };
// const getDimensionValue = (data, benchmark) => {
//   if (data.type === 'cpr' && data.score) {
//     return parseFloat(data.score[COLUMNS.CPR.MEAN]);
//   }
//   if (data.type === 'esr' && data.score) {
//     const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
//     return parseFloat(data.score[col]);
//   }
//   return false;
// };

// function ChartBars({ data, standard, currentBenchmark, metric, listHeader }) {
function ChartBars({
  data,
  listHeader,
  metric,
  currentBenchmark,
  bullet,
  allowWordBreak,
  commonLabel,
  labelColor,
  padVertical,
}) {
  if (!data) return null;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          pad={{
            vertical: padVertical || 'large',
            right: isMinSize(size, 'medium') ? 'xlarge' : 'medium',
          }}
          direction="column"
          fill="horizontal"
        >
          {listHeader && (
            <ListHeader metric={metric} benchmark={currentBenchmark.key} />
          )}
          {commonLabel && <Text>{commonLabel}</Text>}
          {data.map(d => (
            <BarWrapper
              key={d.key}
              score={d}
              bullet={bullet}
              allowWordBreak={allowWordBreak}
              labelColor={labelColor}
            />
          ))}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// standard={standard}
// currentBenchmark={currentBenchmark}

ChartBars.propTypes = {
  allowWordBreak: PropTypes.bool,
  commonLabel: PropTypes.string,
  labelColor: PropTypes.string,
  padVertical: PropTypes.string,
  listHeader: PropTypes.bool,
  bullet: PropTypes.bool,
  metric: PropTypes.object,
  currentBenchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // standard: PropTypes.string,
};

export default ChartBars;
