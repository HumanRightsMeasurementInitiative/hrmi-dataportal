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

import GlobalStyle from 'global-styles';

import { useInjectSaga } from 'utils/injectSaga';

import Header from 'containers/Header';
import Settings from 'containers/Settings';
import PathOverview from 'containers/PathOverview';
import PathMetric from 'containers/PathMetric';
import PathCountry from 'containers/PathCountry';
import PathPage from 'containers/PathPage';
import PathNotFoundPage from 'containers/PathNotFoundPage';
import ScrollToTop from './ScrollToTop';

import { loadDataIfNeeded } from './actions';

import saga from './saga';

import { DEFAULT_LOCALE } from '../../i18n';

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
  'esrIndicators',
  'auxIndicators',
  'atRisk',
];

const AppWrapper = styled.div`
  &:focus {
    outline: none;
  }
`;

const Main = styled.main`
  min-height: 100%;
  padding-top: 100px;
  padding-bottom: 80px;
  &:focus {
    outline: none;
  }
`;
// ${props => console.log(props.theme)}

/**
 * routes: /[locale] +
 * overview: ?scale=:scale&standard=:standard&benchmark=:benchmark&region=:region&income=:income&cpr=:cpr
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
      <ScrollToTop>
        <Header />
        <Main>
          <Switch>
            <Route exact path={`/${locale}`} component={PathOverview} />
            <Route
              path={`/${locale}/metric/:metric/:country?`}
              component={PathMetric}
            />
            <Route
              path={`/${locale}/country/:country/:metric?`}
              component={PathCountry}
            />
            <Route path={`/${locale}/page/:page`} component={PathPage} />
            <Route path={`/${locale}`} component={PathNotFoundPage} />
          </Switch>
        </Main>
        <Settings />
      </ScrollToTop>
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  match: PropTypes.object,
  onLoadData: PropTypes.func.isRequired,
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
