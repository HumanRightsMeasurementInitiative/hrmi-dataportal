/*
 * PathCountry Messages
 *
 * This contains all the text for the PathCountry container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathCountry';

export default defineMessages({
  header: {
    a: {
      id: `${scope}.header.a`,
      defaultMessage:
        "How well {isPlural, select, true {are} false {is}} {countryWithArticle} respecting people's human rights?",
    },
    b: {
      id: `${scope}.header.b`,
      defaultMessage: 'Use the tabs below to explore the scores',
    },
  },
});
