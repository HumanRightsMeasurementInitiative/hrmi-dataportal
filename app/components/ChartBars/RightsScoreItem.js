import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text } from 'grommet';

import rootMessages from 'messages';

import { formatScoreMax } from 'utils/scores';

const RightsScoresWrapperRow = styled.div`
  display: table-row;
  line-height: 12px;
  border-bottom-color: ${({ theme }) => theme.global.colors['light-5']};
  &:last-child {
    border-bottom-color: transparent;
  }
`;
const RightsScoresWrapperCellScore = styled.div`
  width: 50px;
  display: table-cell;
  border-bottom: 1px solid;
  border-bottom-color: inherit;
  text-align: center;
  vertical-align: middle;
  padding: 3px 0;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    text-align: left;
  }
`;
const RightsScoresWrapperCellLabel = styled.div`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    vertical-align: middle;
    border-bottom: 1px solid;
    padding: 3px 0;
    border-bottom-color: inherit;
    display: table-cell;
  }
`;
const RightScoreText = props => <Text weight="bold" size="small" {...props} />;
const RightLabelText = styled.span`
  font-size: 12px;
`;

function RightsScoresItem({ dimensionKey, right, maxValue, intl }) {
  return (
    <RightsScoresWrapperRow>
      <RightsScoresWrapperCellScore>
        <RightScoreText color={`${dimensionKey}Dark`}>
          {right.value && formatScoreMax(right.value, maxValue, intl)}
          {!right.value &&
            intl.formatMessage(rootMessages.labels.abbrev.notAvailable)}
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
  intl: intlShape.isRequired,
};

export default injectIntl(RightsScoresItem);
