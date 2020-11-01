/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Search';

export default defineMessages({
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  allSearch: {
    id: `${scope}.allSearch`,
    defaultMessage: 'Search country or metric',
  },
  exampleSearch: {
    id: `${scope}.exampleSearch`,
    defaultMessage: 'e.g. try "Fiji" or "Housing"',
  },
  countrySearch: {
    id: `${scope}.countrySearch`,
    defaultMessage: 'Search country',
  },
  metricSearch: {
    id: `${scope}.metricSearch`,
    defaultMessage: 'Search metric',
  },
  peopleSearch: {
    id: `${scope}.peopleSearch`,
    defaultMessage: 'Search people at risk group',
  },
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage: 'We are sorry! Your search did not return any results.',
  },
  optionGroups: {
    overview: {
      id: `${scope}.optionGroups.overview`,
      defaultMessage: 'Overview',
    },
    countries: {
      id: `${scope}.optionGroups.countries`,
      defaultMessage: 'Country profiles',
    },
    people: {
      id: `${scope}.optionGroups.people`,
      defaultMessage: 'People at risk groups',
    },
  },
});
