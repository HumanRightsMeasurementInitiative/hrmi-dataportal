/**
 *
 * CountryNarrative
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// {
//   // countryTitle,
//   // dimensions,
//   // rights,
//   // scale,
// }

function CountryNarrative() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

CountryNarrative.propTypes = {
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dimensions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CountryNarrative;
