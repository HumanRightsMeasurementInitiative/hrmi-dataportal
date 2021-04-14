/*
 * AboutMetric Messages
 *
 * This contains all the text for the AboutMetric component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.AboutMetric';

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
      defaultMessage: 'What data is used to measure this right aspect?',
    },
    indicatorsRaw: {
      id: `${scope}.title.indicatorsRaw`,
      defaultMessage: 'How is this indicator defined?',
    },
    subrights: {
      id: `${scope}.title.subrights`,
      defaultMessage: 'What indicator data are used to measure this right?',
    },
  },
  measure: {
    id: `${scope}.measure`,
    defaultMessage: 'What aspects of this right do we measure?',
  },
  titleStandards: {
    id: `${scope}.titleStandards`,
    defaultMessage: 'What assessment standard is it used for?',
  },
  titleSource: {
    id: `${scope}.titleSource`,
    defaultMessage: 'Data source(s)',
  },
  titleSourcesByIndicator: {
    id: `${scope}.titleSourcesByIndicator`,
    defaultMessage: 'Data sources by indicator',
  },
});
