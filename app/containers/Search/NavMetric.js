import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import { withTheme } from 'styled-components';

import {
  DIMENSIONS,
  RIGHTS,
  INDICATORS,
  PATHS,
} from 'containers/App/constants';
import { selectMetric, navigate } from 'containers/App/actions';

import { getHeaderHeight } from 'utils/responsive';

import rootMessages from 'messages';

import { prepMetrics } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

import messages from './messages';

export function NavMetric({ onSelectMetric, intl, onClose, size, nav, theme }) {
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
    [activeResult, search],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [activeResult]);
  const dimensions = prepMetrics(DIMENSIONS, 'dimensions', search, intl);
  const rights = prepMetrics(RIGHTS, 'rights', search, intl);
  const indicators = prepMetrics(INDICATORS, 'subrights', search, intl);
  const hasMetrics =
    dimensions.length > 0 || rights.length > 0 || indicators.length > 0;
  // figure out available height for IE11
  const h = window.innerHeight - getHeaderHeight(size, theme);
  const rightsWithIndicators = rights.map(r => ({
    ...r,
    indicators: indicators.filter(i => i.right === r.code),
  }))
  // N.B. concat a fake right and indicators for Pacific module
  // this means we don't mess things up by adding actual rights / indicators into the app constants
  .concat({
    code: 'violence',
    label: intl.formatMessage(rootMessages.rights.violence),
    disabled: true,
    indicators: [
      {
        code: 'vchild',
        label: intl.formatMessage(rootMessages.subrights['violence-children']),
        right: 'violence'
      },
      {
        code: 'vdisab',
        label: intl.formatMessage(rootMessages.subrights['violence-disabilities']),
        right: 'violence'
      },
      {
        code: 'vwomen',
        label: intl.formatMessage(rootMessages.subrights['violence-women-and-girls']),
        right: 'violence'
      },
      {
        code: 'vmvpfaff',
        label: intl.formatMessage(rootMessages.subrights['violence-mvpfaff-lgbtqia']),
        right: 'violence'
      }
    ]
  });

  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(messages.metricSearch)}
        size={size}
      />
      <NavScroll>
        <Box flex overflow="auto" pad={{ vertical: 'medium' }}>
          {search === '' && (
            <NavOptionGroup
              label={intl.formatMessage(messages.optionGroups.overview)}
              options={[
                {
                  key: 'metrics',
                  code: 'metrics',
                  label: intl.formatMessage(rootMessages.labels.allMetrics),
                  special: true,
                },
              ]}
              activeResult={activeResult}
              onClick={() => {
                onClose();
                nav(PATHS.METRICS);
              }}
            />
          )}
          {!hasMetrics && <FormattedMessage {...messages.noResults} />}
          {dimensions.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.dimensions)}
              options={dimensions}
              optionTextSize="large"
              activeResult={search === '' ? activeResult - 1 : activeResult}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
          {rights.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.rights)}
              options={rightsWithIndicators}
              activeResult={
                search === ''
                  ? activeResult - 1 - dimensions.length
                  : activeResult - dimensions.length
              }
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
          {/* {indicators.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.metricTypes.indicators)}
              options={indicators}
              activeResult={
                search === ''
                  ? activeResult - 1 - dimensions.length - rights.length
                  : activeResult - dimensions.length - rights.length
              }
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )} */}
        </Box>
      </NavScroll>
    </NavWrapper>
  );
}

NavMetric.propTypes = {
  onSelectMetric: PropTypes.func,
  onClose: PropTypes.func,
  nav: PropTypes.func,
  intl: intlShape.isRequired,
  size: PropTypes.string,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
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

export default compose(withConnect)(injectIntl(withTheme(NavMetric)));
