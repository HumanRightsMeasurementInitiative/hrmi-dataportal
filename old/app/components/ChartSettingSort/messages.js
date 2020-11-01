/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartSettingSort';

export default defineMessages({
  sortBy: {
    id: `${scope}.sortBy`,
    defaultMessage: 'Sort by:',
  },
  sortOptions: {
    name: {
      id: `${scope}.sortOptions.name`,
      defaultMessage: 'Name',
    },
    score: {
      id: `${scope}.sortOptions.score`,
      defaultMessage: 'Score',
    },
    assessment: {
      id: `${scope}.sortOptions.assessment`,
      defaultMessage: 'Assessment',
    },
    gdp: {
      id: `${scope}.sortOptions.gdp`,
      defaultMessage: 'GDP',
    },
    population: {
      id: `${scope}.sortOptions.population`,
      defaultMessage: 'Population',
    },
  },
  sortOrderAsc: {
    id: `${scope}.sortOrderAsc`,
    defaultmessage: 'Ascending',
  },
  sortOrderDesc: {
    id: `${scope}.sortOrderDesc`,
    defaultmessage: 'Descending',
  },
});
