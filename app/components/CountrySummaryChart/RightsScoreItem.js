import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Text } from 'grommet';

import rootMessages from 'messages';

import formatScoreMax from 'utils/format-score-max';

const RightsScoresWrapperRow = styled.div`
  display: table-row;
  line-height: 12px;
`;
const RightsScoresWrapperCellScore = styled.div`
  width: 50px;
  display: table-cell;
  border-bottom: 1px solid;
`;
const RightsScoresWrapperCellLabel = styled.div`
  display: table-cell;
  border-bottom: 1px solid;
  padding-bottom: 4px;
`;
const RightScoreText = props => <Text weight="bold" size="small" {...props} />;
const RightLabelText = styled.span`
  font-size: 12px;
`;

function RightsScoresItem({ dimensionKey, right, maxValue }) {
  return (
    <RightsScoresWrapperRow>
      <RightsScoresWrapperCellScore>
        <RightScoreText color={`${dimensionKey}Dark`}>
          {right.value && formatScoreMax(right.value, maxValue)}
          {!right.value && 'N/A'}
        </RightScoreText>
      </RightsScoresWrapperCellScore>
      <RightsScoresWrapperCellLabel>
        <RightLabelText color={`${dimensionKey}Dark`}>
          <FormattedMessage {...rootMessages['rights-short'][right.key]} />
        </RightLabelText>
      </RightsScoresWrapperCellLabel>
    </RightsScoresWrapperRow>
  );
}

RightsScoresItem.propTypes = {
  dimensionKey: PropTypes.string,
  right: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  maxValue: PropTypes.number,
};

export default RightsScoresItem;
