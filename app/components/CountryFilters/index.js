import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { Box, Button, DropButton } from 'grommet';
import { FormClose, FormAdd } from 'grommet-icons';

import {
  REGIONS,
  INCOME_GROUPS,
  ASSESSED_FILTERS,
} from 'containers/App/constants';

import rootMessages from 'messages';
import FilterOptions from './FilterOptions';
import messages from './messages';

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

  return (
    <Box direction="row" pad="xsmall">
      {filterGroups.indexOf('region') > -1 && regionFilterValue && (
        <Button
          primary
          icon={<FormClose />}
          reverse
          onClick={() => onRemoveFilter('region')}
          label={intl.formatMessage(rootMessages.regions[regionFilterValue])}
          pad="xxsmall"
          gap="xxsmall"
          margin={{ horizontal: 'xsmall' }}
        />
      )}
      {filterGroups.indexOf('income') > -1 && incomeFilterValue && (
        <Button
          primary
          icon={<FormClose />}
          reverse
          onClick={() => onRemoveFilter('income')}
          label={intl.formatMessage(rootMessages.income[incomeFilterValue])}
          pad="xxsmall"
          gap="xxsmall"
          margin={{ horizontal: 'xsmall' }}
        />
      )}
      {filterGroups.indexOf('assessed') > -1 && assessedFilterValue && (
        <Button
          primary
          icon={<FormClose />}
          reverse
          onClick={() => onRemoveFilter('assessed')}
          label={intl.formatMessage(
            rootMessages.assessedFilters[assessedFilterValue],
          )}
          pad="xxsmall"
          gap="xxsmall"
          margin={{ horizontal: 'xsmall' }}
        />
      )}
      {(!regionFilterValue || !incomeFilterValue || !assessedFilterValue) && (
        <DropButton
          plain
          reverse
          gap="xxsmall"
          margin={{ horizontal: 'small' }}
          icon={<FormAdd />}
          label={intl.formatMessage(messages.addFilter)}
          onClose={() => setFilterOpen(false)}
          onOpen={() => setFilterOpen(true)}
          open={filterOpen}
          dropProps={{ align: { top: 'top', left: 'left' } }}
          dropContent={
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
          }
        />
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
