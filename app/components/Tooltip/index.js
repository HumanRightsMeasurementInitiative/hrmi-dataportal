import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Drop, Button, ResponsiveContext, Layer } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import styled from 'styled-components';

import { isMaxSize } from 'utils/responsive';

import Content from './Content';

const StyledDrop = styled(Drop)`
  margin: 0 0 13px;
  overflow: visible;
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  z-index: ${({ inAside }) => (inAside ? 22 : 20)};
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    width: 0;
    height: 0;
    border-top: 8px solid
      ${({ theme, inverse }) => theme.global.colors[inverse ? 'white' : 'dark']};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    margin: 0 auto;
  }
`;

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
  inverse,
  inAside,
  superscript = false,
}) {
  const [over, setOver] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef(null);

  const mWidth = maxWidth || large ? '320px' : '200px';

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const openModal = large && isMaxSize(size, 'sm');
        // prettier-ignore
        return (
          <>
            <Button
              as={insideButton ? 'span' : 'button'}
              plain
              icon={
                textAnchor
                  ? null
                  : icon || (
                    <CircleInformation size={superscript ? "small" : iconSize} color={inverse ? 'white' : 'dark'} />
                  )
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
                verticalAlign: superscript ? 'super' : 'initial'
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
                inAside={inAside}
              >
                <Content
                  maxWidth={mWidth}
                  component={component}
                  text={text}
                />
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
                <Content
                  maxWidth="100%"
                  component={component}
                  text={text}
                  onClose={() => setOpen(false)}
                  inverse={inverse}
                  inModal
                />
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
  inverse: PropTypes.bool,
  inAside: PropTypes.bool,
  margin: PropTypes.object,
  superscript: PropTypes.bool,
};

export default Tooltip;
