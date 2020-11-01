/*
 * ChartCountrySnapshot Messages
 *
 * This contains all the text for the ChartCountrySnapshot component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartCountrySnapshot';

export default defineMessages({
  rightsScoresUnavailable: {
    esr: {
      id: `${scope}.rightsScoresUnavailable.esr`,
      defaultMessage: 'Data not yet available.',
    },
    cpr: {
      id: `${scope}.rightsScoresUnavailable.cpr`,
      defaultMessage: 'Data not yet available.',
    },
  },
});
