import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled, { css, withTheme } from 'styled-components';

import ColumnTitle from 'styled/ColumnTitle';
import ColumnHeader from 'styled/ColumnHeader';
import ColumnContent from 'styled/ColumnContent';

import { SIZES } from 'theme';

import {
  getAsideWidth,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

// prettier-ignore
const FixedAside = styled.span`
  ${({ fixedAside }) =>
    fixedAside &&
    css`
      display: block;
      position: fixed;
      top: ${SIZES.header.height}px;
      width: ${({ width }) => width}px;
      bottom: ${({ hasSettings }) => hasSettings ? SIZES.settings.height : 0}px;
      right: 0;
      overflow-y: auto;
      background: white;
      box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
    `} );
`;

function TabAside({ asideTab, tabIndex, theme }) {
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
            <FixedAside
              fixedAside={fixedAside}
              width={fixedAside
                ? getFloatingAsideWidth(size, theme, windowDimensions)
                : 'auto'
              }
            >
              <ColumnHeader>
                {fixedAside && <ColumnTitle>&nbsp;</ColumnTitle>}
                {!fixedAside && (
                  <ColumnTitle>
                    {asideTab.title}
                  </ColumnTitle>
                )}
              </ColumnHeader>
              <ColumnContent
                style={{ width: fixedAside
                  ? getAsideWidth(size)
                  : 'auto'
                }}>
                {asideTab.content({ activeTab: tabIndex })}
              </ColumnContent>
            </FixedAside>
          </Box>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

TabAside.propTypes = {
  asideTab: PropTypes.object,
  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  theme: PropTypes.object,
};

export default withTheme(TabAside);
