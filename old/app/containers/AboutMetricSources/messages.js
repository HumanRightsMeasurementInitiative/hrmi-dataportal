/*
 * CountryAbout Messages
 *
 * This contains all the text for the CountryAbout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.AboutMetricSources';

export default defineMessages({
  titleSourceShort: {
    id: `${scope}.titleSourceShort`,
    defaultMessage: 'Source(s)',
  },
  titleStandards: {
    id: `${scope}.titleStandards`,
    defaultMessage: 'Assessment standard(s)',
  },
  nationalSources: {
    id: `${scope}.nationalSources`,
    defaultMessage: 'Country-specific source(s)',
  },
});
