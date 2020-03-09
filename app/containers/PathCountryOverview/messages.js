/*
 * CountryOverview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathCountryOverview';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: '{no} countries',
  },
  header: {
    d: {
      id: `${scope}.header.d`,
      defaultMessage:
        'Compare how countries perform across the three human rights categories: {esrLink}, {physintLink} and {empowerLink}',
    },
    r: {
      id: `${scope}.header.r`,
      defaultMessage:
        'Compare how countries perform across the {no} human rights of our three categories: {esrLink}, {physintLink} and {empowerLink}',
    },
  },
});
