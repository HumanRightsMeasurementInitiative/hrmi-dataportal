/*
 * CountryOverview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathPeopleOverview';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: '{no} at risk groups',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'header',
  },
});
