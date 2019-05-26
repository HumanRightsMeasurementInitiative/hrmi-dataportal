import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { injectIntl, intlShape } from 'react-intl';

import { Box, DropButton } from 'grommet';
import { FormDown, FormUp, Ascend, Descend } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';

import messages from './messages';
import SortOptions from './SortOptions';

const StyledDropButton = styled(DropButton)`
  &:hover {
    color: ${({ theme }) => theme.global.colors.highlight3};
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 35px;
  height: 35px;
`;

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
    <Box direction="row" pad="xsmall" margin={{ left: 'auto' }} align="center">
      <StyledDropButton
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
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        dropContent={
          <SortOptions
            options={options}
            active={sort}
            onSelect={value => {
              setOptionsOpen(false);
              onSortSelect(value);
            }}
          />
        }
      />
      <StyledButtonIcon
        subtle
        onClick={() => onOrderToggle(order === 'asc' ? 'desc' : 'asc')}
      >
        {order === 'asc' && <Ascend />}
        {order === 'desc' && <Descend />}
      </StyledButtonIcon>
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
