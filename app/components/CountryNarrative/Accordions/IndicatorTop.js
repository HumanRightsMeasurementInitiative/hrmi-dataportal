import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormNext } from 'grommet-icons';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import ButtonText from 'styled/ButtonText';
import Hidden from 'styled/Hidden';

import PanelHeading from './PanelHeading';
import TabLinks from './TabLinks';

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
`;

const getDimensionValue = (data, benchmark) => {
  if (data.score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(data.score[col]);
  }
  return false;
};

const getDimensionRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refIndicatorColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
function IndicatorTop({
  indicator,
  benchmark,
  standard,
  onMetricClick,
  intl,
  raw,
}) {
  const data = {
    ...indicator,
    color: 'esr',
    value: getDimensionValue(indicator, benchmark),
    refValues: getDimensionRefs(indicator.score, benchmark),
    maxValue: '100',
    stripes: standard === 'hi',
    unit: '%',
  };
  const hasGroups = indicator.groupScores && indicator.groupScores.length > 0;

  return (
    <Box
      direction="row"
      align="center"
      pad={{ vertical: 'none', horizontal: 'small' }}
    >
      <ButtonTextHeading onClick={() => onMetricClick(indicator.key)}>
        <PanelHeading level={6}>
          {!raw && (
            <FormattedMessage {...rootMessages.indicators[indicator.key]} />
          )}
          {raw && (
            <FormattedMessage
              {...rootMessages['indicators-raw'][indicator.key]}
            />
          )}
          <Hidden min="medium">
            <FormNext size="large" />
          </Hidden>
        </PanelHeading>
      </ButtonTextHeading>
      <TabLinks
        level={3}
        onItemClick={onMetricClick}
        items={[
          {
            key: indicator.key,
            value: 'groups',
            label: intl.formatMessage(rootMessages.tabs.groups),
            skip: !hasGroups,
          },
          {
            key: indicator.key,
            value: 'trend',
            label: intl.formatMessage(rootMessages.tabs.trend),
            skip: !data.value,
          },
          {
            key: indicator.key,
            value: 'about',
            label: intl.formatMessage(rootMessages.tabs.about),
          },
        ]}
      />
    </Box>
  );
}
IndicatorTop.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
  raw: PropTypes.bool,
};

export default injectIntl(IndicatorTop);
