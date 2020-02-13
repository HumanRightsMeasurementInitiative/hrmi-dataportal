/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.Overview';

export default defineMessages({
  heading: {
    id: `${scope}.title`,
    defaultMessage:
      "Welcome to the Human Rights Measurement Initiative (HRMI)'s data portal",
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage:
      'Explore the human rights performance of countries across 3 categories and 12 rights',
  },
});
