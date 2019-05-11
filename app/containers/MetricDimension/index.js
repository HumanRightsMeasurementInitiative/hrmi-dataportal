/**
 *
 * MetricDimension
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Heading, Text } from 'grommet';

import Close from 'containers/Close';

import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getBenchmarkSearch,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';
import { BENCHMARKS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';
import isNumber from 'utils/is-number';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];
const roundScore = value => isNumber(value) && Math.round(value * 100) / 100;

export function MetricDimension({ onLoadData, metric, scores, benchmark }) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const currentBenchmark =
    metric.type === 'esr' && BENCHMARKS.find(s => s.key === benchmark);
  const column = metric.type === 'esr' ? currentBenchmark.column : 'mean';

  const sortedScores =
    scores &&
    scores.sort((a, b) =>
      parseFloat(a[column], 10) < parseFloat(b[column], 10) ? 1 : -1,
    );
  return (
    <div>
      <Helmet>
        <title>MetricDimension</title>
        <meta name="description" content="Description of MetricDimension" />
      </Helmet>
      <Close />
      <Text size="small">
        <FormattedMessage {...rootMessages['metric-types'].dimension} />
      </Text>
      <Heading margin={{ top: '5px' }}>
        <FormattedMessage {...rootMessages.dimensions[metric.key]} />
      </Heading>
      {sortedScores &&
        sortedScores.map(s => (
          <div key={s.country_code}>
            <FormattedMessage {...rootMessages.countries[s.country_code]} />
            <span>{`: ${roundScore(s[column])}`}</span>
          </div>
        ))}
    </div>
  );
}

MetricDimension.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { metric }) =>
    metric.type === 'esr'
      ? getESRDimensionScores(state, metric.key)
      : getCPRDimensionScores(state, metric.key),
  benchmark: state => getBenchmarkSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MetricDimension);
