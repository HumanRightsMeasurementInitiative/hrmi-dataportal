/*
 * AboutCountryContainer Messages
 *
 * This contains all the text for the AboutCountryContainer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.AboutCountryContainer';

/* eslint-disable no-template-curly-in-string */
export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Country details',
  },
  population: {
    id: `${scope}.population`,
    defaultMessage: 'Population',
  },
  populationValue: {
    id: `${scope}.populationValue`,
    defaultMessage:
      '{value}{abbrev, select, millions {m} thousands {k} other {}} ({year})',
  },
  gdp: {
    id: `${scope}.gdp`,
    defaultMessage: 'GDP/capita',
  },
  gdpValue: {
    id: `${scope}.gdpValue`,
    defaultMessage: '${value} ({year})',
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
  groups: {
    single: {
      id: `${scope}.groups.single`,
      defaultMessage: 'group',
    },
    plural: {
      id: `${scope}.groups.plural`,
      defaultMessage: 'groups',
    },
  },
  treaties: {
    single: {
      id: `${scope}.treaties.single`,
      defaultMessage: 'treaty',
    },
    plural: {
      id: `${scope}.treaties.plural`,
      defaultMessage: 'treaties',
    },
  },
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  subregion: {
    id: `${scope}.subregion`,
    defaultMessage: 'Subregion',
  },
  income: {
    id: `${scope}.income`,
    defaultMessage: 'Income group',
  },
});
