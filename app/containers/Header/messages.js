/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Header';

export default defineMessages({
  appTitle: {
    id: `${scope}.appTitle`,
    defaultMessage: 'Data Portal',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language: ',
  },
  download: {
    button: {
      id: `${scope}.download.button`,
      defaultMessage: 'Download data',
    },
    title: {
      id: `${scope}.download.title`,
      defaultMessage: 'Accreditation and copyright',
    },
    paragraph: {
      id: `${scope}.download.paragraph`,
      defaultMessage:
        'You are welcome to use data and charts produced by the Human Rights Measurement Initiative (HRMI) for your advocacy or research. However, we ask that you take care to ensure that you understand the data and what they are showing, so that you do not misrepresent them.',
    },
    attribution: {
      id: `${scope}.download.attribution`,
      defaultMessage:
        'Please attribute the Human Rights Measurement Initiative and link back to our website: ',
    },
    attributionURL: {
      id: `${scope}.download.attributionURL`,
      defaultMessage: 'humanrightsmeasurement.org',
    },
    downloadAnchor: {
      id: `${scope}.download.downloadAnchor`,
      defaultMessage: 'Agree & download',
    },
    downloadURL: {
      id: `${scope}.download.attributionURL`,
      defaultMessage:
        '//hrmi-dataportal-data.unfolddata.com/data/hrmi-data-download.zip',
    },
  },
  countries: {
    id: `${scope}.countries`,
    defaultMessage: 'Countries',
  },
  metrics: {
    id: `${scope}.metrics`,
    defaultMessage: 'Metrics',
  },
  search: {
    countrySearch: {
      id: `${scope}.search.countrySearch`,
      defaultMessage: 'Search country',
    },
    metricSearch: {
      id: `${scope}.search.metricSearch`,
      defaultMessage: 'Search metric',
    },
    allSearch: {
      id: `${scope}.search.allSearch`,
      defaultMessage: 'Search country or metric',
    },
    noResults: {
      id: `${scope}.search.noResults`,
      defaultMessage: 'We are sorry! Your search did not return any results.',
    },
  },
});
