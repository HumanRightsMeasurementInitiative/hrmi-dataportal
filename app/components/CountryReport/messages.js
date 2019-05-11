/*
 * CountryReport Messages
 *
 * This contains all the text for the CountryReport component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryReport';

export default defineMessages({
  title: {
    id: `${scope}.report.title`,
    defaultMessage: "{country}'s Human Rights Report",
  },
});
