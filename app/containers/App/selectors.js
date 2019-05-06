/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { DEFAULT_LOCALE, appLocales } from '../../i18n';

const getLocaleFromPath = router => {
  if (router.location && router.location.pathname) {
    const splitPath = router.location.pathname.split('/');
    const locale = splitPath.length > 1 ? splitPath[1] : DEFAULT_LOCALE;
    return appLocales.indexOf(locale) >= 0 ? locale : DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
};

export const selectGlobal = state => state.global || initialState;
const getGlobalData = state => state.global.data;
const getGlobalRequested = state => state.global.dataRequested;

const selectRouter = state => state.router;

export const selectLanguage = state => getLocaleFromPath(state.router);

export const selectDataRequestedAt = createSelector(
  getGlobalRequested,
  (state, { key }) => key,
  (requested, key) => requested[key],
);

export const makeSelectCountries = () =>
  createSelector(
    getGlobalData,
    data => data.countries,
  );

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

/**
 * Select the language locale
 */
export const makeSelectLocale = () =>
  createSelector(
    selectLanguage,
    locale => locale,
  );
