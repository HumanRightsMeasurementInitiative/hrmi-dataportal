import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Text } from 'grommet';
import styled from 'styled-components';
import Loading from 'components/Loading';
import rootMessages from 'messages';

const Styled = styled.div`
  display: table;
  height: 100%;
  width: 100%;
`;
const StyledTextWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 0 5px;
`;
const StyledText = styled(Text)`
  text-decoration: none !important;
  font-style: italic;
  display: inline-block;
  margin-right: 4px;
`;

const renderMessage = hint => {
  if (hint === 'loading') {
    return <Loading />;
  }
  if (hint === 'incompleteData') {
    return <FormattedMessage {...rootMessages.charts.incompleteData} />;
  }
  if (hint === 'changeStandard') {
    return (
      <FormattedMessage
        {...rootMessages.charts.incompleteData.changeStandard}
      />
    );
  }
  if (hint === 'drillDownRights') {
    return (
      <FormattedMessage
        {...rootMessages.charts.incompleteData.drillDownRights}
      />
    );
  }
  if (hint === 'drillDownIndicators') {
    return (
      <FormattedMessage
        {...rootMessages.charts.incompleteData.drillDownIndicators}
      />
    );
  }
  if (hint === 'noDataForStandard') {
    return <FormattedMessage {...rootMessages.charts.noDataForStandard} />;
  }
  return <FormattedMessage {...rootMessages.charts.noData} />;
};

function NoDataHint({ hint, hints }) {
  return (
    <Styled>
      <StyledTextWrap>
        {hint && (
          <StyledText size="xsmall" color="dark-4">
            {renderMessage(hint)}
          </StyledText>
        )}
        {hints &&
          hints
            .filter(h => !!h)
            .map((h, index) => (
              <StyledText size="xxsmall" color="dark-4" key={h}>
                {index > 0 && '('}
                {renderMessage(h)}
                {index > 0 && ')'}
              </StyledText>
            ))}
      </StyledTextWrap>
    </Styled>
  );
}

NoDataHint.propTypes = {
  hint: PropTypes.string,
  hints: PropTypes.array,
};

export default NoDataHint;
