/**
 *
 * Metric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Heading } from 'grommet';

import rootMessages from 'messages';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';
import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getESRRightScores,
  getCPRRightScores,
  getIndicatorScores,
} from 'containers/App/selectors';

// import makeSelectMetric from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';

const metricType = code => {
  const dimension = DIMENSIONS.find(m => m.key === code);
  if (dimension) {
    return {
      type: 'dimensions',
      metric: dimension,
    };
  }
  const right = RIGHTS.find(m => m.key === code);
  if (right) {
    return {
      type: 'rights',
      metric: right,
    };
  }
  const indicators = INDICATORS.find(m => m.key === code);
  if (indicators) {
    return {
      type: 'indicators',
      metric: indicators,
    };
  }
  return false;
};

export function PathMetric(props) {
  // useInjectReducer({ key: 'metric', reducer });
  // useInjectSaga({ key: 'metric', saga });
  const { match } = props;
  const type = metricType(match.params.metric);
  return (
    <div>
      <Heading>
        {match.params.metric && (
          <FormattedMessage {...rootMessages[type.type][match.params.metric]} />
        )}
      </Heading>
      <div>Countries: {props.scores && props.scores.length}</div>
    </div>
  );
}

PathMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { match }) => {
    const type = metricType(match.params.metric);
    if (type && type.metric) {
      if (type.type === 'dimensions') {
        return type.metric.type === 'esr'
          ? getESRDimensionScores(state, match.params.metric)
          : getCPRDimensionScores(state, match.params.metric);
      }
      if (type.type === 'rights') {
        return type.metric.type === 'esr'
          ? getESRRightScores(state, match.params.metric)
          : getCPRRightScores(state, match.params.metric);
      }
      if (type.type === 'indicators') {
        return getIndicatorScores(state, match.params.metric);
      }
    }
    return false;
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathMetric);
