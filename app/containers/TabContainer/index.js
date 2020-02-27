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
import ButtonNavPrimary from 'styled/ButtonNavPrimary';
import MainColumn from 'styled/MainColumn';

import { isMinSize, isMaxSize } from 'utils/responsive';
import isNumber from 'utils/is-number';
import { SIZES } from 'theme';
import TabAside from './TabAside';

// const Tab = styled.div``;
// prettier-ignore
const Tabs = styled.div``;
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

  useEffect(() => {
    function handleScroll() {
      setScrollTop(window.pageYOffset);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fixedTop =
    scrollTop > SIZES.header.height &&
    tabsRef &&
    tabsRef.current &&
    tabsRef.current.getBoundingClientRect &&
    tabsRef.current.getBoundingClientRect().top < SIZES.header.height;

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
              <Fixed fixed={fixedTop}>
                <ContentMaxWidth>
                  {mainTabs.map(tab => (
                    <ButtonNavPrimary
                      key={tab.key}
                      active={tab.key === activeTab.key}
                      onClick={() => onTabClick(tab)}
                    >
                      {isMaxSize(size, 'medium') && tab.titleMobile && (
                        <span>{tab.titleMobile}</span>
                      )}
                      {(!isMaxSize(size, 'medium') || !tab.titleMobile) && (
                        <span>{tab.title}</span>
                      )}
                    </ButtonNavPrimary>
                  ))}
                </ContentMaxWidth>
              </Fixed>
            </Tabs>
            <ContentMaxWidth column>
              <Box direction="row" fill="horizontal">
                <MainColumn hasAside={!!asideTab}>
                  {activeTab.content({ activeTab: activeIndex })}
                </MainColumn>
                {asideTab && (
                  <TabAside
                    asideTab={asideTab}
                    tabIndex={activeIndex}
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
    onTabClick: tab => {
      const key = (tab && tab.key) || '0';
      return dispatch(setTab(key));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TabContainer);
