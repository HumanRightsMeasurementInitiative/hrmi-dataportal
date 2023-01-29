import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PATHS } from '../../containers/App/constants';

import PathHome from '../../containers/PathHome';
// import PathMetric from '../../containers/PathMetric';
// import PathMetricOverview from '../../containers/PathMetricOverview';
// import PathCountry from '../../containers/PathCountry';
// import PathCountryOverview from '../../containers/PathCountryOverview';
// import PathPeople from '../../containers/PathPeople';
// import PathPeopleOverview from '../../containers/PathPeopleOverview';
// import PathPage from '../../containers/PathPage';
// import PathNotFoundPage from '../app/containers/PathNotFoundPage';

const locale = 'en';

export default (
  <Switch>
    <Route exact path={`/${locale}`} component={PathHome} />
    <Route
      path={`/${locale}/${PATHS.METRICS}`}
      component={PathMetricOverview}
    />
    <Route path={`/${locale}/${PATHS.METRIC}/:metric`} component={PathMetric} />
    <Route
      path={`/${locale}/${PATHS.COUNTRIES}`}
      component={PathCountryOverview}
    />
    <Route
      path={`/${locale}/${PATHS.COUNTRY}/:country`}
      component={PathCountry}
    />
    <Route path={`/${locale}/${PATHS.GROUPS}`} component={PathPeopleOverview} />
    <Route path={`/${locale}/${PATHS.GROUP}/:group`} component={PathPeople} />
    <Route path={`/${locale}/${PATHS.PAGE}/:page`} component={PathPage} />
    <Route path={`/${locale}`} component={PathNotFoundPage} />
  </Switch>
);
