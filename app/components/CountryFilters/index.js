import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { Box, Button, DropButton } from 'grommet';
import { FormClose, FormAdd } from 'grommet-icons';

import { REGIONS, INCOME_GROUPS } from 'containers/App/constants';

import rootMessages from 'messages';
import FilterOptions from './FilterOptions';
import messages from './messages';

const getFilterOptions = ({ region, income }, intl) => {
  let groups = [];
  if (!region) {
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
  if (!income) {
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
  return groups;
};

export function CountryFilters({
  regionFilterValue,
  onRemoveFilter,
  onAddFilter,
  incomeFilterValue,
  intl,
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Box direction="row" pad="xsmall">
      {regionFilterValue && (
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
      {incomeFilterValue && (
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
      {(!regionFilterValue || !incomeFilterValue) && (
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
                },
                intl,
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
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
};

export default injectIntl(CountryFilters);
