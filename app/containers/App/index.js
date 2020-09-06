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
import { Box } from 'grommet';

import GlobalStyle from 'global-styles';

import Header from 'containers/Header';
import PathHome from 'containers/PathHome';
import PathMetric from 'containers/PathMetric';
import PathMetricOverview from 'containers/PathMetricOverview';
import PathCountry from 'containers/PathCountry';
import PathCountryOverview from 'containers/PathCountryOverview';
import PathPeople from 'containers/PathPeople';
import PathPeopleOverview from 'containers/PathPeopleOverview';
import PathPage from 'containers/PathPage';
import PathNotFoundPage from 'containers/PathNotFoundPage';
import LayerAside from 'containers/LayerAside';

import CookieConsent from 'containers/CookieConsent';

import rootMessages from 'messages';

import { getHeaderHeight } from 'utils/responsive';

import { PATHS } from './constants';
import ScrollToTop from './ScrollToTop';

import { DEFAULT_LOCALE } from '../../i18n';

const AppWrapper = styled.div`
  &:focus {
    outline: none;
  }
`;

const Main = styled.main`
  min-height: 100%;
  padding-top: ${({ theme }) => getHeaderHeight('small', theme)}px;
  &:focus {
    outline: none;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
  @media print {
    padding-top: 0px;
    margin-top: 0px;
  }
`;

const RemoveFromPDFBox = styled(Box)`
  @media print {
    display: none;
  }
`;

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
  const title = intl.formatMessage(rootMessages.app.metaTitle);
  const description = intl.formatMessage(rootMessages.app.metaDescription);
  return (
    <AppWrapper>
      <Helmet titleTemplate={`%s - ${title}`} defaultTitle={title}>
        <meta name="description" content={description} />
      </Helmet>
      <ScrollToTop>
        <CookieConsent />
        <RemoveFromPDFBox>
          <Header />
        </RemoveFromPDFBox>
        <LayerAside />
        <Main>
          <Switch>
            <Route exact path={`/${locale}`} component={PathHome} />
            <Route
              path={`/${locale}/${PATHS.METRICS}`}
              component={PathMetricOverview}
            />
            <Route
              path={`/${locale}/${PATHS.METRIC}/:metric`}
              component={PathMetric}
            />
            <Route
              path={`/${locale}/${PATHS.COUNTRIES}`}
              component={PathCountryOverview}
            />
            <Route
              path={`/${locale}/${PATHS.COUNTRY}/:country`}
              component={PathCountry}
            />
            <Route
              path={`/${locale}/${PATHS.GROUPS}`}
              component={PathPeopleOverview}
            />
            <Route
              path={`/${locale}/${PATHS.GROUP}/:group`}
              component={PathPeople}
            />
            <Route
              path={`/${locale}/${PATHS.PAGE}/:page`}
              component={PathPage}
            />
            <Route path={`/${locale}`} component={PathNotFoundPage} />
          </Switch>
        </Main>
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
