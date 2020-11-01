import { GA_PROPERTY_ID } from 'containers/App/constants';

export const disableAnalytics = (disable = true) => {
  if (typeof window === 'object') {
    window[`ga-disable-${GA_PROPERTY_ID}`] = disable;
  }
};
