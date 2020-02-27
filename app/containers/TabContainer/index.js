import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Tabs, Tab, ResponsiveContext } from 'grommet';

import { getTabSearch } from 'containers/App/selectors';
import { setTab } from 'containers/App/actions';
import ColumnTitle from 'styled/ColumnTitle';
import ColumnHeader from 'styled/ColumnHeader';
import ColumnContent from 'styled/ColumnContent';
import { isMinSize, isMaxSize } from 'utils/responsive';
import isNumber from 'utils/is-number';

import TabAside from './TabAside';

function TabContainer({ tabs, tabKey, onTabClick, aside = true }) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => {
        // tabs in main column if small or more than 2 tabs
        const tabsWithContent = tabs.filter(t => t.content && t.content());
        const hasAside =
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

        let activeIndex = 0;
        if (isNumber(tabKey) && parseInt(tabKey, 10) < mainTabs.length) {
          activeIndex = parseInt(tabKey, 10);
        }
        if (mainTabs.map(t => t.key).indexOf(tabKey) >= 0) {
          activeIndex = mainTabs.map(t => t.key).indexOf(tabKey);
        };
        return (
          <Box direction="row" margin="0 auto" width="100%">
            <Box direction="column" flex style={{ position: 'relative' }}>
              {hasMultipleMainTabs && (
                <>
                  <Tabs
                    justify="start"
                    activeIndex={activeIndex}
                    onActive={index =>
                      index !== activeIndex && onTabClick(mainTabs[index])
                    }
                  >
                    {mainTabs.slice().map(tab => (
                      <Tab
                        title={
                          isMaxSize(size, 'medium') && tab.titleMobile
                            ? tab.titleMobile
                            : tab.title} key={tab.key}
                      >
                        <ColumnContent>
                          {tab.content({ hasAside, activeTab: activeIndex })}
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
                  </ColumnHeader>
                  <ColumnContent>
                    {mainTabs[0].content({ hasAside, activeTab: activeIndex })}
                  </ColumnContent>
                </Box>
              )}
            </Box>
            {asideTab && (
              <TabAside
                asideTab={asideTab}
                tabIndex={activeIndex}
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
