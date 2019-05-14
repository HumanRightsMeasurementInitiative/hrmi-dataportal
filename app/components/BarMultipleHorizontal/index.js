/**
 *
 * BarMultipleHorizontal
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
  background-color: ${props =>
    props.noData ? 'transparent' : props.theme.global.colors['light-2']};
  border: 1px solid;
  border-color: ${props =>
    props.noData ? props.theme.global.colors['light-4'] : 'transparent'};
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
  data,
  color,
  column,
  unit,
  level = 1,
  intl,
}) {
  // const values =
  //   data &&
  //   data.map(r => ({
  //     key: r.key,
  //     value: r.score ? r.score[column] : false,
  //   }));

  const hasAnyScores =
    data && data.reduce((memo, d) => memo || !!d.score, false);
  const hasAnyAlternateScores =
    data && data.reduce((memo, d) => memo || d.hasScoreAlternate, false);
  const hasAnyIndicatorScores =
    data && data.reduce((memo, d) => memo || d.hasScoreIndicators, false);

  // console.log('hasAnyScores', hasAnyScores)
  // console.log('hasAnyAlternateScores', hasAnyAlternateScores)
  // console.log('hasAnyIndicatorScores', hasAnyIndicatorScores)
  // console.log(data, hasAnyScores, hasAnyAlternateScores, hasAnyIndicatorScores);

  const heightMultiple =
    data && (HEIGHT[level] - (data.length - 1)) / data.length;
  return (
    <Wrapper>
      <MinLabel>
        <Text size="small" alignSelf="end">
          {minValue}
        </Text>
      </MinLabel>
      <BarWrapper>
        <BarAnchor height={HEIGHT[level]}>
          {!hasAnyScores && (
            <BarReference height={HEIGHT[level]} noData>
              <NoData>
                <Text size="small">
                  {getNoDataMessage(intl, {
                    hasScoreAlternate: hasAnyAlternateScores,
                    hasScoreIndicators: hasAnyIndicatorScores,
                  })}
                  {getIncompleteDataActionMessage(intl, {
                    hasScoreAlternate: hasAnyAlternateScores,
                    hasScoreIndicators: hasAnyIndicatorScores,
                  })}
                </Text>
              </NoData>
            </BarReference>
          )}
          {hasAnyScores &&
            data &&
            data.map((d, index) => {
              const value = d.score && d.score[column];
              return (
                <BarReference
                  key={d.key}
                  height={heightMultiple}
                  top={heightMultiple * index + index}
                  noData={!value}
                >
                  {value && (
                    <BarValue
                      height={heightMultiple}
                      percentage={(value / maxValue) * 100}
                      color={color}
                    />
                  )}
                </BarReference>
              );
            })}
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
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  column: PropTypes.string,
  level: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(BarMultipleHorizontal);
