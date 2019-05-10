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

import { getESRRightScores, getCPRRightScores } from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';

import rootMessages from 'messages';
// import messages from './messages';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function MetricRight({ onLoadData, metric, scores }) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>MetricRight</title>
        <meta name="description" content="Description of MetricRight" />
      </Helmet>
      <Close />
      <Text>
        <FormattedMessage {...rootMessages['metric-types'].right} />
      </Text>
      <Heading>
        <FormattedMessage {...rootMessages.rights[metric.key]} />
      </Heading>
      <div>Scores for countries: {scores && scores.length}</div>
    </div>
  );
}

MetricRight.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { metric }) =>
    metric.type === 'esr'
      ? getESRRightScores(state, metric.key)
      : getCPRRightScores(state, metric.key),
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
