/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const ToggleOption = ({ value, formatted, message, intl }) => (
  <option value={value}>
    {message ? intl.formatMessage(message) : formatted || value}
  </option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  formatted: PropTypes.string,
  message: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
