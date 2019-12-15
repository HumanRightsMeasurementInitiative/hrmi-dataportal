/*
 * WordCloud Messages
 *
 * This contains all the text for the WordCloud component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.WordCloud';

export default defineMessages({
  noGroupData: {
    id: `${scope}.noGroupData`,
    defaultMessage: 'No data',
  },
  interpretation: {
    id: `${scope}.interpretation`,
    defaultMessage:
      'Text size based on percentage of human rights experts identifying each group as being at risk of having this right violated.',
  },
  highlightStart: {
    id: `${scope}.highlightStart`,
    defaultMessage: ' of our human rights experts identified ',
  },
  highlightEnd: {
    id: `${scope}.highlightEnd`,
    defaultMessage: ' as being at risk of having this right violated.',
  },
});
