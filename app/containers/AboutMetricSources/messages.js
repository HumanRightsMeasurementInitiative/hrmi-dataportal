/*
 * CountryAbout Messages
 *
 * This contains all the text for the CountryAbout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.AboutMetricSources';

export default defineMessages({
  titleSource: {
    id: `${scope}.titleSource`,
    defaultMessage: 'Data source(s)',
  },
  titleSourceShort: {
    id: `${scope}.titleSourceShort`,
    defaultMessage: 'Source(s)',
  },
  titleStandards: {
    id: `${scope}.titleStandards`,
    defaultMessage: 'Assessment standard(s)',
  },
  titleSourcesByIndicator: {
    id: `${scope}.titleSourcesByIndicator`,
    defaultMessage: 'Data sources by indicator',
  },
});
