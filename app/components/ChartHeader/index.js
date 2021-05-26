/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading, ResponsiveContext, Box, Text, Button } from 'grommet';
import { Share, Next, Previous } from 'grommet-icons';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import ChartTools from 'containers/ChartTools';

import ChartSettingFilters from 'components/ChartSettingFilters';
import ChartSettingSort from 'components/ChartSettingSort';

import { isMinSize, isMaxSize } from 'utils/responsive';

import ButtonNavPrimary from 'styled/ButtonNavPrimary';

import rootMessages from 'messages';
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
  @media print {
    display: ${({ displayInPDF }) => (displayInPDF ? 'initial' : 'none')};
  }
`;
const Top = styled(Box)`
  position: relative;
`;

const HeadingWrap = styled(Box)`
  position: relative;
`;

const ChartToolWrapper = styled(Box)`
  align-items: flex-end;
`;

const TextWrap = styled.span`
  vertical-align: middle;
`;

const StyledShare = styled(p => <Share {...p} size="small" />)`
  vertical-align: middle;
  margin-left: 7px;
  stroke: currentColor;
`;

const DownloadButton = styled(ButtonNavPrimary)`
  padding: 8px 2px;
  font-size: 0.8em;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 8px 2px;
    font-size: 1em;
  }
`;

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
  displayInPDF,
  countryCode,
  locale,
  selectedYear,
  setSelectedYear,
  maxYearDimension,
  minYearDimension,
}) {
  const chartName =
    title || intl.formatMessage(messages[chartId], messageValues);

  console.log({ sort });
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled top={top} displayInPDF={displayInPDF}>
          <Top direction="row" align="baseline" justify="between">
            <HeadingWrap>
              <Heading
                level={isMaxSize(size, 'sm') ? 5 : 2}
                responsive={false}
                margin={{ vertical: 'xsmall' }}
              >
                {chartName}
              </Heading>
              {messageValues && messageValues.dimensionDataSource && (
                <Text size={isMinSize(size, 'large') ? 'small' : 'xsmall'}>
                  {messageValues.dimensionDataSource}
                </Text>
              )}
              {((hasSubHeading && messages[`${chartId}-sub`]) ||
                (hasSubHeading &&
                  messages[`assessment-standard-${standard}-sub`])) && (
                <Text size={isMinSize(size, 'medium') ? 'xsmall' : 'xxsmall'}>
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
                </Text>
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
                {tools &&
                  tools.settingsConfig &&
                  tools.settingsConfig.key === 'tab-snapshot' && (
                  /* eslint-disable */
                  <DownloadButton
                    as="a"
                    href={`/pdfs/${locale}-${countryCode}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TextWrap>
                      <FormattedMessage
                        {...rootMessages.labels.chartTools.downloadPDF}
                      />
                    </TextWrap>
                    <StyledShare />
                  </DownloadButton>
                )}
              </ChartToolWrapper>
                /* eslint-enable */
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
              <Box>
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
                <Box direction="row" justify="end" align="center">
                  <Button
                    plain
                    disabled={
                      minYearDimension === selectedYear ||
                      (sort.sort !== 'score' && sort.sort !== 'name')
                    }
                    onClick={() => {
                      setSelectedYear(
                        (parseInt(selectedYear, 10) - 1).toString(),
                      );
                    }}
                    icon={<Previous size="small" />}
                    margin={{ right: 'xsmall' }}
                  />
                  {selectedYear}
                  <Button
                    plain
                    disabled={
                      maxYearDimension === selectedYear ||
                      (sort.sort !== 'score' && sort.sort !== 'name')
                    }
                    onClick={() =>
                      setSelectedYear(
                        (parseInt(selectedYear, 10) + 1).toString(),
                      )
                    }
                    icon={<Next size="small" />}
                    margin={{ left: 'xsmall' }}
                  />
                </Box>
              </Box>
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
  displayInPDF: PropTypes.bool,
  countryCode: PropTypes.string,
  locale: PropTypes.string,
  selectedYear: PropTypes.string,
  setSelectedYear: PropTypes.func,
  maxYearDimension: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYearDimension: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default injectIntl(ChartHeader);
