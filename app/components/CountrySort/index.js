import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { injectIntl, intlShape } from 'react-intl';

import { Box, DropButton, ResponsiveContext, Text } from 'grommet';
import { FormDown, FormUp, Ascend, Descend } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';
import { isMinSize } from 'utils/responsive';

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
    <ResponsiveContext.Consumer>
      {size => {
        // prettier-ignore
        const label = isMinSize(size, 'large')
          ? `${intl.formatMessage(messages.sortBy)} ${intl.formatMessage(messages.sortOptions[sort])}`
          : (
            <Text size="small">
              {`${intl.formatMessage(messages.sortOptions[sort])}`}
            </Text>
          );
        return (
          <Box direction="row" pad="xsmall" align="center">
            <StyledDropButton
              plain
              reverse
              gap="xxsmall"
              margin={
                isMinSize(size, 'large')
                  ? { horizontal: 'small' }
                  : { horizontal: 'hair' }
              }
              icon={optionsOpen ? <FormUp /> : <FormDown />}
              label={label}
              onClose={() => setOptionsOpen(false)}
              onOpen={() => setOptionsOpen(true)}
              open={optionsOpen}
              dropProps={{
                align: { top: 'bottom', right: 'right' },
                stretch: false,
              }}
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
      }}
    </ResponsiveContext.Consumer>
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
