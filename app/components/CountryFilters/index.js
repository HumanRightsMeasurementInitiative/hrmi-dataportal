import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';

import { Box, Drop, ResponsiveContext, Layer } from 'grommet';
import { Close, Add } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';

import rootMessages from 'messages';
import { isMinSize, isMaxSize } from 'utils/responsive';
import FilterOptions from './FilterOptions';
import FilterDropButton from './FilterDropButton';
import ActiveFilterButton from './ActiveFilterButton';
import messages from './messages';

const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.global.colors['light-1']};
`;

const FilterWrap = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: ${({ theme }) => theme.global.edgeSize.small};
  }
`;

const getFilterOptions = (
  { region, subregion, income, assessed, cgroup, treaty },
  intl,
  filterValues,
) => {
  let groups = [];
  if (!region && filterValues.region) {
    groups = [
      ...groups,
      {
        group: 'regions',
        label: intl.formatMessage(messages.regionsFilterOptionGroup),
        options: filterValues.region.map(value => ({
          key: 'region',
          value,
          label: intl.formatMessage(rootMessages.regions[value]),
        })),
      },
    ];
  }
  if (!subregion && filterValues.subregion) {
    groups = [
      ...groups,
      {
        group: 'subregions',
        label: intl.formatMessage(messages.subregionsFilterOptionGroup),
        options: filterValues.subregion.map(value => ({
          key: 'subregion',
          value,
          label: intl.formatMessage(rootMessages.subregions[value]),
        })),
      },
    ];
  }
  if (!income && filterValues.income) {
    groups = [
      ...groups,
      {
        group: 'income',
        label: intl.formatMessage(messages.incomeFilterOptionGroup),
        options: filterValues.income.map(value => ({
          key: 'income',
          value,
          label: intl.formatMessage(rootMessages.income[value]),
        })),
      },
    ];
  }
  if (!cgroup && filterValues.cgroup) {
    groups = [
      ...groups,
      {
        group: 'cgroup',
        label: intl.formatMessage(messages.countryGroupFilterOptionGroup),
        options: filterValues.cgroup.map(value => ({
          key: 'cgroup',
          value,
          label: intl.formatMessage(rootMessages.countryGroups[value]),
        })),
      },
    ];
  }
  if (!treaty && filterValues.treaty) {
    groups = [
      ...groups,
      {
        group: 'treaty',
        label: intl.formatMessage(messages.treatyFilterOptionGroup),
        options: filterValues.treaty.map(value => ({
          key: 'treaty',
          value,
          label: intl.formatMessage(rootMessages.treaties[value]),
        })),
      },
    ];
  }
  if (!assessed && filterValues.assessed) {
    groups = [
      ...groups,
      {
        group: 'assessed',
        label: intl.formatMessage(messages.assessedFilterOptionGroup),
        options: filterValues.assessed.map(value => ({
          key: 'assessed',
          value,
          label: intl.formatMessage(rootMessages.assessedFilters[value]),
        })),
      },
    ];
  }
  return groups;
};

const renderContent = (filterOptions, setFilterOpen, onAddFilter) => (
  <Box
    pad={{ horizontal: 'none', top: 'small', bottom: 'none' }}
    width={{ min: '280px' }}
    overflow="auto"
  >
    <StyledButtonIcon subtle onClick={() => setFilterOpen(false)}>
      <Close size="large" />
    </StyledButtonIcon>
    <FilterOptions
      optionGroups={filterOptions.filter(g => g.options.length > 0)}
      onSelect={({ key, value }) => {
        setFilterOpen(false);
        onAddFilter(key, value);
      }}
    />
  </Box>
);

export function CountryFilters({
  regionFilterValue,
  subregionFilterValue,
  onRemoveFilter,
  onAddFilter,
  incomeFilterValue,
  assessedFilterValue,
  countryGroupFilterValue,
  treatyFilterValue,
  intl,
  filterValues,
  theme,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const countryTarget = useRef(null);
  const setFilters = {
    region: filterValues.region && regionFilterValue,
    subregion: filterValues.subregion && subregionFilterValue,
    income: filterValues.income && incomeFilterValue,
    assessed: filterValues.assessed && assessedFilterValue,
    cgroup: filterValues.cgroup && countryGroupFilterValue,
    treaty: filterValues.treaty && treatyFilterValue,
  };
  const setAllFilters = Object.keys(filterValues).reduce(
    (memo, key) => memo && setFilters[key],
    true,
  );
  const optionGroups = getFilterOptions(
    {
      region: regionFilterValue,
      subregion: subregionFilterValue,
      income: incomeFilterValue,
      assessed: assessedFilterValue,
      cgroup: countryGroupFilterValue,
      treaty: treatyFilterValue,
    },
    intl,
    filterValues,
  );
  const hasOptions = optionGroups.reduce(
    (memo, g) => memo || g.options.length > 0,
    false,
  );
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <FilterWrap>
          {setFilters.region && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('region')}
              label={intl.formatMessage(
                rootMessages.regions[regionFilterValue],
              )}
            />
          )}
          {setFilters.subregion && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('subregion')}
              label={intl.formatMessage(
                rootMessages.subregions[subregionFilterValue],
              )}
            />
          )}
          {setFilters.income && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('income')}
              label={intl.formatMessage(rootMessages.income[incomeFilterValue])}
            />
          )}
          {setFilters.cgroup && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('cgroup')}
              label={intl.formatMessage(
                rootMessages.countryGroups[countryGroupFilterValue],
              )}
            />
          )}
          {setFilters.treaty && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('treaty')}
              label={intl.formatMessage(
                rootMessages.treaties[treatyFilterValue],
              )}
            />
          )}
          {setFilters.assessed && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('assessed')}
              label={intl.formatMessage(
                rootMessages.assessedFilters[assessedFilterValue],
              )}
            />
          )}
          {!setAllFilters && hasOptions && (
            <>
              <FilterDropButton
                active={filterOpen}
                onClick={() => {
                  setFilterOpen(!filterOpen);
                }}
                ref={countryTarget}
                style={{
                  textAlign: isMinSize(size, 'large') ? 'left' : 'center',
                  marginBottom: theme.global.edgeSize.xxsmall,
                }}
              >
                {isMinSize(size, 'large') && (
                  <Box direction="row" align="center" gap="xsmall">
                    <Add />
                    <FormattedMessage {...messages.addFilter} />
                  </Box>
                )}
                {isMaxSize(size, 'medium') && (
                  <FormattedMessage {...messages.addFilterMobile} />
                )}
              </FilterDropButton>
              {isMinSize(size, 'large') && filterOpen && (
                <Drop
                  align={{ top: 'top', left: 'left' }}
                  target={countryTarget.current}
                  onClickOutside={() => setFilterOpen(false)}
                >
                  {renderContent(optionGroups, setFilterOpen, onAddFilter)}
                </Drop>
              )}
              {isMaxSize(size, 'medium') && filterOpen && (
                <Layer full animate={false}>
                  {renderContent(optionGroups, setFilterOpen, onAddFilter)}
                </Layer>
              )}
            </>
          )}
        </FilterWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

CountryFilters.propTypes = {
  intl: intlShape.isRequired,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  countryGroupFilterValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  treatyFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
  theme: PropTypes.object,
};

export default injectIntl(withTheme(CountryFilters));
