/*
 * PathMetricOverview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathMetricOverview';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: '{no} Human Rights',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage:
      'We currently track {no} internationally recognised human rights, in three categories: {esrLink}, {physintLink} and {empowerLink}. Scores are updated annually. Measurements for more rights are coming. ',
  },
  sectionTitle: {
    id: `${scope}.sectionTitle`,
    defaultMessage: '{no} {category} rights',
  },
  categoryLink: {
    id: `${scope}.categoryLink`,
    defaultMessage: 'Summary score',
  },
  description: {
    esr: {
      id: `${scope}.description.esr`,
      defaultMessage:
        'These scores measure how well a country is using its resources to ensure people’s economic and social rights are fulfilled. Our methodology takes into account a country’s income as well as information from international databases.',
    },
    physint: {
      id: `${scope}.description.physint`,
      defaultMessage:
        'These physical integrity rights are measured using an {methodologyLink}.',
    },
    empowerment: {
      id: `${scope}.description.empowerment`,
      defaultMessage:
        'These empowerment rights are measured using an {methodologyLink}.',
    },
    methodologyLink: {
      esr: {
        id: `${scope}.description.methodologyLink.esr`,
        defaultMessage: 'methodology',
      },
      cpr: {
        id: `${scope}.description.methodologyLink.cpr`,
        defaultMessage: 'expert survey methodology',
      },
    },
  },
});
