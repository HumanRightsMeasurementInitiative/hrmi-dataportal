import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Collapsible, Text, ResponsiveContext } from 'grommet';
import { isMinSize } from 'utils/responsive';
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

const StyledButtonIcon = styled(ButtonIcon)`
  background-color: ${({ theme }) => theme.global.colors['light-3']};
  &:hover {
    background-color: ${({ theme }) => theme.global.colors['light-5']};
  }
`;

function Accordion({ head, content, buttonText, level }) {
  const [open, setOpen] = useState(false);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="column">
          <Box direction="row" align="center">
            <Box fill="horizontal" direction="column">
              {head}
            </Box>
            <Box
              width={isMinSize(size, 'medium') ? '200px' : '50px'}
              flex={{ shrink: 0 }}
            >
              <Box
                width={isMinSize(size, 'medium') ? '200px' : '50px'}
                flex={{ shrink: 0 }}
                direction="row"
                align="center"
                gap="xxsmall"
                justify="end"
                pad={{ right: 'small' }}
              >
                {isMinSize(size, 'medium') && (
                  <StyledTextButton onClick={() => setOpen(!open)}>
                    <Text size={level > 1 ? 'xsmall' : 'small'}>
                      {buttonText}
                    </Text>
                  </StyledTextButton>
                )}
                <StyledButtonIcon
                  subtle
                  onClick={() => setOpen(!open)}
                  small={!isMinSize(size, 'medium')}
                >
                  {!open && (
                    <Down
                      size={isMinSize(size, 'medium') ? 'xlarge' : 'large'}
                    />
                  )}
                  {open && (
                    <Up size={isMinSize(size, 'medium') ? 'xlarge' : 'large'} />
                  )}
                </StyledButtonIcon>
              </Box>
            </Box>
          </Box>
          <Collapsible open={open}>{content}</Collapsible>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

Accordion.propTypes = {
  head: PropTypes.node,
  content: PropTypes.node,
  buttonText: PropTypes.string,
  level: PropTypes.number,
};

export default Accordion;
