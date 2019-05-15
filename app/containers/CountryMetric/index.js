/**
 *
 * CountryMetric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Close from 'containers/Close';

import getMetricDetails from 'utils/metric-details';

export function CountryMetric({
  metricCode,
  countryCode,
  tab = 0,
  onCloseOverlay,
}) {
  const metric = getMetricDetails(metricCode);
  return (
    <div>
      <Close onClick={() => onCloseOverlay()} />
      <div>{countryCode}</div>
      <div>{metric.key}</div>
      <div>{tab}</div>
    </div>
  );
}

CountryMetric.propTypes = {
  onCloseOverlay: PropTypes.func,
  metricCode: PropTypes.string,
  countryCode: PropTypes.string,
  tab: PropTypes.number,
};

export default CountryMetric;
