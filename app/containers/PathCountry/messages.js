/*
 * PathCountry Messages
 *
 * This contains all the text for the PathCountry container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathCountry';

export default defineMessages({
  header: {
    a: {
      id: `${scope}.header.a`,
      defaultMessage:
        "How well {isPlural, select, true {are} false {is}} {countryWithArticle} respecting people's human rights?",
    },
    b: {
      id: `${scope}.header.b`,
      defaultMessage: 'Use the tabs below to explore the scores',
    },
  },
  countryScoreExplainer: {
    esr: {
      adjusted: {
        id: `${scope}.countryScoreExplainer.esr.adjusted`,
        defaultMessage:
          'On the {metric}, {countryWithArticle} {isPlural, select, true {are} false {is}} doing {score}% of what should be possible at {isPlural, select, true {their} false {its}} level of income (measured against the income-adjusted benchmark).',
      },
      best: {
        id: `${scope}.countryScoreExplainer.esr.best`,
        defaultMessage:
          'On the {metric}, {countryWithArticle} {isPlural, select, true {are} false {is}} doing {score}% of what should be possible at any income level (measured against the global best benchmark)',
      },
    },
    cpr: {
      id: `${scope}.countryScoreExplainer.cpr`,
      defaultMessage:
        'On the {metric}, {countryWithArticle} {isPlural, select, true {have} false {has}} scores {score} out of 10, based on responses from our survey of human rights experts',
    },
    // TODO?
    noData: {
      id: `${scope}.countryScoreExplainer.cpr`,
      defaultMessage: 'Score not available for {countryWithArticle}',
    },
  },
});
