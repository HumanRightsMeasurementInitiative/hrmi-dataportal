import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import { Close } from 'grommet-icons';

import { truncateText } from 'utils/string';
import ButtonPrimary from 'styled/ButtonPrimary';

const StyledButton = styled(ButtonPrimary)`
  display: block;
  margin-bottom: ${({ theme }) => theme.global.edgeSize.xxsmall};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    display: inline-block;
    margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  }
`;
const StyledText = styled.span``;

const ActiveFilterButton = ({ label, onRemove }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <StyledButton onClick={() => onRemove()} title={label}>
        <Box direction="row" align="center" gap="xsmall">
          <StyledText>
            {truncateText(label, size === 'small' ? 6 : 10)}
          </StyledText>
          <Close color="white" size={size === 'small' ? 'small' : 'medium'} />
        </Box>
      </StyledButton>
    )}
  </ResponsiveContext.Consumer>
);

ActiveFilterButton.propTypes = {
  label: PropTypes.string,
  onRemove: PropTypes.func,
};

export default ActiveFilterButton;
