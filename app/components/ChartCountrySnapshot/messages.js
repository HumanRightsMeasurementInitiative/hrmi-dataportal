/*
 * ChartCountrySnapshot Messages
 *
 * This contains all the text for the ChartCountrySnapshot component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartCountrySnapshot';

export default defineMessages({
  rightsScoresUnavailable: {
    esr: {
      id: `${scope}.rightsScoresUnavailable.esr`,
      defaultMessage: 'Data not yet available.',
    },
    cpr: {
      id: `${scope}.rightsScoresUnavailable.cpr`,
      defaultMessage: 'Data not yet available.',
    },
  },
  dimensionIntro: {
    esr: {
      adjusted: {
        id: `${scope}.dimensionIntro.esr.adjusted`,
        defaultMessage:
          'How well {isPlural, select, true {are} false {is}} {countryWithArticle} doing compared to what is possible at {isPlural, select, true {their} false {its}} level of income?',
      },
      best: {
        id: `${scope}.dimensionIntro.esr.best`,
        defaultMessage:
          'How well {isPlural, select, true {are} false {is}} {countryWithArticle} doing compared to the best in the world?',
      },
    },
    physint: {
      id: `${scope}.dimensionIntro.physint`,
      defaultMessage:
        'How well is {needsArticle, select, true {the } false { }}{countryPossessive} government respecting each right?',
    },
    empowerment: {
      id: `${scope}.dimensionIntro.empowerment`,
      defaultMessage:
        'How well is {needsArticle, select, true {the } false { }}{countryPossessive} government respecting each right?',
    },
  },
});
