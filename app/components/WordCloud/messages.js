/*
 * WordCloud Messages
 *
 * This contains all the text for the WordCloud component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.WordCloud';

export default defineMessages({
  tooltip: {
    id: `${scope}.tooltip`,
    defaultMessage:
      'These numbers show the percentage of our human rights experts who identified these people as being most at risk of having this right violated.',
  },
  noGroupData: {
    id: `${scope}.noGroupData`,
    defaultMessage: 'No data',
  },
});
