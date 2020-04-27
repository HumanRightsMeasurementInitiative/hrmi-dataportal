/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartSettingFilters';

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
  subregionsFilterOptionGroup: {
    id: `${scope}.subregionsFilterOptionGroup`,
    defaultMessage: 'Subregions',
  },
  countryGroupFilterOptionGroup: {
    id: `${scope}.countryGroupFilterOptionGroup`,
    defaultMessage: 'Category',
  },
  treatyFilterOptionGroup: {
    id: `${scope}.treatyFilterOptionGroup`,
    defaultMessage: 'Treaty',
  },
  incomeFilterOptionGroup: {
    id: `${scope}.incomeFilterOptionGroup`,
    defaultMessage: 'Income group',
  },
  assessedFilterOptionGroup: {
    id: `${scope}.assessedFilterOptionGroup`,
    defaultMessage: 'Assessment',
  },
});
