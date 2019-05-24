import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drop, Button, Text } from 'grommet';
import { CircleQuestion } from 'grommet-icons';
import styled from 'styled-components';

const StyledDrop = styled(Drop)`
  margin: 0 0 13px;
  overflow: visible;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    width: 0;
    height: 0;
    border-top: 8px solid ${props => props.theme.global.colors['dark-1']};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    margin: 0 auto;
  }
`;

function Tooltip({
  text = 'I am a tooltip',
  iconSize = 'large',
  component,
  maxWidth = '200px',
}) {
  const [over, setOver] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  return (
    <>
      <Button
        plain
        icon={<CircleQuestion size={iconSize} color="highlight2" />}
        ref={button}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={() => setOpen(!open)}
        onFocus={() => {}}
        onBlur={() => {}}
        margin={{ horizontal: 'xsmall' }}
      />
      {button.current && (over || open) && (
        <StyledDrop
          align={{ bottom: 'top' }}
          elevation="small"
          target={button.current}
          onClickOutside={() => setOpen(false)}
        >
          <Box
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            background="dark-1"
            style={{ maxWidth }}
          >
            {component}
            {!component && <Text size="small">{text}</Text>}
          </Box>
        </StyledDrop>
      )}
    </>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string,
  iconSize: PropTypes.string,
  component: PropTypes.node,
  maxWidth: PropTypes.string,
};

export default Tooltip;
