import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Text, Box } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';

import rootMessages from 'messages';
import formatScore from 'utils/format-score';

import ButtonText from 'styled/ButtonText';

import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const IndicatorScoreText = props => (
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

const maxValue = 100;

function IndicatorPanel({ indicator, column, standard, onMetricClick, intl }) {
  const value =
    indicator.score &&
    indicator.score[column] &&
    parseFloat(indicator.score[column]);
  return (
    <Box pad={{ vertical: 'xxsmall', horizontal: 'none' }} fill="horizontal">
      <Box
        direction="row"
        align="center"
        pad={{ vertical: 'none', horizontal: 'small' }}
      >
        <ButtonTextHeading onClick={() => onMetricClick(indicator.key)}>
          <AccordionPanelHeading level={6}>
            <FormattedMessage {...rootMessages.indicators[indicator.key]} />
          </AccordionPanelHeading>
        </ButtonTextHeading>
        <TabLinks
          level={3}
          onItemClick={onMetricClick}
          items={[
            {
              key: indicator.key,
              value: 0,
              label: intl.formatMessage(rootMessages.tabs.trend),
              skip: !value,
            },
            {
              key: indicator.key,
              value: 1,
              label: intl.formatMessage(rootMessages.tabs.about),
            },
          ]}
        />
      </Box>
      <BarHorizontal
        level={3}
        color="esr"
        value={value}
        minValue={0}
        maxValue={maxValue}
        data={indicator}
        unit="%"
        stripes={standard === 'hi'}
      />
      <IndicatorScoreText color="esrDark">
        {value && formatScore(value)}
      </IndicatorScoreText>
    </Box>
  );
}
IndicatorPanel.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  column: PropTypes.string,
  standard: PropTypes.string,
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(IndicatorPanel);
