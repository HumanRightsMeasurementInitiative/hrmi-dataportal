/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, InfiniteScroll, ResponsiveContext } from 'grommet';

import {
  getRegionSearch,
  getIncomeSearch,
  getBenchmarkSearch,
  getStandardSearch,
  getScaleSearch,
  getESRIndicators,
  getAssessedSearch,
  getOECDSearch,
  getSortSearch,
  getSortOrderSearch,
} from 'containers/App/selectors';
import { navigate, selectCountry } from 'containers/App/actions';

import { STANDARDS, BENCHMARKS, COUNTRY_SORTS } from 'containers/App/constants';

import LoadingIndicator from 'components/LoadingIndicator';
import Source from 'components/Source';
import CountryPreview from 'components/CountryPreview';
import CountrySort from 'components/CountrySort';
import CountryFilters from 'components/CountryFilters';
import MainColumn from 'styled/MainColumn';
import Hint from 'styled/Hint';
import { isMinSize, isMaxSize } from 'utils/responsive';
import { sortCountries, getScoresForCountry } from 'utils/scores';

import rootMessages from 'messages';

export const isDefaultStandard = (country, standardDetails) =>
  (country.high_income_country === '0' && standardDetails.key === 'core') ||
  (country.high_income_country === '1' && standardDetails.key === 'hi');

const SORT_OPTIONS = ['assessment', 'name', 'population', 'gdp'];

export function OverviewCountries({
  countries,
  scoresAllCountries,
  regionFilterValue,
  incomeFilterValue,
  assessedFilterValue,
  oecdFilterValue,
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
  onCountryHover,
  dataReady,
  hasAside,
  auxIndicators,
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
    auxIndicators,
  });
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <MainColumn hasAside={hasAside}>
          <Box
            direction="row"
            justify="between"
            align="start"
            margin={{ vertical: isMinSize(size, 'medium') ? '0' : 'small' }}
          >
            <CountryFilters
              regionFilterValue={regionFilterValue}
              onRemoveFilter={onRemoveFilter}
              onAddFilter={onAddFilter}
              incomeFilterValue={incomeFilterValue}
              assessedFilterValue={assessedFilterValue}
              oecdFilterValue={oecdFilterValue}
              filterGroups={['income', 'region', 'assessed', 'oecd']}
            />
            <CountrySort
              sort={currentSort}
              options={SORT_OPTIONS}
              order={currentSortOrder}
              onSortSelect={onSortSelect}
              onOrderToggle={onOrderChange}
            />
          </Box>
          {sortedCountries && scoresAllCountries && (
            <Box
              width="100%"
              pad={{ bottom: 'medium', top: size === 'small' ? 'xsmall' : '0' }}
              align="center"
              responsive={false}
            >
              {!dataReady && <LoadingIndicator />}
              {dataReady && sortedCountries && sortedCountries.length === 0 && (
                <Hint italic>
                  <FormattedMessage {...rootMessages.hints.noResults} />
                </Hint>
              )}
              {dataReady && sortedCountries && sortedCountries.length > 0 && (
                <Box
                  direction="row"
                  wrap
                  overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                  pad={isMaxSize(size, 'medium') ? '40px 0 0' : '20px 0 0'}
                  margin="0"
                >
                  <InfiniteScroll items={sortedCountries} step={36} show={0}>
                    {(c, index) => (
                      <CountryPreview
                        showAnnotation={index === 0}
                        key={c.country_code}
                        country={c}
                        scale={scale}
                        scores={getScoresForCountry(
                          c.country_code,
                          scoresAllCountries,
                        )}
                        standard={standardDetails}
                        otherStandard={otherStandardDetails}
                        defaultStandard={isDefaultStandard(c, standardDetails)}
                        benchmark={benchmarkDetails}
                        onSelectCountry={() => onSelectCountry(c.country_code)}
                        indicators={indicators}
                        onCountryHover={code => onCountryHover(code)}
                      />
                    )}
                  </InfiniteScroll>
                </Box>
              )}
              {dataReady && sortedCountries && sortedCountries.length > 0 && (
                <Source />
              )}
            </Box>
          )}
        </MainColumn>
      )}
    </ResponsiveContext.Consumer>
  );
}

OverviewCountries.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSelectCountry: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  oecdFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  onCountryHover: PropTypes.func,
  dataReady: PropTypes.bool,
  hasAside: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  assessedFilterValue: state => getAssessedSearch(state),
  oecdFilterValue: state => getOECDSearch(state),
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
        navigate(
          { pathname: '' },
          {
            replace: false,
            deleteParams: [key],
            trackEvent: {
              category: 'Data',
              action: 'Remove country filter (Overview)',
              value: key,
            },
          },
        ),
      ),
    onSelectCountry: country => dispatch(selectCountry(country)),
    onAddFilter: (key, value) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Overview)',
              value: `${key}/${value}`,
            },
          },
        ),
      ),
    onSortSelect: value =>
      dispatch(
        navigate(
          { search: `?sort=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Sort countries (Overview)',
              value,
            },
          },
        ),
      ),
    onOrderChange: value =>
      dispatch(
        navigate(
          { search: `?dir=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Country sort order (Overview)',
              value,
            },
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
