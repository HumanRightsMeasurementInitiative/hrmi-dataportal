import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading, Text, Box, Button } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';

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

const RightHeading = props => (
  <Heading level={5} margin={{ vertical: '5px' }} {...props} />
);
const StyledRightHeading = styled(RightHeading)`
  display: inline-block;
`;

function RightPanel({
  right,
  column,
  isSubright,
  columnLo,
  columnHi,
  onMetricClick,
  standard,
  hasAtRisk = true,
}) {
  const value =
    right.score && right.score[column] && parseFloat(right.score[column]);
  const trendTab = 0;
  const atRiskTab = 1;
  const aboutTab = hasAtRisk ? 2 : 1;
  return (
    <Box pad={{ vertical: 'xxsmall', horizontal: 'small' }} fill="horizontal">
      <Box direction="row" align="center">
        <Button onClick={() => onMetricClick(right.key)}>
          <StyledRightHeading
            level={isSubright ? 6 : 5}
            margin={{ vertical: '2px' }}
          >
            <FormattedMessage {...rootMessages['rights-short'][right.key]} />
          </StyledRightHeading>
        </Button>
        {value && (
          <Button onClick={() => onMetricClick(right.key, trendTab)}>
            <Text
              size={isSubright ? 'xsmall' : 'small'}
              margin={{ horizontal: 'xsmall' }}
            >
              <FormattedMessage {...rootMessages.tabs.trend} />
            </Text>
          </Button>
        )}
        {hasAtRisk && (
          <Button onClick={() => onMetricClick(right.key, atRiskTab)}>
            <Text
              size={isSubright ? 'xsmall' : 'small'}
              margin={{ horizontal: 'xsmall' }}
            >
              <FormattedMessage {...rootMessages.tabs['people-at-risk']} />
            </Text>
          </Button>
        )}
        <Button onClick={() => onMetricClick(right.key, aboutTab)}>
          <Text
            size={isSubright ? 'xsmall' : 'small'}
            margin={{ horizontal: 'xsmall' }}
          >
            <FormattedMessage {...rootMessages.tabs.about} />
          </Text>
        </Button>
      </Box>
      {right.type === 'esr' && (
        <BarHorizontal
          level={isSubright ? 3 : 2}
          color={right.dimension}
          value={value}
          minValue={0}
          maxValue={100}
          data={right}
          unit="%"
          stripes={standard === 'hi'}
        />
      )}
      {right.type === 'cpr' && (
        <BarBulletHorizontal
          level={isSubright ? 3 : 2}
          color={right.dimension}
          value={parseFloat(value)}
          band={{
            lo: right.score && parseFloat(right.score[columnLo]),
            hi: right.score && parseFloat(right.score[columnHi]),
          }}
          minValue={0}
          maxValue={10}
          data={right}
          noData={!value}
        />
      )}
      <RightScoreText color={`${right.dimension}Dark`}>
        {value && formatScore(value)}
      </RightScoreText>
    </Box>
  );
}
RightPanel.propTypes = {
  onMetricClick: PropTypes.func,
  right: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  column: PropTypes.string,
  isSubright: PropTypes.bool,
  columnLo: PropTypes.string,
  columnHi: PropTypes.string,
  hasAtRisk: PropTypes.bool,
};

export default RightPanel;
