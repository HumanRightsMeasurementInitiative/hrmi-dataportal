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
import { Box, ResponsiveContext } from 'grommet';

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
  getSortSearch,
  getSortOrderSearch,
  getCountries,
  getDependenciesReady,
  getAuxIndicatorsLatest,
  getMaxYearESR,
  getMinYearESR,
  getMaxYearCPR,
  getMinYearCPR,
  getMaxYearPacific,
  getMinYearPacific,
  getPacificScoresByMetricByYear,
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
import CountryNotes from 'components/CountryNotes';
import CountryLabel from 'components/CountryLabel';

import Hint from 'styled/Hint';

import { sortScores } from 'utils/scores';
import { getFilterOptionValues, areAnyFiltersSet } from 'utils/filters';
import { isMinSize } from 'utils/responsive';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';

import rootMessages from 'messages';

const DEPENDENCIES = [
  'countries',
  'cprScores',
  'esrScores',
  'esrIndicators',
  'esrIndicatorScores',
  'auxIndicators',
  'pacific',
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

const prepareData = ({
  scores,
  metric,
  currentBenchmark,
  standard,
  countries,
  onCountryClick,
  activeCode,
  showHILabel,
  showGovRespondentsLabel,
}) =>
  // prettier-ignore
  scores.map(s =>
    (metric.type === 'esr' || metric.metricType === 'indicators') && metric.right !== 'violence'
      ? {
        color: 'esr',
        refValues: getDimensionRefs(s, currentBenchmark, metric.metricType),
        value: getESRDimensionValue(s, currentBenchmark),
        maxValue: 100,
        unit: '%',
        stripes: standard === 'hi',
        key: s.country_code,
        label: (
          <CountryLabel
            country={countries.find(c => c.country_code === s.country_code)}
            showGovRespondentsLabel={showGovRespondentsLabel}
            showHILabel={showHILabel}
          />
        ),
        onClick: () => onCountryClick(s.country_code),
        active: activeCode === s.country_code,
      }
      : {
        color: metric.right === 'violence' ? 'physint' : metric.dimension || metric.key,
        value: getCPRDimensionValue(s),
        maxValue: 10,
        unit: '',
        band: getBand(s),
        key: s.country_code,
        label: (
          <CountryLabel
            country={countries.find(c => c.country_code === s.country_code)}
            showGovRespondentsLabel={showGovRespondentsLabel}
            showHILabel={showHILabel}
          />
        ),
        onClick: () => onCountryClick(s.country_code),
        active: activeCode === s.country_code,
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
  onCountryClick,
  activeCode,
  selectedYear,
  setSelectedYear,
  maxYearESR,
  minYearESR,
  maxYearCPR,
  minYearCPR,
  maxYearPacific,
  minYearPacific,
  maxYearDimension,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const currentSort = sort && SORT_OPTIONS.indexOf(sort) > -1 ? sort : 'score';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;

  // prettier-ignore
  const countriesForScores = (scores && countries)
    ? scores.map(s =>
      countries.find(c => c.country_code === s.country_code),
    )
    : [];

  const filterValues = getFilterOptionValues(
    countriesForScores,
    COUNTRY_FILTERS.SINGLE_METRIC,
    // check if any filters are already set -
    // if not we can just return all specified options
    areAnyFiltersSet(COUNTRY_FILTERS.SINGLE_METRIC, {
      regionFilterValue,
      subregionFilterValue,
      incomeFilterValue,
      countryGroupFilterValue,
      treatyFilterValue,
    }),
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
  const hasHICountries = countriesForScores.some(c => isCountryHighIncome(c));
  const hasGovRespondentsCountries = countriesForScores.some(c =>
    hasCountryGovRespondents(c),
  );
  // mark countries with symbol?
  const showHILabel =
    metric.type === 'esr' && metric.metricType !== 'indicators';
  const showGovRespondentsLabel = metric.type === 'cpr';

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box margin={{ bottom: 'xlarge' }}>
          <ChartHeader
            chartId="single-metric"
            hasSubHeading={metric.type === 'esr'}
            tools={{
              howToReadConfig: {
                contxt: 'PathMetric',
                chart: metric.type === 'cpr' ? 'Bullet' : 'Bar',
                dimension:
                  metric.right === 'violence' ? 'physint' : metric.color,
                data: metric.color,
                pacific: metric.right === 'violence',
              },
              // prettier-ignore
              settingsConfig: metric.right !== 'violence' &&
                (metric.type === 'esr' ||
                  metric.metricType === 'indicators') && {
                key: 'metric',
                showStandard: metric.metricType !== 'indicators',
                showBenchmark: true,
              }
            }}
            messageValues={{ no: scores.length }}
            filter={
              metric.right !== 'violence' && {
                regionFilterValue,
                subregionFilterValue,
                onRemoveFilter,
                onAddFilter,
                incomeFilterValue,
                countryGroupFilterValue,
                treatyFilterValue,
                filterValues,
              }
            }
            sort={{
              sort: currentSort,
              options:
                maxYearDimension === selectedYear
                  ? SORT_OPTIONS
                  : ['score', 'name'],
              order: currentSortOrder,
              onSortSelect,
              onOrderToggle: onOrderChange,
            }}
            standard={standard}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            /* eslint-disable */
            maxYearDimension={
              metric.right === 'violence'
                ? maxYearPacific
                : metric.type === 'esr'
                  ? maxYearESR
                  : maxYearCPR
            }
            minYearDimension={
              metric.right === 'violence'
                ? minYearPacific
                : metric.type === 'esr'
                  ? minYearESR
                  : minYearCPR
            }
            /* eslint-enable */
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
                countries,
                onCountryClick,
                activeCode,
                showHILabel,
                showGovRespondentsLabel,
              })}
              currentBenchmark={currentBenchmark}
              metric={metric}
              listHeader
              bullet={metric.type === 'cpr' || metric.right === 'violence'}
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
                  countries,
                  onCountryClick,
                  activeCode,
                  showHILabel,
                  showGovRespondentsLabel,
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
          <CountryNotes
            hasAside={isMinSize(size, 'large')}
            settingHint
            notes={{
              govRespondents:
                showGovRespondentsLabel && hasGovRespondentsCountries,
              hiCountries: showHILabel && hasHICountries,
            }}
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
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
  activeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onAddFilter: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
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
  showHILabel: PropTypes.bool,
  onCountryClick: PropTypes.func,
  selectedYear: PropTypes.string,
  setSelectedYear: PropTypes.func,
  maxYearESR: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYearESR: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYearCPR: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxYearPacific: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYearPacific: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxYearDimension: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  scores: (state, { metric, selectedYear }) => {
    if (metric.metricType === 'dimensions') {
      return metric.type === 'esr'
        ? getESRDimensionScores(state, selectedYear)
        : getCPRDimensionScores(state, metric.key, selectedYear);
    }
    if (metric.metricType === 'rights') {
      return metric.type === 'esr'
        ? getESRRightScores(state, metric.key, selectedYear)
        : getCPRRightScores(state, metric.key, selectedYear);
    }
    if (metric.right === 'violence') {
      return getPacificScoresByMetricByYear(state, metric.code, selectedYear);
    }
    if (metric.metricType === 'indicators') {
      return getIndicatorScores(state, metric.key, selectedYear);
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
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
  maxYearESR: getMaxYearESR,
  minYearESR: getMinYearESR,
  maxYearCPR: getMaxYearCPR,
  minYearCPR: getMinYearCPR,
  maxYearPacific: getMaxYearPacific,
  minYearPacific: getMinYearPacific,
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
