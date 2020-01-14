import messages from 'messages';
import { RIGHTS } from 'containers/App/constants';

export const getRightsScoresForDimension = (
  rights,
  dimensionKey,
  keepSubrights = false,
) =>
  rights &&
  Object.values(rights)
    .filter(
      r =>
        r.dimension === dimensionKey &&
        (keepSubrights || typeof r.aggregate === 'undefined'),
    )
    .sort((a, b) =>
      RIGHTS.map(r => r.key).indexOf(a.key) >
      RIGHTS.map(r => r.key).indexOf(b.key)
        ? 1
        : -1,
    );

export const hasCPR = data =>
  data && data.empowerment && !!data.empowerment.score;

const isDataIncomplete = data => data.hasScoreRights || data.hasScoreIndicators;

const hasDataAlternate = data =>
  data.hasScoreAlternate ||
  data.hasScoreRightsAlternate ||
  data.hasScoreIndicatorsAlternate;

export const getNoDataMessage = (data = false) => {
  if (!data) return null;
  if (isDataIncomplete(data)) {
    return 'incompleteData';
  }
  if (hasDataAlternate(data)) {
    return 'noDataForStandard';
  }
  return 'noData';
};

export const getIncompleteDataActionMessage = data => {
  if (!data) return null;
  if (data.hasScoreAlternate) {
    return 'changeStandard';
  }
  if (data.hasScoreRights) {
    return 'drillDownRights';
  }
  if (data.hasScoreAlternateRights) {
    return 'changeStandard';
  }
  if (data.hasScoreIndicators) {
    return 'drillDownIndicators';
  }
  if (data.hasScoreIndicatorsAlternate) {
    return 'changeStandard';
  }
  return '';
};

export const getScoresForCountry = (countryCode, scores) => ({
  esr: scores.esr && scores.esr[countryCode],
  cpr: scores.cpr && scores.cpr[countryCode],
  // indicators: scores.indicators && scores.indicators[countryCode],
});

export const dimensionCount = countryScores =>
  (countryScores.esr && countryScores.esr.esr
    ? countryScores.esr.esr.length
    : 0) +
  (countryScores.cpr && countryScores.cpr.empowerment ? 1 : 0) +
  (countryScores.cpr && countryScores.cpr.physint ? 1 : 0);

export const rightsCount = countryScores =>
  (countryScores.esr ? Object.keys(countryScores.esr).length : 0) +
  (countryScores.cpr ? Object.keys(countryScores.cpr).length : 0);

export const indicatorsCount = countryScores =>
  countryScores.indicators ? Object.keys(countryScores.indicators).length : 0;

export const sortByName = (a, b, order, intl) => {
  const factor = order === 'asc' ? 1 : -1;
  const nameA = messages.countries[a.country_code]
    ? intl.formatMessage(messages.countries[a.country_code])
    : a.country_code;
  const nameB = messages.countries[b.country_code]
    ? intl.formatMessage(messages.countries[b.country_code])
    : a.country_code;
  return nameA > nameB ? factor * 1 : factor * -1;
};

export const sortByAssessment = (a, b, scoresAllCountries, order) => {
  const factor = order === 'asc' ? -1 : 1;
  const countryScoresA = getScoresForCountry(
    a.country_code,
    scoresAllCountries,
  );
  const countryScoresB = getScoresForCountry(
    b.country_code,
    scoresAllCountries,
  );
  const dimensionsA = dimensionCount(countryScoresA);
  const dimensionsB = dimensionCount(countryScoresB);
  if (dimensionsA > dimensionsB) return factor * -1;
  if (dimensionsA < dimensionsB) return factor * 1;

  const rightsA = rightsCount(countryScoresA);
  const rightsB = rightsCount(countryScoresB);
  if (rightsA > rightsB) return factor * -1;
  if (rightsA < rightsB) return factor * 1;

  const indicatorsA = indicatorsCount(countryScoresA);
  const indicatorsB = indicatorsCount(countryScoresB);
  if (indicatorsA > indicatorsB) return factor * -1;
  if (indicatorsA < indicatorsB) return factor * 1;

  return 1;
};

export const sortCountries = ({ countries, sort, order, intl, scores }) => {
  if (sort === 'name') {
    return countries.sort((a, b) => sortByName(a, b, order, intl));
  }
  if (scores && sort === 'assessment') {
    return countries
      .sort((a, b) => sortByName(a, b, 'asc', intl))
      .sort((a, b) => sortByAssessment(a, b, scores, order));
  }
  return countries;
};

export const sortScores = ({ sort, order, intl, scores, column }) => {
  const factor = order === 'asc' ? -1 : 1;
  if (sort === 'name') {
    return scores && scores.sort((a, b) => sortByName(a, b, order, intl));
  }
  // sort by score
  return (
    scores &&
    scores
      .sort((a, b) => sortByName(a, b, order, intl))
      .sort((a, b) =>
        parseFloat(a[column], 10) < parseFloat(b[column], 10)
          ? factor * 1
          : factor * -1,
      )
  );
};

export const filterByAssessment = (
  country,
  scoresAllCountries,
  filter,
  standard,
) => {
  const countryScores = getScoresForCountry(
    country.country_code,
    scoresAllCountries,
  );
  if (filter === 'all') {
    // true if we have all dimension scores for current standard
    return (
      countryScores.cpr &&
      countryScores.cpr.empowerment &&
      countryScores.cpr.physint &&
      countryScores.esr &&
      countryScores.esr.esr &&
      countryScores.esr.esr.find(s => s.standard === standard.code)
    );
  }
  if (filter === 'cpr-all') {
    // true if we have a cpr dimension score
    return (
      countryScores.cpr &&
      countryScores.cpr.empowerment &&
      countryScores.cpr.physint
    );
  }
  if (filter === 'esr-all') {
    // true if we have an esr dimension score for current standard
    return (
      countryScores.esr &&
      countryScores.esr.esr &&
      countryScores.esr.esr.find(s => s.standard === standard.code)
    );
  }
  if (filter === 'some') {
    // true if we have any rights score for any standard
    return (
      (countryScores.cpr && Object.keys(countryScores.cpr).length > 0) ||
      (countryScores.esr && Object.keys(countryScores.esr).length > 0)
    );
  }
  return true;
};
