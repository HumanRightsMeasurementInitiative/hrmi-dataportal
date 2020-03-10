/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading, ResponsiveContext, Box } from 'grommet';
import styled from 'styled-components';

import ChartSettingFilters from 'components/ChartSettingFilters';
import ChartSettingSort from 'components/ChartSettingSort';

import { isMinSize } from 'utils/responsive';

const Styled = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
`;
const Top = styled.div``;

export function ChartHeader({ title, filter, sort }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          <Top>
            <Heading level={2} margin={{ bottom: 'xsmall', top: '0' }}>
              {title}
            </Heading>
          </Top>
          {(filter || sort) && (
            <Box
              direction="row"
              justify="between"
              align={isMinSize(size, 'medium') ? 'center' : 'start'}
              margin={{ bottom: isMinSize(size, 'medium') ? '0' : 'small' }}
            >
              {filter && (
                <ChartSettingFilters
                  regionFilterValue={filter.regionFilterValue}
                  subregionFilterValue={filter.subregionFilterValue}
                  onRemoveFilter={filter.onRemoveFilter}
                  onAddFilter={filter.onAddFilter}
                  incomeFilterValue={filter.incomeFilterValue}
                  countryGroupFilterValue={filter.countryGroupFilterValue}
                  treatyFilterValue={filter.treatyFilterValue}
                  featuredFilterValue={filter.featuredFilterValue}
                  filterValues={filter.filterValues}
                />
              )}
              {sort && (
                <ChartSettingSort
                  sort={sort.sort}
                  options={sort.options}
                  order={sort.order}
                  onSortSelect={sort.onSortSelect}
                  onOrderToggle={sort.onOrderToggle}
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
  title: PropTypes.string,
  filter: PropTypes.object,
  sort: PropTypes.object,
};

export default ChartHeader;
