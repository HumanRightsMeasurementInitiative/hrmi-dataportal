import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, ResponsiveContext } from 'grommet';
import styled, { css } from 'styled-components';

import { getTabSearch } from 'containers/App/selectors';
import { setTab } from 'containers/App/actions';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonNavTab from 'styled/ButtonNavTab';
import MainColumn from 'styled/MainColumn';

import { isMinSize, isMaxSize } from 'utils/responsive';
import isNumber from 'utils/is-number';
import { SIZES } from 'theme';
import TabAside from './TabAside';

// const Tab = styled.div``;
// prettier-ignore
const Tabs = styled.div``;
const Spacer = styled.div`
  background: 'transparent';
  height: ${({ height }) => height}px;
`;
const Fixed = styled.div`
  background: grey;
  ${({ fixed }) =>
    fixed &&
    css`
      display: block;
      position: fixed;
      top: ${SIZES.header.height}px;
      width: 100%;
      left: 0;
      right: 0;
      box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
      z-index: 9;
    `} );
`;

function TabContainer({ tabs, tabKey, onTabClick }) {
  const [scrollTop, setScrollTop] = useState(0);
  const tabsRef = useRef();
  const fixedRef = useRef();
  const tabsRefOffset =
    tabsRef &&
    tabsRef.current &&
    tabsRef.current.getBoundingClientRect &&
    tabsRef.current.getBoundingClientRect().top;
  const fixedTop =
    scrollTop > SIZES.header.height && tabsRefOffset < SIZES.header.height;

  useEffect(() => {
    function handleScroll() {
      setScrollTop(window.pageYOffset);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // make sure scroll to top on ctab change
  useEffect(() => {
    const tabsRefParentOffset =
      tabsRef &&
      tabsRef.current &&
      tabsRef.current.offsetParent &&
      tabsRef.current.offsetParent.offsetTop;
    if (scrollTop > tabsRefParentOffset) {
      window.scrollTo(0, tabsRefParentOffset - SIZES.header.height);
    }
    // }
  }, [tabKey]);
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => {
        // tabs in main column if small or more than 2 tabs
        const tabsWithContent = tabs.filter(t => t.content && t.content());
        const hasAside = isMinSize(size, 'large');

        const mainTabs = hasAside
          ? tabsWithContent.filter(tab => !tab.aside)
          : tabsWithContent;
        const asideTab = hasAside && tabsWithContent.find(tab => tab.aside);

        let activeIndex = 0;
        if (isNumber(tabKey) && parseInt(tabKey, 10) < mainTabs.length) {
          activeIndex = parseInt(tabKey, 10);
        }
        if (mainTabs.map(t => t.key).indexOf(tabKey) >= 0) {
          activeIndex = mainTabs.map(t => t.key).indexOf(tabKey);
        };
        const activeTab = mainTabs[activeIndex];
        // activeIndex={activeIndex}
        // onActive={index =>
        //   index !== activeIndex && onTabClick(mainTabs[index])
        // }
        return (
          <Box direction="column" style={{ position: 'relative' }}>
            <Tabs
              justify="start"
              ref={tabsRef}
            >
              <Fixed fixed={fixedTop} ref={fixedRef}>
                <ContentMaxWidth>
                  {mainTabs.map(tab => (
                    <ButtonNavTab
                      key={tab.key}
                      active={tab.key === activeTab.key}
                      onClick={() => onTabClick(tab.key)}
                    >
                      {isMaxSize(size, 'medium') && tab.titleMobile && (
                        <span>{tab.titleMobile}</span>
                      )}
                      {(!isMaxSize(size, 'medium') || !tab.titleMobile) && (
                        <span>{tab.title}</span>
                      )}
                    </ButtonNavTab>
                  ))}
                </ContentMaxWidth>
              </Fixed>
              {fixedTop && (
                <Spacer height={fixedRef && fixedRef.current.offsetHeight} />
              )}
            </Tabs>
            <ContentMaxWidth column>
              <Box direction="row" fill="horizontal">
                <MainColumn hasAside={!!asideTab}>
                  {activeTab.content({
                    activeTab: activeTab.key,
                    goToTab: key => onTabClick(key),
                    tabs: mainTabs,
                  })}
                </MainColumn>
                {asideTab && (
                  <TabAside
                    asideTab={asideTab}
                    activeTab={activeTab && activeTab.key}
                  />
                )}
              </Box>
            </ContentMaxWidth>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}

TabContainer.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  tabKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  tabKey: state => getTabSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onTabClick: key => dispatch(setTab(key || '0')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TabContainer);
