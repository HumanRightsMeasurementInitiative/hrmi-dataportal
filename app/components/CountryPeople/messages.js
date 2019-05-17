/*
 * CountryPeople Messages
 *
 * This contains all the text for the CountryPeople component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryPeople';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage:
      "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} people at risk overview",
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage: 'An overview of people at risk by human right',
  },
});
