/**
 *
 * Overview
 *
 */

import React from 'react';
import { Box } from 'grommet';

export function Card(props) {
  return (
    <Box
      height={{ min: '150px' }}
      elevation="small"
      responsive={false}
      margin="xsmall"
      pad="small"
      {...props}
    />
  );
}

export default Card;
