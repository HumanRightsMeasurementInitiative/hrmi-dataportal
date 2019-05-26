/**
 *
 * BarHorizontal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';
import { getNoDataMessage, getIncompleteDataActionMessage } from 'utils/scores';

const Wrapper = props => (
  <Box direction="row" {...props} align="center" fill="horizontal" />
);

const MinLabel = props => (
  <Box {...props} width="25px" pad={{ right: 'xsmall' }} />
);
const MaxLabel = props => (
  <Box {...props} width="55px" pad={{ left: 'xsmall' }} />
);
const BarWrapper = props => (
  <Box {...props} fill="horizontal" pad={{ vertical: 'xsmall' }} />
);

// level:
const HEIGHT = [50, 35, 20, 12];

const BarReference = styled.div`
  position: relative;
  display: block;
  height: ${props => props.height}px;
  width: 100%;
  background-color: ${props =>
    props.noData ? 'transparent' : props.theme.global.colors['light-2']};
  border: ${props => (props.noData ? '1px solid' : 0)};
  border-color: ${props =>
    props.noData ? props.theme.global.colors['light-4'] : 'transparent'};
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: ${props => (props.level > 1 ? -5 : 4)}px;
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
  margin-left: -${({ lineStyle }) => (lineStyle === 'solid' ? '2' : '1')}px;
  border-right: ${({ lineStyle }) => (lineStyle === 'solid' ? '1' : '2')}px
    ${({ lineStyle }) => (lineStyle === 'solid' ? 'solid' : 'dotted')};
  border-color: ${props => props.theme.global.colors['dark-2']};
`;

function BarHorizontal({
  minValue,
  maxValue,
  value,
  refValues,
  color,
  unit,
  level = 1,
  intl,
  data,
  omitMinMaxLabels,
  stripes = false,
}) {
  return (
    <Wrapper>
      {!omitMinMaxLabels && (
        <MinLabel>
          <Text size="small" alignSelf="end">
            {minValue}
          </Text>
        </MinLabel>
      )}
      <BarWrapper>
        <BarReference height={HEIGHT[level]} noData={!value}>
          {value && (
            <BarValue
              height={HEIGHT[level]}
              color={color}
              style={{ width: `${(value / maxValue) * 100}%` }}
              stripes={stripes}
            />
          )}
          {refValues &&
            refValues.map(ref => (
              <MarkValue
                height={HEIGHT[level]}
                key={ref.key}
                lineStyle={ref.style}
                style={{ left: `${(ref.value / maxValue) * 100}%` }}
                level={level}
              />
            ))}
          {!value && data && level < 3 && (
            <NoData level={level}>
              <Text size="small">
                {getNoDataMessage(intl, data)}
                {getIncompleteDataActionMessage(intl, data)}
              </Text>
            </NoData>
          )}
        </BarReference>
      </BarWrapper>
      {!omitMinMaxLabels && (
        <MaxLabel>
          <Text size="small">
            {unit ? `${maxValue}${unit}` : `${maxValue}`}
          </Text>
        </MaxLabel>
      )}
    </Wrapper>
  );
}

BarHorizontal.propTypes = {
  color: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  level: PropTypes.number,
  omitMinMaxLabels: PropTypes.bool,
  stripes: PropTypes.bool,
  intl: intlShape.isRequired,
  refValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default injectIntl(BarHorizontal);
