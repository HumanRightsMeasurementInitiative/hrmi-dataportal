/**
 *
 * Bar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Text } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';
import { getNoDataMessage, getIncompleteDataActionMessage } from 'utils/scores';

import Wrapper from './styled/BarWrapper';
import MinLabel from './styled/MinLabel';
import MaxLabelOriginal from './styled/MaxLabel';
import AnnotateBenchmark from './AnnotateBenchmark';
import WrapTooltip from './styled/WrapTooltip';

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
  border: 1px solid;
  border-color: transparent;
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: ${props => (props.level > 1 ? -5 : 4)}px;
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

const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: ${props => props.height}px;
  background-color: ${props => props.theme.global.colors[props.color]};
  ${props =>
    props.stripes &&
    css`
      background-image: linear-gradient(
        135deg,
        ${props.theme.global.colors[props.color]} 30%,
        ${props.theme.global.colors['light-2']} 30%,
        ${props.theme.global.colors['light-2']} 50%,
        ${props.theme.global.colors[props.color]} 50%,
        ${props.theme.global.colors[props.color]} 80%,
        ${props.theme.global.colors['light-2']} 80%,
        ${props.theme.global.colors['light-2']} 100%
      );
      background-size: 5px 5px;
      background-repeat: repeat;
    `}
`;
// prettier-ignore
const MarkValue = styled.div`
  position: absolute;
  top: 0;
  width: 3px;
  height: ${props => props.height}px;
  margin-left: -${({ lineStyle }) => (lineStyle === 'solid' ? '2' : '2')}px;
  border-right: ${({ lineStyle }) => (lineStyle === 'solid' ? '1' : '2')}px
    ${({ lineStyle }) => (lineStyle === 'solid' ? 'solid' : 'dotted')};
  border-color: ${props => props.theme.global.colors['dark-2']};
`;

// level:
const HEIGHT = [50, 36, 20, 12];

function Bar({
  data,
  level = 1,
  showLabels = false,
  intl,
  rotate,
  showIncompleteAction = true,
  height,
}) {
  const { color, value, refValues, maxValue, stripes = false, unit } = data;
  const theRefValue = refValues && refValues.find(ref => ref.value === 100);
  // prettier-ignore
  return (
    <Wrapper>
      {showLabels && <MinLabel rotate={rotate}>0</MinLabel>}
      <BarWrapper>
        <BarReference height={height || HEIGHT[level]} noData={!value}>
          {!value && (
            <BarNoValue
              height={height || HEIGHT[level]}
              color={color}
            />
          )}
          {value && (
            <BarValue
              height={height || HEIGHT[level]}
              color={color}
              style={{ width: `${(value / maxValue) * 100}%` }}
              stripes={stripes}
            />
          )}
          {value &&
            refValues &&
            refValues.map(ref => (
              <MarkValue
                height={height || HEIGHT[level]}
                key={ref.key}
                lineStyle={ref.style}
                style={{ left: `${(ref.value / maxValue) * 100}%` }}
                level={level}
              />
            ))}
          {!value && refValues && !!theRefValue &&(
            <MarkValue
              height={height || HEIGHT[level]}
              key={theRefValue.key}
              lineStyle={theRefValue.style}
              style={{ left: `${(theRefValue.value / maxValue) * 100}%` }}
              level={level}
            />
          )}
          {showLabels && refValues && !!theRefValue && (
            <AnnotateBenchmark rotate={rotate} benchmarkKey={theRefValue.key} />
          )}
          {!value && data && level < 3 && (
            <NoData level={level}>
              <Text size="xsmall">
                {getNoDataMessage(intl, data)}
                {showIncompleteAction && getIncompleteDataActionMessage(intl, data)}
              </Text>
            </NoData>
          )}
        </BarReference>
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
  showIncompleteAction: PropTypes.bool,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  intl: intlShape.isRequired,
};

export default injectIntl(Bar);
