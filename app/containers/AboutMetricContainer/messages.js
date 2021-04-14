/*
 * AboutCountryContainer Messages
 *
 * This contains all the text for the AboutCountryContainer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.AboutMetricContainer';

export default defineMessages({
  titleParent: {
    rights: {
      id: `${scope}.titleParent.rights`,
      defaultMessage:
        'What category score was this human rights score used for?',
    },
    indicators: {
      id: `${scope}.titleParent.indicators`,
      defaultMessage: 'What human rights score was this indicator used for?',
    },
  },
  titleChildren: {
    dimensions: {
      id: `${scope}.titleChildren.dimensions`,
      defaultMessage:
        'What human rights were used to calculate this category score?',
    },
    rights: {
      esr: {
        id: `${scope}.titleChildren.rights.esr`,
        defaultMessage:
          'What indicators were used to measure this human right?',
      },
    },
  },
  metricLink: {
    id: `${scope}.metricLink`,
    defaultMessage: `${scope}.metricLink`,
  },
  'metricLink-subrights': {
    id: `${scope}.metricLink-subrights`,
    defaultMessage: `${scope}.metricLink-subrights`,
  },
  indicator: {
    id: `${scope}.indicator`,
    defaultMessage: `${scope}.indicator`,
  },
});
