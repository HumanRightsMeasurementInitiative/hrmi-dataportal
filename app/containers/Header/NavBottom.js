import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Drop, ResponsiveContext } from 'grommet';

import { isMinSize, isMaxSize } from 'utils/responsive';

import NavBottomButton from './NavBottomButton';
import NavBottomContent from './NavBottomContent';

export function NavBottom({ active, onClick, onClose, type }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <NavBottomButton
            active={active}
            open={open}
            onClick={() => {
              if (onClick) onClick();
              setOpen(!open);
            }}
            label={type}
            ref={buttonRef}
            windowSize={size}
          />
          {open && isMaxSize(size, 'sm') && (
            <NavBottomContent
              size={size}
              type={type}
              onClose={onClose}
              setOpen={setOpen}
            />
          )}
          {open && isMinSize(size, 'medium') && (
            <Drop
              align={{ top: 'bottom', right: 'right' }}
              target={buttonRef.current}
              onClickOutside={e => {
                if (buttonRef.current && buttonRef.current.contains(e.target)) {
                  return;
                }
                if (onClose) onClose();
                setOpen(false);
              }}
            >
              <NavBottomContent
                size={size}
                type={type}
                onClose={onClose}
                setOpen={setOpen}
              />
            </Drop>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

NavBottom.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.string,
};

export default NavBottom;
