import { isMaxSize } from 'utils/responsive';
import { formatScore } from 'utils/scores';
import { CRITICAL_VALUE, TYPES } from 'containers/App/constants';

import rootMessages from 'messages';

export const getXTime = year => new Date(`${year}`).getTime();

const MAX_STEPS = {
  default: 11,
  ms: 2,
  multi: 2,
  'multi-country': 2,
  'multi-region': 2,
  highlight: 2,
};
export const getTickValuesX = (size, mode, minYear, maxYear) => {
  let max = MAX_STEPS.default;
  if (MAX_STEPS[mode]) {
    max = MAX_STEPS[mode];
  }
  if (isMaxSize(size, 'ms')) {
    max = MAX_STEPS.ms;
  }
  if (max === 2) {
    return [getXTime(minYear), getXTime(maxYear)];
  }
  const range = maxYear - minYear;
  const values = [];
  const inc = Math.floor(range / max) + 1;
  const initial = range % inc;
  for (let x = minYear + initial; x <= maxYear; x += inc) {
    values.push(getXTime(x));
  }
  return values;
};

export const getTickValuesY = (type, mode) => {
  // const max = TYPES[type] ? TYPES[type].max : 100;
  const max = 10;
  const steps = mode === 'detail-region' ? 4 : 2;
  const values = [0];
  const inc = max / steps;
  /* eslint-disable no-plusplus */
  for (let y = 0; y < steps; y++) {
    values.push(values[y] + inc);
  }
  /* eslint-enable no-plusplus */
  return values;
};

// prettier-ignore
export const getRegionYearData = (year, regionColumnScores) =>
  regionColumnScores[year]
    ? [({
      syear: year,
      x: getXTime(year),
      y: parseFloat(regionColumnScores[year].average),
      count: parseFloat(regionColumnScores[year].count),
    })]
    : [];
// prettier-ignore
export const getRegionYearDataHigh = (
  year,
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) => {
  if (regionColumnScoresSD[year] && regionColumnScoresMean[year]) {
    const sd = parseFloat(regionColumnScoresSD[year].average)
    const mean = parseFloat(regionColumnScoresMean[year].average)
    const value = mean + sd * CRITICAL_VALUE[interval];
    return [({
      syear: year,
      x: getXTime(year),
      y: value,
      count: parseFloat(regionColumnScoresSD[year].count),
    })];
  }
  return [];
}
// prettier-ignore
export const getRegionYearDataLow = (
  year,
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) => {
  if (regionColumnScoresSD[year] && regionColumnScoresMean[year]) {
    const sd = parseFloat(regionColumnScoresSD[year].average)
    const mean = parseFloat(regionColumnScoresMean[year].average)
    const value = mean - sd * CRITICAL_VALUE[interval];
    return [({
      syear: year,
      x: getXTime(year),
      y: value,
      count: parseFloat(regionColumnScoresSD[year].count),
    })];
  }
  return [];
}

export const getRegionData = regionColumnScores =>
  Object.keys(regionColumnScores).reduce(
    (memo, year) => [...memo, ...getRegionYearData(year, regionColumnScores)],
    [],
  );
export const getRegionDataHigh = (
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) =>
  Object.keys(regionColumnScoresSD).reduce(
    (memo, year) => [
      ...memo,
      ...getRegionYearDataHigh(
        year,
        regionColumnScoresSD,
        regionColumnScoresMean,
        interval,
      ),
    ],
    [],
  );
export const getRegionDataLow = (
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) =>
  Object.keys(regionColumnScoresSD).reduce(
    (memo, year) => [
      ...memo,
      ...getRegionYearDataLow(
        year,
        regionColumnScoresSD,
        regionColumnScoresMean,
        interval,
      ),
    ],
    [],
  );

// prettier-ignore
export const getCountryYearData = (year, countryColumnScores, closest) => {
  if (!countryColumnScores[year] && !closest) {
    return [];
  }
  if (!countryColumnScores[year] && closest) {
    const years = Object.keys(countryColumnScores).map(y => parseInt(y, 10));
    const yearClosest = years.reduce((m, testYear) => {
      if (!m || (Math.abs(testYear - year) < Math.abs(m - year))) {
        return testYear;
      }
      return m;
    }, null);
    return yearClosest
      ? [({
        syear: yearClosest,
        x: getXTime(yearClosest),
        y: parseFloat(countryColumnScores[yearClosest].score),
      })]
      : [];
  }
  return [({
    syear: year,
    x: getXTime(year),
    y: parseFloat(countryColumnScores[year].score),
  })];
}
// const getCountryData = (country, scores, metricType, benchmarkKey, intl) => {
export const getCountryData = countryColumnScores =>
  Object.keys(countryColumnScores).reduce(
    (memo, year) => [...memo, ...getCountryYearData(year, countryColumnScores)],
    [],
  );

export const sortRegions = (regionA, regionB, priorityRegion) => {
  if (regionA === priorityRegion) return 1;
  if (regionB === priorityRegion) return -1;
  return 1;
};

export const getRegionYearScore = (year, scores, type, intl) => {
  const data = getRegionYearData(year, scores);
  if (data.length > 0) {
    return formatScore(data[0].y, type, intl);
  }
  return intl.formatMessage(rootMessages.labels.abbrev.notAvailable);
};
export const getRegionYearCount = (year, scores) => {
  const data = getRegionYearData(year, scores);
  return data.length > 0 ? data[0].count : 0;
};
