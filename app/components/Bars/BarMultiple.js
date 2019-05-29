/**
 *
 * BarMultiple
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Bar from './Bar';
import AnnotateBenchmark from './AnnotateBenchmark';
import Wrapper from './styled/BarWrapper';
import MinLabel from './styled/MinLabel';
import MaxLabel from './styled/MaxLabel';
import WrapTooltip from './styled/WrapTooltip';

const PAD_BOTTOM = 1;
const PAD_TOP = 0;
const BarWrapInner = styled.div`
  padding-bottom: ${PAD_BOTTOM}px;
`;

const Styled = styled(Wrapper)`
  height: ${({ heightTotal }) => heightTotal}px;
`;

// level:
const HEIGHT = 8;

function BarMultiple({
  dataMultiple,
  showLabels,
  rotate,
  totalHeight,
  annotateBenchmarkAbove,
  scoreOnHover,
}) {
  const {
    color,
    data,
    maxValue,
    stripes = false,
    unit,
    tooltip,
    benchmark,
  } = dataMultiple;
  const barCount = data ? data.length : 1;
  const barGap = (PAD_BOTTOM + PAD_TOP) * (barCount - 1);
  const heightTotal = totalHeight || (HEIGHT + PAD_BOTTOM) * barCount;
  const heightIndividual = totalHeight
    ? barCount && (heightTotal - barGap) / barCount
    : HEIGHT;
  return (
    <Styled heightTotal={heightTotal}>
      {showLabels && <MinLabel rotate={rotate}>0</MinLabel>}
      {data &&
        data.map((datum, index, list) => (
          <BarWrapInner
            key={datum.key}
            first={index === 0}
            last={index === list.length - 1}
          >
            <Bar
              data={{
                ...datum,
                stripes,
                unit,
                maxValue,
                color,
              }}
              level={3}
              showLabels={false}
              showBenchmark={false}
              rotate={rotate}
              showIncompleteAction={false}
              height={Math.round(heightIndividual)}
              scoreOnHover={scoreOnHover}
            />
          </BarWrapInner>
        ))}
      {showLabels && !!benchmark && (
        <AnnotateBenchmark
          rotate={rotate}
          benchmarkKey={benchmark}
          above={annotateBenchmarkAbove}
          margin={annotateBenchmarkAbove ? '0px 2px' : '0'}
        />
      )}
      {showLabels && (
        <MaxLabel rotate={rotate} bottom={tooltip}>
          {unit ? `${maxValue}${unit}` : `${maxValue}`}
        </MaxLabel>
      )}
      {tooltip && <WrapTooltip>{tooltip}</WrapTooltip>}
    </Styled>
  );
}

BarMultiple.propTypes = {
  dataMultiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showLabels: PropTypes.bool,
  annotateBenchmarkAbove: PropTypes.bool,
  totalHeight: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  scoreOnHover: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default BarMultiple;
