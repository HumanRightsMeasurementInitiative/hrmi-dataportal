/**
 *
 * SectionTitle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export function SectionTitle({ title, level = 1 }) {
  return (
    <Heading
      level={level}
      margin={{ bottom: 'small', top: 'medium' }}
      style={{ fontWeight: 600 }}
    >
      {title}
    </Heading>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  level: PropTypes.number,
};

export default SectionTitle;
