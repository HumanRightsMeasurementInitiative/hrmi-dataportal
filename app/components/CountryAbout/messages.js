/*
 * CountryAbout Messages
 *
 * This contains all the text for the CountryAbout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryAbout';

/* eslint-disable no-template-curly-in-string */
export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Country details',
  },
  population: {
    id: `${scope}.population`,
    defaultMessage: 'Population ({year})',
  },
  populationValue: {
    id: `${scope}.populationValue`,
    defaultMessage:
      '{value}{abbrev, select, millions {m} thousands {k} other {}}',
  },
  gdp: {
    id: `${scope}.gdp`,
    defaultMessage: 'GDP/capita ({year})',
  },
  gdpValue: {
    id: `${scope}.gdpValue`,
    defaultMessage: '${value}',
  },
  gdpHint: {
    id: `${scope}.gdpHint`,
    defaultMessage: '(current US dollars)',
  },
  gdpTooltip: {
    id: `${scope}.gdpTooltip`,
    defaultMessage:
      'This is the latest value in USD. However, when comparing countries elsewhere on this website we use GDP/capita measured in 2011 PPP$, which adjusts for inflation and purchasing power',
  },
  gdpHintPPP: {
    id: `${scope}.gdpHintPPP`,
    defaultMessage: '(2011 PPP dollars)',
  },
  gdpTooltipPPP: {
    id: `${scope}.gdpTooltipPPP`,
    defaultMessage: 'About PPP dollars',
  },
  oecd: {
    id: `${scope}.oecd`,
    defaultMessage: 'OECD status',
  },
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  income: {
    id: `${scope}.income`,
    defaultMessage: 'Income group',
  },
});
