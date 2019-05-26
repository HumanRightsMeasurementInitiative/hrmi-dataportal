/**
 *
 * BarBulletHorizontal
 *
 */

// TODO:
// styled-components.browser.esm.js?bce9:1504 Over 200 classes were generated for component BarBulletHorizontal__MarkValue.
// Consider using the attrs method, together with a style object for frequently changed styles.
// Example:
//   const Component = styled.div.attrs({
//     style: ({ background }) => ({
//       background,
//     }),
//   })`width: 100%;`
//
//   <Component />

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { FormattedMessage } from 'react-intl';
import rootMessages from 'messages';

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
const HEIGHT = [50, 35, 20, 14];
const MARK_WIDTH = [4, 4, 3, 3];

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

const BarReferenceNoData = styled.div`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: ${props => HEIGHT[props.level]}px;
  background-color: 'transparent';
  border: 1px solid;
  border-color: ${props => props.theme.global.colors['light-4']};
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: ${props => (props.level > 1 ? -5 : 4)}px;
`;

const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: ${props => props.height / 2 - props.height * 0.15}px;
  height: ${props => props.height * 0.3}px;
  background-color: ${props => props.theme.global.colors['light-5']};
`;
const MarkValue = styled.div`
  position: absolute;
  top: 0;
  height: ${props => props.height}px;
  width: 0;
  margin-left: -${props => MARK_WIDTH[props.level || 1] / 2}px;
  border-right: ${props => MARK_WIDTH[props.level || 1]}px solid;
  border-color: ${props => props.theme.global.colors[props.color]};
`;
const MarkBound = styled(MarkValue)`
  top: ${props => props.height / 2 - props.height * 0.35}px;
  margin-left: -0.5px;
  border-right-width: 1px;
  height: ${props => props.height * 0.7}px;
`;

const BarBand = styled.div`
  position: absolute;
  top: ${props => props.height / 2 - props.height * 0.35}px;
  height: ${props => props.height * 0.7}px;
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
  omitMinMaxLabels,
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
        <BarAnchor height={HEIGHT[level]}>
          {!noData && <BarReference />}
          {noData && <BarReferenceNoData level={level} />}
          {!noData && (
            <BarValue
              height={HEIGHT[level]}
              style={{ width: `${(value / maxValue) * 100}%` }}
            />
          )}
          {!noData && (
            <BarBand
              color={color}
              height={HEIGHT[level]}
              lo={(band.lo / maxValue) * 100}
              hi={(band.hi / maxValue) * 100}
              style={{
                left: `${(band.lo / maxValue) * 100}%`,
                width: `${(band.hi / maxValue) * 100 -
                  (band.lo / maxValue) * 100}%`,
              }}
            />
          )}
          {!noData && (
            <MarkValue
              color={color}
              height={HEIGHT[level]}
              level={level}
              style={{ left: `${(value / maxValue) * 100}%` }}
            />
          )}
          {!noData && (
            <MarkBound
              color={color}
              height={HEIGHT[level]}
              style={{ left: `${(band.lo / maxValue) * 100}%` }}
            />
          )}
          {!noData && (
            <MarkBound
              color={color}
              height={HEIGHT[level]}
              style={{ left: `${(band.hi / maxValue) * 100}%` }}
            />
          )}
          {noData && (
            <NoData level={level}>
              <Text size="small">
                <FormattedMessage {...rootMessages.charts.noData} />
              </Text>
            </NoData>
          )}
        </BarAnchor>
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
  omitMinMaxLabels: PropTypes.bool,
};

export default BarBulletHorizontal;
