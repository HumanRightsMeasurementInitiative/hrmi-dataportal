/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryFilters';

export default defineMessages({
  addFilter: {
    id: `${scope}.addFilter`,
    defaultMessage: 'Add country filter',
  },
  addFilterMobile: {
    id: `${scope}.addFilterMobile`,
    defaultMessage: 'Add filter',
  },
  regionsFilterOptionGroup: {
    id: `${scope}.regionsFilterOptionGroup`,
    defaultMessage: 'Regions',
  },
  incomeFilterOptionGroup: {
    id: `${scope}.incomeFilterOptionGroup`,
    defaultMessage: 'Income group',
  },
  assessedFilterOptionGroup: {
    id: `${scope}.assessedFilterOptionGroup`,
    defaultMessage: 'Assessment',
  },
  oecdFilterOptionGroup: {
    id: `${scope}.oecdFilterOptionGroup`,
    defaultMessage: 'OECD status',
  },
});
