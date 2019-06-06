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
    color: ${({ theme }) => theme.global.colors.highlight2};
    background-color: transparent;
  }
`;

// prettier-ignore
const StyledButtonIcon = styled(ButtonIcon)`
  background-color: ${({ theme, level }) =>
    theme.global.colors[level > 1 ? 'light-1' : 'highlight']};
  &:hover {
    background-color: ${({ theme, level }) =>
    theme.global.colors[level > 1 ? 'highlight' : 'highlight2']};
  }
  &:focus {
    background-color: ${({ theme, level }) =>
    theme.global.colors[level > 1 ? 'light-1' : 'highlight']};};
  }
`;

// const StyledButtonIcon = styled(ButtonIcon)`
//   border: 1px solid ${({ theme }) => theme.global.colors.highlight};
//   &:hover {
//     background-color: ${({ theme, level }) =>
//     theme.global.colors[level > 1 ? 'transparent' : 'highlight']};
//   }
//   &:focus {
//     background-color: transparent;
//   }
// `;
//
// const StyledDown = styled(Down)`
//   stroke: ${({ theme }) => theme.global.colors.highlight};
//   ${StyledButtonIcon}:hover & {
//     stroke: ${({ theme }) => theme.global.colors['dark-1']};
//   }
// `;

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
                  level={level}
                  onClick={() => setOpen(!open)}
                  small={!isMinSize(size, 'medium')}
                >
                  {!open && (
                    <Down
                      color="dark-1"
                      level={level}
                      size={isMinSize(size, 'medium') ? 'xlarge' : 'large'}
                    />
                  )}
                  {open && (
                    <Up
                      color="dark-1"
                      level={level}
                      size={isMinSize(size, 'medium') ? 'xlarge' : 'large'}
                    />
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
