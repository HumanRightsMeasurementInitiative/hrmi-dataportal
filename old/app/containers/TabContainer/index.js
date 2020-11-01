import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Text } from 'grommet';
import styled, { css, withTheme } from 'styled-components';

import { getTabSearch } from 'containers/App/selectors';
import { setTab, setAsideLayer } from 'containers/App/actions';

import Aside from 'components/Aside';
import AsideBackground from 'components/AsideBackground';

import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonNavTab from 'styled/ButtonNavTab';
import MainColumn from 'styled/MainColumn';

import { isMinSize, isMaxSize, getHeaderHeight } from 'utils/responsive';
import isNumber from 'utils/is-number';

// const Tab = styled.div``;
// prettier-ignore
const Tabs = styled.div`
  @media print {
    display: none;
  }
`;
const Spacer = styled.div`
  background: 'transparent';
  height: ${({ height }) => height}px;
`;
const Bar = styled.div`
  background: ${({ theme }) => theme.global.colors.dark};
`;
const FixedBar = styled(Bar)`
  background: ${({ theme }) => theme.global.colors.dark};
  ${({ fixed, top }) =>
    fixed &&
    css`
      display: block;
      position: fixed;
      top: ${top}px;
      width: 100%;
      left: 0;
      right: 0;
      box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
      z-index: 9;
    `};
`;

const TabLinks = styled(Box)`
  margin-left: -6px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-left: -10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-left: 0px;
    height: 44px;
  }
`;

const SingleTabLabel = styled(Text)`
  color: white;
`;

function TabContainer({ tabs, tabKey, onTabClick, size, theme }) {
  const [scrollTop, setScrollTop] = useState(0);
  const tabsRef = useRef();
  const fixedRef = useRef();
  const tabsRefOffset =
    tabsRef &&
    tabsRef.current &&
    tabsRef.current.getBoundingClientRect &&
    tabsRef.current.getBoundingClientRect().top;
  const hh = getHeaderHeight(size, theme);
  const fixedTop = scrollTop > hh && tabsRefOffset < hh;

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
      window.scrollTo(0, tabsRefParentOffset - hh);
    }
    // }
  }, [tabKey]);
  // prettier-ignore
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
  }
  const activeTab = mainTabs[activeIndex];

  return (
    <Box direction="column" style={{ position: 'relative' }}>
      <Tabs justify="start" ref={tabsRef}>
        <FixedBar fixed={fixedTop} ref={fixedRef} top={hh}>
          <ContentMaxWidth hasAside>
            <Box direction="row" fill="horizontal">
              <TabLinks direction="row" flex align="center" wrap>
                {mainTabs &&
                  mainTabs.length > 1 &&
                  mainTabs.map(tab => (
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
                {mainTabs && mainTabs.length === 1 && (
                  <SingleTabLabel alignSelf="center">
                    {mainTabs[0].title}
                  </SingleTabLabel>
                )}
              </TabLinks>
            </Box>
          </ContentMaxWidth>
        </FixedBar>
        {fixedTop && (
          <Spacer height={fixedRef && fixedRef.current.offsetHeight} />
        )}
      </Tabs>
      <Box direction="column" style={{ position: 'relative' }}>
        {asideTab && <AsideBackground />}
        <ContentMaxWidth column hasAside={!!asideTab}>
          <Box direction="row" fill="horizontal">
            <MainColumn hasAside={!!asideTab}>
              {activeTab.content({
                activeTab: activeTab.key,
                goToTab: key => onTabClick(key),
                tabs: mainTabs,
              })}
            </MainColumn>
            {asideTab && (
              <Aside content={asideTab} active={activeTab && activeTab.key} />
            )}
          </Box>
        </ContentMaxWidth>
      </Box>
    </Box>
  );
}

TabContainer.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  size: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  tabKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  tabKey: state => getTabSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onTabClick: key => {
      dispatch(setAsideLayer(null));
      dispatch(setTab(key || '0'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(TabContainer));
