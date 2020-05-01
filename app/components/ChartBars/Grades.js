/**
 *
 * Grades
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import rootMessages from 'messages';

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
const BGScaleLabel = styled.span`
  position: absolute;
  top: 100%;
  left: 0;
  opacity: 0.8;
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.size};
  color: ${({ theme }) => theme.global.colors.secondary};
  padding-top: ${({ offsetLabel }) => (offsetLabel ? '1em' : 0)};
  padding-left: ${({ offsetLabel }) => (offsetLabel ? '2px' : 0)};
  border-left: 1px solid;
  border-color: ${({ offsetLabel, theme }) =>
    offsetLabel ? theme.global.colors.secondary : 'transparent'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.xsmall.size};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme }) => theme.text.small.size};
  }
`;
const getScoreAsideWidth = (size, hasAside = false) => {
  if (hasAside) {
    return scoreAsideWidth(size);
  }
  return 0;
};
export function Grades({
  grades,
  labels = true,
  hasAside,
  hasLabelsSmall = true,
  offset = false,
  labelsMinimal = false,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BGScale
          left={chartLabelWidth(size, hasLabelsSmall, labelsMinimal)}
          right={getScoreAsideWidth(size, hasAside)}
        >
          {grades.map((grade, index) => (
            <BGScaleX min={grade.min} key={grade.class}>
              {labels && (
                <BGScaleLabel offsetLabel={offset && index % 2 === 1}>
                  <FormattedMessage
                    {...rootMessages.labels.grades[grade.class]}
                  />
                </BGScaleLabel>
              )}
            </BGScaleX>
          ))}
        </BGScale>
      )}
    </ResponsiveContext.Consumer>
  );
}

Grades.propTypes = {
  grades: PropTypes.array,
  labels: PropTypes.bool,
  hasAside: PropTypes.bool,
  hasLabelsSmall: PropTypes.bool,
  offset: PropTypes.bool,
  labelsMinimal: PropTypes.bool,
};

export default Grades;
