/**
 *
 * ChartContainerCountryRights
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
import { Paragraph, Box, Text } from 'grommet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// import getMetricDetails from 'utils/metric-details';

import {
  STANDARDS,
  BENCHMARKS,
  GRADES,
  COLUMNS,
} from 'containers/App/constants';

import {
  getDimensionsForCountry,
  getIndicatorsForCountry,
  getCountry,
  getCountryGrammar,
  getStandardSearch,
  getBenchmarkSearch,
  getReferenceScores,
  getDependenciesReady,
  getRightsForCountry,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import ChartHeader from 'components/ChartHeader';
import ChartBars from 'components/ChartBars';
import NarrativeESR from 'components/CountryNarrative/NarrativeESR';
import NarrativeCPR from 'components/CountryNarrative/NarrativeCPR';
import NarrativeESRStandardHint from 'components/CountryNarrative/NarrativeESRStandardHint';
import NarrativeESRCompAssessment from 'components/CountryNarrative/NarrativeESRCompAssessment';
import NarrativeCPRCompAssessment from 'components/CountryNarrative/NarrativeCPRCompAssessment';

import { getRightsScoresForDimension } from 'utils/scores';
import getMetricDetails from 'utils/metric-details';
import { getMessageGrammar } from 'utils/narrative';

import rootMessages from 'messages';

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'esrIndicators',
  'cprScores',
  'esrScores',
  'esrIndicatorScores',
];

const getESRDimensionValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};
const getCPRDimensionValue = score =>
  score && parseFloat(score[COLUMNS.CPR.MEAN]);

const getDimensionRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

const getMetricLabel = (score, intl) =>
  intl.formatMessage(rootMessages['rights-xshort'][score.key]);

const getDimensionLabel = (score, intl) =>
  intl.formatMessage(rootMessages.dimensions[score.key]);

const prepareData = ({
  scores,
  dimensionCode,
  currentBenchmark,
  standard,
  onClick,
  intl,
}) =>
  // prettier-ignore
  scores.map(s =>
    dimensionCode === 'esr'
      ? {
        color: dimensionCode,
        refValues: getDimensionRefs(s.score, currentBenchmark),
        value: getESRDimensionValue(s.score, currentBenchmark),
        maxValue: 100,
        unit: '%',
        stripes: standard === 'hi',
        key: s.key,
        label: getMetricLabel(s, intl),
        onClick: () => onClick(s.key),
      }
      : {
        color: dimensionCode,
        value: getCPRDimensionValue(s.score),
        maxValue: 10,
        unit: '',
        key: s.key,
        band: getBand(s.score),
        label: getMetricLabel(s, intl),
        onClick: () => onClick(s.key),
      }
  );

export function ChartContainerCountryRights({
  type,
  onLoadData,
  country,
  countryCode,
  dimensions,
  dimensionCode,
  dimensionAverages,
  countryGrammar,
  rights,
  indicators,
  standard,
  benchmark,
  dataReady,
  intl,
  onMetricClick,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  const currentStandard = STANDARDS.find(s => s.key === standard);
  const hasSomeIndicatorScores = Object.values(indicators)
    .filter(s => {
      if (!s.details) return false;
      return (
        s.details.standard === 'Both' ||
        s.details.standard === currentStandard.code
      );
    })
    .reduce((m, s) => m || !!s.score, false);

  const dimension = dimensions[dimensionCode];
  const reference = dimensionAverages[dimensionCode];

  let comparativeScoreESR;
  let comparativeRightsESR;
  if (dimensionCode === 'esr' && dimension && dimension.score) {
    comparativeScoreESR = dimension.score[currentBenchmark.column];
    comparativeRightsESR = 'all';
  }
  if (dimensionCode === 'esr' && dimension && dimension.scoreSome) {
    comparativeScoreESR = dimension.scoreSome[currentBenchmark.column];
    comparativeRightsESR = dimension.scoreSome.metric;
  }
  return (
    <div>
      {type === 'esr' && dimension && (
        <>
          <ChartHeader
            chartId="dimension-overview"
            messageValues={{
              dimension: intl.formatMessage(
                rootMessages.dimensions[dimensionCode],
              ),
            }}
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
          <Text>
            {currentBenchmark && (
              <FormattedMessage
                {...rootMessages.charts.dimensionIntro.esr[
                  currentBenchmark.key
                ]}
                values={getMessageGrammar(
                  intl,
                  countryCode,
                  null,
                  countryGrammar,
                )}
              />
            )}
          </Text>
          <NarrativeESRStandardHint
            country={country}
            standard={standard}
            countryGrammar={countryGrammar}
          />
          <Box margin={{ bottom: 'large' }}>
            <ChartBars
              data={[
                {
                  color: dimensionCode,
                  refValues: getDimensionRefs(
                    dimension.score,
                    currentBenchmark,
                  ),
                  value: getESRDimensionValue(
                    dimension.score,
                    currentBenchmark,
                  ),
                  maxValue: 100,
                  unit: '%',
                  stripes: standard === 'hi',
                  key: dimension.key,
                  label: getDimensionLabel(dimension, intl),
                  onClick: () => onMetricClick(dimension.key),
                },
              ]}
              currentBenchmark={currentBenchmark}
              standard={standard}
              labelColor={`${dimensionCode}Dark`}
              padVertical="xsmall"
              grades={GRADES[type]}
              gradeLabels={false}
              level={1}
              commonLabel={intl.formatMessage(
                rootMessages.charts.dimensionSummaryLabel,
              )}
              listHeader
              metric={getMetricDetails(dimensionCode)}
              summaryScore={{
                score: getESRDimensionValue(dimension.score, currentBenchmark),
                maxValue: 100,
              }}
              scoresAside
            />
            <ChartBars
              scoresAside
              data={prepareData({
                scores: getRightsScoresForDimension(rights, 'esr'),
                dimensionCode,
                currentBenchmark,
                standard,
                onClick: onMetricClick,
                intl,
              })}
              currentBenchmark={currentBenchmark}
              standard={standard}
              commonLabel={intl.formatMessage(
                rootMessages.charts.rightsColumnLabel[dimensionCode],
              )}
              labelColor={`${dimensionCode}Dark`}
              grades={GRADES[type]}
              listHeader
            />
          </Box>
          <NarrativeESR
            dimensionScore={dimension.score}
            country={country}
            countryGrammar={countryGrammar}
            someData={hasSomeIndicatorScores}
            standard={standard}
            showNoData
          />
          <Paragraph>
            <NarrativeESRCompAssessment
              country={country}
              countryGrammar={countryGrammar}
              comparativeScore={parseFloat(comparativeScoreESR)}
              comparativeRights={comparativeRightsESR}
              groupAverageScore={
                reference && reference.average && reference.average[benchmark]
              }
              benchmark={currentBenchmark}
            />
          </Paragraph>
        </>
      )}
      {type === 'cpr' && dimension && (
        <>
          {dimension.score && (
            <>
              <ChartHeader
                chartId="dimension-overview"
                messageValues={{
                  dimension: intl.formatMessage(
                    rootMessages.dimensions[dimensionCode],
                  ),
                }}
                tools={{
                  howToReadConfig: {
                    key: 'country-dimension-cpr',
                    chart: 'Bullet',
                    dimension: dimensionCode,
                  },
                }}
              />
              <Text>
                <FormattedMessage
                  {...rootMessages.charts.dimensionIntro[dimensionCode]}
                  values={getMessageGrammar(
                    intl,
                    countryCode,
                    null,
                    countryGrammar,
                  )}
                />
              </Text>
              <Box margin={{ bottom: 'large' }}>
                <ChartBars
                  data={[
                    {
                      color: dimensionCode,
                      value: getCPRDimensionValue(dimension.score),
                      band: getBand(dimension.score),
                      maxValue: 10,
                      key: dimension.key,
                      label: getDimensionLabel(dimension, intl),
                      onClick: () => onMetricClick(dimension.key),
                    },
                  ]}
                  labelColor={`${dimensionCode}Dark`}
                  padVertical="small"
                  grades={GRADES[type]}
                  gradeLabels={false}
                  level={1}
                  commonLabel="Category"
                  bullet
                  listHeader
                  metric={getMetricDetails(dimensionCode)}
                  scoresAside
                  summaryScore={{
                    score: getCPRDimensionValue(dimension.score),
                    maxValue: 10,
                  }}
                />
                <ChartBars
                  data={prepareData({
                    scores: getRightsScoresForDimension(rights, dimensionCode),
                    dimensionCode,
                    onClick: onMetricClick,
                    intl,
                  })}
                  commonLabel={`${intl.formatMessage(
                    rootMessages.charts.rightsColumnLabel[dimensionCode],
                  )}`}
                  labelColor={`${dimensionCode}Dark`}
                  padVertical="small"
                  grades={GRADES[type]}
                  bullet
                  listHeader
                  scoresAside
                />
              </Box>
            </>
          )}
          <NarrativeCPR
            dimensionKey={dimensionCode}
            score={dimension.score}
            country={country}
            countryGrammar={countryGrammar}
          />
          {dimension.score && (
            <Paragraph>
              <NarrativeCPRCompAssessment
                dimensionKey={dimensionCode}
                score={dimension.score}
                country={country}
                countryGrammar={countryGrammar}
                referenceScore={reference.average}
                referenceCount={reference.count}
                start
              />
            </Paragraph>
          )}
        </>
      )}
    </div>
  );
}

ChartContainerCountryRights.propTypes = {
  countryCode: PropTypes.string.isRequired,
  dimensionCode: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadData: PropTypes.func.isRequired,
  indicators: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  dimensionAverages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  indicators: (state, { countryCode }) =>
    getIndicatorsForCountry(state, countryCode),
  dimensions: (state, { countryCode }) =>
    getDimensionsForCountry(state, countryCode),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  dimensionAverages: state => getReferenceScores(state),
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
  withTheme(injectIntl(ChartContainerCountryRights)),
);
