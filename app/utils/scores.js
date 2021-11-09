import messages from '../messages';
import { RIGHTS, COUNTRY_SORTS, COLUMNS } from '../containers/App/constants';
import quasiEquals from './quasi-equals';
import isNumber from './is-number';

export const getRightsScoresForDimension = (rights, dimensionKey) =>
  rights &&
  Object.values(rights)
    .filter(
      r => r.dimension === dimensionKey && typeof r.aggregate === 'undefined',
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

export const sortCountriesByName = (a, b, order = 'asc', intl) => {
  const factor = order === 'asc' ? 1 : -1;
  const nameA = messages.countries[a[COLUMNS.COUNTRIES.CODE]]
    ? intl.formatMessage(messages.countries[a[COLUMNS.COUNTRIES.CODE]])
    : a[COLUMNS.COUNTRIES.CODE];
  const nameB = messages.countries[b[COLUMNS.COUNTRIES.CODE]]
    ? intl.formatMessage(messages.countries[b[COLUMNS.COUNTRIES.CODE]])
    : a[COLUMNS.COUNTRIES.CODE];
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
    a[COLUMNS.COUNTRIES.CODE],
    scoresAllCountries,
  );
  const countryScoresB = getScoresForCountry(
    b[COLUMNS.COUNTRIES.CODE],
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

const findLatestValue = (countryAuxIndicators, column) => {
  const sorted = countryAuxIndicators
    .filter(i => i[column] !== '' && i[column] !== null)
    .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
  return sorted.length > 0 && sorted[0][column];
};

const mapAttribute = (s, auxIndicators, column) => {
  const countryAuxIndicators = auxIndicators.filter(i =>
    quasiEquals(s[COLUMNS.COUNTRIES.CODE], i[COLUMNS.COUNTRIES.CODE]),
  );
  const aux = findLatestValue(countryAuxIndicators, column);
  return {
    [column]: aux || null,
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
    return {
      sorted: countries.sort((a, b) => sortCountriesByName(a, b, order, intl)),
    };
  }
  if (scores && sort === 'assessment') {
    return {
      sorted: countries
        .sort((a, b) => sortCountriesByName(a, b, 'asc', intl))
        .sort((a, b) => sortByAssessment(a, b, scores, order)),
    };
  }
  if (sortOption.data === 'aux' && auxIndicators) {
    const mappedCountries = countries.map(c =>
      mapAttribute(c, auxIndicators, sortOption.column),
    );
    return {
      sorted: mappedCountries
        .filter(c => c[sortOption.column] && c[sortOption.column] !== '')
        .sort((a, b) => sortCountriesByName(a, b, 'asc', intl))
        .sort((a, b) =>
          sortByNumber(a[sortOption.column], b[sortOption.column], order),
        ),
      other: mappedCountries
        .filter(c => !c[sortOption.column] || c[sortOption.column] === '')
        .sort((a, b) => sortCountriesByName(a, b, 'asc', intl)),
    };
  }
  return {
    sorted: countries,
    other: countries,
  };
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
  if (!scores) {
    return {
      sorted: false,
    };
  }
  if (sort === 'name') {
    return {
      sorted: scores.sort((a, b) => sortCountriesByName(a, b, order, intl)),
    };
  }
  if (sortOption.data === 'aux' && auxIndicators) {
    const mappedScores = scores.map(c =>
      mapAttribute(c, auxIndicators, sortOption.column),
    );
    return {
      sorted: mappedScores
        .filter(s => s[sortOption.column] && s[sortOption.column] !== '')
        .sort((a, b) => sortCountriesByName(a, b, order, intl))
        .sort((a, b) =>
          sortByNumber(a[sortOption.column], b[sortOption.column], order),
        ),
      other: mappedScores
        .filter(s => !s[sortOption.column] || s[sortOption.column] === '')
        .sort((a, b) => sortCountriesByName(a, b, 'asc', intl)),
    };
  }
  // sort by score
  return {
    sorted: scores
      .sort((a, b) => sortCountriesByName(a, b, order, intl))
      .sort((a, b) => sortByNumber(a[column], b[column], order)),
  };
};
export const roundScore = (value, digits = 1) => {
  const factor = 10 ** Math.min(digits, 3);
  return isNumber(value) && Math.round(value * factor) / factor;
};
export const formatScore = (value, digits = 1, intl) => {
  const d = Math.min(digits, 3);
  if (isNumber(value)) {
    const rounded = roundScore(value, d);
    return intl
      ? intl.formatNumber(rounded, { minimumFractionDigits: d })
      : rounded.toFixed(d);
  }
  return value;
};
export const formatScoreMax = (
  value,
  maxValue = 100,
  digits = 1,
  showMax,
  intl,
) => {
  const formatted = formatScore(value, digits, intl);
  if (formatted && maxValue === 100) {
    return `${formatted}%`;
  }
  if (formatted && !showMax) {
    return formatted;
  }
  return formatted && `${formatted}/${maxValue}`;
};
