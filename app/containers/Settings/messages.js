/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Settings';

export default defineMessages({
  hi: {
    label: {
      id: `${scope}.hi.label`,
      defaultMessage: '(HI): High income country',
    },
    text: {
      id: `${scope}.hi.text`,
      defaultMessage:
        'For these countries it is best to use the high income assessment standard.',
    },
  },
});
