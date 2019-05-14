/**
 *
 * BarMultipleHorizontal
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

const BarAnchor = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: ${props => props.height}px;
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: 4px;
`;

const BarReference = styled.div`
  position: absolute;
  left: 0;
  top: ${props => props.top || 0}px;
  width: 100%;
  height: ${props => props.height}px;
  background-color: ${props => props.theme.global.colors['light-2']};
`;

const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: ${props => props.top || 0}px;
  height: ${props => props.height}px;
  width: ${props => props.percentage}%;
  background-color: ${props => props.theme.global.colors[props.color]};
`;

function BarMultipleHorizontal({
  minValue,
  maxValue,
  values,
  color,
  noData,
  unit,
  level = 1,
}) {
  const heightMultiple =
    values && (HEIGHT[level] - (values.length - 1)) / values.length;
  return (
    <Wrapper>
      <MinLabel>
        <Text size="small" alignSelf="end">
          {minValue}
        </Text>
      </MinLabel>
      <BarWrapper>
        <BarAnchor height={HEIGHT[level]}>
          {noData && (
            <NoData>
              <Text size="small">
                <FormattedMessage {...rootMessages.charts.noData} />
              </Text>
            </NoData>
          )}
          {!noData &&
            values &&
            values.map((v, index) =>
              v.value ? (
                <BarReference
                  key={v.key}
                  height={heightMultiple}
                  top={heightMultiple * index + index}
                >
                  <BarValue
                    height={heightMultiple}
                    percentage={(v.value / maxValue) * 100}
                    color={color}
                  />
                </BarReference>
              ) : null,
            )}
        </BarAnchor>
      </BarWrapper>
      <MaxLabel>
        <Text size="small">{unit ? `${maxValue}${unit}` : `${maxValue}`}</Text>
      </MaxLabel>
    </Wrapper>
  );
}

BarMultipleHorizontal.propTypes = {
  color: PropTypes.string,
  unit: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  noData: PropTypes.bool,
  level: PropTypes.number,
};

export default BarMultipleHorizontal;
