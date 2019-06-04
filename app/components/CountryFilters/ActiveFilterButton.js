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
  background-color: ${({ theme }) => theme.global.colors.highlight};
  color: ${({ theme }) => theme.global.colors.dark};
  padding: 4px 12px;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  border: 1px solid;
  border-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.global.colors.white};
    color: ${({ theme }) => theme.global.colors.dark};
    border-color: ${({ theme }) => theme.global.colors.highlight2};
  }
  &:focus {
    border-radius: 99999px;
    outline-color: transparent;
    background-color: ${({ theme }) => theme.global.colors.white};
    color: ${({ theme }) => theme.global.colors.dark};
    border-color: ${({ theme }) => theme.global.colors.highlight2};
  }
  @media (min-width: ${({ theme }) =>
    theme.breakpoints ? theme.breakpoints.small : '769px'}) {
    padding: 4px 8px 4px 16px;
  }
`;

const IconWrap = styled(Box)``;

const ActiveFilterButton = ({ label, onRemove }) => (
  <StyledButton onClick={() => onRemove()} title={label}>
    <Box direction="row" align="center" gap="small">
      <Text>{truncateText(label, 10)}</Text>
      <IconWrap round background="white">
        <FormClose color="dark" size="large" />
      </IconWrap>
    </Box>
  </StyledButton>
);

ActiveFilterButton.propTypes = {
  label: PropTypes.string,
  onRemove: PropTypes.func,
};

export default ActiveFilterButton;
