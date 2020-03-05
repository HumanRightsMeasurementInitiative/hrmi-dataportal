import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

import AllLinkButtonWrap from './AllLinkButtonWrap';

const StyledButton = styled(Button)`
  font-size: ${({ theme }) => theme.text.large.size};
`;

export function AllLinkButton({ label, onClick }) {
  return (
    <AllLinkButtonWrap>
      <StyledButton
        reverse
        plain
        label={label}
        icon={<FormNext size="large" />}
        onClick={onClick}
        gap="xsmall"
      />
    </AllLinkButtonWrap>
  );
}

AllLinkButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default AllLinkButton;
