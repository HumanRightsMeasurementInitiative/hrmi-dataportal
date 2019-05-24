import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Tabs, Tab, ResponsiveContext } from 'grommet';
// import styled from 'styled-components';

import { getTabSearch, getModalTabSearch } from 'containers/App/selectors';
import { setTab, setModalTab } from 'containers/App/actions';
import ColumnTitle from 'styled/ColumnTitle';
import ColumnHeader from 'styled/ColumnHeader';
import ColumnContent from 'styled/ColumnContent';

/* height: ${props => props.theme.columnHeader.height}; */

function TabContainer({ tabs, tabIndex, onTabClick, aside = true, modal }) {
  return (
    <ResponsiveContext.Consumer>
      {size => {
        // tabs in main column if small or more than 2 tabs
        const activeTabs = tabs.filter(t => t.content);
        const mainTabs =
          size === 'small' || !aside
            ? activeTabs
            : activeTabs.slice(0, activeTabs.length - 1);
        return (
          <Box direction="row" margin="0 auto" width="100%">
            <Box direction="column" flex>
              {(size === 'small' || !aside || activeTabs.length > 2) && (
                <Tabs
                  justify="start"
                  activeIndex={tabIndex}
                  onActive={index =>
                    index !== tabIndex && onTabClick(index, modal)
                  }
                >
                  {mainTabs.slice().map(tab => (
                    <Tab title={tab.title} key={tab.key}>
                      <ColumnContent>{tab.content}</ColumnContent>
                    </Tab>
                  ))}
                </Tabs>
              )}
              {size !== 'small' && aside && activeTabs.length <= 2 && (
                <Box direction="column">
                  <ColumnHeader>
                    <ColumnTitle>{activeTabs[0].title}</ColumnTitle>
                  </ColumnHeader>
                  <ColumnContent>{activeTabs[0].content}</ColumnContent>
                </Box>
              )}
            </Box>
            {size !== 'small' && aside && activeTabs.length > 1 && (
              <Box
                width={size === 'medium' ? '280px' : '360px'}
                direction="column"
              >
                <ColumnHeader>
                  <ColumnTitle>
                    {activeTabs[activeTabs.length - 1].title}
                  </ColumnTitle>
                </ColumnHeader>
                <ColumnContent>
                  {activeTabs[activeTabs.length - 1].content}
                </ColumnContent>
              </Box>
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
  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

const mapStateToProps = createStructuredSelector({
  tabIndex: (state, { modal }) =>
    modal ? getModalTabSearch(state) : getTabSearch(state),
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
