import messages from 'messages';
import { RIGHTS, COUNTRY_SORTS } from 'containers/App/constants';
import quasiEquals from 'utils/quasi-equals';
import isNumber from 'utils/is-number';

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
// true if we have a cpr dimension score
export const hasAllCPRScores = countryScores =>
  countryScores.cpr &&
  countryScores.cpr.empowerment &&
  countryScores.cpr.physint;

// true if we have an esr dimension score for current standard
export const hasAllESRScores = (countryScores, standard) =>
  countryScores.esr &&
  countryScores.esr.esr &&
  countryScores.esr.esr.find(s => s.standard === standard.code);

export const hasAllScores = (countryScores, standard) =>
  hasAllCPRScores(countryScores) && hasAllESRScores(countryScores, standard);

// true if we have any rights score for any standard
export const hasSomeScores = countryScores =>
  (countryScores.cpr && Object.keys(countryScores.cpr).length > 0) ||
  (countryScores.esr && Object.keys(countryScores.esr).length > 0);

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

const sortByName = (a, b, order, intl) => {
  const factor = order === 'asc' ? 1 : -1;
  const nameA = messages.countries[a.country_code]
    ? intl.formatMessage(messages.countries[a.country_code])
    : a.country_code;
  const nameB = messages.countries[b.country_code]
    ? intl.formatMessage(messages.countries[b.country_code])
    : a.country_code;
  return nameA > nameB ? factor * 1 : factor * -1;
};
const sortByNumber = (a, b, order) => {
  const factor = order === 'asc' ? 1 : -1;
  if (!isNumber(a) && !isNumber(b)) {
    return 0;
  }
  if (isNumber(a) && !isNumber(b)) {
    return -1;
  }
  if (!isNumber(a) && isNumber(b)) {
    return 1;
  }
  // prettier-ignore
  return parseFloat(a, 10) > parseFloat(b, 10)
    ? factor * 1
    : factor * -1;
};

const sortByAssessment = (a, b, scoresAllCountries, order) => {
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

const mapAttribute = (s, auxIndicators, column) => {
  const aux = auxIndicators.find(i =>
    quasiEquals(s.country_code, i.country_code),
  );
  if (aux && aux[column]) {
    return {
      [column]: aux[column],
      ...s,
    };
  }
  return {
    [column]: null,
    ...s,
  };
};

export const sortCountries = ({
  countries,
  sort,
  order,
  intl,
  scores,
  auxIndicators,
}) => {
  const sortOption = COUNTRY_SORTS[sort];
  if (sort === 'name') {
    return countries.sort((a, b) => sortByName(a, b, order, intl));
  }
  if (scores && sort === 'assessment') {
    return countries
      .sort((a, b) => sortByName(a, b, 'asc', intl))
      .sort((a, b) => sortByAssessment(a, b, scores, order));
  }
  if (sortOption.data === 'aux' && auxIndicators) {
    return countries
      .map(c => mapAttribute(c, auxIndicators, sortOption.column))
      .sort((a, b) => sortByName(a, b, 'asc', intl))
      .sort((a, b) =>
        sortByNumber(a[sortOption.column], b[sortOption.column], order),
      );
  }
  return countries;
};

export const sortScores = ({
  sort,
  order,
  intl,
  scores,
  column,
  auxIndicators,
}) => {
  const sortOption = COUNTRY_SORTS[sort];
  // const factor = order === 'asc' ? -1 : 1;
  if (sort === 'name') {
    return scores && scores.sort((a, b) => sortByName(a, b, order, intl));
  }
  if (sortOption.data === 'aux' && auxIndicators) {
    return scores
      .map(s => mapAttribute(s, auxIndicators, sortOption.column))
      .sort((a, b) => sortByName(a, b, order, intl))
      .sort((a, b) =>
        sortByNumber(a[sortOption.column], b[sortOption.column], order),
      );
  }
  // sort by score
  return (
    scores &&
    scores
      .sort((a, b) => sortByName(a, b, order, intl))
      .sort((a, b) => sortByNumber(a[column], b[column], order))
  );
};
