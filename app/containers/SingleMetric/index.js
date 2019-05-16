/**
 *
 * SingleMetric
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box } from 'grommet';
import styled from 'styled-components';

import BarHorizontal from 'components/BarHorizontal';
import BarBulletHorizontal from 'components/BarBulletHorizontal';

import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getESRRightScores,
  getCPRRightScores,
  getBenchmarkSearch,
  getIndicatorScores,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';
import { BENCHMARKS, COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';

const Styled = styled(Box)`
  margin: 0 auto;
  max-width: 1000px;
`;

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];
const DEPENDENCIES_INDICATORS = ['countries', 'esrIndicatorScores'];

export function SingleMetric({ onLoadData, metric, scores, benchmark }) {
  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, []);
  let column = '';
  let color = '';
  if (metric.type === 'esr' || metric.metricType === 'indicators') {
    const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
    ({ column } = currentBenchmark);
    color = 'esr';
  } else if (metric.type === 'cpr') {
    column = COLUMNS.CPR.MEAN;
    color = metric.metricType === 'rights' ? metric.dimension : metric.key;
  }

  const sortedScores =
    scores &&
    scores.sort((a, b) =>
      parseFloat(a[column], 10) < parseFloat(b[column], 10) ? 1 : -1,
    );

  return (
    <Styled pad={{ vertical: 'large' }} direction="column">
      {sortedScores &&
        sortedScores.map(s => (
          <Box key={s.country_code} direction="row">
            <Box width="150px" border="right">
              <FormattedMessage {...rootMessages.countries[s.country_code]} />
            </Box>
            <Box flex>
              {(metric.type === 'esr' ||
                metric.metricType === 'indicators') && (
                <BarHorizontal
                  omitMinMaxLabels
                  level={3}
                  color={color}
                  value={parseFloat(s[column])}
                  minValue={0}
                  maxValue={100}
                  unit="%"
                />
              )}
              {metric.type === 'cpr' && (
                <BarBulletHorizontal
                  omitMinMaxLabels
                  level={2}
                  color={color}
                  value={parseFloat(s[column])}
                  band={{
                    lo: parseFloat(s[COLUMNS.CPR.LO]),
                    hi: parseFloat(s[COLUMNS.CPR.HI]),
                  }}
                  minValue={0}
                  maxValue={10}
                />
              )}
            </Box>
          </Box>
        ))}
    </Styled>
  );
}

SingleMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { metric }) => {
    if (metric.metricType === 'dimensions') {
      return metric.type === 'esr'
        ? getESRDimensionScores(state, metric.key)
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
  benchmark: state => getBenchmarkSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: metric => {
      if (metric.metricType === 'indicators') {
        return DEPENDENCIES_INDICATORS.forEach(key =>
          dispatch(loadDataIfNeeded(key)),
        );
      }
      return DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SingleMetric);
