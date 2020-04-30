/**
 *
 * Grades
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { isMinSize } from 'utils/responsive';
import rootMessages from 'messages';

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
  font-size: 0.8em;
  left: 3px;
  opacity: 0.6;
`;
const getScoreAsideWidth = (size, hasAside = false) => {
  if (hasAside) {
    return isMinSize(size, 'medium') ? '80px' : '60px';
  }
  return 0;
};
export function Grades({ grades, labels = true, hasAside }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BGScale
          left={isMinSize(size, 'medium') ? '180px' : '100px'}
          right={getScoreAsideWidth(size, hasAside)}
        >
          {grades.map(grade => (
            <BGScaleX min={grade.min} key={grade.class}>
              {labels && (
                <BGScaleLabel>
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
};

export default Grades;
