/**
 *
 * ChartContainerCountryIndicators
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
// import { Paragraph, Box } from 'grommet';
// import { injectIntl, intlShape } from 'react-intl';
import { injectIntl } from 'react-intl';

// import getMetricDetails from 'utils/metric-details';

// import {
//   STANDARDS,
//   BENCHMARKS,
//   GRADES,
//   COLUMNS,
// } from 'containers/App/constants';

import {
  getIndicatorsForCountry,
  getCountry,
  getCountryGrammar,
  getStandardSearch,
  getBenchmarkSearch,
  getDimensionAverages,
  getDependenciesReady,
  getRightsForCountry,
  // getAuxIndicatorsForCountry,
  // getLatestCountryCurrentGDP,
  // getLatestCountry2011PPPGDP,
  // getESRYear,
  // getCPRYear,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';
import saga from 'containers/App/saga';

import ChartHeader from 'components/ChartHeader';
// import ChartBars from 'components/ChartBars';

import { useInjectSaga } from 'utils/injectSaga';
// import { getRightsScoresForDimension } from 'utils/scores';
//
// import rootMessages from 'messages';

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

// const getESRDimensionValue = (score, benchmark) => {
//   if (score) {
//     const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
//     return score && parseFloat(score[col]);
//   }
//   return false;
// };
// const getCPRDimensionValue = score =>
//   score && parseFloat(score[COLUMNS.CPR.MEAN]);
//
// const getDimensionRefs = (score, benchmark) => {
//   if (benchmark && benchmark.key === 'adjusted') {
//     return [{ value: 100, style: 'dotted', key: 'adjusted' }];
//   }
//   if (benchmark && benchmark.key === 'best') {
//     const col = benchmark.refColumn;
//     return [
//       { value: 100, style: 'solid', key: 'best' },
//       {
//         value: score && parseFloat(score[col]),
//         style: 'dotted',
//         key: 'adjusted',
//       },
//     ];
//   }
//   return false;
// };

// const getMetricLabel = (score, intl) =>
//   intl.formatMessage(rootMessages['rights-xshort'][score.key]);

// const getDimensionLabel = (score, intl) =>
//   intl.formatMessage(rootMessages.dimensions[score.key]);
//
// const prepareData = ({
//   scores,
//   dimensionCode,
//   currentBenchmark,
//   standard,
//   onClick,
//   intl,
// }) =>
//   // prettier-ignore
//   scores.map(s =>
//     dimensionCode === 'esr'
//       ? {
//         color: dimensionCode,
//         refValues: getDimensionRefs(s.score, currentBenchmark),
//         value: getESRDimensionValue(s.score, currentBenchmark),
//         maxValue: 100,
//         unit: '%',
//         stripes: standard === 'hi',
//         key: s.key,
//         label: getMetricLabel(s, intl),
//         onClick: () => onClick(s.key),
//       }
//       : {
//         color: dimensionCode,
//         value: getCPRDimensionValue(s.score),
//         maxValue: 10,
//         unit: '',
//         key: s.key,
//         band: getBand(s.score),
//         label: getMetricLabel(s, intl),
//         onClick: () => onClick(s.key),
//       }
//   );

export function ChartContainerCountryIndicators({
  onLoadData,
  // country,
  // dimensionCode,
  // rights,
  // indicators,
  // standard,
  // benchmark,
  dataReady,
  // intl,
  // onMetricClick,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return null;

  // const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const currentStandard = STANDARDS.find(s => s.key === standard);
  // const hasSomeIndicatorScores = Object.values(indicators)
  //   .filter(s => {
  //     if (!s.details) return false;
  //     return (
  //       s.details.standard === 'Both' ||
  //       s.details.standard === currentStandard.code
  //     );
  //   })
  //   .reduce((m, s) => m || !!s.score, false);

  return (
    <div>
      <ChartHeader
        title="Indicator overview"
        tools={{
          howToReadConfig: {
            key: 'country-dimension-esr',
            chart: 'Bar',
          },
          settingsConfig: {
            key: 'country-dimension-esr',
            showStandard: true,
            showBenchmark: true,
          },
        }}
      />
    </div>
  );
  // <Box margin={{ bottom: 'large' }}>
  // <ChartBars
  // data={[
  //   {
  //     color: dimensionCode,
  //     refValues: getDimensionRefs(
  //       dimension.score,
  //       currentBenchmark,
  //     ),
  //     value: getESRDimensionValue(
  //       dimension.score,
  //       currentBenchmark,
  //     ),
  //     maxValue: 100,
  //     unit: '%',
  //     stripes: standard === 'hi',
  //     key: dimension.key,
  //     label: getDimensionLabel(dimension, intl),
  //     onClick: () => onMetricClick(dimension.key),
  //   },
  // ]}
  // currentBenchmark={currentBenchmark}
  // standard={standard}
  // labelColor={`${dimensionCode}Dark`}
  // padVertical="small"
  // grades={GRADES.esr}
  // gradeLabels={false}
  // level={1}
  // commonLabel="Category"
  // />
  // <ChartBars
  // data={prepareData({
  //   scores: getRightsScoresForDimension(rights, 'esr'),
  //   dimensionCode,
  //   currentBenchmark,
  //   standard,
  //   onClick: onMetricClick,
  //   intl,
  // })}
  // currentBenchmark={currentBenchmark}
  // standard={standard}
  // commonLabel={`${intl.formatMessage(
  //   rootMessages['rights-xshort-common'][dimensionCode],
  // )}`}
  // labelColor={`${dimensionCode}Dark`}
  // padVertical="small"
  // grades={GRADES.esr}
  // />
  // </Box>
}

ChartContainerCountryIndicators.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  dataReady: PropTypes.bool,
  // dimensionCode: PropTypes.string.isRequired,
  // indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // onMetricClick: PropTypes.func,
  // intl: intlShape.isRequired,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  indicators: (state, { countryCode }) =>
    getIndicatorsForCountry(state, countryCode),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  dimensionAverages: state => getDimensionAverages(state),
  rights: (state, { countryCode }) => getRightsForCountry(state, countryCode),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(
  withTheme(injectIntl(ChartContainerCountryIndicators)),
);
