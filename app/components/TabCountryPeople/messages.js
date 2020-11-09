/*
 * TabCountryPeople Messages
 *
 * This contains all the text for the TabCountryPeople component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.TabCountryPeople';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Which people are most at risk?',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage: 'An overview of people at risk by human right',
  },
  showAnalysis: {
    id: `${scope}.show`,
    defaultMessage: 'Show more detail',
  },
  hideAnalysis: {
    id: `${scope}.hide`,
    defaultMessage: 'Show less detail',
  },
  people: {
    id: `${scope}.people`,
    defaultMessage: 'Highlight {dropdown} in the word clouds below.',
  },
});
