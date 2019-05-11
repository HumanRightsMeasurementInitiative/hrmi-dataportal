/*
 * PathCountry Messages
 *
 * This contains all the text for the PathCountry container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathCountry';

export default defineMessages({
  tabs: {
    report: {
      id: `${scope}.tabs.report`,
      defaultMessage: 'Report',
    },
    'people-at-risk': {
      id: `${scope}.tabs['people-at-risk']`,
      defaultMessage: 'People at risk',
    },
    about: {
      id: `${scope}.tabs.about`,
      defaultMessage: 'About',
    },
  },
});
