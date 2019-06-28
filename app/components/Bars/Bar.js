/**
 *
 * Bar
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getNoDataMessage, getIncompleteDataActionMessage } from 'utils/scores';
import NoDataHint from 'components/NoDataHint';

import Wrapper from './styled/BarWrapper';
import MinLabel from './styled/MinLabel';
import MaxLabelOriginal from './styled/MaxLabel';
import AnnotateBenchmark from './AnnotateBenchmark';
import WrapTooltip from './styled/WrapTooltip';
import Score from './styled/Score';
const MaxLabel = styled(MaxLabelOriginal)`
  top: ${({ bottom }) => (bottom ? 105 : 50)}%;
`;

const BarWrapper = styled.div``;

const BarReference = styled.div`
  position: relative;
  display: block;
  height: ${props => props.height}px;
  width: 100%;
  background-color: ${props =>
    props.noData ? 'transparent' : props.theme.global.colors['light-2']};
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: transparent;
`;

const BarNoValue = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: ${props => props.height}px;
  width: 100%;
  border: 1px solid;
  border-color: ${props => props.theme.global.colors['light-4']};
`;

// prettier-ignore
const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: -1px;
  height: ${props => props.height}px;
  background-color: ${props =>
    props.stripes ? 'transparent' : props.theme.global.colors[props.color]};
  opacity: ${props => props.active ? 0.8 : 1};
  ${props =>
    props.stripes &&
    css`
      background-image: linear-gradient(
        135deg,
        ${props.theme.global.colors[props.color]} 30%,
        ${props.theme.global.colors[`${props.color}Trans`]} 30%,
        ${props.theme.global.colors[`${props.color}Trans`]} 50%,
        ${props.theme.global.colors[props.color]} 50%,
        ${props.theme.global.colors[props.color]} 80%,
        ${props.theme.global.colors[`${props.color}Trans`]} 80%,
        ${props.theme.global.colors[`${props.color}Trans`]} 100%
      );
      background-size: 5px 5px;
      background-repeat: repeat;
    `}
`;
// prettier-ignore
const MarkValue = styled.div`
  position: absolute;
  width: 3px;
  ${({ lineStyle }) => lineStyle === 'solid'
    ? css`
      top: -1px;
      height: ${props => props.height}px;
      margin-left: -1.5px;
      border-right: 1px solid;
      border-color: ${props => props.theme.global.colors['dark-2']};
    `
    : css`
      top: ${props => props.height < 10 ? '-3' : '-1'}px;
      height: ${props => props.height + (props.height < 10 ? 2 : 0)}px;
      margin-left: -1px;
      background-image: linear-gradient(
        ${props => props.theme.global.colors['dark-2']} 50%,
        rgba(255, 255, 255, 0) 0%
      );
      background-position: right;
      background-size: 2px 4px;
      background-repeat: repeat-y;
    `}
`;

// level:
const HEIGHT = [50, 36, 20, 12];

function Bar({
  data,
  level = 1,
  showLabels = false,
  showScore = false,
  showBenchmark = false,
  rotate,
  showIncompleteAction = true,
  height,
  annotateBenchmarkAbove = false,
  showAllBenchmarkAnnotations = false,
  scoreOnHover = false,
  hoverEnabled = true,
}) {
  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false);
  const {
    color,
    value,
    refValues,
    maxValue,
    stripes = false,
    unit,
    title,
  } = data;
  const theRefValue = refValues && refValues.find(ref => ref.value === 100);
  const hasValue = !!value || value === 0;
  const h = height || HEIGHT[level];

  // prettier-ignore
  return (
    <Wrapper
      responsive={false}
    >
      {showLabels && <MinLabel rotate={rotate}>0</MinLabel>}
      <BarWrapper
        onTouchStart={() => {
          if (scoreOnHover) setTouched(true);
          setTimeout(() => setTouched(false), 1000);
          if (scoreOnHover) setHover(!hover);
          setTimeout(() => setHover(false), 5000);
        }}
        onClick={evt => {
          if (touched) {
            if (evt) evt.preventDefault();
            if (evt) evt.stopPropagation();
          }
        }}
        onMouseEnter={() => scoreOnHover && setHover(true) }
        onMouseLeave={() => setHover(false)}
      >
        <BarReference height={h} noData={!hasValue}>
          {!hasValue && <BarNoValue height={h} color={color} />}
          {hasValue && (
            <BarValue
              height={h}
              active={hover && hoverEnabled}
              color={color}
              style={{ width: `${(value / maxValue) * 100}%` }}
              stripes={stripes}
            />
          )}
          {hasValue &&
            refValues &&
            refValues.map(ref => (
              <MarkValue
                height={h}
                key={ref.key}
                lineStyle={ref.style}
                style={{ left: `${(ref.value / maxValue) * 100}%` }}
                level={level}
              />
            ))}
          {!hasValue && refValues && !!theRefValue &&(
            <MarkValue
              height={h}
              key={theRefValue.key}
              lineStyle={theRefValue.style}
              style={{ left: `${(theRefValue.value / maxValue) * 100}%` }}
              level={level}
            />
          )}
          {showBenchmark &&
            refValues &&
            !showAllBenchmarkAnnotations && (
            !!theRefValue &&
            <AnnotateBenchmark
              rotate={rotate}
              benchmarkKey={theRefValue.key}
              above={annotateBenchmarkAbove}
              margin="1px"
            />
          )}
          {showBenchmark &&
            refValues &&
            showAllBenchmarkAnnotations &&
            annotateBenchmarkAbove &&
            refValues.filter(ref => !!ref.value).map((ref, index, list) => (
              <AnnotateBenchmark
                relative
                key={ref.key}
                left={(ref.value / maxValue) * 100}
                align={list.length > 1 && index === 0 ? 'left' : 'right'}
                benchmarkKey={ref.key}
                above
                margin="1px"
              />
            ))
          }
          {!hasValue && data && level < 3 && (
            <NoDataHint
              hints={[
                getNoDataMessage(data),
                showIncompleteAction
                  ? getIncompleteDataActionMessage(data)
                  : null,
              ]}
            />
          )}
        </BarReference>
        {(showScore || (hover && scoreOnHover && hoverEnabled)) && hasValue && (
          <Score
            rotate={rotate}
            score={value}
            left={(value / maxValue) * 100}
            color={color}
            unit={unit}
            level={scoreOnHover ? 1 : level}
            direction={scoreOnHover || 'bottom'}
            title={title}
          />
        )}
      </BarWrapper>
      {showLabels && (
        <MaxLabel rotate={rotate} bottom={data.tooltip}>
          {unit ? `${maxValue}${unit}` : `${maxValue}`}
        </MaxLabel>
      )}
      {data.tooltip && <WrapTooltip>{data.tooltip}</WrapTooltip>}
    </Wrapper>
  );
}

Bar.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  height: PropTypes.number,
  level: PropTypes.number,
  showLabels: PropTypes.bool,
  showScore: PropTypes.bool,
  showBenchmark: PropTypes.bool,
  hoverEnabled: PropTypes.bool,
  showIncompleteAction: PropTypes.bool,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  annotateBenchmarkAbove: PropTypes.bool,
  showAllBenchmarkAnnotations: PropTypes.bool,
  scoreOnHover: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Bar;
