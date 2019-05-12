import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';

export const getDimensionScore = (dimensions, key) => {
  const details = DIMENSIONS.find(d => d.key === key);
  return (
    details &&
    dimensions.length > 0 &&
    dimensions.find(s => s.metric_code === details.code)
  );
};

const getScore = (rights, right, column) => {
  const score = rights.find(s => s.metric_code === right.code);
  if (column) {
    return {
      key: right.key,
      value: score ? score[column] : false,
    };
  }
  return {
    key: right.key,
    value: score || false,
  };
};

export const getSubrightsScoresForRight = (rights, rightKey, column) =>
  rights &&
  RIGHTS.filter(r => r.aggregate === rightKey).map(r =>
    getScore(rights, r, column),
  );

export const getRightsScoresForDimension = (rights, dimensionKey, column) =>
  rights &&
  RIGHTS.filter(
    r => r.dimension === dimensionKey && typeof r.aggregate === 'undefined',
  ).map(r => getScore(rights, r, column));

export const getIndicatorScoresForRight = (
  scores,
  rightKey,
  column,
  indicatorDetails,
) => {
  if (scores && indicatorDetails) {
    const indicatorsForRight = INDICATORS.filter(
      i =>
        i.right === rightKey &&
        indicatorDetails.find(id => id.metric_code === i.code),
    );
    return indicatorsForRight.map(i => {
      const score = scores.find(s => s.metric_code === i.code);
      if (column) {
        return {
          key: i.key,
          value: score ? score[column] : false,
        };
      }
      return {
        key: i.key,
        value: score || false,
        detail: indicatorDetails.find(id => id.metric_code === i.code),
      };
    });
  }
  return [];
};
