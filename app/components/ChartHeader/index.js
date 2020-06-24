/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading, ResponsiveContext, Box, Text } from 'grommet';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import ChartTools from 'containers/ChartTools';

import ChartSettingFilters from 'components/ChartSettingFilters';
import ChartSettingSort from 'components/ChartSettingSort';

import { isMinSize, isMaxSize } from 'utils/responsive';

import messages from './messages';

const Styled = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: ${({ top }) => (top ? 20 : 30)}px;
    margin-bottom: 20px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-top: ${({ top }) => (top ? 20 : 60)}px;
  }
`;
const Top = styled(Box)`
  position: relative;
`;
const SubHeading = styled(Text)`
  margin-top: -5px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    position: absolute;
    top: 100%;
    margin-top: -8px;
  }
`;
const HeadingWrap = styled(Box)`
  position: relative;
`;

const ChartToolWrapper = styled(Box)``;

export function ChartHeader({
  title,
  chartId,
  filter,
  sort,
  messageValues,
  tools,
  intl,
  includeChartName,
  hasWhiteBG,
  top,
  hasSubHeading,
  standard,
}) {
  const chartName =
    title || intl.formatMessage(messages[chartId], messageValues);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled top={top}>
          <Top direction="row" align="center" justify="between">
            <HeadingWrap>
              <Heading
                level={isMaxSize(size, 'sm') ? 5 : 2}
                responsive={false}
                margin={{ vertical: 'xsmall' }}
              >
                {chartName}
              </Heading>
              {((hasSubHeading && messages[`${chartId}-sub`]) ||
                (hasSubHeading &&
                  messages[`assessment-standard-${standard}-sub`])) && (
                <SubHeading
                  size={isMinSize(size, 'medium') ? 'xsmall' : 'xxsmall'}
                >
                  {messages[`${chartId}-sub`] ? (
                    <FormattedMessage
                      {...messages[`${chartId}-sub`]}
                      values={messageValues}
                    />
                  ) : (
                    <FormattedMessage
                      {...messages[`assessment-standard-${standard}-sub`]}
                      values={messageValues}
                    />
                  )}
                </SubHeading>
              )}
            </HeadingWrap>
            {tools && (
              <ChartToolWrapper flex={{ shrink: 0 }}>
                <ChartTools
                  hasWhiteBG={hasWhiteBG}
                  howToReadConfig={
                    tools.howToReadConfig && {
                      chartName: includeChartName && chartName,
                      ...tools.howToReadConfig,
                    }
                  }
                  settingsConfig={
                    tools.settingsConfig && {
                      chartName: includeChartName && chartName,
                      ...tools.settingsConfig,
                    }
                  }
                />
              </ChartToolWrapper>
            )}
          </Top>
          {(filter || sort) && (
            <Box
              direction={isMaxSize(size, 'sm') ? 'column' : 'row'}
              justify="between"
              align={isMinSize(size, 'medium') ? 'center' : 'start'}
              margin={{
                bottom: isMinSize(size, 'medium') ? '0' : 'small',
                top: isMinSize(size, 'medium') ? 'small' : '0',
              }}
            >
              {sort && isMaxSize(size, 'sm') && (
                <ChartSettingSort
                  sort={sort.sort}
                  options={sort.options}
                  order={sort.order}
                  onSortSelect={sort.onSortSelect}
                  onOrderToggle={sort.onOrderToggle}
                  hasWhiteBG={hasWhiteBG}
                />
              )}
              {filter && (
                <ChartSettingFilters
                  regionFilterValue={filter.regionFilterValue}
                  subregionFilterValue={filter.subregionFilterValue}
                  assessedFilterValue={filter.assessedFilterValue}
                  onRemoveFilter={filter.onRemoveFilter}
                  onAddFilter={filter.onAddFilter}
                  incomeFilterValue={filter.incomeFilterValue}
                  countryGroupFilterValue={filter.countryGroupFilterValue}
                  treatyFilterValue={filter.treatyFilterValue}
                  filterValues={filter.filterValues}
                  hasWhiteBG={hasWhiteBG}
                />
              )}
              {sort && isMinSize(size, 'medium') && (
                <ChartSettingSort
                  sort={sort.sort}
                  options={sort.options}
                  order={sort.order}
                  onSortSelect={sort.onSortSelect}
                  onOrderToggle={sort.onOrderToggle}
                  hasWhiteBG={hasWhiteBG}
                />
              )}
            </Box>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// currentBenchmark={currentBenchmark}
// standard={standard}

ChartHeader.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  chartId: PropTypes.string,
  title: PropTypes.string,
  filter: PropTypes.object,
  sort: PropTypes.object,
  messageValues: PropTypes.object,
  tools: PropTypes.object,
  includeChartName: PropTypes.bool,
  hasWhiteBG: PropTypes.bool,
  top: PropTypes.bool,
  hasSubHeading: PropTypes.bool,
  standard: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartHeader);
