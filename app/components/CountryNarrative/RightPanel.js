import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Text, Box } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';

import rootMessages from 'messages';
import formatScore from 'utils/format-score';

import ButtonText from 'styled/ButtonText';

import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const RightScoreText = props => (
  <Text
    weight="bold"
    size="small"
    alignSelf="end"
    margin={{ right: '52px' }}
    {...props}
  />
);

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
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
  intl,
}) {
  const value =
    right.score && right.score[column] && parseFloat(right.score[column]);
  return (
    <Box pad={{ vertical: 'xxsmall', horizontal: 'none' }} fill="horizontal">
      <Box
        direction="row"
        align="center"
        pad={{ vertical: 'none', horizontal: 'small' }}
      >
        <ButtonTextHeading onClick={() => onMetricClick(right.key)}>
          <AccordionPanelHeading level={isSubright ? 6 : 5}>
            <FormattedMessage {...rootMessages['rights-short'][right.key]} />
          </AccordionPanelHeading>
        </ButtonTextHeading>
        <TabLinks
          level={isSubright ? 3 : 2}
          onItemClick={onMetricClick}
          items={[
            {
              key: right.key,
              value: 0,
              label: intl.formatMessage(rootMessages.tabs.trend),
              skip: !value,
            },
            {
              key: right.key,
              value: 1,
              label: intl.formatMessage(rootMessages.tabs['people-at-risk']),
              skip: !hasAtRisk,
            },
            {
              key: right.key,
              value: hasAtRisk ? 2 : 1,
              label: intl.formatMessage(rootMessages.tabs.about),
            },
          ]}
        />
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
  intl: intlShape.isRequired,
};

export default injectIntl(RightPanel);
