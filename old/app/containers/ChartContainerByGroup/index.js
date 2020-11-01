/**
 *
 * ChartContainerByGroup
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { withTheme } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { BENCHMARKS } from 'containers/App/constants';
import {
  getStandardSearch,
  getESRScoresForCountry,
  getESRIndicatorScoresForCountry,
  getIndicatorInfo,
  getESRYear,
  getRawSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { loadDataIfNeeded, setRaw } from 'containers/App/actions';

import ChartCountryMetricByGroup from 'components/ChartCountryMetricByGroup';
import Source from 'components/Source';
import { scoreAsideWidth } from 'components/ChartBars/chart-utils';

import getMetricDetails from 'utils/metric-details';
import { isMinSize } from 'utils/responsive';
import { lowerCase } from 'utils/string';

import rootMessages from 'messages';

const getColour = metric => {
  if (metric.metricType === 'dimensions') {
    return metric.key;
  }
  if (metric.metricType === 'rights') {
    return metric.dimension;
  }
  return 'esr';
};

const DEPENDENCIES = [
  'countries',
  'esrIndicators',
  'esrScores',
  'esrIndicatorScores',
];

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

export function ChartContainerByGroup({
  metricCode,
  scores,
  onLoadData,
  standard,
  theme,
  raw,
  onRawChange,
  metricInfo,
  currentYear,
  benchmark,
  intl,
  metricSelector,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const metric = getMetricDetails(metricCode);
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <div>
          <Box margin={{ bottom: 'medium' }}>
            {metricSelector}
            <ChartCountryMetricByGroup
              color="esr"
              colorHint={theme.global.colors[`${getColour(metric)}Dark`]}
              scores={scores}
              metric={metric}
              metricInfo={metricInfo}
              standard={standard}
              percentage
              maxValue={100}
              hasRawOption={false}
              raw={raw}
              onRawChange={onRawChange}
              currentYear={currentYear}
              currentBenchmark={BENCHMARKS.find(s => s.key === benchmark)}
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
                  <FormattedMessage
                    {...rootMessages.settings.benchmark.best}
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

ChartContainerByGroup.propTypes = {
  currentYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  standard: PropTypes.string,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  metricInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  theme: PropTypes.object,
  raw: PropTypes.bool,
  onRawChange: PropTypes.func,
  benchmark: PropTypes.string,
  intl: intlShape.isRequired,
  metricSelector: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  currentYear: state => getESRYear(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scores: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'dimensions' || metric.metricType === 'rights') {
      return getESRScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    if (metric.metricType === 'indicators') {
      return getESRIndicatorScoresForCountry(state, {
        countryCode,
        metricCode: metric.code,
      });
    }
    return false;
  },
  metricInfo: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.metricType === 'indicators') {
      return getIndicatorInfo(state, metric.code);
    }
    return false;
  },
  raw: state => getRawSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onRawChange: value => {
      dispatch(setRaw(value));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(
  withTheme(injectIntl(ChartContainerByGroup)),
);
