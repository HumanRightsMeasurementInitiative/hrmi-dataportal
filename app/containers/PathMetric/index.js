/**
 *
 * Metric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import MetricDimension from 'containers/MetricDimension/Loadable';
import MetricRight from 'containers/MetricRight/Loadable';
import MetricIndicator from 'containers/MetricIndicator/Loadable';

import getMetricDetails from 'utils/metric-details';

export function PathMetric(props) {
  const { match } = props;
  const metric = getMetricDetails(match.params.metric);
  if (metric) {
    switch (metric.metricType) {
      case 'dimensions':
        return <MetricDimension metric={metric} />;
      case 'rights':
        return <MetricRight metric={metric} />;
      case 'indicators':
        return <MetricIndicator metric={metric} />;
      default:
        return null;
    }
  }
  return null;
}

PathMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

export default PathMetric;
