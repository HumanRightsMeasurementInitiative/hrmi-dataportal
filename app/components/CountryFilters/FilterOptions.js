import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';

const Option = styled(Button)``;

const FilterOptions = ({ optionGroups, onSelect }) => (
  <Box pad="small">
    {optionGroups &&
      optionGroups.map(group => (
        <Box direction="column" key={group.group} pad={{ bottom: 'small' }}>
          <div>
            <Text size="xsmall">{group.label}</Text>
          </div>
          {group.options &&
            group.options.map(option => (
              <Option key={option.value} plain onClick={() => onSelect(option)}>
                {option.label}
              </Option>
            ))}
        </Box>
      ))}
  </Box>
);

FilterOptions.propTypes = {
  onSelect: PropTypes.func,
  optionGroups: PropTypes.array,
};

export default FilterOptions;
