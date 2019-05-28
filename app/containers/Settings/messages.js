/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Settings';

export default defineMessages({
  hi: {
    title: {
      id: `${scope}.hi.title`,
      defaultMessage: 'High income country',
    },
    text: {
      id: `${scope}.hi.text`,
      defaultMessage:
        'For these countries it is best to use the high income assessment standard.',
    },
    textIndicator: {
      id: `${scope}.hi.textIndicator`,
      defaultMessage:
        'For these countries it is best to use the high income assessment standard.',
    },
  },
});
