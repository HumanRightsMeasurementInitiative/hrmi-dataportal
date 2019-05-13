import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Heading, Text, Box } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';

import rootMessages from 'messages';
import formatScore from 'utils/format-score';

const RightScoreText = props => (
  <Text
    weight="bold"
    size="small"
    alignSelf="end"
    margin={{ right: '52px' }}
    {...props}
  />
);

function RightPanel({ right, column, isSubright }) {
  const value = right.score && right.score[column];
  const maxValue = right.type === 'esr' ? 100 : 10;
  return (
    <Box pad={{ vertical: 'xxsmall', horizontal: 'small' }} fill="horizontal">
      <Heading level={isSubright ? 6 : 5} margin={{ vertical: '2px' }}>
        <FormattedMessage {...rootMessages['rights-short'][right.key]} />
      </Heading>
      {value && (
        <BarHorizontal
          height={isSubright ? 8 : 15}
          color={right.dimension}
          value={parseFloat(value)}
          minValue={0}
          maxValue={maxValue}
          noData={!value}
          unit={right.type === 'esr' ? '%' : ''}
        />
      )}
      <RightScoreText color={`${right.dimension}Dark`}>
        {value && formatScore(value)}
        {!value && 'N/A'}
      </RightScoreText>
    </Box>
  );
}
RightPanel.propTypes = {
  right: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  column: PropTypes.string,
  isSubright: PropTypes.bool,
};

export default RightPanel;
