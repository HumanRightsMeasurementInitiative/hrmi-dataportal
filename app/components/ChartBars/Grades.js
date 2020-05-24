/**
 *
 * Grades
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext, Box } from 'grommet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import rootMessages from 'messages';

import { isMinSize, isMaxSize } from 'utils/responsive';

import { scoreAsideWidth, chartLabelWidth } from './chart-utils';

// prettier-ignore
const BGScale = styled.div`
  position: absolute;
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  top: 0;
  bottom: 0;
`;

// background: rgba(0, 0, 0, 0.05);
const BGScaleX = styled.div`
  background: ${({ min }) => (min > 0 ? 'rgba(0, 0, 0, 0.06)' : 'transparent')};
  /* border-left: 1px solid rgba(0, 0, 0, 0.2); */
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: ${({ min }) => min}%;
`;
const BGScaleLabelWrap = styled.span`
  position: absolute;
  top: 100%;
  left: 0;
  left: ${({ single }) => (single ? '-30px' : '0')};
  right: ${({ single }) => (single ? '-30px' : 'auto')};
  opacity: 0.8;
  border-left: ${({ single }) => (single ? 0 : 1)}px solid;
  border-color: ${({ theme }) => theme.global.colors['light-4']};
  margin-top: 2px;
`;
const BGScaleLabel = styled.span`
  padding-left: ${({ single }) => (single ? 0 : 1)}px;
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.size};
  color: ${({ theme }) => theme.global.colors.secondary};
  vertical-align: bottom;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.xlarge}) {
    line-height: ${({ theme }) => theme.text.xsmall.size};
    font-size: ${({ theme }) => theme.text.xsmall.size};
  }
`;

const Key = styled.span`
  display: inline-block;
  border: 1px solid;
  border-color: ${({ theme }) => theme.global.colors['light-4']};
  background: rgba(0, 0, 0, ${({ index }) => 0.06 * index});
  height: 8px;
  width: 8px;
`;
const KeyWrap = styled(props => (
  <Box direction="row" {...props} gap="hair" align="center" />
))`
  margin-top: 4px;
`;

export function Grades({ grades, labels = true, hasAside }) {
  // const minGap = grades.reduce((memo, grade, index, list) => {
  //   // console.log(memo, grade, index, list.length, list[index + 1])
  //   const gap =
  //     index + 1 > list.length - 1
  //       ? 100 - grade.min
  //       : list[index + 1].min - grade.min;
  //   return Math.min(memo, gap);
  // }, 1000);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BGScale
          left={chartLabelWidth(size)}
          right={hasAside ? scoreAsideWidth(size) : '0px'}
        >
          {grades.map(grade => (
            <BGScaleX min={grade.min} key={grade.class}>
              {isMinSize(size, 'medium') && labels && (
                <BGScaleLabelWrap>
                  <BGScaleLabel>
                    <FormattedMessage
                      {...rootMessages.labels.grades[grade.class]}
                    />
                  </BGScaleLabel>
                </BGScaleLabelWrap>
              )}
            </BGScaleX>
          ))}
          {isMaxSize(size, 'sm') && labels && (
            <BGScaleLabelWrap single>
              <Box direction="row" align="center" justify="center" gap="xsmall">
                {grades.map((grade, index) => (
                  <KeyWrap key={grade.min}>
                    <Key index={index} />
                    <BGScaleLabel single>
                      <FormattedMessage
                        {...rootMessages.labels.grades[grade.class]}
                      />
                    </BGScaleLabel>
                  </KeyWrap>
                ))}
              </Box>
            </BGScaleLabelWrap>
          )}
        </BGScale>
      )}
    </ResponsiveContext.Consumer>
  );
}

Grades.propTypes = {
  grades: PropTypes.array,
  labels: PropTypes.bool,
  hasAside: PropTypes.bool,
};

export default Grades;
