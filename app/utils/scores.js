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
