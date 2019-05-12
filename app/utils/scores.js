import { DIMENSIONS, RIGHTS } from 'containers/App/constants';

export const getDimensionScore = (dimensions, key) => {
  const details = DIMENSIONS.find(d => d.key === key);
  return details && dimensions.find(s => s.metric_code === details.code);
};

export const getRightsScoresForDimension = (rights, dimensionKey, column) =>
  rights &&
  RIGHTS.filter(
    r => r.dimension === dimensionKey && typeof r.aggregate === 'undefined',
  ).map(r => {
    const score = rights.find(s => s.metric_code === r.code);
    return {
      key: r.key,
      value: score ? score[column] : false,
    };
  });
