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
import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';

const getMetricDetails = code => {
  const dimension = DIMENSIONS.find(m => m.key === code);
  if (dimension) {
    return {
      metricType: 'dimensions',
      ...dimension,
    };
  }
  const right = RIGHTS.find(m => m.key === code);
  if (right) {
    return {
      metricType: 'rights',
      ...right,
    };
  }
  const indicator = INDICATORS.find(m => m.key === code);
  if (indicator) {
    return {
      metricType: 'indicators',
      ...indicator,
    };
  }
  return false;
};

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
