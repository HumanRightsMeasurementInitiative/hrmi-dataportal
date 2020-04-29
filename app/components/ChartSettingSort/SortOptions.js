import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import DropOption from 'styled/DropOption';

import messages from './messages';

const SortOptions = ({ options, onSelect, active }) => (
  <Box pad="none">
    {options &&
      options.map(option => (
        <DropOption
          key={option}
          onClick={() => onSelect(option)}
          active={active === option}
          disabled={active === option}
        >
          <FormattedMessage {...messages.sortOptions[option]} />
        </DropOption>
      ))}
  </Box>
);

SortOptions.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
  active: PropTypes.string,
};

export default SortOptions;
