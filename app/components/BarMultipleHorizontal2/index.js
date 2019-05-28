/**
 *
 * BarMultipleHorizontal2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Paragraph } from 'grommet';
import { lowerCase } from 'utils/string';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Tooltip from 'components/Tooltip';

import BarHorizontal from 'components/BarHorizontal2';
import rootMessages from 'messages';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const BarWrapInner = styled.div`
  padding: 1px 0;
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
const getRotation = rotation => `rotate(${rotation}deg)`;

const MinLabel = styled(Label)`
  top: ${({ rotate }) => (rotate ? 50 : 50)}%;
  right: 100%;
  padding-right: ${({ rotate }) => (rotate ? 6 : 4)}px;
  transform: translateY(-50%)
    ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;

const MaxLabel = styled(Label)`
  top: ${({ bottom }) => (bottom ? 103 : 50)}%;
  left: 100%;
  padding-left: ${({ rotate }) => (rotate ? 6 : 4)}px;
  transform: translateY(-50%)
    ${({ rotate }) => (rotate ? getRotation(rotate) : '')};
`;
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
  margin: -1px;
`;

// level:
const HEIGHT = 7;

function BarMultipleHorizontal2({ dataMultiple, showLabels, rotate, intl }) {
  const {
    color,
    data,
    maxValue,
    stripes = false,
    unit,
    tooltip,
    benchmark,
  } = dataMultiple;
  return (
    <Wrapper>
      {showLabels && <MinLabel rotate={rotate}>0</MinLabel>}
      {data &&
        data.map(datum => (
          <BarWrapInner key={datum.key}>
            <BarHorizontal
              data={{
                ...datum,
                stripes,
                unit,
                maxValue,
                color,
              }}
              level={3}
              showLabels={false}
              rotate={rotate}
              showIncompleteAction={false}
              height={HEIGHT}
            />
          </BarWrapInner>
        ))}
      {showLabels && !!benchmark && (
        <AnnotateRef rotate={rotate}>
          <AnnotateRefLine />
          <AnnotateRefInner>
            <Text size="xsmall">
              {`${intl.formatMessage(
                rootMessages.settings.benchmark[benchmark],
              )} ${lowerCase(
                intl.formatMessage(rootMessages.settings.benchmark.nameShort),
              )}`}
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
                      <FormattedMessage
                        {...rootMessages.tooltip.benchmark.intro}
                      />
                    </Text>
                  </Paragraph>
                  <Paragraph margin={{ vertical: 'xsmall' }}>
                    <Text size="xsmall" style={{ fontWeight: 600 }}>
                      {`${intl.formatMessage(
                        rootMessages.settings.benchmark.adjusted,
                      )}: `}
                    </Text>
                    <Text size="xsmall">
                      {intl.formatMessage(
                        rootMessages.tooltip.benchmark.adjusted,
                      )}
                    </Text>
                  </Paragraph>
                  <Paragraph margin={{ vertical: 'xsmall' }}>
                    <Text size="xsmall" style={{ fontWeight: 600 }}>
                      {`${intl.formatMessage(
                        rootMessages.settings.benchmark.best,
                      )}: `}
                    </Text>
                    <Text size="xsmall">
                      <FormattedMessage
                        {...rootMessages.tooltip.benchmark.best}
                      />
                    </Text>
                  </Paragraph>
                </>
              }
            />
          </AnnotateRefInner>
        </AnnotateRef>
      )}
      {showLabels && (
        <MaxLabel rotate={rotate} bottom={tooltip}>
          {unit ? `${maxValue}${unit}` : `${maxValue}`}
        </MaxLabel>
      )}
      {tooltip && <WrapTooltip>{tooltip}</WrapTooltip>}
    </Wrapper>
  );
}

BarMultipleHorizontal2.propTypes = {
  dataMultiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showLabels: PropTypes.bool,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  intl: intlShape.isRequired,
};

export default injectIntl(BarMultipleHorizontal2);
