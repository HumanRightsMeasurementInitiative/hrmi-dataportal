import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { Box, DropButton, Button } from 'grommet';
import { FormDown, FormUp, Ascend, Descend } from 'grommet-icons';

import messages from './messages';
import SortOptions from './SortOptions';

export function CountrySort({
  sort,
  options,
  order,
  onSortSelect,
  onOrderToggle,
  intl,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <Box direction="row" pad="xsmall">
      <DropButton
        plain
        reverse
        gap="xxsmall"
        margin={{ horizontal: 'small' }}
        icon={optionsOpen ? <FormUp /> : <FormDown />}
        label={`${intl.formatMessage(messages.sortBy)} ${intl.formatMessage(
          messages.sortOptions[sort],
        )}`}
        onClose={() => setOptionsOpen(false)}
        onOpen={() => setOptionsOpen(true)}
        open={optionsOpen}
        dropProps={{ align: { top: 'bottom', left: 'left' } }}
        dropContent={
          <SortOptions
            options={options}
            onSelect={value => {
              setOptionsOpen(false);
              onSortSelect(value);
            }}
          />
        }
      />
      <Button onClick={() => onOrderToggle(order === 'asc' ? 'desc' : 'asc')}>
        {order === 'asc' && <Ascend />}
        {order === 'desc' && <Descend />}
      </Button>
    </Box>
  );
}

CountrySort.propTypes = {
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  options: PropTypes.array,
  order: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderToggle: PropTypes.func,
};

export default injectIntl(CountrySort);
