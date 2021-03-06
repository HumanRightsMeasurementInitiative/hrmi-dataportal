/**
 *
 * BarMultiple
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Bar from './Bar';
import BarWrapper from './styled/BarWrap';
import MinLabel from './styled/MinLabel';
import MaxLabel from './styled/MaxLabel';
import WrapTooltip from './styled/WrapTooltip';

const PAD_BOTTOM = 1;
const PAD_TOP = 0;
const BarWrapInner = styled.div`
  padding-bottom: ${PAD_BOTTOM}px;
`;

const Wrapper = styled(BarWrapper)`
  height: ${({ ht }) => ht}px;
`;

// level:
const HEIGHT = 8;

function BarMultiple({
  dataMultiple,
  showLabels,
  rotate,
  totalHeight,
  heightIndividual,
  scoreOnHover,
  hasBackground,
}) {
  const {
    color,
    data,
    maxValue,
    stripes = false,
    unit,
    tooltip,
  } = dataMultiple;
  const barCount = data ? data.length : 1;
  const barGap = (PAD_BOTTOM + PAD_TOP) * (barCount - 1);
  let ht;
  let hi;
  if (totalHeight) {
    ht = totalHeight;
    hi = barCount && (ht - barGap) / barCount;
  } else {
    hi = heightIndividual - PAD_BOTTOM || HEIGHT;
    ht = (hi + PAD_BOTTOM) * barCount;
  }

  return (
    <Wrapper ht={ht}>
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
              rotate={rotate}
              showIncompleteAction={false}
              height={Math.round(hi)}
              scoreOnHover={scoreOnHover}
              hasBackground={hasBackground}
            />
          </BarWrapInner>
        ))}
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
  hasBackground: PropTypes.bool,
  totalHeight: PropTypes.number,
  heightIndividual: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  scoreOnHover: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default BarMultiple;
