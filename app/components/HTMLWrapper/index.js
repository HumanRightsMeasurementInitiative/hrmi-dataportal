import React from 'react';
import PropTypes from 'prop-types';
import setLinkTarget from 'utils/set-link-target';

/**
 * Wrap HTML text:
 * - sets global class to allow specifically targeting html markup
 *
 * @return {Component} HTMLWrapper
 */
const HTMLWrapper = ({ innerhtml }) => (
  // required for setting inner HTML (from markdown content)
  /* eslint-disable react/no-danger */
  <div
    className="hrmi-html"
    style={{ maxWidth: '700px' }}
    dangerouslySetInnerHTML={{ __html: setLinkTarget(innerhtml) }}
  />
  /* eslint-enable react/no-danger */
);

HTMLWrapper.propTypes = {
  /* the inner HTML text */
  innerhtml: PropTypes.string.isRequired,
};

export default HTMLWrapper;
