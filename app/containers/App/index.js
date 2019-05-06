/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';

import Overview from 'containers/Overview/Loadable';
import Metric from 'containers/Metric/Loadable';
import Country from 'containers/Country/Loadable';
import Page from 'containers/Page/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LocaleToggle from 'containers/LocaleToggle';

import { loadDataIfNeeded } from './actions';

import saga from './saga';

import { DEFAULT_LOCALE } from '../../i18n';

import GlobalStyle from '../../global-styles';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

/**
 * routes: /[locale] +
 * overview: /?scale=:scale&standard=:standard&benchmark=:benchmark&region=:region&income=:income&cpr=:cpr
 * metric view: /metric/:metric?standard=:standard&benchmark=:benchmark&region=:region&income=:income&cpr=:cpr
 * country view: /country/:country?scale=:scale&standard=:standard&benchmark=:benchmark&view=:view
 * page view: /page/:page
 *
 */

export function App({ match, onLoadData }) {
  const locale = match.params ? match.params.locale : DEFAULT_LOCALE;

  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - HRMI Data Portal v.2"
        defaultTitle="HRMI Data Portal v.2"
      >
        <meta
          name="description"
          content="Human Rights Measurement Initiative"
        />
      </Helmet>
      <LocaleToggle />
      <Switch>
        <Route exact path={`/${locale}`} component={Overview} />
        <Route
          path={`/${locale}/metric/:metric/:country?`}
          component={Metric}
        />
        <Route
          path={`/${locale}/country/:country/:metric?`}
          component={Country}
        />
        <Route path={`/${locale}/page/:page`} component={Page} />
        <Route path={`/${locale}`} component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  match: PropTypes.object,
  onLoadData: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
