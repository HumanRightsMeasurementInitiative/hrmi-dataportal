import { takeLatest, select, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getLocale, getRouterLocation } from 'containers/App/selectors';
import { trackEvent } from 'containers/App/actions';
import { CHANGE_LOCALE } from './constants';

const updateLocale = (currentLocation, currentLocale, newLocale) => {
  if (
    currentLocation.pathname &&
    currentLocation.pathname.indexOf(currentLocale) === 1
  ) {
    const pathnameUpdated = currentLocation.pathname.replace(
      `/${currentLocale}`,
      `/${newLocale}`,
    );
    return `${pathnameUpdated}${currentLocation.search}`;
  }
  return currentLocation;
};

export function* changeLocaleSaga({ locale }) {
  const currentLocale = yield select(getLocale);
  const currentLocation = yield select(getRouterLocation);
  yield put(push(updateLocale(currentLocation, currentLocale, locale)));
  yield put(
    trackEvent({
      category: 'Language',
      action: 'Change language',
      value: locale,
    }),
  );
}

export default function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(CHANGE_LOCALE, changeLocaleSaga);
}
