/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartSettingMetrics';

export default defineMessages({
  indicators: {
    id: `${scope}.indicators`,
    defaultMessage:
      'How does {countryWithArticle} perform for the {hasMany, select, true {indicators} false {indicator}} we use for {dropdown}?',
  },
  sex: {
    id: `${scope}.sex`,
    defaultMessage:
      'How does {countryWithArticle} perform by sex for {dropdown}?',
  },
  trend: {
    id: `${scope}.trend`,
    defaultMessage:
      'How does {countryWithArticle} perform over time for {dropdown}',
  },
  people: {
    id: `${scope}.people`,
    defaultMessage:
      'Which people in {countryWithArticle} were identified by human rights experts to be particularly at risk of having their {dropdown} violated?',
  },
});
