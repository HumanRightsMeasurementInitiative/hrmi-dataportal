/**
 *
 * TabCountrySnapshot
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ChartContainerCountrySnapshot from 'containers/ChartContainerCountrySnapshot';

function TabCountrySnapshot(props) {
  return <ChartContainerCountrySnapshot {...props} />;
}
TabCountrySnapshot.propTypes = {
  countryCode: PropTypes.string.isRequired,
};

export default TabCountrySnapshot;
