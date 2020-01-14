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
    defaultMessage: '(current PPP dollars)',
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
