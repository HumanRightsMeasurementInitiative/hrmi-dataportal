/*
 * CountryReport Messages
 *
 * This contains all the text for the CountryReport component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryReport';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage:
      "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} Human Rights Report",
  },
});
