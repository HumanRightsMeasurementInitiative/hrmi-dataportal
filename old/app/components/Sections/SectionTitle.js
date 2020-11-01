/**
 *
 * SectionTitle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export function SectionTitle ({ title, level = 1, marginTop }) {
  return (
    <Heading
      level={level}
      margin={
        marginTop ? { bottom: 'small', top: 'medium' } : { vertical: 'small' }
      }
      style={{ fontWeight: 600 }}
    >
      {title}
    </Heading>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  level: PropTypes.number,
  marginTop: PropTypes.bool,
};

export default SectionTitle;
