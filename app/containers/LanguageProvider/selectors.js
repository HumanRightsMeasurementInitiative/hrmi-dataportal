import { createSelector } from 'reselect';
import { DEFAULT_LOCALE, appLocales } from '../../i18n';

const getLocaleFromPath = router => {
  if (router.location && router.location.pathname) {
    const splitPath = router.location.pathname.split('/');
    const locale = splitPath.length > 1 ? splitPath[1] : DEFAULT_LOCALE;
    return appLocales.indexOf(locale) >= 0 ? locale : DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
};

/**
 * Direct selector to the language domain
 */
const selectLanguage = state => getLocaleFromPath(state.router);

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(
    selectLanguage,
    locale => locale,
  );

export { selectLanguage, makeSelectLocale };
