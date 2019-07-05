/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.Overview';

export default defineMessages({
  aboveTitle: {
    id: `${scope}.aboveTitle`,
    defaultMessage: 'Human rights performance overview',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: '{number} countries',
  },
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
    dimensionScores: {
      id: `${scope}.welcome.dimensionScores`,
      defaultMessage: 'Category scores',
    },
    better: {
      id: `${scope}.welcome.better`,
      defaultMessage: 'The higher the score the better is the performance',
    },
    buttonExplore: {
      id: `${scope}.welcome.buttonExplore`,
      defaultMessage: 'Explore',
    },
  },
});
