import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Text, Box } from 'grommet';
import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';

import rootMessages from 'messages';

import formatScore from 'utils/format-score';
import ButtonText from 'styled/ButtonText';

import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const DimensionScoreText = props => (
  <Text weight="bold" {...props} alignSelf="end" margin={{ right: '52px' }} />
);

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
`;

function DimensionPanel({
  dimension,
  column,
  refColumns,
  columnLo,
  columnHi,
  standard,
  onMetricClick,
  hasAtRisk = true,
  intl,
}) {
  const { score, type, key } = dimension;
  const value = score && score[column] && parseFloat(score[column]);
  const refValues =
    refColumns &&
    score &&
    refColumns.map(refColumn => ({
      value: refColumn.value || score[refColumn.column],
      style: refColumn.style,
      key: refColumn.key,
    }));
  return (
    <Box pad={{ vertical: 'small', horizontal: 'none' }} fill="horizontal">
      <Box
        direction="row"
        align="center"
        pad={{ vertical: 'none', horizontal: 'small' }}
      >
        <ButtonTextHeading onClick={() => onMetricClick(key)}>
          <AccordionPanelHeading level={4}>
            <FormattedMessage {...rootMessages.dimensions[key]} />
          </AccordionPanelHeading>
        </ButtonTextHeading>
        <TabLinks
          level={1}
          onItemClick={onMetricClick}
          items={[
            {
              key,
              value: 0,
              label: intl.formatMessage(rootMessages.tabs.trend),
              skip: !value,
            },
            {
              key,
              value: 1,
              label: intl.formatMessage(rootMessages.tabs['people-at-risk']),
              skip: !hasAtRisk,
            },
            {
              key,
              value: hasAtRisk ? 2 : 1,
              label: intl.formatMessage(rootMessages.tabs.about),
            },
          ]}
        />
      </Box>
      {type === 'esr' && (
        <BarHorizontal
          color={key}
          value={value}
          minValue={0}
          maxValue={100}
          data={dimension}
          unit="%"
          stripes={standard === 'hi'}
          refValues={refValues}
        />
      )}
      {type === 'cpr' && (
        <BarBulletHorizontal
          color={key}
          value={value}
          band={{
            lo: score && parseFloat(score[columnLo]),
            hi: score && parseFloat(score[columnHi]),
          }}
          minValue={0}
          maxValue={10}
          noData={!value}
        />
      )}
      <DimensionScoreText color={`${key}Dark`}>
        {value && formatScore(value)}
      </DimensionScoreText>
    </Box>
  );
}
DimensionPanel.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  standard: PropTypes.string,
  column: PropTypes.string,
  columnLo: PropTypes.string,
  columnHi: PropTypes.string,
  onMetricClick: PropTypes.func,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
  refColumns: PropTypes.array,
};

export default injectIntl(DimensionPanel);
