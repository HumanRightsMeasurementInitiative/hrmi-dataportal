import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Drop, ResponsiveContext, Layer } from 'grommet';
import { Close, Add } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';

import {
  REGIONS,
  INCOME_GROUPS,
  ASSESSED_FILTERS,
  OECD_FILTERS,
} from 'containers/App/constants';

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

const getFilterOptions = (
  { region, income, assessed, oecd },
  intl,
  filterGroups,
) => {
  let groups = [];
  if (!region && filterGroups.indexOf('region') > -1) {
    groups = [
      ...groups,
      {
        group: 'regions',
        label: intl.formatMessage(messages.regionsFilterOptionGroup),
        options: REGIONS.map(r => ({
          key: 'region',
          value: r,
          label: intl.formatMessage(rootMessages.regions[r]),
        })),
      },
    ];
  }
  if (!income && filterGroups.indexOf('income') > -1) {
    groups = [
      ...groups,
      {
        group: 'income',
        label: intl.formatMessage(messages.incomeFilterOptionGroup),
        options: INCOME_GROUPS.map(i => ({
          key: 'income',
          value: i.key,
          label: intl.formatMessage(rootMessages.income[i.key]),
        })),
      },
    ];
  }
  if (!oecd && filterGroups.indexOf('oecd') > -1) {
    groups = [
      ...groups,
      {
        group: 'oecd',
        label: intl.formatMessage(messages.oecdFilterOptionGroup),
        options: OECD_FILTERS.map(a => ({
          key: 'oecd',
          value: a,
          label: intl.formatMessage(rootMessages.oecd[a]),
        })),
      },
    ];
  }
  if (!assessed && filterGroups.indexOf('assessed') > -1) {
    groups = [
      ...groups,
      {
        group: 'assessed',
        label: intl.formatMessage(messages.assessedFilterOptionGroup),
        options: ASSESSED_FILTERS.map(a => ({
          key: 'assessed',
          value: a,
          label: intl.formatMessage(rootMessages.assessedFilters[a]),
        })),
      },
    ];
  }
  return groups;
};

const renderContent = (filterOptions, setFilterOpen, onAddFilter) => (
  <Box
    pad={{ horizontal: 'none', top: 'small', bottom: 'none' }}
    overflow="auto"
  >
    <StyledButtonIcon subtle onClick={() => setFilterOpen(false)}>
      <Close size="large" />
    </StyledButtonIcon>
    <FilterOptions
      optionGroups={filterOptions}
      onSelect={({ key, value }) => {
        setFilterOpen(false);
        onAddFilter(key, value);
      }}
    />
  </Box>
);

export function CountryFilters({
  regionFilterValue,
  onRemoveFilter,
  onAddFilter,
  incomeFilterValue,
  assessedFilterValue,
  oecdFilterValue,
  intl,
  filterGroups,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const countryTarget = useRef(null);
  const setFilters = {
    region: filterGroups.indexOf('region') > -1 && regionFilterValue,
    income: filterGroups.indexOf('income') > -1 && incomeFilterValue,
    assessed: filterGroups.indexOf('assessed') > -1 && assessedFilterValue,
    oecd: filterGroups.indexOf('oecd') > -1 && oecdFilterValue,
  };
  const setAllFilters = filterGroups.reduce(
    (memo, filter) => memo && setFilters[filter],
    true,
  );
  const setAnyFilters = filterGroups.reduce(
    (memo, filter) => memo || !!setFilters[filter],
    false,
  );
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          direction={isMinSize(size, 'medium') ? 'row' : 'column'}
          width={isMinSize(size, 'medium') ? 'auto' : '50%'}
          pad={
            isMinSize(size, 'medium')
              ? { vertical: 'small' }
              : { vertical: 'medium' }
          }
          align="start"
          margin={isMinSize(size, 'medium') ? 'none' : { top: '-6px' }}
        >
          {setFilters.region && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('region')}
              label={intl.formatMessage(
                rootMessages.regions[regionFilterValue],
              )}
            />
          )}
          {setFilters.income && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('income')}
              label={intl.formatMessage(rootMessages.income[incomeFilterValue])}
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
          {setFilters.oecd && (
            <ActiveFilterButton
              onRemove={() => onRemoveFilter('oecd')}
              label={intl.formatMessage(rootMessages.oecd[oecdFilterValue])}
            />
          )}
          {!setAllFilters && (
            <Box
              margin={
                size === 'small' && setAnyFilters ? { top: 'small' } : 'none'
              }
              align="start"
            >
              <FilterDropButton
                active={filterOpen}
                onClick={() => {
                  setFilterOpen(!filterOpen);
                }}
                ref={countryTarget}
                style={{
                  textAlign: isMinSize(size, 'medium') ? 'left' : 'center',
                }}
              >
                {isMinSize(size, 'medium') && (
                  <Box direction="row" align="center" gap="xsmall">
                    <Add />
                    <FormattedMessage {...messages.addFilter} />
                  </Box>
                )}
                {isMaxSize(size, 'small') && (
                  <FormattedMessage {...messages.addFilter.mobile} />
                )}
              </FilterDropButton>
              {isMinSize(size, 'large') && filterOpen && (
                <Drop
                  align={{ top: 'top', left: 'left' }}
                  target={countryTarget.current}
                  onClickOutside={() => setFilterOpen(false)}
                >
                  {renderContent(
                    getFilterOptions(
                      {
                        region: regionFilterValue,
                        income: incomeFilterValue,
                        assessed: assessedFilterValue,
                        oecd: oecdFilterValue,
                      },
                      intl,
                      filterGroups,
                    ),
                    setFilterOpen,
                    onAddFilter,
                  )}
                </Drop>
              )}
              {isMaxSize(size, 'medium') && filterOpen && (
                <Layer full animate={false}>
                  {renderContent(
                    getFilterOptions(
                      {
                        region: regionFilterValue,
                        income: incomeFilterValue,
                        assessed: assessedFilterValue,
                        oecd: oecdFilterValue,
                      },
                      intl,
                      filterGroups,
                    ),
                    setFilterOpen,
                    onAddFilter,
                  )}
                </Layer>
              )}
            </Box>
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

CountryFilters.propTypes = {
  intl: intlShape.isRequired,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  oecdFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterGroups: PropTypes.array,
};

export default injectIntl(CountryFilters);
