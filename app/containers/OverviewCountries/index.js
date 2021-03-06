/**
 *
 * Overview
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, InfiniteScroll, ResponsiveContext } from 'grommet';
import styled, { withTheme } from 'styled-components';

import {
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
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
import { CARD_WIDTH } from 'theme';

import Search from 'containers/Search';
import { filterCountries } from 'containers/Search/search';
import searchMessages from 'containers/Search/messages';

import LoadingIndicator from 'components/LoadingIndicator';
import Source from 'components/Source';
import ChartCountryDiamond from 'components/ChartCountryDiamond';
import ChartHeader from 'components/ChartHeader';
import CountryNotes from 'components/CountryNotes';

import MainColumn from 'styled/MainColumn';
import Hint from 'styled/Hint';

import { isMaxSize } from 'utils/responsive';
import { sortCountries, getScoresForCountry } from 'utils/scores';
import { getFilterOptionValues, areAnyFiltersSet } from 'utils/filters';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';

import rootMessages from 'messages';

// prettier-ignore
const CardWrapper = styled(Box)`
  max-width: calc(100% + ${({ theme }) => {
    const value = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
    return value * 2;
  }}px);
`;

export const isDefaultStandard = (country, standardDetails) =>
  (country[COLUMNS.COUNTRIES.HIGH_INCOME] === '0' &&
    standardDetails.key === 'core') ||
  (country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' &&
    standardDetails.key === 'hi');

const SORT_OPTIONS = ['assessment', 'name', 'population', 'gdp'];

const getCardNumber = width => {
  const minCards = Math.floor(width / CARD_WIDTH.min);
  const maxCards = Math.floor(width / CARD_WIDTH.max);
  return minCards > maxCards ? minCards : maxCards;
};
const getCardWidth = (width, number, theme) => {
  const edge = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
  return `${width / number - edge * 2}px`;
};

export function OverviewCountries({
  countries,
  scoresAllCountries,
  regionFilterValue,
  subregionFilterValue,
  incomeFilterValue,
  assessedFilterValue,
  countryGroupFilterValue,
  treatyFilterValue,
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
  theme,
}) {
  const ref = useRef(null);
  const [search, setSearch] = useState('');
  const [gridWidth, setGridWidth] = useState(0);

  const handleResize = () =>
    setGridWidth(ref.current ? ref.current.offsetWidth : 0);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (!scoresAllCountries || !countries) return null;
  const benchmarkDetails = BENCHMARKS.find(s => s.key === benchmark);
  const standardDetails = STANDARDS.find(s => s.key === standard);
  const otherStandardDetails = STANDARDS.find(s => s.key !== standard);

  const currentSort =
    sort && SORT_OPTIONS.indexOf(sort) > -1 ? sort : 'assessment';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;
  const filtersSet = areAnyFiltersSet(COUNTRY_FILTERS.ALL, {
    regionFilterValue,
    subregionFilterValue,
    incomeFilterValue,
    assessedFilterValue,
    countryGroupFilterValue,
    treatyFilterValue,
  });
  const filterValues = getFilterOptionValues(
    countries,
    COUNTRY_FILTERS.ALL,
    // check if any filters are already set -
    // if not we can just return all specified options
    filtersSet,
    standardDetails,
    scoresAllCountries,
  );
  // filter by text search
  const searched =
    search.length > 0 ? filterCountries(countries, search, intl) : countries;
  // check if the text search has had an impact
  const searchEffective =
    countries && searched && searched.length !== countries.length;

  // filter again to figure out number of countries with scores
  // (remember list also shows countries without scores)
  const countriesWithScores =
    searched &&
    searched.filter(
      c =>
        Object.keys(scoresAllCountries.cpr).indexOf(c[COLUMNS.COUNTRIES.CODE]) >
          -1 ||
        Object.keys(scoresAllCountries.esr).indexOf(c[COLUMNS.COUNTRIES.CODE]) >
          -1,
    );
  const countryCount = countriesWithScores ? countriesWithScores.length : 0;
  const countryWithoutCount =
    countriesWithScores && searched
      ? searched.length - countriesWithScores.length
      : 0;

  // sortable and non-sortable countries
  const { sorted, other } = sortCountries({
    intl,
    countries: searched,
    sort: currentSort,
    order: currentSortOrder,
    scores: scoresAllCountries,
    auxIndicators,
  });
  const hasResults =
    dataReady && ((sorted && sorted.length > 0) || (other && other.length > 0));
  const cardNumber = gridWidth ? getCardNumber(gridWidth) : 1;
  const cardWidth = gridWidth
    ? getCardWidth(gridWidth, cardNumber, theme)
    : `${CARD_WIDTH.min}px`;

  const hasHICountries = searched.some(c => isCountryHighIncome(c));
  const hasGovRespondentsCountries = searched.some(c =>
    hasCountryGovRespondents(c),
  );

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <MainColumn hasAside={hasAside}>
          <ChartHeader
            top
            chartId="countries-overview"
            hasSubHeading={countryWithoutCount > 0}
            messageValues={{
              no: countryCount,
              noWithout: countryWithoutCount,
              filtered: filtersSet || searchEffective,
            }}
            hasWhiteBG={false}
            tools={{
              howToReadConfig: {
                key: 'tab-countries',
                contxt: 'PathCountryOverview',
                chart: 'Diamonds',
                scale,
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
          <Search
            bordersize="small"
            bordercolor="dark"
            placeholder={intl.formatMessage(searchMessages.countrySearch)}
            onSearch={s => setSearch(s)}
            drop={false}
          />
          {sorted && scoresAllCountries && (
            <CardWrapper
              pad={{ top: isMaxSize(size, 'sm') ? 'xsmall' : '0' }}
              align="start"
              responsive={false}
              margin={{ horizontal: `-${theme.global.edgeSize.xsmall}` }}
              ref={ref}
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
                        key={c[COLUMNS.COUNTRIES.CODE]}
                        country={c}
                        scale={scale}
                        scores={getScoresForCountry(
                          c[COLUMNS.COUNTRIES.CODE],
                          scoresAllCountries,
                        )}
                        standard={standardDetails}
                        otherStandard={otherStandardDetails}
                        defaultStandard={isDefaultStandard(c, standardDetails)}
                        benchmark={benchmarkDetails}
                        onSelectCountry={() =>
                          onSelectCountry(c[COLUMNS.COUNTRIES.CODE])
                        }
                        indicators={indicators}
                        onCountryHover={code => code || true}
                        width={cardWidth}
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
                          key={c[COLUMNS.COUNTRIES.CODE]}
                          country={c}
                          scale={scale}
                          scores={getScoresForCountry(
                            c[COLUMNS.COUNTRIES.CODE],
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
                            onSelectCountry(c[COLUMNS.COUNTRIES.CODE])
                          }
                          indicators={indicators}
                        />
                      )}
                    </InfiniteScroll>
                  </Box>
                </Box>
              )}
            </CardWrapper>
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
          <CountryNotes
            settingHint
            notes={{
              govRespondents: hasGovRespondentsCountries,
              hiCountries: hasHICountries,
            }}
          />
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
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  regionFilterValue: state => getRegionSearch(state),
  subregionFilterValue: state => getSubregionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  assessedFilterValue: state => getAssessedSearch(state),
  countryGroupFilterValue: state => getCountryGroupSearch(state),
  treatyFilterValue: state => getTreatySearch(state),
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
