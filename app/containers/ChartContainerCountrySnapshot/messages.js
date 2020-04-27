/*
 * TabCountryReport Messages
 *
 * This contains all the text for the TabCountryReport component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.ChartContainerCountrySnapshot';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage:
      "{needsArticle, select, true {The } false { }}{country}'{isPlural, select, true {} false {s}} Human Rights Report",
  },
  exploreDetails: {
    id: `${scope}.exploreDetails`,
    defaultMessage: 'Explore Details',
  },
});
