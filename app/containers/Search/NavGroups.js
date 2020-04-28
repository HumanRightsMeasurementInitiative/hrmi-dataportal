import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box } from 'grommet';
import { withTheme } from 'styled-components';

import { AT_RISK_GROUPS, PATHS } from 'containers/App/constants';
import { selectGroup, navigate } from 'containers/App/actions';

import { getHeaderHeight } from 'utils/responsive';

import rootMessages from 'messages';

import { prepGroups } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

import messages from './messages';

export function NavGroups({ onSelectGroup, intl, onClose, size, nav, theme }) {
  const [search, setSearch] = useState('');
  const [activeResult, setActiveResult] = useState(0);
  // const [focus, setFocus] = useState(false);
  const onKey = useCallback(
    event => {
      // UP
      if (event.keyCode === 38) {
        setActiveResult(Math.max(0, activeResult - 1));
        // setFocus(true);
        event.preventDefault();
      }
      // DOWN
      if (event.keyCode === 40) {
        setActiveResult(activeResult + 1);
        // setFocus(true);
        event.preventDefault();
      }
    },
    [activeResult],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [activeResult]);
  const groups = prepGroups(AT_RISK_GROUPS, search, intl);

  // figure out available height for IE11
  const h = window.innerHeight - getHeaderHeight(size, theme);
  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(messages.peopleSearch)}
        size={size}
      />
      <NavScroll>
        <Box flex overflow="auto" pad={{ vertical: 'medium' }}>
          {search === '' && (
            <NavOptionGroup
              label={intl.formatMessage(messages.optionGroups.overview)}
              options={[
                {
                  key: 'groups',
                  code: 'groups',
                  label: intl.formatMessage(rootMessages.labels.allPeople),
                  special: true,
                },
              ]}
              activeResult={activeResult}
              onClick={() => {
                onClose();
                nav(PATHS.GROUPS);
              }}
            />
          )}
          {(!groups || groups.length === 0) && (
            <FormattedMessage {...messages.noResults} />
          )}
          {groups.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(messages.optionGroups.people)}
              options={groups}
              activeResult={search === '' ? activeResult - 1 : activeResult}
              onClick={key => {
                onClose();
                onSelectGroup(key);
              }}
            />
          )}
        </Box>
      </NavScroll>
    </NavWrapper>
  );
}

NavGroups.propTypes = {
  onSelectGroup: PropTypes.func,
  onClose: PropTypes.func,
  nav: PropTypes.func,
  intl: intlShape.isRequired,
  size: PropTypes.string,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectGroup: metric => dispatch(selectGroup(metric)),
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Header: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(NavGroups)));
