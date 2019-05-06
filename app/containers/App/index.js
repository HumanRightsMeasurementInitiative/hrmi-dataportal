/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Overview from 'containers/Overview/Loadable';
import Metric from 'containers/Metric/Loadable';
import Country from 'containers/Country/Loadable';
import Page from 'containers/Page/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LocaleToggle from 'containers/LocaleToggle';

import { DEFAULT_LOCALE } from '../../i18n';

import GlobalStyle from '../../global-styles';

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

export default function App({ match }) {
  const lcl = match.params ? match.params.locale : DEFAULT_LOCALE;
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
        <Route exact path={`/${lcl}`} component={Overview} />
        <Route path={`/${lcl}/metric/:metric/:country?`} component={Metric} />
        <Route path={`/${lcl}/country/:country/:metric?`} component={Country} />
        <Route path={`/${lcl}/page/:page`} component={Page} />
        <Route path={`/${lcl}`} component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  match: PropTypes.object,
};
