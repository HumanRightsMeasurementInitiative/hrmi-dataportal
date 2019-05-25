import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Collapsible, Text } from 'grommet';
import { Down, Up } from 'grommet-icons';

import Button from 'styled/Button';
import ButtonIcon from 'styled/ButtonIcon';

const StyledTextButton = styled(Button)`
  color: ${({ theme }) => theme.global.colors.dark};
  &:hover {
    color: ${({ theme }) => theme.global.colors['dark-1']};
    background-color: transparent;
  }
`;

function Accordion({ head, content, buttonText, level }) {
  const [open, setOpen] = useState(false);
  return (
    <Box direction="column">
      <Box direction="row" align="center">
        <Box fill="horizontal" direction="column">
          {head}
        </Box>
        <Box width="200px">
          <Box
            width="200px"
            direction="row"
            align="center"
            gap="xxsmall"
            justify="end"
            pad={{ right: 'small' }}
          >
            <StyledTextButton onClick={() => setOpen(!open)}>
              <Text size={level > 1 ? 'xsmall' : 'small'}>{buttonText}</Text>
            </StyledTextButton>
            <ButtonIcon subtle onClick={() => setOpen(!open)}>
              {!open && <Down size="xlarge" />}
              {open && <Up size="xlarge" />}
            </ButtonIcon>
          </Box>
        </Box>
      </Box>
      <Collapsible open={open}>{content}</Collapsible>
    </Box>
  );
}

Accordion.propTypes = {
  head: PropTypes.node,
  content: PropTypes.node,
  buttonText: PropTypes.string,
  level: PropTypes.number,
};

export default Accordion;
