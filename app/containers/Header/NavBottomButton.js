import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import { getHeaderHeightBottom, isMinSize } from 'utils/responsive';

import rootMessages from 'messages';

// prettier-ignore
const ButtonNavSecondary = styled(Button)`
  margin: 0 5px;
  padding-left: 1px;
  font-weight: 600;
  height: ${({ theme }) => getHeaderHeightBottom('small', theme)}px;
  background: transparent;
  border-top: 4px solid transparent;
  border-bottom: 4px solid;
  border-bottom-color: ${({ theme, active }) => (
    active ? theme.global.colors.dark : 'transparent'
  )};
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    border-bottom-color: ${({ theme }) => theme.global.colors.dark};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => getHeaderHeightBottom('medium', theme)}px;
    margin-left: 6px;
    margin-right: 6px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const NavBottomButton = React.forwardRef(
  ({ active, open, onClick, label, windowSize }, ref) => {
    let gap = 'hair';
    if (windowSize === 'medium') {
      gap = 'xxsmall';
    }
    if (isMinSize(windowSize, 'large')) {
      gap = 'small';
    }
    return (
      <ButtonNavSecondary
        plain
        active={active}
        open={open}
        onClick={onClick}
        justify="between"
        align="center"
        ref={ref}
        label={
          <Box direction="row" align="center" justify="between" fill gap={gap}>
            <Text size={isMinSize(windowSize, 'medium') ? 'large' : 'medium'}>
              <FormattedMessage {...rootMessages.labels[label]} />
            </Text>
            {open && (
              <FormUp
                size={isMinSize(windowSize, 'medium') ? 'xxlarge' : 'xlarge'}
                style={{ stroke: 'currentColor', marginRight: '-3px' }}
              />
            )}
            {!open && (
              <FormDown
                size={isMinSize(windowSize, 'medium') ? 'xxlarge' : 'xlarge'}
                style={{ stroke: 'currentColor', marginRight: '-3px' }}
              />
            )}
          </Box>
        }
      />
    );
  },
);

NavBottomButton.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  windowSize: PropTypes.string,
  theme: PropTypes.object,
};

export default NavBottomButton;
