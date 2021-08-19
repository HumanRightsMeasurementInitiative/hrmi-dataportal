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
    id: `${scope}.showAnalysis`,
    defaultMessage: 'Show more information from survey respondents',
  },
  hideAnalysis: {
    id: `${scope}.hideAnalysis`,
    defaultMessage: 'Show less',
  },
  people: {
    id: `${scope}.people`,
    defaultMessage: 'Highlight {dropdown} in the word clouds below.',
  },
  peopleHeader: {
    id: `${scope}.people.header`,
    defaultMessage: 'Select group below',
  },
  noAnalysisInLanguage: {
    id: `${scope}.noAnalysisInLanguage`,
    defaultMessage:
      'We are sorry but this information is not yet available in your language',
  },
});
