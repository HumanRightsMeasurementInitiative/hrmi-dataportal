/*
 * Sections Messages
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
    countriesMeasureWord: {
      id: `${scope}.dataCards.countriesMeasureWord`,
      defaultMessage: '',
    },
    metricsMeasureWord: {
      id: `${scope}.dataCards.metricsMeasureWord`,
      defaultMessage: '',
    },
    peopleMeasureWord: {
      id: `${scope}.dataCards.peopleMeasureWord`,
      defaultMessage: '',
    },
  },
  countries: {
    title: {
      id: `${scope}.countries.title`,
      defaultMessage: 'Featured Countries',
    },
  },
  metrics: {
    title: {
      id: `${scope}.metrics.title`,
      defaultMessage: 'Rights',
    },
  },
  people: {
    title: {
      id: `${scope}.people.title`,
      defaultMessage: 'People at Risk',
    },
    para1: {
      id: `${scope}.people.para1`,
      defaultMessage:
        'Find out who is particularly at risk of rights violations in each country.',
    },
    para2: {
      id: `${scope}.people.para2`,
      defaultMessage: ' ',
    },
    link: {
      id: `${scope}.people.link`,
      defaultMessage: 'Explore',
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
      defaultMessage: ' ',
    },
    downloadLink: {
      id: `${scope}.ourData.downloadLink`,
      defaultMessage: 'Download Data',
    },
    aboutLink: {
      id: `${scope}.ourData.aboutLink`,
      defaultMessage: 'Read more',
    },
  },
  about: {
    title: {
      id: `${scope}.about.title`,
      defaultMessage: 'About us',
    },
    lead: {
      id: `${scope}.about.lead`,
      defaultMessage: 'About us lead',
    },
    text: {
      id: `${scope}.about.text`,
      defaultMessage: 'About us text',
    },
    link: {
      id: `${scope}.about.link`,
      defaultMessage: 'About us link',
    },
  },
  footer: {
    text: {
      id: `${scope}.footer.text`,
      defaultMessage:
        'Web site content © HRMI. Unless otherwise noted, all content is licensed under a Creative Commons Attribution 4.0 international licence.',
    },
  },
});
