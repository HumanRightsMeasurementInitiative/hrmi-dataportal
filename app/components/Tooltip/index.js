import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drop, Button, ResponsiveContext, Layer } from 'grommet';
import { CircleInformation, Close } from 'grommet-icons';
import styled from 'styled-components';

import ContentWrap from './ContentWrap';

const StyledDrop = styled(Drop)`
  margin: 0 0 13px;
  overflow: visible;
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
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

const renderContent = (maxWidth, component, text, onClose, inModal) => (
  <Box
    pad={{ vertical: 'small', horizontal: 'small' }}
    background="dark-1"
    style={{ maxWidth }}
    onClick={evt => {
      if (evt) evt.preventDefault();
      if (evt) evt.stopPropagation();
    }}
    align={inModal ? 'center' : 'start'}
  >
    {onClose && (
      <Button
        onClick={evt => {
          if (evt) evt.preventDefault();
          if (evt) evt.stopPropagation();
          onClose();
        }}
        margin={{ left: 'auto' }}
      >
        <Close color="white" size="large" />
      </Button>
    )}
    <ContentWrap>
      {component}
      {!component && <span>{text}</span>}
    </ContentWrap>
  </Box>
);

function Tooltip({
  text = 'I am a tooltip',
  iconSize = 'large',
  component,
  maxWidth,
  icon,
  insideButton,
  margin,
  large,
  textAnchor,
}) {
  const [over, setOver] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef(null);

  const mWidth = maxWidth || large ? '320px' : '200px';
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const openModal = large && size === 'small';
        return (
          <>
            <Button
              as={insideButton ? 'span' : 'button'}
              plain
              icon={
                !textAnchor &&
                (icon || (
                  <CircleInformation size={iconSize} color="highlight2" />
                ))
              }
              ref={button}
              onClick={evt => {
                if (evt) evt.preventDefault();
                if (evt) evt.stopPropagation();
                setOpen(!open);
              }}
              onMouseEnter={!openModal ? () => setOver(true) : null}
              onMouseLeave={!openModal ? () => setOver(false) : null}
              onFocus={!openModal ? () => setOver(true) : null}
              onBlur={!openModal ? () => setOver(false) : null}
              margin={margin || { horizontal: 'xsmall' }}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              {textAnchor}
            </Button>
            {(over || open) && !openModal && button.current && (
              <StyledDrop
                align={{ bottom: 'top' }}
                elevation="small"
                target={button.current}
                onClickOutside={() => setOpen(false)}
              >
                {renderContent(mWidth, component, text)}
              </StyledDrop>
            )}
            {(over || open) && openModal && (
              <Layer
                position="center"
                elevation="small"
                responsive={false}
                onEsc={() => setOpen(false)}
                full="horizontal"
                animate={false}
              >
                {renderContent(
                  '100%',
                  component,
                  text,
                  () => setOpen(false),
                  true,
                )}
              </Layer>
            )}
          </>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string,
  iconSize: PropTypes.string,
  icon: PropTypes.node,
  textAnchor: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  component: PropTypes.node,
  maxWidth: PropTypes.string,
  insideButton: PropTypes.bool,
  large: PropTypes.bool,
  margin: PropTypes.object,
};

export default Tooltip;
