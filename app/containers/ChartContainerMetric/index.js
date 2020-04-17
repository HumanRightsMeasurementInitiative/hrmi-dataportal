/**
 *
 * ChartContainerMetric
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box } from 'grommet';

import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getESRRightScores,
  getCPRRightScores,
  getBenchmarkSearch,
  getIndicatorScores,
  getStandardSearch,
  getRegionSearch,
  getSubregionSearch,
  getIncomeSearch,
  getCountryGroupSearch,
  getTreatySearch,
  getFeaturedSearch,
  getSortSearch,
  getSortOrderSearch,
  getCountries,
  getDependenciesReady,
  getAuxIndicatorsLatest,
  getFeaturedValues,
  getFeatured,
} from 'containers/App/selectors';
import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import {
  BENCHMARKS,
  COLUMNS,
  COUNTRY_SORTS,
  COUNTRY_FILTERS,
} from 'containers/App/constants';

import LoadingIndicator from 'components/LoadingIndicator';
import ChartBars from 'components/ChartBars';
import ChartHeader from 'components/ChartHeader';
import Source from 'components/Source';

import Hint from 'styled/Hint';

import { sortScores } from 'utils/scores';
import { getFilterOptionValues, areAnyFiltersSet } from 'utils/filters';

import rootMessages from 'messages';

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicators',
  'esrIndicatorScores',
  'auxIndicators',
  'featured',
];

const SORT_OPTIONS = ['score', 'name', 'population', 'gdp'];

const getESRDimensionValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};
const getCPRDimensionValue = score =>
  score && parseFloat(score[COLUMNS.CPR.MEAN]);

// const getDimensionRefs = (score, benchmark, metricType) => {
const getDimensionRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    // const col =
    //   metricType === 'indicators'
    //     ? benchmark.refIndicatorColumn
    //     : benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      // {
      //   value: score && parseFloat(score[col]),
      //   style: 'dotted',
      //   key: 'adjusted',
      // },
    ];
  }
  return false;
};
const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

const getCountryLabel = (score, countries, metric, intl) => {
  const country = countries.find(c => c.country_code === score.country_code);
  let label = '';
  if (rootMessages.countries[country.country_code]) {
    label = intl.formatMessage(rootMessages.countries[country.country_code]);
  } else {
    label = country.country_code;
  }
  if (
    metric &&
    (metric.type === 'esr' || metric.metricType === 'indicators') &&
    country &&
    country.high_income_country === '1'
  ) {
    label = `${label} (${intl.formatMessage(rootMessages.labels.hiCountry)})`;
  }
  return label;
};

const prepareData = ({
  scores,
  metric,
  currentBenchmark,
  standard,
  countries,
  intl,
  onCountryClick,
}) =>
  // prettier-ignore
  scores.map(s =>
    metric.type === 'esr' || metric.metricType === 'indicators'
      ? {
        color: 'esr',
        refValues: getDimensionRefs(s, currentBenchmark, metric.metricType),
        value: getESRDimensionValue(s, currentBenchmark),
        maxValue: 100,
        unit: '%',
        stripes: standard === 'hi',
        key: s.country_code,
        label: getCountryLabel(s, countries, metric, intl),
        onClick: () => onCountryClick(s.country_code),
      }
      : {
        color: metric.dimension || metric.key,
        value: getCPRDimensionValue(s),
        maxValue: 10,
        unit: '',
        band: getBand(s),
        key: s.country_code,
        label: getCountryLabel(s, countries, metric, intl),
        onClick: () => onCountryClick(s.country_code),
      }
  );

export function ChartContainerMetric({
  onLoadData,
  metric,
  scores,
  benchmark,
  standard,
  regionFilterValue,
  subregionFilterValue,
  incomeFilterValue,
  countryGroupFilterValue,
  treatyFilterValue,
  featuredFilterValue,
  onRemoveFilter,
  onAddFilter,
  sort,
  sortOrder,
  intl,
  onSortSelect,
  onOrderChange,
  countries,
  dataReady,
  auxIndicators,
  featuredValues,
  featuredCountries,
  onCountryClick,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const currentSort = sort || 'score';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;

  // prettier-ignore
  const countriesForScores = scores
    ? scores.map(s =>
      countries.find(c => c.country_code === s.country_code),
    )
    : [];

  const filterValues = getFilterOptionValues(
    countriesForScores,
    COUNTRY_FILTERS,
    // check if any filters are already set -
    // if not we can just return all specified options
    areAnyFiltersSet(COUNTRY_FILTERS, {
      regionFilterValue,
      subregionFilterValue,
      incomeFilterValue,
      countryGroupFilterValue,
      treatyFilterValue,
      featuredFilterValue,
    }),
    null,
    null,
    featuredValues,
    featuredCountries,
  );

  const { sorted, other } = sortScores({
    intl,
    sort: currentSort,
    order: currentSortOrder,
    scores,
    auxIndicators,
    column: metric.type === 'cpr' ? COLUMNS.CPR.MEAN : currentBenchmark.column,
  });

  const hasResults =
    dataReady && ((sorted && sorted.length > 0) || (other && other.length > 0));
  return (
    <>
      <ChartHeader
        chartId="single-metric"
        tools={{
          howToReadConfig: {
            contxt: 'PathMetric',
            chart: metric.type === 'cpr' ? 'Bullet' : 'Bar',
            data: metric.color,
          },
          settingsConfig: (metric.type === 'esr' ||
            metric.metricType === 'indicators') && {
            key: 'metric',
            showStandard: metric.metricType !== 'indicators',
            showBenchmark: true,
          },
        }}
        messageValues={{ no: scores.length }}
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
        }}
        sort={{
          sort: currentSort,
          options: SORT_OPTIONS,
          order: currentSortOrder,
          onSortSelect,
          onOrderToggle: onOrderChange,
        }}
      />
      {!dataReady && <LoadingIndicator />}
      {!hasResults && dataReady && (
        <Hint italic>
          <FormattedMessage {...rootMessages.hints.noResults} />
        </Hint>
      )}
      {hasResults && sorted && sorted.length > 0 && (
        <ChartBars
          data={prepareData({
            scores: sorted,
            metric,
            currentBenchmark,
            standard,
            intl,
            countries,
            onCountryClick,
          })}
          currentBenchmark={currentBenchmark}
          metric={metric}
          listHeader
          bullet={metric.type === 'cpr'}
          allowWordBreak
          labelColor={`${metric.color}Dark`}
          padVertical="xsmall"
          annotateBetter
        />
      )}
      {hasResults && other && other.length > 0 && (
        <Box border="top">
          <Hint italic>
            <FormattedMessage {...rootMessages.hints.noSortData} />
          </Hint>
          <ChartBars
            data={prepareData({
              scores: other,
              metric,
              currentBenchmark,
              standard,
              intl,
              countries,
              onCountryClick,
            })}
            currentBenchmark={currentBenchmark}
            metric={metric}
            bullet={metric.type === 'cpr'}
            allowWordBreak
            padVertical="xsmall"
          />
        </Box>
      )}
      {hasResults && <Source />}
    </>
  );
}
// metric={metric}
// currentBenchmark={currentBenchmark}
// standard={standard}

ChartContainerMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onAddFilter: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  countryGroupFilterValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  treatyFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  dataReady: PropTypes.bool,
  featuredValues: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  featuredCountries: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onCountryClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  scores: (state, { metric }) => {
    if (metric.metricType === 'dimensions') {
      return metric.type === 'esr'
        ? getESRDimensionScores(state)
        : getCPRDimensionScores(state, metric.key);
    }
    if (metric.metricType === 'rights') {
      return metric.type === 'esr'
        ? getESRRightScores(state, metric.key)
        : getCPRRightScores(state, metric.key);
    }
    if (metric.metricType === 'indicators') {
      return getIndicatorScores(state, metric.key);
    }
    return false;
  },
  countries: state => getCountries(state),
  auxIndicators: state => getAuxIndicatorsLatest(state),
  benchmark: state => getBenchmarkSearch(state),
  standard: state => getStandardSearch(state),
  regionFilterValue: state => getRegionSearch(state),
  subregionFilterValue: state => getSubregionSearch(state),
  incomeFilterValue: state => getIncomeSearch(state),
  countryGroupFilterValue: state => getCountryGroupSearch(state),
  treatyFilterValue: state => getTreatySearch(state),
  featuredFilterValue: state => getFeaturedSearch(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
  featuredValues: state => getFeaturedValues(state),
  featuredCountries: state => getFeatured(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
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
              action: 'Remove country filter (Metric)',
              value: key,
            },
          },
        ),
      ),
    onAddFilter: (key, value) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
            multiple: true,
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Metric)',
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
              action: 'Sort countries (Metric)',
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
              action: 'Country sort order (Metric)',
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

export default compose(withConnect)(injectIntl(ChartContainerMetric));
