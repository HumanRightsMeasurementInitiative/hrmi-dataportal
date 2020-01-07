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
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import GlobalStyle from 'global-styles';

import Header from 'containers/Header';
import Settings from 'containers/Settings';
import PathOverview from 'containers/PathOverview';
import PathMetric from 'containers/PathMetric';
import PathCountry from 'containers/PathCountry';
import PathPage from 'containers/PathPage';
import PathNotFoundPage from 'containers/PathNotFoundPage';
import HowToReadLayer from 'containers/HowToRead/HowToReadLayer';

import CookieConsent from 'containers/CookieConsent';

import headerMessages from 'containers/Header/messages';

import ScrollToTop from './ScrollToTop';

import { DEFAULT_LOCALE } from '../../i18n';

const AppWrapper = styled.div`
  &:focus {
    outline: none;
  }
`;

const Main = styled.main`
  min-height: 100%;
  padding-top: ${({ theme }) => theme.sizes.header.height}px;
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

export function App({ match, intl }) {
  const locale = match.params ? match.params.locale : DEFAULT_LOCALE;
  const title = `HRMI ${intl.formatMessage(headerMessages.appTitle)}`;
  const description = `Human Rights Measurement Initiative ${intl.formatMessage(
    headerMessages.appTitle,
  )}`;
  return (
    <AppWrapper>
      <Helmet titleTemplate={`%s - {title}`} defaultTitle={title}>
        <meta name="description" content={description} />
      </Helmet>
      <ScrollToTop>
        <CookieConsent />
        <Header />
        <HowToReadLayer />
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
  intl: intlShape.isRequired,
  match: PropTypes.object,
};

export default injectIntl(App);
