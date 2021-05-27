/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartMetricTrend';

export default defineMessages({
  noteRatioLink: {
    id: `${scope}.noteRatioLink`,
    defaultMessage: '{count} of {total} countries',
  },
  noteRatioLinkAll: {
    id: `${scope}.noteRatioLinkAll`,
    defaultMessage: '{total} countries',
  },
  noteAssessmentRatio: {
    id: `${scope}.noteAssessmentRatio`,
    defaultMessage: 'Based on {link} only and may thus not be representative. ',
  },
  noteAssessmentRatioSmall: {
    id: `${scope}.noteAssessmentRatioSmall`,
    defaultMessage: 'Based on {link}, may thus not be representative',
  },
  noteAssessmentRatioAll: {
    id: `${scope}.noteAssessmentRatioAll`,
    defaultMessage: 'Based on all {link} in the selected UN group',
  },
  noteAssessmentNoneWorld: {
    id: `${scope}.noteAssessmentNoneWorld`,
    defaultMessage: 'No countries were assessed in {year}',
  },
  noteAssessmentNoneRegion: {
    id: `${scope}.noteAssessmentNoneRegion`,
    defaultMessage:
      'No countries were assessed in {year} for the selected UN group',
  },
  noteAssessmentNoneRegionESR: {
    id: `${scope}.noteAssessmentNoneRegionESR`,
    defaultMessage:
      'No countries assessed for selected UN group and assessment standard',
  },
  noteAssessmentMultiple: {
    id: `${scope}.noteAssessmentMultiple`,
    defaultMessage:
      'UN group averages may not be representative due to missing country data',
  },
  noteCredibleIntervalRegions: {
    id: `${scope}.noteCredibleIntervalRegions`,
    defaultMessage: 'Average score with 80% credible interval ({link}) ',
  },
  noteCredibleIntervalRegionsVDEM: {
    id: `${scope}.noteCredibleIntervalRegionsVDEM`,
    defaultMessage: 'Average score with 68% credible interval ({link}) ',
  },
  noteCredibleIntervalLinkRegions: {
    id: `${scope}.noteCredibleIntervalLinkRegions`,
    defaultMessage: 'click for details',
  },
  noteCredibleIntervalSmall: {
    id: `${scope}.noteCredibleIntervalSmall`,
    defaultMessage: '80% credible interval ({link}) ',
  },
  noteCredibleIntervalSmallVDEM: {
    id: `${scope}.noteCredibleIntervalSmallVDEM`,
    defaultMessage: '68% credible interval ({link}) ',
  },
  noteCredibleIntervalLinkCountry: {
    id: `${scope}.noteCredibleIntervalLinkCountry`,
    defaultMessage: 'details',
  },
  noteUNRegionAverage: {
    id: `${scope}.noteUNRegionAverage`,
    defaultMessage: '{group} average',
  },
  noteUNRegionAverageNA: {
    id: `${scope}.noteUNRegionAverageNA`,
    defaultMessage: ' (not available)',
  },
  infoIntro: {
    id: `${scope}.infoIntro`,
    defaultMessage: 'Average of all available country scores.',
  },
  infoIntroAll: {
    id: `${scope}.infoIntroAll`,
    defaultMessage:
      'Average of all available country scores for each UN regional group and the world.',
  },
  infoIntroWorld: {
    id: `${scope}.infoIntroWorld`,
    defaultMessage: 'All available country scores and world average.',
  },
  infoESRadditional: {
    id: `${scope}.infoESRadditional`,
    defaultMessage:
      "Using HRMI's 'Global Best' benchmark where the maximum possible score (100%) is based on the best outcome achieved by any country regardless of available income",
  },
  infoCPRadditional: {
    id: `${scope}.infoCPRadditional`,
    defaultMessage:
      'Individual country scores are the median values of all expert responses for that country. The 80% credible intervals are based on the expert survey standard deviations.',
  },
  infoVDEMadditional: {
    id: `${scope}.infoVDEMadditional`,
    defaultMessage:
      'Individual country scores are the median values of all expert responses for that country. The 80% credible intervals are based on the expert survey standard deviations.',
  },
  noDataForRegion: {
    id: `${scope}.noDataForRegion`,
    defaultMessage: 'No data available for selected group',
  },
  noDataForRegionShort: {
    id: `${scope}.noDataForRegionShort`,
    defaultMessage: 'No data for selected group',
  },
  noDataForCountry: {
    id: `${scope}.noDataForCountry`,
    defaultMessage: 'No data for country',
  },
});
