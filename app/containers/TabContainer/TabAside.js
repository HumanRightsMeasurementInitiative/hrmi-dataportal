import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled, { withTheme } from 'styled-components';

import ColumnTitle from 'styled/ColumnTitle';
import ColumnHeader from 'styled/ColumnHeader';
import ColumnContent from 'styled/ColumnContent';

import { SIZES } from 'theme';

import {
  getAsideWidth,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

const FixedAside = styled.div`
  position: fixed;
  top: ${SIZES.header.height}px;
  width: ${({ width }) => width}px;
  bottom: ${({ hasSettings }) => (hasSettings ? SIZES.settings.height : 0)}px;
  right: 0;
  overflow-y: auto;
  background: white;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
`;
// TODO fix aside when leaving screen

function TabAside({ asideTab, tabIndex, hasSettings, theme }) {
  const [scrollTop, setScrollTop] = useState(0);
  const asideRef = useRef();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleScroll() {
      setScrollTop(window.pageYOffset);
    }
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fixedAside =
    asideTab &&
    scrollTop > SIZES.header.height &&
    asideRef &&
    asideRef.current &&
    asideRef.current.getBoundingClientRect &&
    asideRef.current.getBoundingClientRect().top < SIZES.header.height;

  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Box
            width={getAsideWidth(size)}
            direction="column"
            flex={{ shrink: 0 }}
            ref={asideRef}
          >
            {!fixedAside && (
              <ColumnHeader>
                <ColumnTitle>
                  {asideTab.title}
                </ColumnTitle>
              </ColumnHeader>
            )}
            {!fixedAside && (
              <ColumnContent>
                {asideTab.content({ activeTab: tabIndex })}
              </ColumnContent>
            )}
          </Box>
          {fixedAside && (
            <FixedAside
              width={getFloatingAsideWidth(size, theme, windowDimensions)}
              hasSettings={hasSettings}
            >
              <ColumnHeader>
                <ColumnTitle>&nbsp;</ColumnTitle>
              </ColumnHeader>
              <ColumnContent style={{ width: getAsideWidth(size) }}>
                {asideTab.content({ activeTab: tabIndex })}
              </ColumnContent>
            </FixedAside>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabAside.propTypes = {
  asideTab: PropTypes.object,
  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  hasSettings: PropTypes.bool,
  theme: PropTypes.object,
};

export default withTheme(TabAside);
