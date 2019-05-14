/**
 *
 * BarHorizontal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';
import { getNoDataMessage, getIncompleteDataActionMessage } from 'utils/scores';

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
  background-color: ${props =>
    props.noData ? 'transparent' : props.theme.global.colors['light-2']};
  border: 1px solid;
  border-color: ${props =>
    props.noData ? props.theme.global.colors['light-4'] : 'transparent'};
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: ${props => (props.level > 1 ? -7 : 4)}px;
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
  unit,
  level = 1,
  intl,
  data,
}) {
  return (
    <Wrapper>
      <MinLabel>
        <Text size="small" alignSelf="end">
          {minValue}
        </Text>
      </MinLabel>
      <BarWrapper>
        <BarReference height={HEIGHT[level]} noData={!value}>
          {value && (
            <BarValue
              height={HEIGHT[level]}
              percentage={(value / maxValue) * 100}
              color={color}
            />
          )}
          {!value && level < 3 && (
            <NoData level={level}>
              <Text size="small">
                {getNoDataMessage(intl, data)}
                {getIncompleteDataActionMessage(intl, data)}
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
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  level: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(BarHorizontal);
