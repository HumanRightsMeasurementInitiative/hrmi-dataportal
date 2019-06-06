import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Tabs, Tab, ResponsiveContext } from 'grommet';
import styled, { withTheme } from 'styled-components';

import {
  getTabSearch,
  getModalTabSearch,
  getRouterRoute,
  getRouterMatch,
} from 'containers/App/selectors';
import { setTab, setModalTab } from 'containers/App/actions';
import { showSettings } from 'containers/Settings';
import HowToRead from 'containers/HowToRead';
import ColumnTitle from 'styled/ColumnTitle';
import ColumnHeader from 'styled/ColumnHeader';
import ColumnContent from 'styled/ColumnContent';
import {
  isMinSize,
  isMaxSize,
  getAsideWidth,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';
import { SIZES } from 'theme';
const HowToReadWrapper = styled.div`
  position: relative;
  right: 0px;
  top: 4px;
  text-align: right;
  @media (min-width: ${props => props.theme.breakpoints.large}) {
    position: absolute;
    right: ${({ theme }) => theme.global.edgeSize.medium};
    top: 0;
  }
`;

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

function TabContainer({
  tabs,
  tabIndex,
  onTabClick,
  aside = true,
  modal = false,
  theme,
  route,
  match,
}) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  const [scrollTop, setScrollTop] = useState(0);
  const asideRef = useRef();

  useEffect(() => {
    function handleScroll() {
      setScrollTop(window.pageYOffset);
    }
    window.addEventListener('scroll', handleScroll);
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log('asideRef',asideRef && asideRef.current && asideRef.current.getBoundingClientRect().top)
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => {
        // tabs in main column if small or more than 2 tabs
        const tabsWithContent = tabs.filter(t => t.content && t.content());
        const hasAside =
          !modal &&
          isMinSize(size, 'large') &&
          aside &&
          tabsWithContent.length > 1;

        const mainTabs = hasAside
          ? tabsWithContent.slice(0, tabsWithContent.length - 1)
          : tabsWithContent;
        const asideTab =
          hasAside &&
          tabsWithContent[tabsWithContent.length - 1];

        const hasMultipleMainTabs = mainTabs.length > 1;
        const fixedAside = asideTab &&
          scrollTop > SIZES.header.height &&
          asideRef &&
          asideRef.current &&
          asideRef.current.getBoundingClientRect &&
          asideRef.current.getBoundingClientRect().top < SIZES.header.height;
          // console.log('fixedAside', fixedAside)
          // console.log('scrollTop', scrollTop)
          // console.log("asideRef Top", asideRef.current &&
          // asideRef.current.getBoundingClientRect &&
          // asideRef.current.getBoundingClientRect().top)
          // console.log('SIZES.header.height', SIZES.header.height)
        return (
          <Box direction="row" margin="0 auto" width="100%">
            <Box direction="column" flex style={{ position: 'relative' }}>
              {hasMultipleMainTabs && (
                <>
                  <Tabs
                    justify="start"
                    activeIndex={tabIndex}
                    onActive={index =>
                      index !== tabIndex && onTabClick(index, modal)
                    }
                  >
                    {mainTabs.slice().map(tab => (
                      <Tab
                        title={
                          isMaxSize(size, 'medium') && tab.titleMobile
                            ? tab.titleMobile
                            : tab.title} key={tab.key}
                      >
                        {tab.howToRead && (
                          <HowToReadWrapper>
                            <HowToRead
                              htr={`tab-${tab.key}`}
                              {...tab.howToRead}
                            />
                          </HowToReadWrapper>
                        )}
                        <ColumnContent>
                          {tab.content({ hasAside })}
                        </ColumnContent>
                      </Tab>
                    ))}
                  </Tabs>
                </>
              )}
              {!hasMultipleMainTabs && (
                <Box direction="column">
                  <ColumnHeader direction="row">
                    <ColumnTitle>{mainTabs[0].title}</ColumnTitle>
                    {mainTabs[0].howToRead && (
                      <Box
                        alignSelf="end"
                        margin={{ left: 'auto' }}
                        pad={{ right: 'medium' }}
                      >
                        <HowToRead
                          htr={`tab-${mainTabs[0].key}`}
                          {...mainTabs[0].howToRead}
                        />
                      </Box>
                    )}
                  </ColumnHeader>
                  <ColumnContent>
                    {mainTabs[0].content({ hasAside })}
                  </ColumnContent>
                </Box>
              )}
            </Box>
            {asideTab && (
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
                    {asideTab.content()}
                  </ColumnContent>
                )}
              </Box>
            )}
            {fixedAside && (
              <FixedAside
                width={getFloatingAsideWidth(size, theme, windowDimensions)}
                hasSettings={showSettings({ route, match, tabIndex })}
              >
                <ColumnHeader>
                  <ColumnTitle>&nbsp;</ColumnTitle>
                </ColumnHeader>
                <ColumnContent style={{ width: getAsideWidth(size)}}>
                  {asideTab.content()}
                </ColumnContent>
              </FixedAside>
            )}
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}

TabContainer.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  aside: PropTypes.bool,
  modal: PropTypes.bool,
  theme: PropTypes.object,
  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  route: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tabIndex: (state, { modal }) =>
    modal ? getModalTabSearch(state) : getTabSearch(state),
  route: state => getRouterRoute(state),
  match: state => getRouterMatch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onTabClick: (index, modal) =>
      dispatch(modal ? setModalTab(index) : setTab(index)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(TabContainer));
