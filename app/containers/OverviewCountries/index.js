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
  getAssessedSearch,
} from 'containers/App/selectors';
import { navigate, selectCountry } from 'containers/App/actions';

import { STANDARDS, BENCHMARKS } from 'containers/App/constants';

import CountryPreview from 'components/CountryPreview';
import CountryFilters from 'components/CountryFilters';

import {
  sortByName,
  sortByAssessment,
  getScoresForCountry,
} from 'utils/scores';

export const isDefaultStandard = (country, standardDetails) =>
  (country.high_income_country === '0' && standardDetails.key === 'core') ||
  (country.high_income_country === '1' && standardDetails.key === 'hi');

export function OverviewCountries({
  countries,
  scoresAllCountries,
  regionFilterValue,
  incomeFilterValue,
  assessedFilterValue,
  onRemoveFilter,
  onAddFilter,
  onSelectCountry,
  intl,
  scale,
  standard,
  benchmark,
  indicators,
}) {
  if (!scoresAllCountries || !countries) return null;
  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const otherStandardDetails = STANDARDS.find(s => s.key !== standard);

  // prettier-ignore
  const sortedCountries = countries
    .sort((a, b) => sortByName(a, b, intl))
    .sort((a, b) => sortByAssessment(a, b, scoresAllCountries));

  return (
    <Box pad={{ horizontal: 'medium' }}>
      <CountryFilters
        regionFilterValue={regionFilterValue}
        onRemoveFilter={onRemoveFilter}
        onAddFilter={onAddFilter}
        incomeFilterValue={incomeFilterValue}
        assessedFilterValue={assessedFilterValue}
        filterGroups={['income', 'region', 'assessed']}
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
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  assessedFilterValue: state => getAssessedSearch(state),
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
