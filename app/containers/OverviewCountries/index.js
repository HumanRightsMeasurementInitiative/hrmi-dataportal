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
  getSortSearch,
  getSortOrderSearch,
} from 'containers/App/selectors';
import { navigate, selectCountry } from 'containers/App/actions';

import { STANDARDS, BENCHMARKS, COUNTRY_SORTS } from 'containers/App/constants';

import CountryPreview from 'components/CountryPreview';
import CountrySort from 'components/CountrySort';
import CountryFilters from 'components/CountryFilters';

import { sortCountries, getScoresForCountry } from 'utils/scores';

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
  sort,
  sortOrder,
  onSortSelect,
  onOrderChange,
}) {
  if (!scoresAllCountries || !countries) return null;
  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const otherStandardDetails = STANDARDS.find(s => s.key !== standard);

  const currentSort = sort || 'assessment';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;

  const sortedCountries = sortCountries({
    intl,
    countries,
    sort: currentSort,
    order: currentSortOrder,
    scores: scoresAllCountries,
  });
  return (
    <Box pad={{ horizontal: 'medium' }}>
      <Box direction="row">
        <CountryFilters
          regionFilterValue={regionFilterValue}
          onRemoveFilter={onRemoveFilter}
          onAddFilter={onAddFilter}
          incomeFilterValue={incomeFilterValue}
          assessedFilterValue={assessedFilterValue}
          filterGroups={['income', 'region', 'assessed']}
        />
        <CountrySort
          sort={currentSort}
          options={['name', 'assessment']}
          order={currentSortOrder}
          onSortSelect={onSortSelect}
          onOrderToggle={onOrderChange}
        />
      </Box>
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
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  assessedFilterValue: state => getAssessedSearch(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  indicators: state => getESRIndicators(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
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
    onSortSelect: value =>
      dispatch(
        navigate(
          { search: `?sort=${value}` },
          {
            replace: false,
          },
        ),
      ),
    onOrderChange: value =>
      dispatch(
        navigate(
          { search: `?dir=${value}` },
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
