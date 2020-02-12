import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';

import { Box, Drop, ResponsiveContext, Layer } from 'grommet';
import { Close, Add } from 'grommet-icons';

import {
  INCOME_GROUPS,
  REGIONS,
  SUBREGIONS,
  COUNTRY_GROUPS,
  TREATIES,
  ASSESSED_FILTERS,
} from 'containers/App/constants';

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
  if ((!region || REGIONS.multiple) && filterValues.region) {
    groups = [
      ...groups,
      {
        group: 'regions',
        label: intl.formatMessage(messages.regionsFilterOptionGroup),
        options: filterValues.region
          .filter(value => !region || region.indexOf(value) === -1)
          .map(value => ({
            key: 'region',
            value,
            label: intl.formatMessage(rootMessages.regions[value]),
          })),
      },
    ];
  }
  if ((!subregion || SUBREGIONS.multiple) && filterValues.subregion) {
    groups = [
      ...groups,
      {
        group: 'subregions',
        label: intl.formatMessage(messages.subregionsFilterOptionGroup),
        options: filterValues.subregion
          .filter(value => !subregion || subregion.indexOf(value) === -1)
          .map(value => ({
            key: 'subregion',
            value,
            label: intl.formatMessage(rootMessages.subregions[value]),
          })),
      },
    ];
  }
  if ((!income || INCOME_GROUPS.multiple) && filterValues.income) {
    groups = [
      ...groups,
      {
        group: 'income',
        label: intl.formatMessage(messages.incomeFilterOptionGroup),
        options: filterValues.income
          .filter(value => !income || income.indexOf(value) === -1)
          .map(value => ({
            key: 'income',
            value,
            label: intl.formatMessage(rootMessages.income[value]),
          })),
      },
    ];
  }
  if ((!cgroup || COUNTRY_GROUPS.multiple) && filterValues.cgroup) {
    groups = [
      ...groups,
      {
        group: 'cgroup',
        label: intl.formatMessage(messages.countryGroupFilterOptionGroup),
        options: filterValues.cgroup
          .filter(value => !cgroup || cgroup.indexOf(value) === -1)
          .map(value => ({
            key: 'cgroup',
            value,
            label: intl.formatMessage(rootMessages.countryGroups[value]),
          })),
      },
    ];
  }
  if ((!treaty || TREATIES.multiple) && filterValues.treaty) {
    groups = [
      ...groups,
      {
        group: 'treaty',
        label: intl.formatMessage(messages.treatyFilterOptionGroup),
        options: filterValues.treaty
          .filter(value => !treaty || treaty.indexOf(value) === -1)
          .map(value => ({
            key: 'treaty',
            value,
            label: intl.formatMessage(rootMessages.treaties[value]),
          })),
      },
    ];
  }
  if ((!assessed || ASSESSED_FILTERS.multiple) && filterValues.assessed) {
    groups = [
      ...groups,
      {
        group: 'assessed',
        label: intl.formatMessage(messages.assessedFilterOptionGroup),
        options: filterValues.assessed
          .filter(value => !assessed || assessed.indexOf(value) === -1)
          .map(value => ({
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
          {setFilters.region &&
            setFilters.region.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('region', value)}
                label={intl.formatMessage(rootMessages.regions[value])}
              />
            ))}
          {setFilters.subregion &&
            setFilters.subregion.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('subregion', value)}
                label={intl.formatMessage(rootMessages.subregions[value])}
              />
            ))}
          {setFilters.income &&
            setFilters.income.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('income', value)}
                label={intl.formatMessage(rootMessages.income[value])}
              />
            ))}
          {setFilters.cgroup &&
            setFilters.cgroup.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('cgroup', value)}
                label={intl.formatMessage(rootMessages.countryGroups[value])}
              />
            ))}
          {setFilters.treaty &&
            setFilters.treaty.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('treaty', value)}
                label={intl.formatMessage(rootMessages.treaties[value])}
              />
            ))}
          {setFilters.assessed &&
            setFilters.assessed.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('assessed', value)}
                label={intl.formatMessage(rootMessages.assessedFilters[value])}
              />
            ))}
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
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countryGroupFilterValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  treatyFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
  theme: PropTypes.object,
};

export default injectIntl(withTheme(CountryFilters));
