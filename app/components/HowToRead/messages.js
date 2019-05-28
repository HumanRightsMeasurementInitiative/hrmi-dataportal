/*
 * HowToRead Messages
 *
 * This contains all the text for the HowToRead component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.HowToRead';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'How to read this chart',
  },
  labelShort: {
    id: `${scope}.labelShort`,
    defaultMessage: 'How to read',
  },
});
