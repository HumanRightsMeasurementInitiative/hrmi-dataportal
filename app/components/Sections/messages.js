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
  dataCards: {
    title: {
      id: `${scope}.dataCards.title`,
      defaultMessage: 'Our data',
    },
    countries: {
      id: `${scope}.dataCards.countries`,
      defaultMessage: 'Countries',
    },
    metrics: {
      id: `${scope}.dataCards.metrics`,
      defaultMessage: 'Rights',
    },
    people: {
      id: `${scope}.dataCards.people`,
      defaultMessage: 'People Groups',
    },
    countriesTeaser: {
      id: `${scope}.dataCards.countriesTeaser`,
      defaultMessage: 'How are countries performing?',
    },
    metricsTeaser: {
      id: `${scope}.dataCards.metricsTeaser`,
      defaultMessage: 'Explore specific human rights.',
    },
    peopleTeaser: {
      id: `${scope}.dataCards.peopleTeaser`,
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
  people: {
    title: {
      id: `${scope}.people.title`,
      defaultMessage: 'People at Risk',
    },
    teaser: {
      id: `${scope}.people.teaser`,
      defaultMessage:
        'Find out who is particularly at risk of rights violations in each country.',
    },
    link: {
      id: `${scope}.people.link`,
      defaultMessage: 'Learn more',
    },
  },
  search: {
    title: {
      id: `${scope}.search.title`,
      defaultMessage: 'Search for a country, right or group',
    },
    placeholder: {
      id: `${scope}.search.placeholder`,
      defaultMessage: 'e.g. "Fiji" or "housing"',
    },
  },
  ourData: {
    title: {
      id: `${scope}.ourData.title`,
      defaultMessage: 'Our Data',
    },
    para1: {
      id: `${scope}.ourData.para1`,
      defaultMessage:
        'The Rights Tracker is created by the Human Rights Measurement Initiative, the first global project to comprehensively track the human rights performance of countries.',
    },
    para2: {
      id: `${scope}.ourData.para2`,
      defaultMessage:
        'Everything on the Rights Tracker is freely available for use by human rights advocates, researchers, governments, and others, under a Creative Commons licence. You are welcome to download and use the full dataset with acknowledgement.',
    },
    downloadLink: {
      id: `${scope}.ourData.downloadLink`,
      defaultMessage: 'Download data',
    },
    aboutLink: {
      id: `${scope}.ourData.aboutLink`,
      defaultMessage: 'Read more',
    },
  },
});
