/**
 *
 * MetricRight
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
  getESRRightScores,
  getCPRRightScores,
  getBenchmarkSearch,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';
import { BENCHMARKS, COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';
import roundScore from 'utils/round-score';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function MetricRight({ onLoadData, metric, scores, benchmark }) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const currentBenchmark =
    metric.type === 'esr' && BENCHMARKS.find(s => s.key === benchmark);

  const column =
    metric.type === 'esr' ? currentBenchmark.column : COLUMNS.CPR.MEAN;

  const sortedScores =
    scores &&
    scores.sort((a, b) =>
      parseFloat(a[column], 10) < parseFloat(b[column], 10) ? 1 : -1,
    );

  return (
    <div>
      <Helmet>
        <title>MetricRight</title>
        <meta name="description" content="Description of MetricRight" />
      </Helmet>
      <Close />
      <Text size="small">
        <FormattedMessage {...rootMessages['metric-types'].right} />
      </Text>
      <Heading margin={{ top: '5px' }}>
        <FormattedMessage {...rootMessages.rights[metric.key]} />
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

MetricRight.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { metric }) =>
    metric.type === 'esr'
      ? getESRRightScores(state, metric.key)
      : getCPRRightScores(state, metric.key),
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

export default compose(withConnect)(MetricRight);
