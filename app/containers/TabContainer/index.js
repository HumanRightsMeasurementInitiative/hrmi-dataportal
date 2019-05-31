import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Tabs, Tab, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import { getTabSearch, getModalTabSearch } from 'containers/App/selectors';
import { setTab, setModalTab } from 'containers/App/actions';
import HowToRead from 'containers/HowToRead';
import ColumnTitle from 'styled/ColumnTitle';
import ColumnHeader from 'styled/ColumnHeader';
import ColumnContent from 'styled/ColumnContent';

const HowToReadWrapper = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.global.edgeSize.medium};
  top: 0;
`;

// TODO fix aside when leaving screen
//     position: fixed;
//     top: 100px;
//     right: 0;
//     width: 432px;
//     bottom: 90px;
//     overflow-y: auto;
//     background: white;
//     box-shadow: 0 0 8px 1px rgba(0,0,0,0.1);

function TabContainer({ tabs, tabIndex, onTabClick, aside = true, modal }) {
  return (
    <ResponsiveContext.Consumer>
      {size => {
        // tabs in main column if small or more than 2 tabs
        const tabsWithContent = tabs.filter(t => t.content);
        const mainTabs =
          size === 'small' || !aside
            ? tabsWithContent
            : tabsWithContent.slice(0, tabsWithContent.length - 1);
        return (
          <Box direction="row" margin="0 auto" width="100%">
            <Box direction="column" flex style={{ position: 'relative' }}>
              {(size === 'small' || !aside || tabsWithContent.length > 2) && (
                <>
                  <Tabs
                    justify="start"
                    activeIndex={tabIndex}
                    onActive={index =>
                      index !== tabIndex && onTabClick(index, modal)
                    }
                  >
                    {mainTabs.slice().map(tab => (
                      <Tab title={tab.title} key={tab.key}>
                        {tab.howToRead && (
                          <HowToReadWrapper>
                            <HowToRead
                              htr={`tab-${tab.key}`}
                              {...tab.howToRead}
                            />
                          </HowToReadWrapper>
                        )}
                        <ColumnContent>{tab.content}</ColumnContent>
                      </Tab>
                    ))}
                  </Tabs>
                </>
              )}
              {size !== 'small' && aside && tabsWithContent.length <= 2 && (
                <Box direction="column">
                  <ColumnHeader direction="row">
                    <ColumnTitle>{tabsWithContent[0].title}</ColumnTitle>
                    {tabsWithContent[0].howToRead && (
                      <Box
                        alignSelf="end"
                        margin={{ left: 'auto' }}
                        pad={{ right: 'medium' }}
                      >
                        <HowToRead
                          htr={`tab-${tabsWithContent[0].key}`}
                          {...tabsWithContent[0].howToRead}
                        />
                      </Box>
                    )}
                  </ColumnHeader>
                  <ColumnContent>{tabsWithContent[0].content}</ColumnContent>
                </Box>
              )}
            </Box>
            {size !== 'small' && aside && tabsWithContent.length > 1 && (
              <Box
                width={size === 'medium' ? '280px' : '360px'}
                direction="column"
                flex={{ shrink: 0 }}
              >
                <ColumnHeader>
                  <ColumnTitle>
                    {tabsWithContent[tabsWithContent.length - 1].title}
                  </ColumnTitle>
                </ColumnHeader>
                <ColumnContent>
                  {tabsWithContent[tabsWithContent.length - 1].content}
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
