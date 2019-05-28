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

const BarWrapInner = styled.div`
  padding: 1px 0;
`;

// level:
const HEIGHT = 7;

function BarMultiple({ dataMultiple, showLabels, rotate }) {
  const {
    color,
    data,
    maxValue,
    stripes = false,
    unit,
    tooltip,
    benchmark,
  } = dataMultiple;
  return (
    <Wrapper>
      {showLabels && <MinLabel rotate={rotate}>0</MinLabel>}
      {data &&
        data.map(datum => (
          <BarWrapInner key={datum.key}>
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
              rotate={rotate}
              showIncompleteAction={false}
              height={HEIGHT}
            />
          </BarWrapInner>
        ))}
      {showLabels && !!benchmark && (
        <AnnotateBenchmark rotate={rotate} benchmarkKey={benchmark} multiple />
      )}
      {showLabels && (
        <MaxLabel rotate={rotate} bottom={tooltip}>
          {unit ? `${maxValue}${unit}` : `${maxValue}`}
        </MaxLabel>
      )}
      {tooltip && <WrapTooltip>{tooltip}</WrapTooltip>}
    </Wrapper>
  );
}

BarMultiple.propTypes = {
  dataMultiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showLabels: PropTypes.bool,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default BarMultiple;
