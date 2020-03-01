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
  margin-left: ${({ left }) => left};
  left: 0;
  right: ${({ theme }) => theme.global.edgeSize.xlarge};
  top: ${({ theme }) => theme.global.edgeSize.ml};
  bottom: ${({ theme }) => theme.global.edgeSize.xsmall};
`;

// background: rgba(0, 0, 0, 0.05);
const BGScaleX = styled.div`
  background: ${({ min }) => (min > 0 ? 'rgba(0, 0, 0, 0.08)' : 'transparent')};
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
export function Grades({ grades, labels = true }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BGScale left={isMinSize(size, 'medium') ? '180px' : '160px'}>
          {grades.map(grade => (
            <BGScaleX min={grade.min}>
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
  grades: PropTypes.object,
  labels: PropTypes.bool,
};

export default Grades;
