/**
 *
 * BarHorizontal2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Text, Paragraph } from 'grommet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { getNoDataMessage, getIncompleteDataActionMessage } from 'utils/scores';
import { lowerCase } from 'utils/string';
import rootMessages from 'messages';

import Tooltip from 'components/Tooltip';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const getRotation = rotation => `rotate(${rotation}deg)`;

const WrapTooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  padding-left: 0px;
  transform: translateY(-50%);
`;
const AnnotateRefInner = styled.div`
  position: absolute;
  min-width: 70px;
  top: 14px;
  left: -1px;
  text-align: left;
  display: table;
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
const AnnotateRefLine = styled.div`
  position: absolute;
  width: 1px;
  height: 10px;
  top: 0;
  left: 1px;
  display: block;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-4']};
  margin: 3px 0;
`;
const AnnotateRef = styled.div`
  position: absolute;
  top: 100%;
  left: 100%;
  padding-left: 0px;
  transform: ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;
const Label = styled.div`
  position: absolute;
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  display: table;
  text-align: center;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
const MinLabel = styled(Label)`
  top: ${({ rotate }) => (rotate ? 50 : 50)}%;
  right: 100%;
  padding-right: ${({ rotate }) => (rotate ? 6 : 4)}px;
  transform: translateY(-50%)
    ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;

const MaxLabel = styled(Label)`
  top: ${({ bottom }) => (bottom ? 105 : 50)}%;
  left: 100%;
  padding-left: ${({ rotate }) => (rotate ? 6 : 4)}px;
  transform: translateY(-50%)
    ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;

const BarWrapper = styled.div``;

const BarReference = styled.div`
  position: relative;
  display: block;
  height: ${props => props.height}px;
  width: 100%;
  background-color: ${props =>
    props.noData ? 'transparent' : props.theme.global.colors['light-2']};
  border: 1px solid;
  border-color: transparent;
`;

const NoData = styled.div`
  position: absolute;
  left: 2px;
  top: ${props => (props.level > 1 ? -5 : 4)}px;
`;

const BarNoValue = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: ${props => props.height}px;
  width: 100%;
  border: 1px solid;
  border-color: ${props => props.theme.global.colors['light-4']};
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
  margin-left: -${({ lineStyle }) => (lineStyle === 'solid' ? '2' : '2')}px;
  border-right: ${({ lineStyle }) => (lineStyle === 'solid' ? '1' : '2')}px
    ${({ lineStyle }) => (lineStyle === 'solid' ? 'solid' : 'dotted')};
  border-color: ${props => props.theme.global.colors['dark-2']};
`;

// level:
const HEIGHT = [50, 36, 20, 12];

function BarHorizontal2({
  data,
  level = 1,
  showLabels = false,
  intl,
  rotate,
  showIncompleteAction = true,
  height,
}) {
  const { color, value, refValues, maxValue, stripes = false, unit } = data;
  const theRefValue = refValues && refValues.find(ref => ref.value === 100);
  // prettier-ignore
  return (
    <Wrapper>
      {showLabels && <MinLabel rotate={rotate}>0</MinLabel>}
      <BarWrapper>
        <BarReference height={height || HEIGHT[level]} noData={!value}>
          {!value && (
            <BarNoValue
              height={height || HEIGHT[level]}
              color={color}
            />
          )}
          {value && (
            <BarValue
              height={height || HEIGHT[level]}
              color={color}
              style={{ width: `${(value / maxValue) * 100}%` }}
              stripes={stripes}
            />
          )}
          {value &&
            refValues &&
            refValues.map(ref => (
              <MarkValue
                height={height || HEIGHT[level]}
                key={ref.key}
                lineStyle={ref.style}
                style={{ left: `${(ref.value / maxValue) * 100}%` }}
                level={level}
              />
            ))}
          {!value && refValues && !!theRefValue &&(
            <MarkValue
              height={height || HEIGHT[level]}
              key={theRefValue.key}
              lineStyle={theRefValue.style}
              style={{ left: `${(theRefValue.value / maxValue) * 100}%` }}
              level={level}
            />
          )}
          {showLabels && refValues && !!theRefValue && (
            <AnnotateRef rotate={rotate}>
              <AnnotateRefLine />
              <AnnotateRefInner>
                <Text size="xsmall">
                  {`${intl.formatMessage(
                    rootMessages.settings.benchmark[theRefValue.key]
                  )} ${lowerCase(intl.formatMessage(
                    rootMessages.settings.benchmark.nameShort
                  ))}`}
                </Text>
                <Tooltip
                  insideButton
                  margin={{ top: 'xsmall' }}
                  iconSize="medium"
                  maxWidth="300px"
                  component={
                    <>
                      <Paragraph margin={{ vertical: 'xsmall' }}>
                        <Text size="xsmall">
                          <FormattedMessage {...rootMessages.tooltip.benchmark.intro} />
                        </Text>
                      </Paragraph>
                      <Paragraph margin={{ vertical: 'xsmall' }}>
                        <Text size="xsmall" style={{ fontWeight: 600 }}>
                          {`${intl.formatMessage(
                            rootMessages.settings.benchmark.adjusted,
                          )}: `}
                        </Text>
                        <Text size="xsmall">
                          {intl.formatMessage(rootMessages.tooltip.benchmark.adjusted)}
                        </Text>
                      </Paragraph>
                      <Paragraph margin={{ vertical: 'xsmall' }}>
                        <Text size="xsmall" style={{ fontWeight: 600 }}>
                          {`${intl.formatMessage(rootMessages.settings.benchmark.best)}: `}
                        </Text>
                        <Text size="xsmall">
                          <FormattedMessage {...rootMessages.tooltip.benchmark.best} />
                        </Text>
                      </Paragraph>
                    </>
                  }
                />
              </AnnotateRefInner>
            </AnnotateRef>
          )}
          {!value && data && level < 3 && (
            <NoData level={level}>
              <Text size="xsmall">
                {getNoDataMessage(intl, data)}
                {showIncompleteAction && getIncompleteDataActionMessage(intl, data)}
              </Text>
            </NoData>
          )}
        </BarReference>
      </BarWrapper>
      {showLabels && (
        <MaxLabel rotate={rotate} bottom={data.tooltip}>
          {unit ? `${maxValue}${unit}` : `${maxValue}`}
        </MaxLabel>
      )}
      {data.tooltip && <WrapTooltip>{data.tooltip}</WrapTooltip>}
    </Wrapper>
  );
}

BarHorizontal2.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  height: PropTypes.number,
  level: PropTypes.number,
  showLabels: PropTypes.bool,
  showIncompleteAction: PropTypes.bool,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  intl: intlShape.isRequired,
};

export default injectIntl(BarHorizontal2);
