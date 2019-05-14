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

// level:
const HEIGHT = [50, 35, 15, 8];

const BarReference = styled.div`
  position: relative;
  display: block;
  height: ${props => props.height}px;
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
  top: 0;
  height: ${props => props.height}px;
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
  level = 1,
}) {
  return (
    <Wrapper>
      <MinLabel>
        <Text size="small" alignSelf="end">
          {minValue}
        </Text>
      </MinLabel>
      <BarWrapper>
        <BarReference height={HEIGHT[level]}>
          {!noData && (
            <BarValue
              height={HEIGHT[level]}
              percentage={(value / maxValue) * 100}
              color={color}
            />
          )}
          {noData && (
            <NoData>
              <Text size="small">
                <FormattedMessage {...rootMessages.charts.noData} />
              </Text>
            </NoData>
          )}
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
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  noData: PropTypes.bool,
  level: PropTypes.number,
};

export default BarHorizontal;
