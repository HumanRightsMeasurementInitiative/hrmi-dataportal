/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, InfiniteScroll } from 'grommet';

import {
  getRegionSearch,
  getIncomeSearch,
  getBenchmarkSearch,
  getStandardSearch,
  getScaleSearch,
  getESRIndicators,
} from 'containers/App/selectors';
import { navigate, selectCountry } from 'containers/App/actions';

import { STANDARDS, BENCHMARKS } from 'containers/App/constants';

import CountryPreview from 'components/CountryPreview';
import CountryFilters from 'components/CountryFilters';

import rootMessages from 'messages';

const isDefaultStandard = (country, standardDetails) =>
  (country.high_income_country === '0' && standardDetails.key === 'core') ||
  (country.high_income_country === '1' && standardDetails.key === 'hi');

const getScoresForCountry = (countryCode, scores) => ({
  esr: scores.esr && scores.esr[countryCode],
  cpr: scores.cpr && scores.cpr[countryCode],
  indicators: scores.indicators && scores.indicators[countryCode],
});

const dimensionCount = countryScores =>
  (countryScores.esr && countryScores.esr.esr ? 1 : 0) +
  (countryScores.cpr && countryScores.cpr.empowerment ? 1 : 0) +
  (countryScores.cpr && countryScores.cpr.physint ? 1 : 0);

const rightsCount = countryScores =>
  (countryScores.esr ? Object.keys(countryScores.esr).length : 0) +
  (countryScores.cpr ? Object.keys(countryScores.cpr).length : 0);

const indicatorsCount = countryScores =>
  countryScores.indicators ? Object.keys(countryScores.indicators).length : 0;

const sortByName = (a, b, intl) =>
  intl.formatMessage(rootMessages.countries[a.country_code]) >
  intl.formatMessage(rootMessages.countries[b.country_code])
    ? 1
    : -1;

const sortByAssessment = (a, b, scoresAllCountries) => {
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
  if (dimensionsA > dimensionsB) return -1;
  if (dimensionsA < dimensionsB) return 1;

  const rightsA = rightsCount(countryScoresA);
  const rightsB = rightsCount(countryScoresB);
  if (rightsA > rightsB) return -1;
  if (rightsA < rightsB) return 1;

  const indicatorsA = indicatorsCount(countryScoresA);
  const indicatorsB = indicatorsCount(countryScoresB);
  if (indicatorsA > indicatorsB) return -1;
  if (indicatorsA < indicatorsB) return 1;

  return 1;
};

export function OverviewCountries({
  countries,
  scoresAllCountries,
  regionFilterValue,
  incomeFilterValue,
  onRemoveFilter,
  onAddFilter,
  onSelectCountry,
  intl,
  scale,
  standard,
  benchmark,
  indicators,
}) {
  if (!scoresAllCountries) return null;
  const sortedCountries =
    countries &&
    countries
      .sort((a, b) => sortByName(a, b, intl))
      .sort((a, b) => sortByAssessment(a, b, scoresAllCountries));

  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const otherStandardDetails = STANDARDS.find(s => s.key !== standard);

  return (
    <Box pad={{ horizontal: 'medium' }}>
      <CountryFilters
        regionFilterValue={regionFilterValue}
        onRemoveFilter={onRemoveFilter}
        onAddFilter={onAddFilter}
        incomeFilterValue={incomeFilterValue}
      />
      {sortedCountries && scoresAllCountries && (
        <Box direction="row" wrap width="100%">
          <InfiniteScroll items={sortedCountries} step={30} show={0}>
            {c => (
              <CountryPreview
                key={c.country_code}
                country={c}
                scale={scale}
                scores={getScoresForCountry(c.country_code, scoresAllCountries)}
                standard={standardDetails}
                otherStandard={otherStandardDetails}
                defaultStandard={isDefaultStandard(c, standardDetails)}
                benchmark={benchmarkDetails}
                onSelectCountry={() => onSelectCountry(c.country_code)}
                indicators={indicators}
              />
            )}
          </InfiniteScroll>
        </Box>
      )}
    </Box>
  );
}

OverviewCountries.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSelectCountry: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  indicators: state => getESRIndicators(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveFilter: key =>
      dispatch(
        navigate({ pathname: '' }, { replace: false, deleteParams: [key] }),
      ),
    onSelectCountry: country => dispatch(selectCountry(country)),
    onAddFilter: (key, value) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
          },
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(OverviewCountries));
