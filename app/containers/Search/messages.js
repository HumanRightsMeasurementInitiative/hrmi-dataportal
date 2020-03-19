/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Search';

export default defineMessages({
  allSearch: {
    id: `${scope}.allSearch`,
    defaultMessage: 'Search country or metric',
  },
  countrySearch: {
    id: `${scope}.countrySearch`,
    defaultMessage: 'Search country',
  },
  metricSearch: {
    id: `${scope}.metricSearch`,
    defaultMessage: 'Search metric',
  },
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage: 'We are sorry! Your search did not return any results.',
  },
});
