/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.Sections';

export default defineMessages({
  intro: {
    id: `${scope}.intro`,
    defaultMessage:
      'Explore robust and comprehensive human rights scores, across countries, rights, and people at risk.',
  },
  data: {
    title: {
      id: `${scope}.data.title`,
      defaultMessage: 'Our data',
    },
    countries: {
      id: `${scope}.data.countries`,
      defaultMessage: 'Countries',
    },
    metrics: {
      id: `${scope}.data.metrics`,
      defaultMessage: 'Rights',
    },
    people: {
      id: `${scope}.data.people`,
      defaultMessage: 'People Groups',
    },
    countriesTeaser: {
      id: `${scope}.data.countriesTeaser`,
      defaultMessage: 'How are countries performing?',
    },
    metricsTeaser: {
      id: `${scope}.data.metrics`,
      defaultMessage: 'Explore specific human rights.',
    },
    peopleTeaser: {
      id: `${scope}.data.people`,
      defaultMessage: 'Who is at risk of rights violations?',
    },
  },
  countries: {
    title: {
      id: `${scope}.countries.title`,
      defaultMessage: 'Featured Countries',
    },
    allLink: {
      id: `${scope}.countries.allLink`,
      defaultMessage: 'All countries',
    },
  },
  metrics: {
    title: {
      id: `${scope}.metrics.title`,
      defaultMessage: 'Rights',
    },
    allLink: {
      id: `${scope}.metrics.allLink`,
      defaultMessage: 'Rights overview',
    },
  },
});
