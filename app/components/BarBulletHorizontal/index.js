/**
 *
 * BarBulletHorizontal
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
const HEIGHT = [50, 35, 20, 14];
const MARK_WIDTH = [8, 4, 2, 1];

const BarAnchor = styled.div`
  position: relative;
  display: block;
  height: ${props => props.height}px;
  width: 100%;
  background-color: transparent;
`;
const BarReference = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -2px;
  width: 100%;
  height: 4px;
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
  top: ${props => props.height / 2 - props.height * 0.15}px;
  height: ${props => props.height * 0.3}px;
  width: ${props => props.percentage}%;
  background-color: ${props => props.theme.global.colors['light-5']};
`;
const MarkValue = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.percentage}%;
  height: ${props => props.height}px;
  width: ${props => MARK_WIDTH[props.level || 1]}px;
  margin-left: -2px;
  background-color: ${props => props.theme.global.colors[props.color]};
`;
const MarkBound = styled(MarkValue)`
  height: ${props => props.height}px;
  top: ${props => props.height / 2 - props.height * 0.35}px;
  width: 1px;
  margin-left: -0.5px;
  height: ${props => props.height * 0.7}px;
`;

const BarBand = styled.div`
  position: absolute;
  left: ${props => props.lo}%;
  top: ${props => props.height / 2 - props.height * 0.35}px;
  height: ${props => props.height * 0.7}px;
  width: ${props => props.hi - props.lo}%;
  background-color: ${props => props.theme.global.colors[props.color]};
  opacity: 0.4;
`;

function BarBulletHorizontal({
  minValue,
  maxValue,
  value,
  color,
  band,
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
        <BarAnchor height={HEIGHT[level]}>
          {!noData && <BarReference />}
          {!noData && (
            <BarValue
              percentage={(value / maxValue) * 100}
              height={HEIGHT[level]}
            />
          )}
          {!noData && (
            <BarBand
              color={color}
              height={HEIGHT[level]}
              lo={(band.lo / maxValue) * 100}
              hi={(band.hi / maxValue) * 100}
            />
          )}
          {!noData && (
            <MarkBound
              color={color}
              percentage={(band.lo / maxValue) * 100}
              height={HEIGHT[level]}
            />
          )}
          {!noData && (
            <MarkValue
              color={color}
              percentage={(value / maxValue) * 100}
              height={HEIGHT[level]}
              level={level}
            />
          )}
          {!noData && (
            <MarkBound
              color={color}
              percentage={(band.hi / maxValue) * 100}
              height={HEIGHT[level]}
            />
          )}
          {noData && (
            <NoData>
              <Text size="small">
                <FormattedMessage {...rootMessages.charts.noData} />
              </Text>
            </NoData>
          )}
        </BarAnchor>
      </BarWrapper>
      <MaxLabel>
        <Text size="small">{unit ? `${maxValue}${unit}` : `${maxValue}`}</Text>
      </MaxLabel>
    </Wrapper>
  );
}

BarBulletHorizontal.propTypes = {
  color: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  values: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  noData: PropTypes.bool,
  band: PropTypes.object,
  multiple: PropTypes.bool,
  level: PropTypes.number,
};

export default BarBulletHorizontal;
