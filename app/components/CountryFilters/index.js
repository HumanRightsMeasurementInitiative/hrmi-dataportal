import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Text, Drop } from 'grommet';
import { Close, Add } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';

import {
  REGIONS,
  INCOME_GROUPS,
  ASSESSED_FILTERS,
} from 'containers/App/constants';

import rootMessages from 'messages';
import FilterOptions from './FilterOptions';
import FilterDropButton from './FilterDropButton';
import ActiveFilterButton from './ActiveFilterButton';
import messages from './messages';

const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 40px;
  height: 40px;
`;

const getFilterOptions = ({ region, income, assessed }, intl, filterGroups) => {
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

export function CountryFilters({
  regionFilterValue,
  onRemoveFilter,
  onAddFilter,
  incomeFilterValue,
  assessedFilterValue,
  intl,
  filterGroups,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const countryTarget = useRef(null);

  return (
    <Box direction="row" pad={{ vertical: 'small' }}>
      {filterGroups.indexOf('region') > -1 && regionFilterValue && (
        <ActiveFilterButton
          onRemove={() => onRemoveFilter('region')}
          label={intl.formatMessage(rootMessages.regions[regionFilterValue])}
        />
      )}
      {filterGroups.indexOf('income') > -1 && incomeFilterValue && (
        <ActiveFilterButton
          onRemove={() => onRemoveFilter('income')}
          label={intl.formatMessage(rootMessages.income[incomeFilterValue])}
        />
      )}
      {filterGroups.indexOf('assessed') > -1 && assessedFilterValue && (
        <ActiveFilterButton
          onRemove={() => onRemoveFilter('assessed')}
          label={intl.formatMessage(
            rootMessages.assessedFilters[assessedFilterValue],
          )}
        />
      )}
      {(!(filterGroups.indexOf('region') && regionFilterValue) ||
        !(filterGroups.indexOf('income') > -1 && incomeFilterValue) ||
        (!assessedFilterValue && filterGroups.indexOf('assessed') > -1)) && (
        <>
          <FilterDropButton
            active={filterOpen}
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
            ref={countryTarget}
          >
            <Box direction="horizontal" align="center" gap="xsmall">
              <Add />
              <Text>
                <FormattedMessage {...messages.addFilter} />
              </Text>
            </Box>
          </FilterDropButton>
          {filterOpen && (
            <Drop
              align={{ top: 'top', left: 'left' }}
              target={countryTarget.current}
              onClickOutside={() => setFilterOpen(false)}
            >
              <Box pad={{ horizontal: 'none', top: 'small', bottom: 'none' }}>
                <StyledButtonIcon subtle onClick={() => setFilterOpen(false)}>
                  <Close size="large" />
                </StyledButtonIcon>
                <FilterOptions
                  optionGroups={getFilterOptions(
                    {
                      region: regionFilterValue,
                      income: incomeFilterValue,
                      assessed: assessedFilterValue,
                    },
                    intl,
                    filterGroups,
                  )}
                  onSelect={({ key, value }) => {
                    setFilterOpen(false);
                    onAddFilter(key, value);
                  }}
                />
              </Box>
            </Drop>
          )}
        </>
      )}
    </Box>
  );
}

CountryFilters.propTypes = {
  intl: intlShape.isRequired,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterGroups: PropTypes.array,
};

export default injectIntl(CountryFilters);
