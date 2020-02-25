/*
 * ChartCountryDiamond Messages
 *
 * This contains all the text for the ChartCountryDiamond container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartCountryDiamond';

export default defineMessages({
  hiForCore: {
    id: `${scope}.hiForCore`,
    defaultMessage: "High income country: best use the 'high income' standard",
  },
  loForHi: {
    id: `${scope}.loForHi`,
    defaultMessage:
      "Low and middle income country: best use the 'low and middle income' standard",
  },
});
