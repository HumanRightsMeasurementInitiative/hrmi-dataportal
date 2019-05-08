/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Header';

export default defineMessages({
  page: {
    about: {
      id: `${scope}.page.about`,
      defaultMessage: 'About',
    },
    methodology: {
      id: `${scope}.page.methodology`,
      defaultMessage: 'Methodology',
    },
  },
});
