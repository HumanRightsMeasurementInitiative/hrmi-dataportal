/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.Overview';

export default defineMessages({
  welcome: {
    heading: {
      id: `${scope}.welcome.heading`,
      defaultMessage:
        "Welcome to the Human Rights Measurement Initiative (HRMI)'s data portal",
    },
    intro: {
      id: `${scope}.welcome.intro`,
      defaultMessage:
        'Explore the human rights performance of countries across 3 categories and 12 rights',
    },
  },
});
