/**
 *
 * SectionTitle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export function SectionTitle({ title }) {
  return (
    <Heading
      level={1}
      margin={{ bottom: 'small', top: 'medium' }}
      style={{ fontWeight: 600 }}
    >
      {title}
    </Heading>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
