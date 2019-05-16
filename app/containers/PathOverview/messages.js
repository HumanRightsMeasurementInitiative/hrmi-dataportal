/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.Overview';

export default defineMessages({
  aboveTitle: {
    id: `${scope}.aboveTitle`,
    defaultMessage: 'Human rights performance overview',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: '{number} countries',
  },
});
