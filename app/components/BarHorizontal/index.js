/**
 *
 * BarHorizontal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { FormattedMessage } from 'react-intl';
import rootMessages from 'messages';

const Wrapper = props => (
  <Box direction="row" {...props} align="center" fill="horizontal" />
);

const MinLabel = props => <Box {...props} width="25px" pad="xxsmall" />;
const MaxLabel = props => <Box {...props} width="50px" pad="xxsmall" />;
const BarWrapper = props => <Box {...props} fill="horizontal" pad="xsmall" />;

const HEIGHT = 35;

const BarReference = styled.div`
  position: relative;
  display: block;
  height: ${HEIGHT}px;
  width: 100%;
  background-color: ${props => props.theme.global.colors['light-2']};
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: 4px;
`;

const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: ${props => props.top || 0}px;
  height: ${props => props.height || HEIGHT}px;
  width: ${props => props.percentage}%;
  background-color: ${props => props.theme.global.colors[props.color]};
`;

function BarHorizontal({
  minValue,
  maxValue,
  value,
  color,
  noData,
  unit,
  values,
  multiple,
}) {
  return (
    <Wrapper>
      <MinLabel>
        <Text size="small" alignSelf="end">
          {minValue}
        </Text>
      </MinLabel>
      <BarWrapper>
        <BarReference>
          {!multiple && !noData && (
            <BarValue percentage={(value / maxValue) * 100} color={color} />
          )}
          {noData && (
            <NoData>
              <Text size="small">
                <FormattedMessage {...rootMessages.charts.noData} />
              </Text>
            </NoData>
          )}
          {multiple &&
            !noData &&
            values &&
            values.map((v, index, array) => {
              const height = (HEIGHT - (array.length - 1)) / array.length;
              return v.value ? (
                <BarValue
                  key={v.key}
                  height={height}
                  percentage={(v.value / maxValue) * 100}
                  color={color}
                  top={height * index + index}
                />
              ) : null;
            })}
        </BarReference>
      </BarWrapper>
      <MaxLabel>
        <Text size="small">{unit ? `${maxValue}${unit}` : `${maxValue}`}</Text>
      </MaxLabel>
    </Wrapper>
  );
}

BarHorizontal.propTypes = {
  color: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  values: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  noData: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default BarHorizontal;
