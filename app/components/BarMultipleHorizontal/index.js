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
const HEIGHT = [110, 35, 15, 8];

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
  maxValues,
  data,
  color,
  column,
  columns,
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
  // console.log(data);

  const heightMultiple =
    data && (HEIGHT[level] - (data.length - 1)) / data.length;
  return (
    <Wrapper>
      {!maxValues && (
        <MinLabel>
          <Text size="small" alignSelf="end">
            {minValue}
          </Text>
        </MinLabel>
      )}
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
              const col = columns ? columns[index] : column;
              const mv = maxValues ? maxValues[index] : maxValue;
              const value = d.score && d.score[col];
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
                      percentage={(value / mv) * 100}
                      color={d.dimension || d.key || color}
                    />
                  )}
                  {!value && level < 1 && data.length < 4 && (
                    <NoData level={level}>
                      <Text size="small">{getNoDataMessage(intl, d)}</Text>
                    </NoData>
                  )}
                </BarReference>
              );
            })}
        </BarAnchor>
      </BarWrapper>
      {!maxValues && (
        <MaxLabel>
          <Text size="small">
            {unit ? `${maxValue}${unit}` : `${maxValue}`}
          </Text>
        </MaxLabel>
      )}
    </Wrapper>
  );
}

BarMultipleHorizontal.propTypes = {
  color: PropTypes.string,
  unit: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  maxValues: PropTypes.array,
  column: PropTypes.string,
  columns: PropTypes.array,
  level: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(BarMultipleHorizontal);
