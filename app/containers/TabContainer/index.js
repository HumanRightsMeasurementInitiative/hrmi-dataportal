import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Tabs, Tab, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

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
import { isMinSize, isMaxSize } from 'utils/responsive';

import TabAside from './TabAside';

const HowToReadWrapper = styled.div`
  position: relative;
  right: 0px;
  top: 4px;
  text-align: right;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    position: absolute;
    right: ${({ theme }) => theme.global.edgeSize.medium};
    top: 0;
  }
`;

function TabContainer({
  tabs,
  tabIndex,
  onTabClick,
  aside = true,
  modal = false,
  route,
  match,
}) {
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
                          {tab.content({ hasAside, activeTab: tabIndex })}
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
                    {mainTabs[0].content({ hasAside, activeTab: tabIndex })}
                  </ColumnContent>
                </Box>
              )}
            </Box>
            {asideTab && (
              <TabAside
                asideTab={asideTab}
                tabIndex={tabIndex}
                hasSettings={showSettings({ route, match, tabIndex })}
              />
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

export default compose(withConnect)(TabContainer);
