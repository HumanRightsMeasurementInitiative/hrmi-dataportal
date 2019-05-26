import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
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
          <Box align="center" direction="row">
            <FormattedMessage {...messages.sortOptions[option]} />
            {active === option && (
              <Box margin={{ left: 'auto' }}>
                <Checkmark color="dark-4" />
              </Box>
            )}
          </Box>
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
