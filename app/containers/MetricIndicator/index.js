/**
 *
 * MetricIndicator
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
  getIndicatorScores,
  getBenchmarkSearch,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';
import { BENCHMARKS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';
import isNumber from 'utils/is-number';

const DEPENDENCIES = ['countries', 'esrIndicatorScores'];
const roundScore = value => isNumber(value) && Math.round(value * 100) / 100;

export function MetricIndicator({ onLoadData, metric, scores, benchmark }) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const sortedScores =
    scores &&
    scores.sort((a, b) =>
      parseFloat(a[currentBenchmark.column], 10) <
      parseFloat(b[currentBenchmark.column], 10)
        ? 1
        : -1,
    );
  return (
    <div>
      <Helmet>
        <title>MetricIndicator</title>
        <meta name="description" content="Description of MetricIndicator" />
      </Helmet>
      <Close />
      <Text size="small">
        <FormattedMessage {...rootMessages['metric-types'].indicator} />
      </Text>
      <Heading margin={{ top: '5px' }}>
        <FormattedMessage {...rootMessages.indicators[metric.key]} />
      </Heading>
      {sortedScores &&
        sortedScores.map(s => (
          <div key={s.country_code}>
            <FormattedMessage {...rootMessages.countries[s.country_code]} />
            <span>{`: ${roundScore(s[currentBenchmark.column])}`}</span>
          </div>
        ))}
    </div>
  );
}

MetricIndicator.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { metric }) => getIndicatorScores(state, metric.key),
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

export default compose(withConnect)(MetricIndicator);
