/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export function Card(props) {
  return (
    <Box
      height={{ min: '150px' }}
      elevation="small"
      responsive={false}
      margin={props.margin || 'xsmall'}
      pad="small"
      {...props}
    />
  );
}

Card.propTypes = {
  margin: PropTypes.string,
};

export default Card;
