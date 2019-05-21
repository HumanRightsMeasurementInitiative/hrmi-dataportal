import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import messages from './messages';

const Option = styled(Button)``;

const SortOptions = ({ options, onSelect }) => (
  <Box pad="small">
    {options &&
      options.map(option => (
        <Option key={option} plain onClick={() => onSelect(option)}>
          <FormattedMessage {...messages.sortOptions[option]} />
        </Option>
      ))}
  </Box>
);

SortOptions.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
};

export default SortOptions;
