/**
 *
 * ChartContainerCountryIndicators
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { withTheme } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { BENCHMARKS, GRADES, COLUMNS } from 'containers/App/constants';
import { scoreAsideWidth } from 'components/ChartBars/chart-utils';

import {
  getIndicatorsForCountryAndRight,
  getIndicatorsForOtherStandardForCountryAndRight,
  getStandardSearch,
  getBenchmarkSearch,
  getDependenciesReady,
  getRightsForCountry,
  getESRScoreForCountry,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import ChartBars from 'components/ChartBars';
import Source from 'components/Source';

import getMetricDetails from 'utils/metric-details';
import { isMinSize } from 'utils/responsive';
import { lowerCase } from 'utils/string';

import rootMessages from 'messages';

const DEPENDENCIES = ['esrScores', 'esrIndicators', 'esrIndicatorScores'];

const getRightValue = (score, benchmark) => {
  if (score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return score && parseFloat(score[col]);
  }
  return false;
};

const getRightRefs = (score, benchmark, isIndicator) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = isIndicator
      ? benchmark.refIndicatorColumn
      : benchmark.refColumn;
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

const getMetricLabel = (metricCode, intl) =>
  intl.formatMessage(rootMessages['rights-xshort'][metricCode]);

const getIndicatorLabel = (metricCode, intl) =>
  intl.formatMessage(rootMessages.subrights[metricCode]);
const getRawIndicatorLabel = (metricCode, intl) =>
  intl.formatMessage(rootMessages['indicators-raw'][metricCode]);

const KeyItem = styled(Box)`
  margin-left: 15px;
  text-align: right;
  position: relative;
`;
const KeyItemSolid = styled.span`
  max-height: 14px;
  border-right: 1px solid;
  border-color: ${props => props.theme.global.colors['dark-2']};
  margin-left: 8px;
`;

const KeyItemDashed = styled.span`
  background-image: linear-gradient(
    ${props => props.theme.global.colors['dark-2']} 50%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: right center;
  background-size: 2px 4px;
  background-repeat: repeat-y;
  height: 14px;
  margin-left: 8px;
  width: 3px;
`;

const prepareData = ({
  indicators,
  currentBenchmark,
  standard,
  onClick,
  intl,
  activeCode,
  rawScores,
}) =>
  // prettier-ignore
  indicators.map(i => ({
    color: rawScores ? 'esrIndicator' : 'esr',
    refValues: rawScores ? null : getRightRefs(i.score, currentBenchmark, true),
    value: rawScores ? i.score && i.score.value && parseFloat(i.score.value) : getRightValue(i.score, currentBenchmark),
    maxValue: 100,
    unit: '%',
    stripes: standard === 'hi',
    key: i.key,
    label: rawScores ? getRawIndicatorLabel(i.key ,intl) : getIndicatorLabel(i.key, intl),
    onClick: () => onClick(i.key, 'esr', null, !rawScores, indicators.length > 1),
    active: activeCode === i.key,
    year: i.score && i.score.year,
  }));

export function ChartContainerCountryIndicators({
  metricCode,
  onLoadData,
  right,
  indicators,
  indicatorsForOtherStandard,
  standard,
  benchmark,
  dataReady,
  intl,
  onMetricClick,
  activeCode,
  metricSelector,
  closeAsideLayer,
}) {
  const [rawScores, setRawScores] = useState(false);
  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return null;

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const currentStandard = STANDARDS.find(s => s.key === standard);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <div>
          <Box margin={{ bottom: 'small' }} responsive={false}>
            {metricSelector}
            <ChartBars
              data={[
                {
                  color: 'esr',
                  refValues: getRightRefs(right, currentBenchmark),
                  value: getRightValue(right, currentBenchmark),
                  maxValue: 100,
                  unit: '%',
                  stripes: standard === 'hi',
                  key: metricCode,
                  label: getMetricLabel(metricCode, intl),
                  onClick: () => onMetricClick(metricCode, 'esr'),
                  hasScoreIndicators: indicators.some(i => !!i.score),
                  hasScoreIndicatorsAlternate: indicatorsForOtherStandard.some(
                    i => !!i.score,
                  ),
                  active: activeCode === metricCode,
                },
              ]}
              currentBenchmark={currentBenchmark}
              standard={standard}
              labelColor="esrDark"
              padVertical="xsmall"
              grades={GRADES.esr}
              gradeLabels={false}
              level={1}
              commonLabel={intl.formatMessage(
                rootMessages.charts.rightsColumnLabel.esr,
              )}
              listHeader
              metric={getMetricDetails(metricCode)}
            />
            <ChartBars
              data={prepareData({
                indicators,
                currentBenchmark,
                standard,
                onClick: onMetricClick,
                intl,
                activeCode,
                rawScores,
              })}
              currentBenchmark={currentBenchmark}
              standard={standard}
              commonLabel={intl.formatMessage(
                rawScores
                  ? rootMessages.charts.indicatorsColumnLabel
                  : rootMessages.charts.rightsColumnLabel.esr,
              )}
              labelColor="esrDark"
              grades={GRADES.esr}
              listHeader
              metric={getMetricDetails('esr')}
              annotateBenchmark={false}
              annotateMinMax={false}
              canShowRaw
              rawScores={rawScores}
              setRawScores={setRawScores}
              closeAsideLayer={closeAsideLayer}
            />
          </Box>
          {currentBenchmark.key === 'best' && (
            <Box
              direction="row"
              margin={{
                top: 'small',
                right: scoreAsideWidth(size),
              }}
              justify="end"
            >
              <KeyItem direction="row">
                <Text size="xxsmall">
                  <FormattedMessage
                    {...rootMessages.settings.benchmark.adjusted}
                  />
                  {isMinSize(size, 'medium') && (
                    <span>
                      {` ${lowerCase(
                        intl.formatMessage(
                          rootMessages.settings.benchmark.nameShort,
                        ),
                      )}`}
                    </span>
                  )}
                </Text>
                <KeyItemDashed />
              </KeyItem>
              <KeyItem direction="row">
                <Text size="xxsmall">
                  <FormattedMessage {...rootMessages.settings.benchmark.best} />
                  {isMinSize(size, 'medium') && (
                    <span>
                      {` ${lowerCase(
                        intl.formatMessage(
                          rootMessages.settings.benchmark.nameShort,
                        ),
                      )}`}
                    </span>
                  )}
                </Text>
                <KeyItemSolid />
              </KeyItem>
            </Box>
          )}
          <Box
            margin={{
              top: currentBenchmark.key === 'best' ? 'xsmall' : 'medium',
              bottom: 'large',
            }}
          >
            <Source />
          </Box>
        </div>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartContainerCountryIndicators.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  metricCode: PropTypes.string.isRequired,
  activeCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataReady: PropTypes.bool,
  right: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  indicators: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  indicatorsForOtherStandard: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
  metricSelector: PropTypes.node,
  closeAsideLayer: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  indicators: (state, { countryCode, metricCode }) =>
    getIndicatorsForCountryAndRight(state, countryCode, { metricCode }),
  indicatorsForOtherStandard: (state, { countryCode, metricCode }) =>
    getIndicatorsForOtherStandardForCountryAndRight(state, countryCode, {
      metricCode,
    }),
  right: (state, { countryCode, metricCode }) =>
    getESRScoreForCountry(state, { countryCode, metricCode }),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
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
