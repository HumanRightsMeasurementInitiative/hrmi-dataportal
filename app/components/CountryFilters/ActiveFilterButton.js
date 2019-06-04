import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormClose } from 'grommet-icons';

import { truncateText } from 'utils/string';
import Button from 'styled/Button';

// prettier-ignore
const StyledButton = styled(Button)`
  border-radius: 99999px;
  background-color: ${({ theme }) => theme.global.colors.highlight};
  color: ${({ theme }) => theme.global.colors.dark};
  padding: 1px 6px;
  font-weight: 600;
  border: 1px solid;
  border-color: transparent;
  font-size: ${({ theme }) => theme.text.small.size};
  margin-top: ${({ theme }) => theme.global.edgeSize.xxsmall};
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
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    margin-top: 0;
    margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
    padding: 4px 8px 4px 16px;
    font-size: ${({ theme }) => theme.text.medium.size};
  }
`;
const StyledText = styled.span``;

const IconWrap = styled(Box)``;

const ActiveFilterButton = ({ label, onRemove }) => (
  <StyledButton onClick={() => onRemove()} title={label}>
    <Box direction="row" align="center" gap="small">
      <StyledText>{truncateText(label, 10)}</StyledText>
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
