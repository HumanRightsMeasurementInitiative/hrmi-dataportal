/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Settings';

export default defineMessages({
  hi: {
    label: {
      id: `${scope}.hi.label`,
      defaultMessage: '(HI): High income country',
    },
    text: {
      id: `${scope}.hi.text`,
      defaultMessage:
        'For these countries it is best to use the high income assessment standard.',
    },
  },
  tooltip: {
    empowerment: {
      id: `${scope}.tooltip.empowerment`,
      defaultMessage: 'A collection of {count} civil and political rights',
    },
    physint: {
      id: `${scope}.tooltip.physint`,
      defaultMessage: 'A collection of {count} physical integrity rights',
    },
    esr: {
      id: `${scope}.tooltip.esr`,
      defaultMessage: 'A collection of {count} economic and social rights',
    },
    benchmark: {
      intro: {
        id: `${scope}.tooltip.benchmark.intro`,
        defaultMessage:
          'For the quality of life rights, HRMI measures countries against 2 different benchmarks.',
      },
      adjusted: {
        id: `${scope}.tooltip.benchmark.adjusted`,
        defaultMessage:
          'How well is the country doing compared to the best performance of other countries at roughly the same income level?',
      },
      best: {
        id: `${scope}.tooltip.benchmark.best`,
        defaultMessage:
          'How well is the country doing compared to the best performance of all countries?',
      },
    },
    standard: {
      intro: {
        id: `${scope}.tooltip.standard.intro`,
        defaultMessage:
          'For the quality of life rights we have two assessment standards.',
      },
      core: {
        id: `${scope}.tooltip.standard.core`,
        defaultMessage:
          'Uses statistical indicators that are available for most countries in the world, particularly low and middle income countries.',
      },
      hi: {
        id: `${scope}.tooltip.standard.hi`,
        defaultMessage:
          'Uses indicators that are available for fewer countries, and/or better reflect the human rights challenges of high-income countries.',
      },
    },
  },
});
