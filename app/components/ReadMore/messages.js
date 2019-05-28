/*
 * Source Messages
 *
 * This contains all the text for the Source component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ReadMore';

export default defineMessages({
  more: {
    id: `${scope}.more`,
    defaultMessage: 'Read more',
  },
  less: {
    id: `${scope}.less`,
    defaultMessage: 'Read less',
  },
});
