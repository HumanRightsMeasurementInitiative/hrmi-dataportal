/*
 * CountryAbout Messages
 *
 * This contains all the text for the CountryAbout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.MetricAside';

export default defineMessages({
  title: {
    dimensions: {
      id: `${scope}.title.dimensions`,
      defaultMessage: 'How is this category of rights defined?',
    },
    rights: {
      id: `${scope}.title.rights`,
      defaultMessage: 'How is this human right defined?',
    },
    indicators: {
      id: `${scope}.title.indicators`,
      defaultMessage: 'What data is the indicator based on?',
    },
    indicatorsRaw: {
      id: `${scope}.title.indicatorsRaw`,
      defaultMessage: 'How is this indicator defined?',
    },
  },
  titleSource: {
    id: `${scope}.titleSource`,
    defaultMessage: 'Data source',
  },
  titleStandards: {
    id: `${scope}.titleStandards`,
    defaultMessage: 'What assessment standard is it used for?',
  },
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
      cpr: {
        id: `${scope}.titleChildren.rights.cpr`,
        defaultMessage: 'What subrights were used to measure this human right?',
      },
    },
  },
});
