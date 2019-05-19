/**
 *
 * BarMultipleHorizontal
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

const MinLabel = props => <Box {...props} width="25px" pad="xxsmall" />;
const MaxLabel = props => <Box {...props} width="50px" pad="xxsmall" />;
const BarWrapper = props => <Box {...props} fill="horizontal" />;

// level:
const HEIGHT = [100, 35, 15, 8];

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

function BarMultipleHorizontal({
  minValue,
  maxValue,
  data,
  color,
  column,
  unit,
  level = 1,
  intl,
  stripes = false,
  omitMinMaxLabels = false,
  height,
}) {
  const hasAnyScores =
    level > 0 && data && data.reduce((memo, d) => memo || !!d.score, false);
  const hasAnyAlternateScores =
    level > 0 &&
    data &&
    data.reduce((memo, d) => memo || d.hasScoreAlternate, false);
  const hasAnyIndicatorScores =
    level > 0 &&
    data &&
    data.reduce((memo, d) => memo || d.hasScoreIndicators, false);
  const heightTotal = height || HEIGHT[level];
  const heightIndividual =
    data && (heightTotal - (data.length - 1)) / data.length;
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
        <BarAnchor height={heightTotal}>
          {!hasAnyScores && level > 0 && (
            <BarReference height={heightTotal} noData>
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
          {(hasAnyScores || level === 0) &&
            data &&
            data.map((d, index) => {
              const col = d.column || column;
              const mv = d.maxValue || maxValue;
              const value = d.score && d.score[col];
              return (
                <BarReference
                  key={d.key}
                  height={heightIndividual}
                  top={heightIndividual * index + index}
                  noData={!value}
                >
                  {value && (
                    <BarValue
                      height={heightIndividual}
                      color={d.dimension || d.key || color}
                      style={{ width: `${(value / mv) * 100}%` }}
                      stripes={d.stripes || stripes}
                    />
                  )}
                  {!value && level < 1 && data.length < 4 && (
                    <NoData level={level}>
                      <Text size="xsmall">{getNoDataMessage(intl, d)}</Text>
                    </NoData>
                  )}
                </BarReference>
              );
            })}
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

BarMultipleHorizontal.propTypes = {
  color: PropTypes.string,
  unit: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  height: PropTypes.number,
  column: PropTypes.string,
  level: PropTypes.number,
  omitMinMaxLabels: PropTypes.bool,
  stripes: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(BarMultipleHorizontal);
