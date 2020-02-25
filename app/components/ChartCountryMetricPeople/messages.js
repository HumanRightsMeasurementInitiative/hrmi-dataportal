/*
 * CountryMetricPeople Messages
 *
 * This contains all the text for the CountryMetricPeople component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryMetricPeople';

export default defineMessages({
  noAnalysisInLanguage: {
    id: `${scope}.noAnalysisInLanguage`,
    defaultMessage:
      'We are sorry but this information is not yet available in your language',
  },
  introRight: {
    id: `${scope}.introRight`,
    defaultMessage: 'An overview of people at risk by human right',
  },
  introDimension: {
    id: `${scope}.introDimension`,
    defaultMessage: 'An overview of people at risk by human right',
  },
});
