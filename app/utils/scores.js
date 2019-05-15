import messages from 'messages';

export const getRightsScoresForDimension = (
  rights,
  dimensionKey,
  keepSubrights = false,
) =>
  rights &&
  Object.values(rights).filter(
    r =>
      r.dimension === dimensionKey &&
      (keepSubrights || typeof r.aggregate === 'undefined'),
  );

export const hasCPR = data =>
  data && data.empowerment && !!data.empowerment.score;

const isDataIncomplete = data => data.hasScoreRights || data.hasScoreIndicators;

const hasDataAlternate = data =>
  data.hasScoreAlternate ||
  data.hasScoreAlternateRights ||
  data.hasScoreIndicatorsAlternate;

export const getNoDataMessage = (intl, data) => {
  if (isDataIncomplete(data)) {
    return intl.formatMessage(messages.charts.incompleteData);
  }
  if (hasDataAlternate(data)) {
    return intl.formatMessage(messages.charts.noDataForStandard);
  }
  return intl.formatMessage(messages.charts.noData);
};

export const getIncompleteDataActionMessage = (intl, data) => {
  if (data.hasScoreRights) {
    return ` (${intl.formatMessage(
      messages.charts.incompleteData.drillDownRights,
    )})`;
  }
  if (data.hasScoreIndicators) {
    return ` (${intl.formatMessage(
      messages.charts.incompleteData.drillDownIndicators,
    )})`;
  }
  if (data.hasScoreAlternate) {
    return ` (${intl.formatMessage(
      messages.charts.incompleteData.changeStandard,
    )})`;
  }
  if (data.hasScoreAlternateRights) {
    return ` (${intl.formatMessage(
      messages.charts.incompleteData.changeStandard,
    )} & ${intl.formatMessage(
      messages.charts.incompleteData.drillDownRights,
    )})`;
  }
  if (data.hasScoreIndicatorsAlternate) {
    return ` (${intl.formatMessage(
      messages.charts.incompleteData.changeStandard,
    )} & ${intl.formatMessage(
      messages.charts.incompleteData.drillDownIndicators,
    )})`;
  }
  return '';
};
