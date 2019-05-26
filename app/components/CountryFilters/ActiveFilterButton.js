import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

import { truncateText } from 'utils/string';
import Button from 'styled/Button';

// prettier-ignore
const StyledButton = styled(Button)`
  border-radius: 99999px;
  background-color: ${({ theme }) => theme.global.colors['dark-3']};
  color: ${({ theme }) => theme.global.colors.white};
  padding: 6px 12px;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  &:hover {
    background-color: ${({ theme }) => theme.global.colors.dark};
    color: ${({ theme }) => theme.global.colors.white};
  }
  &:focus {
    border-radius: 99999px;
    outline-color: transparent;
    background-color: ${({ theme }) => theme.global.colors.dark};
    color: ${({ theme }) => theme.global.colors.white};
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 6px 8px 6px 16px;
  }
`;

const IconWrap = styled(Box)``;

const ActiveFilterButton = ({ label, onRemove }) => (
  <StyledButton onClick={() => onRemove()} title={label}>
    <Box direction="row" align="center" gap="small">
      <Text>{truncateText(label)}</Text>
      <IconWrap round background="white">
        <FormClose color="dark-3" size="large" />
      </IconWrap>
    </Box>
  </StyledButton>
);

ActiveFilterButton.propTypes = {
  label: PropTypes.string,
  onRemove: PropTypes.func,
};

export default ActiveFilterButton;
