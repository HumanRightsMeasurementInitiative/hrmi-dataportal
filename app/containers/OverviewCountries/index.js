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
import { withTheme } from 'styled-components';

import {
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  getFeaturedSearch,
  getBenchmarkSearch,
  getStandardSearch,
  getScaleSearch,
  getESRIndicators,
  getAssessedSearch,
  getSortSearch,
  getSortOrderSearch,
} from 'containers/App/selectors';
import { navigate, selectCountry } from 'containers/App/actions';

import {
  STANDARDS,
  BENCHMARKS,
  COUNTRY_SORTS,
  COUNTRY_FILTERS,
  COLUMNS,
} from 'containers/App/constants';

import LoadingIndicator from 'components/LoadingIndicator';
import Source from 'components/Source';
import ChartCountryDiamond from 'components/ChartCountryDiamond';
import ChartHeader from 'components/ChartHeader';

import MainColumn from 'styled/MainColumn';
import Hint from 'styled/Hint';

import { isMaxSize } from 'utils/responsive';
import { sortCountries, getScoresForCountry } from 'utils/scores';
import { getFilterOptionValues, areAnyFiltersSet } from 'utils/filters';

import rootMessages from 'messages';

export const isDefaultStandard = (country, standardDetails) =>
  (country[COLUMNS.COUNTRIES.HIGH_INCOME] === '0' &&
    standardDetails.key === 'core') ||
  (country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' &&
    standardDetails.key === 'hi');

const SORT_OPTIONS = ['assessment', 'name', 'population', 'gdp'];

export function OverviewCountries({
  countries,
  scoresAllCountries,
  regionFilterValue,
  subregionFilterValue,
  incomeFilterValue,
  assessedFilterValue,
  countryGroupFilterValue,
  treatyFilterValue,
  featuredFilterValue,
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
  dataReady,
  hasAside,
  auxIndicators,
  featuredValues,
  featuredCountries,
  theme,
}) {
  if (!scoresAllCountries || !countries) return null;
  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const otherStandardDetails = STANDARDS.find(s => s.key !== standard);

  const currentSort = sort || 'assessment';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;

  const filterValues = getFilterOptionValues(
    countries,
    COUNTRY_FILTERS,
    // check if any filters are already set -
    // if not we can just return all specified options
    areAnyFiltersSet(COUNTRY_FILTERS, {
      regionFilterValue,
      subregionFilterValue,
      incomeFilterValue,
      assessedFilterValue,
      countryGroupFilterValue,
      treatyFilterValue,
      featuredFilterValue,
    }),
    standardDetails,
    scoresAllCountries,
    featuredValues,
    featuredCountries,
  );
  // sortable and non-sortable countries
  const { sorted, other } = sortCountries({
    intl,
    countries,
    sort: currentSort,
    order: currentSortOrder,
    scores: scoresAllCountries,
    auxIndicators,
  });
  const hasResults =
    dataReady && ((sorted && sorted.length > 0) || (other && other.length > 0));
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <MainColumn hasAside={hasAside}>
          <ChartHeader
            chartId="countries-overview"
            messageValues={{ no: countries.length }}
            tools={{
              howToReadConfig: {
                key: 'tab-countries',
                contxt: 'PathCountryOverview',
                chart: 'Diamonds',
                type: scale,
              },
              settingsConfig: {
                key: 'tab-countries',
                showStandard: true,
                showBenchmark: true,
                showScale: true,
              },
            }}
            filter={{
              regionFilterValue,
              subregionFilterValue,
              onRemoveFilter,
              onAddFilter,
              incomeFilterValue,
              countryGroupFilterValue,
              treatyFilterValue,
              featuredFilterValue,
              filterValues,
              assessedFilterValue,
            }}
            sort={{
              sort: currentSort,
              options: SORT_OPTIONS,
              order: currentSortOrder,
              onSortSelect,
              onOrderToggle: onOrderChange,
            }}
          />
          {sorted && scoresAllCountries && (
            <Box
              width="100%"
              pad={{ top: size === 'small' ? 'xsmall' : '0' }}
              align="start"
              responsive={false}
              margin={{ horizontal: `-${theme.global.edgeSize.small}` }}
            >
              {!dataReady && <LoadingIndicator />}
              {!hasResults && dataReady && (
                <Hint italic>
                  <FormattedMessage {...rootMessages.hints.noResults} />
                </Hint>
              )}
              {dataReady && sorted && sorted.length > 0 && (
                <Box
                  direction="row"
                  wrap
                  overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                  pad={isMaxSize(size, 'medium') ? '40px 0 0' : '20px 0 0'}
                  align="start"
                >
                  <InfiniteScroll items={sorted} step={36} show={0}>
                    {(c, index) => (
                      <ChartCountryDiamond
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
                        onCountryHover={code => code || true}
                      />
                    )}
                  </InfiniteScroll>
                </Box>
              )}
              {dataReady && other && other.length > 0 && (
                <Box
                  direction="column"
                  margin={{ top: 'medium' }}
                  border="top"
                  width="100%"
                >
                  <Box direction="row" margin={{ vertical: 'small' }}>
                    <Hint italic>
                      <FormattedMessage {...rootMessages.hints.noSortData} />
                    </Hint>
                  </Box>
                  <Box
                    direction="row"
                    wrap
                    overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                    pad={isMaxSize(size, 'medium') ? '40px 0 0' : '20px 0 0'}
                    margin="0"
                  >
                    <InfiniteScroll items={other} step={36} show={0}>
                      {(c, index) => (
                        <ChartCountryDiamond
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
                          defaultStandard={isDefaultStandard(
                            c,
                            standardDetails,
                          )}
                          benchmark={benchmarkDetails}
                          onSelectCountry={() =>
                            onSelectCountry(c.country_code)
                          }
                          indicators={indicators}
                          onCountryHover={code => console.log(code)}
                        />
                      )}
                    </InfiniteScroll>
                  </Box>
                </Box>
              )}
            </Box>
          )}
          {sorted && scoresAllCountries && hasResults && (
            <Box
              width="100%"
              pad={{ bottom: 'medium', top: '0' }}
              align="center"
              responsive={false}
            >
              {<Source />}
            </Box>
          )}
        </MainColumn>
      )}
    </ResponsiveContext.Consumer>
  );
}

OverviewCountries.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  countries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scoresAllCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dataReady: PropTypes.bool,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  assessedFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countryGroupFilterValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  treatyFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSelectCountry: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  intl: intlShape.isRequired,
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  hasAside: PropTypes.bool,
  featuredValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  subregionFilterValue: state => getSubregionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  assessedFilterValue: state => getAssessedSearch(state),
  countryGroupFilterValue: state => getCountryGroupSearch(state),
  treatyFilterValue: state => getTreatySearch(state),
  featuredFilterValue: state => getFeaturedSearch(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  indicators: state => getESRIndicators(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveFilter: (key, value) =>
      dispatch(
        navigate(
          {},
          {
            replace: false,
            deleteParams: [
              {
                key,
                value,
              },
            ],
            trackEvent: {
              category: 'Data',
              action: 'Remove country filter (Overview)',
              value: `${key}/${value}`,
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
            multiple: true,
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

export default compose(withConnect)(injectIntl(withTheme(OverviewCountries)));
