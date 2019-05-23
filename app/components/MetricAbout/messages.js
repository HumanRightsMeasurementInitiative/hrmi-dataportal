/*
 * MetricAbout Messages
 *
 * This contains all the text for the MetricAbout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.MetricAbout';

/* eslint-disable no-template-curly-in-string */
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
});
